import { z } from 'zod'
import { validateBody } from '@@/server/utils/bodyValidation'
import { generateScreenshot } from '@@/server/services/screenshot'

const schema = z.object({
  url: z.string().url('Invalid URL format'),
  fullPage: z.boolean().optional(),
  scrollingAnimation: z.boolean().optional(),
})

export default defineEventHandler(async (event) => {
  const { url, fullPage, scrollingAnimation } = await validateBody(event, schema)

  const response = await generateScreenshot(url, fullPage, scrollingAnimation)
  if (response.stream) {
    if (response.contentType) {
      setResponseHeader(event, 'content-type', response.contentType)
    }

    return sendStream(event, response.stream)
  }
})
