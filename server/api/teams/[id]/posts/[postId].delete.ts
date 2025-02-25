import { deletePost } from '@@/server/database/queries/posts'

export default defineEventHandler(async (event) => {
  const { id: teamId, postId } = getRouterParams(event)
  const { user } = await requireUserSession(event)
  const post = await deletePost(postId, teamId, user.id)
  return post
})
