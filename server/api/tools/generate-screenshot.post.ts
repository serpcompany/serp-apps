import { z } from 'zod'
import { validateBody } from '@@/server/utils/bodyValidation'
import { generateScreenshot } from '@@/server/services/screenshot'
import type { ScreenshotMode } from '~~/types/tool'

const schema = z.object({
  url: z.string().url('Invalid URL format'),
  fullPage: z.boolean().optional(),
  scrollingAnimation: z.boolean().optional(),
})

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const { url, fullPage, scrollingAnimation } = await validateBody(event, schema)

  const { deductCredits, refundCredits } = useServerTool('website_screenshot')
  let mode: ScreenshotMode = 'visible'
  if (scrollingAnimation) {
    mode = 'scrollingAnimation'
  } else if (fullPage) {
    mode = 'fullPage'
  }

  const deductedCredits = await deductCredits({
    userId: user.id,
    description: 'Screenshot tool usage',
    options: { mode },
  })

  try {
    const response = await generateScreenshot(url, fullPage, scrollingAnimation)
    if (!response.stream) {
      throw new Error('Screenshot generation failed - no stream returned')
    }

    if (response.contentType) {
      setResponseHeader(event, 'content-type', response.contentType)
    }

    await sendStream(event, response.stream); return
  } catch (error) {
    console.error('Screenshot generation error:', error)

    await refundCredits({
      userId: user.id,
      credits: deductedCredits,
      description: 'Refund for failed screenshot generation',
    })

    throw createError({
      statusCode: 500,
      statusMessage: 'Screenshot generation failed',
    })
  }
})
