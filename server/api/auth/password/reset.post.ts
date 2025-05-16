import { z } from 'zod';
import { validateBody } from '@@/server/utils/validateBody';
import { findPasswordResetToken, deletePasswordResetToken } from '@@/server/database/queries/auth';
import { updateUser } from '@@/server/database/queries/users';
import { resetPasswordSchema } from '@@/shared/zod-schema';

export default defineEventHandler(async (event) => {
  const { token, password } = await validateBody(event, resetPasswordSchema);
  const resetToken = await findPasswordResetToken(token);
  if (!resetToken || resetToken.expiresAt < new Date()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid password reset link.'
    });
  }
  const hashedPassword = await hashPassword(password);
  await updateUser(resetToken.userId, { hashedPassword });
  await deletePasswordResetToken(token);
  sendNoContent(event);
});
