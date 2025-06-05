import type { InsertPost, Post } from '@@/types/database'

export const findPostsByUserId = async (userId: string) => {
  const posts = await useDB().query.posts.findMany({
    where: eq(tables.posts.userId, userId),
  })
  return posts
}

export const findPostById = async (id: string, userId: string): Promise<Post | undefined> => {
  const post = await useDB().query.posts.findFirst({
    where: and(eq(tables.posts.id, id), eq(tables.posts.userId, userId)),
  })
  return post
}

export const createPost = async (payload: InsertPost): Promise<Post> => {
  const post = await useDB().insert(tables.posts).values(payload).returning().get()
  return post
}

export const updatePost = async (id: string, payload: Partial<InsertPost>, userId: string): Promise<Post> => {
  const post = await useDB()
    .update(tables.posts)
    .set(payload)
    .where(and(eq(tables.posts.id, id), eq(tables.posts.userId, userId)))
    .returning()
    .get()
  return post
}

export const deletePost = async (id: string, userId: string) => {
  const post = await useDB()
    .delete(tables.posts)
    .where(and(eq(tables.posts.id, id), eq(tables.posts.userId, userId)))
    .returning()
    .get()
  return post
}
