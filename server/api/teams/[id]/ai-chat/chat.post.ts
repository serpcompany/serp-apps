import { streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createMistral } from '@ai-sdk/mistral'

export default defineLazyEventHandler(async () => {
  // Get API keys from runtime config
  const config = useRuntimeConfig()
  const openaiApiKey = config.openaiApiKey
  const googleApiKey = config.googleApiKey
  const mistralApiKey = config.mistralApiKey
  // Validate API keys

  if (!openaiApiKey) throw new Error('Missing OpenAI API key')

  // Create provider instances with their respective API keys
  const openai = createOpenAI({
    apiKey: openaiApiKey,
  })

  // Only create Google provider if API key is available
  console.log(googleApiKey, 'googleApiKey')
  const google = googleApiKey
    ? createGoogleGenerativeAI({
        apiKey: googleApiKey,
      })
    : null

  // Only create Mistral provider if API key is available
  const mistral = mistralApiKey
    ? createMistral({
        apiKey: mistralApiKey,
      })
    : null

  return defineEventHandler(async (event) => {
    const { messages, model } = await readBody(event)

    type SupportedModel = 'gemini-2.0-flash' | 'mistral-small-latest' | string

    // Map model names to their provider functions
    const modelProviders: Record<string, (() => any) | null> = {
      'gemini-2.0-flash': google ? () => google(model) : null,
      'mistral-small-latest': mistral ? () => mistral(model) : null,
    }

    let selectedModel

    // Select the appropriate model based on the model name
    if (Object.prototype.hasOwnProperty.call(modelProviders, model)) {
      if (!modelProviders[model]) {
        const providerName = model.includes('gemini') ? 'Google' : 'Mistral'
        return new Response(`${providerName} API key not configured`, {
          status: 400,
        })
      }
      console.log(`Using ${model}`)
      selectedModel = modelProviders[model]!()
    } else {
      // Default to OpenAI
      console.log(`Using OpenAI model: ${model}`)
      selectedModel = openai(model)
    }

    try {
      // Stream the response
      const result = streamText({
        model: selectedModel,
        messages,
        onError: (error) => {
          console.error(error)
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
