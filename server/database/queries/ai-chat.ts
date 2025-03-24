import { eq } from 'drizzle-orm'

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
