import { validateBody } from '@@/server/utils/validateBody';
import { emailSchema } from '@@/shared/zod-schema';
import { findUserByEmail } from '@@/server/database/queries/users';
import { validateEmailVerification, checkUserBanned } from '@@/server/utils';
import { sendMagicLinkOtp } from '@@/server/utils/authHelpers';

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

  // Send magic link OTP
  await sendMagicLinkOtp(user.id, user.email, user.name);

  return sendNoContent(event);
});
