import type { InsertMessage } from '@@/types/database'
import { createMessage } from '@@/server/database/queries/chat'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const { message, chatId } = await readBody(event)
  await createMessage({
    content: message.content,
    chatId,
    userId: user.id,
    role: message.role,
  })
  return 'Message saved'
})
