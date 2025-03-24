import { createConversation } from '@@/server/database/queries/ai-chat'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const { id: teamId } = getRouterParams(event)
  const { title, model } = await readBody(event) || 'New Conversation'
  const conversation = await createConversation(user.id, teamId, title, model)
  return conversation
})
