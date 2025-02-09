import { eq, and, desc } from 'drizzle-orm'
import type {
  InsertChat,
  Chat,
  InsertMessage,
  Message,
} from '@@/types/database'
import { createError } from 'h3'

export const getAllChatsByTeamId = async (teamId: string) => {
  try {
    const chats = await useDB().query.chats.findMany({
      where: eq(tables.chats.teamId, teamId),
    })
    return chats
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to find customer by team ID',
    })
  }
}

export const createChat = async (payload: InsertChat): Promise<Chat> => {
  try {
    const chat = await useDB()
      .insert(tables.chats)
      .values(payload)
      .returning()
      .get()
    return chat
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create chat',
    })
  }
}

export const getChatById = async (id: string, userId: string) => {
  try {
    const chat = await useDB().query.chats.findFirst({
      where: and(eq(tables.chats.id, id), eq(tables.chats.userId, userId)),
      with: {
        messages: {
          orderBy: [desc(tables.messages.createdAt)],
        },
      },
    })
    return chat
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to find chat by ID',
    })
  }
}

export const findChatsByUserId = async (userId: string) => {
  try {
    const chats = await useDB().query.chats.findMany({
      where: eq(tables.chats.userId, userId),
    })
    return chats
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to find chats by user ID',
    })
  }
}

export const deleteChat = async (id: string, userId: string) => {
  try {
    await useDB()
      .delete(tables.chats)
      .where(and(eq(tables.chats.id, id), eq(tables.chats.userId, userId)))
  } catch (error) {
    console.error(error)
  }
}
export const createMessage = async (
  payload: InsertMessage,
): Promise<Message> => {
  try {
    const message = await useDB()
      .insert(tables.messages)
      .values(payload)
      .returning()
      .get()
    return message
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create message',
    })
  }
}
