import { findUserById, updateUser } from '@@/server/database/queries/users';
import { validateBody } from '@@/server/utils/validateBody';
import { z } from 'zod';
import { validateAdmin } from '@@/server/utils/validateAdmin';

const schema = z.object({
  banned: z.boolean(),
  userId: z.string().min(1, 'User ID is required'),
  reason: z.string().optional(),
  bannedUntil: z.string().optional()
});

export default defineEventHandler(async (event) => {
  await validateAdmin(event);

  // Validate the request body
  const body = await validateBody(event, schema);
  const { userId, banned, reason, bannedUntil } = body;
  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required'
    });
  }
  const userRecord = await findUserById(userId);
  if (!userRecord) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    });
  }
  const bannedUntilDate = bannedUntil ? new Date(bannedUntil) : undefined;
  await updateUser(userId, {
    banned,
    bannedReason: reason,
    bannedUntil: banned ? bannedUntilDate : undefined
  });
  return {
    message: banned ? 'User banned successfully' : 'Ban lifted successfully'
  };
});
