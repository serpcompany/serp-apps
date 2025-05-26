import { validateAdmin } from '@@/server/utils/validateAdmin';

export default defineEventHandler(async (event) => {
  await validateAdmin(event);
  const userCount = await useDB().$count(tables.users);
  const feedbackCount = await useDB().$count(tables.feedback);
  return {
    users: userCount,
    feedback: feedbackCount
  };
});
