import {
  getInvite,
  updateInviteStatus,
  addUserToTeam,
  getActiveTeamMembers,
  isUserAlreadyInTeam,
} from '@@/server/database/actions/teams'
import { z } from 'zod'
// Define invite status types for better type safety
type InviteStatus = (typeof INVALID_STATUSES)[number]
const INVALID_STATUSES = ['accepted', 'rejected', 'cancelled'] as const

const querySchema = z.object({
  token: z.string().length(32, 'Invalid token'),
})

export default defineEventHandler(async (event) => {
  // 1. Validate token with type checking
  const { token } = await getValidatedQuery(event, querySchema.parse)

  // 2. Get and validate invite
  const invite = await getInvite(token)
  if (!invite) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Invite not found or invalid',
    })
  }

  // 3. Check invite validity
  if (invite.expiresAt < new Date()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invite expired',
    })
  }

  if (INVALID_STATUSES.includes(invite.status as InviteStatus)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invite already ${invite.status}`,
    })
  }

  // 4. Validate user session and permissions
  const { user } = await requireUserSession(event)

  // 5. Check if user is already a team member
  const isAlreadyMember = await isUserAlreadyInTeam(invite.teamId, user.id)
  if (isAlreadyMember) {
    throw createError({
      statusCode: 400,
      statusMessage: 'You are already a member of this team',
    })
  }

  // 6. Validate invite belongs to correct user
  if (invite.email !== user.email) {
    setCookie(event, 'invite-token', invite.token, {
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'lax',
    })
    return sendRedirect(event, '/auth/login', 302)
  }

  // 7. Process invite acceptance
  await addUserToTeam(invite.teamId, user.id)
  await updateInviteStatus(invite.id, 'accepted')

  return {
    message: 'Invite accepted',
    teamId: invite.teamId,
  }
})
