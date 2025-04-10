import { eq, and, desc } from 'drizzle-orm'
import type { InsertFile } from '@@/types/database'
import { createError } from 'h3'

export const getAllFiles = async (teamId: string) => {
  try {
    const files = await useDB().query.files.findMany({
      where: and(eq(tables.files.teamId, teamId)),
      orderBy: [desc(tables.files.createdAt)],
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
    return files
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get all files',
    })
  }
}

export const createFile = async (file: InsertFile) => {
  try {
    const newFile = await useDB()
      .insert(tables.files)
      .values(file)
      .returning()
      .get()
    return newFile
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create file',
    })
  }
}

export const getFileById = async (
  id: string,
  teamId: string,
  userId: string,
) => {
  try {
    const file = await useDB().query.files.findFirst({
      where: and(
        eq(tables.files.id, id),
        eq(tables.files.teamId, teamId),
        eq(tables.files.userId, userId),
      ),
    })
    return file
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get file by ID',
    })
  }
}

export const deleteFile = async (
  id: string,
  teamId: string,
  userId: string,
) => {
  try {
    const result = await useDB()
      .delete(tables.files)
      .where(
        and(
          eq(tables.files.id, id),
          eq(tables.files.teamId, teamId),
          eq(tables.files.userId, userId),
        ),
      )
      .returning()

    if (!result.length) {
      throw createError({
        statusCode: 403,
        statusMessage:
          'You are not authorized to delete this file or it does not exist',
      })
    }

    return result[0]
  } catch (error: any) {
    if (error.statusCode) throw error

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete file',
    })
  }
}
