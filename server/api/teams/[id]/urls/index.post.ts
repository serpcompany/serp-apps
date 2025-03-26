import { isTeamMember } from '~~/server/database/queries/teams'
import { createUrl } from '~~/server/database/queries/urls'
import { generateAlphaNumericCode } from '~~/server/database/schema/urls'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const teamId = getRouterParam(event, 'id')
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Team ID is required',
    })
  }

  const hasAccess = await isTeamMember(teamId, user.id)
  if (!hasAccess) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Unauthorized Access',
    })
  }

  const { url, comments, tags, expiresAt, logo, shortcode } =
    await readBody(event)
  if (!url) {
    throw createError({
      statusCode: 400,
      statusMessage: 'URL is required',
    })
  }

  const newUrl = await createUrl({
    userId: user.id,
    teamId,
    url,
    shortcode: shortcode || generateAlphaNumericCode(6),
    comments,
    tags,
    expiresAt,
    logo,
  })
  return newUrl
})
