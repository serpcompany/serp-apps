import { updatePost } from '@@/server/database/queries/posts';
import { postSchema } from '@@/shared/zod-schema';
import { validateBody } from '@@/server/utils/validateBody';

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const { id } = getRouterParams(event);
  const postData = await validateBody(event, postSchema);
  const post = await updatePost(id, postData, user.id);
  return post;
});
