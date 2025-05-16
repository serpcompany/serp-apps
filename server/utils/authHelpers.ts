import { type H3Event } from 'h3';
import { render } from '@vue-email/render';
import { sendEmail } from '@@/server/services/email';
import LoginNotificationTemplate from '@@/emails/login-notification.vue';
import EmailVerificationTemplate from '@@/emails/email-verification.vue';
import { generateAlphaNumericCode } from '@@/server/utils/nanoid';
import { saveEmailVerificationCode } from '@@/server/database/queries/auth';
import { updateLastActiveTimestamp } from '@@/server/database/queries/users';
import { sanitizeUser } from '@@/server/utils/auth';
import { env } from '@@/env';
import type { User } from '@@/types/database';

// Define the template props types based on the email templates
interface LoginNotificationProps {
  userName?: string;
  city?: string;
  country?: string;
}

interface EmailVerificationProps {
  verificationCode?: string;
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

/**
 * Send email verification code to a user
 */
export async function sendEmailVerification(userId: string, email: string, name: string) {
  const emailVerificationCode = generateAlphaNumericCode(32);

  await saveEmailVerificationCode({
    userId,
    code: emailVerificationCode,
    expiresAt: new Date(Date.now() + 1000 * 60 * 30) // 30 minutes
  });

  // Create props object with correct types
  const templateProps: EmailVerificationProps = {
    verificationCode: emailVerificationCode
  };

  const htmlTemplate = await render(EmailVerificationTemplate, templateProps);

  if (env.MOCK_EMAIL) {
    console.table({
      email,
      name,
      verificationLink: `${env.BASE_URL}/api/auth/verify-account?token=${emailVerificationCode}`
    });
    return emailVerificationCode;
  }

  await sendEmail({
    subject: `Welcome to the ${env.APP_NAME}`,
    to: email,
    html: htmlTemplate
  });

  return emailVerificationCode;
}

/**
 * Handle successful user login flow
 */
export async function handleSuccessfulLogin(event: H3Event, user: User) {
  // Update last active timestamp
  await updateLastActiveTimestamp(user.id);

  // Set user session
  await setUserSession(event, { user: sanitizeUser(user) });

  // Send login notification
  if (env.MOCK_EMAIL) {
    console.table({
      message: 'Login notification email sent',
      email: user.email,
      name: user.name
    });
  } else {
    await sendLoginNotification(event, user);
  }
  return {
    redirect: '/'
  };
}
