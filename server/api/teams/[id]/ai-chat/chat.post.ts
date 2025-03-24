import { streamText, smoothStream } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'

export default defineLazyEventHandler(async () => {
  const apiKey = useRuntimeConfig().openaiApiKey
  if (!apiKey) throw new Error('Missing OpenAI API key')
  const openai = createOpenAI({
    apiKey: apiKey,
  })

  return defineEventHandler(async (event: any) => {
    const { messages, model } = await readBody(event)

    const result = streamText({
      model: openai(model),
      messages,
    })

    return result.toDataStreamResponse()
  })
})
