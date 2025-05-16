import { createPost } from '@@/server/database/queries/posts';
import { postSchema } from '@@/shared/zod-schema';
import { validateBody } from '@@/server/utils/validateBody';

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const data = await validateBody(event, postSchema);
  const post = await createPost({
    ...data,
    userId: user.id
  });
  return post;
});
