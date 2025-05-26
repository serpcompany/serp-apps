import { validateBody } from '@@/server/utils/validateBody';
import { otpSchema } from '@@/shared/zod-schema';
import { findOneTimePassword, deleteOneTimePassword } from '@@/server/database/queries/auth';
import { isWithinExpiryDate } from '@@/server/utils';
import { sanitizeUser } from '@@/server/utils';
import { findUserById, updateLastActiveTimestamp } from '@@/server/database/queries/users';
import { type H3Event } from 'h3';
import LoginNotificationTemplate from '@@/emails/login-notification.vue';
import { env } from '@@/env';
import { render } from '@vue-email/render';
import { sendEmail } from '@@/server/services/email';

// Define the template props types based on the email templates
interface LoginNotificationProps {
  userName?: string;
  city?: string;
  country?: string;
}

/**
 * Send a login notification email to a user
 */
export async function sendLoginNotification(event: H3Event, user: { email: string; name: string }) {
  // Get location information from Cloudflare headers if available
  const city = event.context.cf?.city || '';
  const country = event.context.cf?.country || '';

  // Create props object with correct types
  const templateProps: LoginNotificationProps = {
    userName: user.name,
    city,
    country
  };

  // Send login notification
  const htmlTemplate = await render(LoginNotificationTemplate, templateProps);

  if (env.MOCK_EMAIL) {
    console.table({
      message: 'Login notification email sent',
      email: user.email,
      name: user.name
    });
  } else {
    await sendEmail({
      to: user.email,
      subject: 'Login to Supersaas',
      html: htmlTemplate
    });
  }
}

export default defineEventHandler(async (event) => {
  const data = await validateBody(event, otpSchema);

  const oneTimePassword = await findOneTimePassword(data.code);
  if (!oneTimePassword) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid code'
    });
  }
  if (!isWithinExpiryDate(oneTimePassword.expiresAt.getTime())) {
    throw createError({ statusCode: 400, statusMessage: 'OTP has expired' });
  }

  const user = await findUserById(oneTimePassword.userId);

  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' });
  }

  await deleteOneTimePassword(data.code);

  if (user.banned && user.bannedUntil && user.bannedUntil > new Date()) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You account has been banned'
    });
  }

  await updateLastActiveTimestamp(user.id);
  await setUserSession(event, { user: sanitizeUser(user) });
  await sendLoginNotification(event, user);
  return sanitizeUser(user);
});
