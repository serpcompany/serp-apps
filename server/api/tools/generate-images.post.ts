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
  const { user } = await requireUserSession(event)

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

  const eventStream = createEventStream(event)
  const sendStreamData = (payload: StreamPayload) => {
    eventStream.push(JSON.stringify(payload)).catch(() => {})
  }

  if (totalImages === 0) {
    event.waitUntil((async () => {
      try {
        sendStreamData({
          type: 'complete',
          metadata: {
            totalRequested: 0,
            totalSize: 0,
            prompts: tasks,
            message: 'No images requested.',
          },
        })

        await new Promise((resolve) => setTimeout(resolve, 500))
      } finally {
        console.log('Closing stream (no images requested).')
        await eventStream.close()
      }
    })())

    return eventStream.send()
  }

  const jobId = crypto.randomUUID()
  const { deductCredits, refundCredits, getRequiredCredits } = useServerTool('bulk_ai_images')

  const deductedCredits = await deductCredits({
    userId: user.id,
    description: `Bulk AI images generation (${totalImages} images)`,
    options: { count: totalImages },
  })

  const heartbeat = setInterval(() => {
    sendStreamData({ type: 'heartbeat', timestamp: Date.now() })
  }, 3000)

  eventStream.onClosed(async () => {
    clearInterval(heartbeat)
    await eventStream.close()
  })

  event.waitUntil((async () => {
    try {
      const result = await generateImages(jobId, validatedData.apiKey, tasks, totalImages, sendStreamData)
      if (result.totalFailed > 0) {
        const creditsToRefund = getRequiredCredits({ count: result.totalFailed })
        await refundCredits({
          userId: user.id,
          credits: creditsToRefund,
          description: `Refund for ${result.totalFailed} failed image generations out of ${totalImages} total`,
        })

        console.log(`Job ${jobId}: Refunded ${creditsToRefund} credits for ${result.totalFailed} failed images`)
      }
    } catch (error: any) {
      console.error(`Job ${jobId}: A fatal error occurred:`, error)

      await refundCredits({
        userId: user.id,
        credits: deductedCredits,
        description: 'Refund for failed bulk images generation',
      })

      sendStreamData({ type: 'fatal', error: error.message || 'An unexpected error terminated the job.' })
    } finally {
      console.log(`Job ${jobId}: Closing stream.`)
      await eventStream.close()
    }
  })())

  return eventStream.send()
})
