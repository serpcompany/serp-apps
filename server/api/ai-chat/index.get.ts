import { findChatsByUserId } from '@@/server/database/queries/chat'
export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const chats = await findChatsByUserId(user.id)
  return chats
})
