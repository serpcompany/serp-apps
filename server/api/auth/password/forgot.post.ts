import { emailSchema } from '@@/shared/zod-schema';
import { validateBody } from '@@/server/utils/validateBody';
import { findUserByEmail } from '@@/server/database/queries/users';
import { createPasswordResetToken } from '@@/server/database/queries/auth';
import { sendEmail } from '@@/server/services/email';
import { env } from '@@/env';

export default defineEventHandler(async (event) => {
  const { email } = await validateBody(event, emailSchema);

  const user = await findUserByEmail(email);
  if (!user) {
    sendNoContent(event);
    return;
  }

  const resetToken = await createPasswordResetToken(user.id);

  const resetUrl = `${env.BASE_URL}/auth/reset-password?token=${resetToken.code}`;

  if (env.MOCK_EMAIL) {
    console.table({
      email: user.email,
      resetLink: resetUrl
    });
  } else {
    await sendEmail({
      subject: `Welcome to the ${env.APP_NAME}`,
      to: user.email,
      html: `Click <a href="${resetUrl}">here</a> to reset your password`
    });
  }

  sendNoContent(event);
});
