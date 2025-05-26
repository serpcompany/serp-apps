import { validateAdmin } from '@@/server/utils/validateAdmin';

export default defineEventHandler(async (event) => {
  await validateAdmin(event);
  const users = await useDB().query.users.findMany({
    with: {
      oauthAccounts: true
    },
    columns: {
      hashedPassword: false
    },
    orderBy: (users, { desc }) => [desc(users.createdAt)],
    limit: 50,
    offset: 0
  });
  return users;
});
