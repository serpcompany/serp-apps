import { getAllPosts } from '@@/server/database/queries/posts'

export default defineEventHandler(async (event) => {
  const { id: teamId } = getRouterParams(event)
  const { user } = await requireUserSession(event)
  const posts = await getAllPosts(teamId, user.id)
  return posts
})
