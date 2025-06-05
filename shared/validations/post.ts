import { insertPostSchema } from '@@/types/database'

export const postSchema = insertPostSchema.pick({
  title: true,
  content: true,
  image: true,
})
