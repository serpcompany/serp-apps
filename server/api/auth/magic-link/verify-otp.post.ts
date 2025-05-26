import { validateBody } from '@@/server/utils/validateBody';
import { otpSchema } from '@@/shared/zod-schema';
import { findOneTimePassword, deleteOneTimePassword } from '@@/server/database/queries/auth';
import { isWithinExpiryDate } from '@@/server/utils';
import { findUserById } from '@@/server/database/queries/users';
import { handleSuccessfulLogin } from '@@/server/utils';

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
    throw createError({ 
      statusCode: 400, 
      statusMessage: 'OTP has expired' 
    });
  }

  const user = await findUserById(oneTimePassword.userId);
  if (!user) {
    throw createError({ 
      statusCode: 404, 
      statusMessage: 'User not found' 
    });
  }

  // Delete the used OTP
  await deleteOneTimePassword(data.code);

  // Handle successful login and return response
  return await handleSuccessfulLogin(event, user);
});
