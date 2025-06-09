import { z } from 'zod'
import { validateBody } from '@@/server/utils/bodyValidation'
import { generateScreenshot } from '@@/server/services/screenshot'
import { addCreditsToUser, deductCreditsFromUser } from '~~/server/database/queries/credits'

const schema = z.object({
  url: z.string().url('Invalid URL format'),
  fullPage: z.boolean().optional(),
  scrollingAnimation: z.boolean().optional(),
})

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const { url, fullPage, scrollingAnimation } = await validateBody(event, schema)

  const creditsNeeded = scrollingAnimation ? 1000 : (fullPage ? 300 : 100)

  try {
    await deductCreditsFromUser(user.id, creditsNeeded, 'Screenshot tool usage')
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 422,
      statusMessage: 'Insufficient credits for this request.',
    })
  }

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
    await addCreditsToUser(user.id, creditsNeeded, 'refund', 'Refund for failed screenshot')
    throw createError({
      statusCode: 500,
      statusMessage: 'Screenshot generation failed',
    })
  }
})
