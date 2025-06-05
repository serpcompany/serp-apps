import { createPost } from '@@/server/database/queries/posts'
import { postSchema } from '@@/shared/validations/post'
import { validateBody } from '@@/server/utils/bodyValidation'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const data = await validateBody(event, postSchema)
  const post = await createPost({
    ...data,
    userId: user.id,
  })
  return post
})
