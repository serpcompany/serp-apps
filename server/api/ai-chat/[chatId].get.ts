import { Chat, Message } from '@@/types/database'
import { getChatById } from '@@/server/database/queries/chat'

export default defineEventHandler(
  async (event): Promise<Chat & { messages: Message[] }> => {
    const { user } = await requireUserSession(event)
    const chatId = getRouterParam(event, 'chatId')
    if (!chatId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Chat ID is required',
      })
    }
    const chat = await getChatById(chatId, user.id)

    if (!chat) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Chat not found',
      })
    }

    return chat
  },
)
