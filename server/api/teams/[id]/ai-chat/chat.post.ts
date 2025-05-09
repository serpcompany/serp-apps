import { streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createMistral } from '@ai-sdk/mistral'
import { isTeamMember } from '@@/server/database/queries/teams'
import { createMessage } from '@@/server/database/queries/ai-chat'
import { MessageRole } from '@@/server/database/schema/ai-chat'

export default defineLazyEventHandler(async () => {
  const config = useRuntimeConfig()
  const openaiApiKey = config.openaiApiKey
  const googleApiKey = config.googleApiKey
  const mistralApiKey = config.mistralApiKey

  if (!openaiApiKey) throw new Error('Missing OpenAI API key')

  const openai = createOpenAI({
    apiKey: openaiApiKey,
  })

  const google = googleApiKey
    ? createGoogleGenerativeAI({
        apiKey: googleApiKey,
      })
    : null

  const mistral = mistralApiKey
    ? createMistral({
        apiKey: mistralApiKey,
      })
    : null

  return defineEventHandler(async (event) => {
    const { messages, model, conversationId } = await readBody(event)
    const { user } = await requireUserSession(event)
    const teamId = getRouterParam(event, 'id')
    if (!teamId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Team ID is required',
      })
    }
    const hasAccess = await isTeamMember(teamId, user.id)
    if (!hasAccess) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Unauthorized Access',
      })
    }

    if (!conversationId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Conversation ID is required',
      })
    }

    // Save the user's message before processing
    const lastMessage = messages[messages.length - 1]
    if (lastMessage.role === 'user') {
      await createMessage(conversationId, lastMessage.content, MessageRole.USER)
    }

    type SupportedModel = 'gemini-2.0-flash' | 'mistral-small-latest' | string

    const modelProviders: Record<string, (() => any) | null> = {
      'gemini-2.0-flash': google ? () => google(model) : null,
      'mistral-small-latest': mistral ? () => mistral(model) : null,
    }

    let selectedModel

    if (Object.prototype.hasOwnProperty.call(modelProviders, model)) {
      if (!modelProviders[model]) {
        const providerName = model.includes('gemini') ? 'Google' : 'Mistral'
        return new Response(`${providerName} API key not configured`, {
          status: 400,
        })
      }
      selectedModel = modelProviders[model]()
    } else {
      // Default to OpenAI
      selectedModel = openai(model)
    }

    try {
      const result = streamText({
        model: selectedModel,
        messages,
        onError: (error) => {
          console.error(error)
        },
        onFinish: async (event) => {
          // Save the assistant's message
          await createMessage(conversationId, event.text, MessageRole.ASSISTANT)
        },
      })

      return result.toDataStreamResponse()
    } catch (error) {
      console.error('Error streaming text:', error)
      return {
        error: 'Error streaming text',
        status: 500,
        statusText: 'Error streaming text',
      }
    }
  })
})
