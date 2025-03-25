import { generateObject } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { z } from 'zod'
import type { H3Event } from 'h3'

export default cachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig()
    const openaiApiKey = config.openaiApiKey
    const openai = createOpenAI({
      apiKey: openaiApiKey,
    })
    const { object } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: z.object({
        text: z.string(),
      }),
      prompt: `Give me a list of 6 good science/code/tech/space related questions to start a conversation with an text basedAI,
      examples - "Tell me about black holes", "How do I convert SVG to PNG in browser", "What is the capital of France", "Give me a list of 10 saas app ideas to build and make money", "Give me a plan to learn React and typescript",
      as a JSON array of strings - only return the JSON array, no additional text or formatting.`,
    })
    return JSON.parse(object.text)
  },
  {
    maxAge: 60 * 60, // Cache for 1 hour
    getKey: (event: H3Event) => event.path,
    swr: false
  },
)
