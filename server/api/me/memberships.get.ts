import { findUserTeams } from '@@/server/database/actions/teams'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  console.log('user', user.email)
  const teams = await findUserTeams(user.id)
  console.log('teams', teams)
  return teams
})
