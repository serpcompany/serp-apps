import { validateAdmin } from '@@/server/utils/validateAdmin';

export default defineEventHandler(async (event) => {
  await validateAdmin(event);
  const { userId } = await readBody(event);
  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required'
    });
  }
  const userRecord = await useDB()
    .delete(tables.users)
    .where(eq(tables.users.id, userId))
    .returning()
    .get();
  return userRecord;
});
