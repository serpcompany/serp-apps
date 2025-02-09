import { createChat } from '@@/server/database/queries/chat'
import { validateBody } from '@@/server/utils/bodyValidation'
import { insertChatSchema } from '@@/types/database'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const body = await validateBody(event, insertChatSchema)
  if (user.id !== body.userId) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You are not authorized to create this chat',
    })
  }
  const chat = await createChat(body)
  return chat
})
