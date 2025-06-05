import { findPostsByUserId } from '@@/server/database/queries/posts'
import { findUserById } from '@@/server/database/queries/users'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const posts = await findPostsByUserId(user.id)

  // Fetch user information for each post
  const postsWithUserInfo = await Promise.all(
    posts.map(async (post) => {
      const user = await findUserById(post.userId)
      return {
        ...post,
        user: user
          ? {
              id: user.id,
              name: user.name,
              avatarUrl: user.avatarUrl,
            }
          : null,
      }
    }),
  )

  return postsWithUserInfo
})
