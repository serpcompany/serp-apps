import {
  getInvite,
  updateInviteStatus,
  addUserToTeam,
} from '@@/server/database/actions/teams'

export default defineEventHandler(async (event) => {
  const { token } = getQuery(event)
  if (!token) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Token is required',
    })
  }
  const invite = await getInvite(token as string)
  if (!invite) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Invite not found',
    })
  }
  if (invite.expiresAt < new Date()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invite expired',
    })
  }
  if (invite.status === 'accepted') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invite already accepted',
    })
  }
  if (invite.status === 'rejected') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invite already rejected',
    })
  }
  if (invite.status === 'cancelled') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invite already cancelled',
    })
  }

  const { user } = await requireUserSession(event)
  if (invite.email === user.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'You cannot invite yourself',
    })
  }

  if (invite.email !== user.email) {
    setCookie(event, 'invite-token', invite.token, {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    })
    sendRedirect(event, '/auth/login', 302)
  }

  await addUserToTeam(invite.teamId, user.id)
  await updateInviteStatus(invite.id, 'accepted')
  return {
    message: 'Invite accepted',
  }
})
