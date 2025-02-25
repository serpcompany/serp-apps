import { eq, and, desc } from 'drizzle-orm'
import type { InsertPost, Post } from '@@/types/database'
import { createError } from 'h3'

export const getAllPosts = async (teamId: string, userId: string) => {
  try {
    const posts = await useDB().query.posts.findMany({
      where: and(
        eq(tables.posts.teamId, teamId),
        eq(tables.posts.userId, userId),
      ),
      orderBy: [desc(tables.posts.createdAt)],
      with: {
        userId: {
          columns: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
      },
    })
    return posts
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get all posts',
    })
  }
}

export const createPost = async (post: InsertPost) => {
  try {
    const newPost = await useDB()
      .insert(tables.posts)
      .values(post)
      .returning()
      .get()
    return newPost
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create post',
    })
  }
}

export const getPostById = async (
  id: string,
  teamId: string,
  userId: string,
) => {
  try {
    const post = await useDB().query.posts.findFirst({
      where: and(
        eq(tables.posts.id, id),
        eq(tables.posts.teamId, teamId),
        eq(tables.posts.userId, userId),
      ),
    })
    return post
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get post by ID',
    })
  }
}

export const updatePost = async (
  id: string,
  teamId: string,
  userId: string,
  post: Partial<Post>,
) => {
  try {
    const updatedPost = await useDB()
      .update(tables.posts)
      .set(post)
      .where(
        and(
          eq(tables.posts.id, id),
          eq(tables.posts.teamId, teamId),
          eq(tables.posts.userId, userId),
        ),
      )
      .returning()
      .get()
    return updatedPost
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update post',
    })
  }
}

export const deletePost = async (
  id: string,
  teamId: string,
  userId: string,
) => {
  try {
    const deletedPost = await useDB()
      .delete(tables.posts)
      .where(
        and(
          eq(tables.posts.id, id),
          eq(tables.posts.teamId, teamId),
          eq(tables.posts.userId, userId),
        ),
      )
    return deletedPost
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete post',
    })
  }
}
