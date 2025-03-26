import { getUrlByShortcode, updateUrl } from '~~/server/database/queries/urls'

export default defineEventHandler(async (event) => {
  const { shortcode } = event.context.params || {}
  const url = await getUrlByShortcode(shortcode)
  if (!url) {
    throw createError({
      statusCode: 404,
      statusMessage: 'URL not found',
    })
  }
  await updateUrl(url.id, {
    clicks: url.clicks + 1,
  })
  return sendRedirect(event, url.url)
})
