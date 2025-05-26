import { validateBody } from '@@/server/utils/validateBody';
import { emailSchema } from '@@/shared/zod-schema';
import { findUserByEmail } from '@@/server/database/queries/users';
import { validateEmailVerification, checkUserBanned } from '@@/server/utils';
import { generateAlphaNumericCode, generateNumericCode } from '@@/server/utils/nanoid';
import { saveEmailVerificationCode, saveOneTimePassword } from '@@/server/database/queries/auth';
import { OneTimePasswordTypes } from '@@/server/database/schema/auth';
import MagicLinkEmailTemplate from '@@/emails/magic-link.vue';
import { render } from '@vue-email/render';
import { sendEmail } from '@@/server/services/email';
import { env } from '@@/env';

export default defineEventHandler(async (event) => {
  const data = await validateBody(event, emailSchema);
  const user = await findUserByEmail(data.email);

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials'
    });
  }
  // Verify email is verified
  validateEmailVerification(user);
  // Check if user is banned
  checkUserBanned(user);

  const emailVerificationCode = generateAlphaNumericCode(32);
  const oneTimePassword = generateNumericCode(6);

  await saveEmailVerificationCode({
    userId: user.id,
    code: emailVerificationCode,
    expiresAt: new Date(Date.now() + 1000 * 60 * 30) // 30 minutes
  });

  await saveOneTimePassword({
    userId: user.id,
    identifier: data.email,
    code: oneTimePassword,
    type: OneTimePasswordTypes.login,
    expiresAt: new Date(Date.now() + 1000 * 60 * 5) // 5 minutes
  });

  const emailHtml = await render(MagicLinkEmailTemplate, {
    otp: oneTimePassword,
    verificationCode: emailVerificationCode
  });

  if (env.MOCK_EMAIL) {
    console.table({
      email: data.email,
      verificationLink: `${env.BASE_URL}/api/auth/verify-account?token=${emailVerificationCode}`,
      oneTimePassword
    });
  } else {
    await sendEmail({
      subject: `Your login link for ${env.APP_NAME}`,
      to: data.email,
      html: emailHtml
    });
  }
  return sendNoContent(event);
});
