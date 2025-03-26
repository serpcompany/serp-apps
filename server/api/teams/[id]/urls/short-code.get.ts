import { isTeamMember } from '~~/server/database/queries/teams'
import { getUrlByShortcode } from '~~/server/database/queries/urls'
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

  // Generate a unique shortcode
  let shortcode
  let isUnique = false

  while (!isUnique) {
    shortcode = generateAlphaNumericCode(6)
    const existing = await getUrlByShortcode(shortcode)
    if (!existing) {
      isUnique = true
    }
  }

  return shortcode
})
