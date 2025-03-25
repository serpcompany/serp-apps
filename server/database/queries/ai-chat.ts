import { eq, and } from 'drizzle-orm'

export const createConversation = async (
  userId: string,
  teamId: string,
  title: string,
  model: string,
) => {
  const conversation = await useDB()
    .insert(tables.conversations)
    .values({
      userId,
      teamId,
      title,
      model,
    })
    .returning()
    .get()
  return conversation
}

export const getConversation = async (conversationId: string) => {
  const conversation = await useDB().query.conversations.findFirst({
    where: eq(tables.conversations.id, conversationId),
  })
  return conversation
}

export const getConversationsByUserId = async (userId: string) => {
  const conversations = await useDB().query.conversations.findMany({
    where: eq(tables.conversations.userId, userId),
  })
  return conversations
}

export const deleteConversation = async (conversationId: string) => {
  await useDB()
    .delete(tables.conversations)
    .where(eq(tables.conversations.id, conversationId))
}
enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
}

export const createMessage = async (
  conversationId: string,
  message: string,
  role: MessageRole,
) => {
  const record = await useDB()
    .insert(tables.messages)
    .values({
      conversationId,
      content: message,
      role,
    })
    .returning()
    .get()
  return record
}

export const getMessagesByConversationId = async (
  conversationId: string,
  userId: string,
  teamId: string,
) => {
  const messages = await useDB()
    .select()
    .from(tables.messages)
    .innerJoin(
      tables.conversations,
      and(
        eq(tables.messages.conversationId, tables.conversations.id),
        eq(tables.conversations.userId, userId),
        eq(tables.conversations.teamId, teamId),
        eq(tables.conversations.id, conversationId),
      ),
    )
    .get()
  return messages
}

export const deleteMessage = async (messageId: string) => {
  await useDB().delete(tables.messages).where(eq(tables.messages.id, messageId))
}
