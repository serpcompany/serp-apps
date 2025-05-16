import { deletePost } from '@@/server/database/queries/posts';

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const { id } = getRouterParams(event);
  const post = await deletePost(id, user.id);
  return post;
});
