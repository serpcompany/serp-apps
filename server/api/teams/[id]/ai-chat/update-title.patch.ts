import { isTeamMember } from '@@/server/database/queries/teams'
import { updateConversationTitle } from '@@/server/database/queries/ai-chat'
import { generateText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const openaiApiKey = config.openaiApiKey
  const openai = createOpenAI({
    apiKey: openaiApiKey,
  })
  const { user } = await requireUserSession(event)
  const { id } = getRouterParams(event)
  const teamId = id as string

  const hasAccess = await isTeamMember(teamId, user.id)
  if (!hasAccess) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Unauthorized Access',
    })
  }

  const { chatId, initialMessage } = await readBody(event)

  const { text: updatedTitle } = await generateText({
    model: openai('gpt-4o-mini'),
    prompt: `Generate a small title for a conversation - this is the initial message: ${initialMessage}. Only return the final title, no explaination or formatting needed.`,
  })

  await updateConversationTitle(chatId, updatedTitle, user.id, teamId)
  return updatedTitle
})
