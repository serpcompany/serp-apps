import { createTeam } from '../../database/actions/teams'
import { createTeamSchema } from '@@/shared/validations/team'
import { validateBody } from '../../utils/bodyValidation'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const body = await validateBody(event, createTeamSchema)

  const team = await createTeam({
    name: body.name,
    ownerId: user.id,
    logo: body.logo,
  })

  return team
})
