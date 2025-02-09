import { deleteChat } from '@@/server/database/queries/chat'

export default defineEventHandler(async (event) => {
  const { chatId } = getRouterParams(event)
  const { user } = await requireUserSession(event)
  await deleteChat(chatId, user.id)
  return {
    success: true,
  }
})
