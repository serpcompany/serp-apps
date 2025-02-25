import { createPost } from '@@/server/database/queries/posts'
import type { InsertPost } from '@@/types/database'
export default defineEventHandler(async (event) => {
  const { id: teamId } = getRouterParams(event)
  const { user } = await requireUserSession(event)
  const { title, content, image } = await readBody<InsertPost>(event)
  const payload = {
    title,
    content,
    image,
    teamId,
    userId: user.id,
  }
  const post = await createPost(payload)
  return post
})
