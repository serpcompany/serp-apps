import { findUserTeams } from '@@/server/database/queries/teams'
import { getUserPreferences } from '@@/server/database/queries/users'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const [teams, preferences] = await Promise.all([
    findUserTeams(user.id),
    getUserPreferences(user.id)
  ])
  return { teams, preferences }
})
