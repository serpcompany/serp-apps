import { findUserTeams } from '@@/server/database/actions/teams'
import { getUserPreferences } from '@@/server/database/actions/users'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const [teams, preferences] = await Promise.all([
    findUserTeams(user.id),
    getUserPreferences(user.id)
  ])
  return { teams, preferences }
})
