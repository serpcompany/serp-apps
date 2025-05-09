import { getConversation } from '@@/server/database/queries/ai-chat'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const { id, chatId } = getRouterParams(event)
  const teamId = id

  const conversation = await getConversation(chatId, user.id, teamId)

  if (!conversation) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Conversation not found',
    })
  }
  return conversation
})
