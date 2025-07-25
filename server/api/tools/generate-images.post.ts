import { z } from 'zod'

import { generateImages } from '~~/server/services/bulk-images'
import { MIN_IMAGE_COUNT, MAX_IMAGE_COUNT, MAX_IMAGE_PER_PROMPT } from '~~/constants'
import type { ImageGenerationTask, StreamPayload } from '~~/server/services/bulk-images'

const imagesFormDataSchema = z.object({
  type: z.literal('form'),
  apiKey: z.string().min(1, 'OpenAI API key is required'),
  data: z.object({
    prompt: z.string().min(1),
    count: z.number().min(MIN_IMAGE_COUNT).max(MAX_IMAGE_COUNT),
  }),
})

const imagesCsvDataSchema = z.object({
  type: z.literal('csv'),
  apiKey: z.string().min(1, 'OpenAI API key is required'),
  data: z.array(z.object({
    prompt: z.string().min(1),
    count: z.number().min(MIN_IMAGE_COUNT).max(MAX_IMAGE_PER_PROMPT),
  })).refine(
    (rows) => rows.reduce((sum, row) => sum + row.count, 0) <= MAX_IMAGE_COUNT,
    {
      message: 'Total count of images across all rows must not exceed 50',
    },
  ),
})

const bulkImagesRequestSchema = z.union([imagesFormDataSchema, imagesCsvDataSchema])

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (data) => bulkImagesRequestSchema.safeParse(data))
  if (body.error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request data',
      data: body.error.format(),
    })
  }

  const validatedData = body.data

  const tasks: ImageGenerationTask[] = validatedData.type === 'form'
    ? [validatedData.data]
    : validatedData.data

  const totalImages = tasks.reduce((sum, task) => sum + task.count, 0)
  if (totalImages === 0) {
    return { success: true, message: 'No images requested.' }
  }

  const jobId = crypto.randomUUID()

  const eventStream = createEventStream(event)
  const sendStreamData = (payload: StreamPayload) => {
    void eventStream.push(JSON.stringify(payload))
  }

  const heartbeat = setInterval(() => {
    sendStreamData({ type: 'heartbeat', timestamp: Date.now() })
  }, 30000)

  event.waitUntil((async () => {
    try {
      await generateImages(validatedData.apiKey, jobId, tasks, totalImages, sendStreamData)
    } catch (error: any) {
      console.error(`Job ${jobId}: A fatal error occurred:`, error)
      sendStreamData({ type: 'fatal', error: error.message || 'An unexpected error terminated the job.' })
    } finally {
      console.log(`Job ${jobId}: Closing stream.`)
      clearInterval(heartbeat)
      void eventStream.close()
    }
  })())

  return eventStream.send()
})
