import { streamText, smoothStream } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { createMessage } from '@@/server/database/queries/chat'
export default defineLazyEventHandler(async () => {
  const apiKey = useRuntimeConfig().openaiApiKey
  if (!apiKey) throw new Error('Missing OpenAI API key')
  const openai = createOpenAI({
    apiKey: apiKey,
  })

  return defineEventHandler(async (event: any) => {
    const { user } = await requireUserSession(event)
    const { chatId } = await readBody(event)
    const { messages } = await readBody(event)

    // store the last message as a user message
    const userMessage = messages[messages.length - 1]
    await createMessage({
      content: userMessage.content,
      role: 'user',
      chatId,
      userId: user.id,
    })

    const result = streamText({
      model: openai('gpt-4o-mini'),
      experimental_transform: smoothStream({
        delayInMs: 10, // optional: defaults to 10ms
        chunking: 'line', // optional: defaults to 'word'
      }),
      messages,
    })

    return result.toDataStreamResponse()
  })
})
