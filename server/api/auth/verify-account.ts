import { isWithinExpiryDate } from "@@/server/utils"

import { findUserById, verifyUser, updateLastActiveTimestamp } from "@@/server/database/queries/users"
import { findEmailVerificationCode, deleteEmailVerificationCode } from "@@/server/database/queries/auth"

export default defineEventHandler(async (event) => {
  const { token } = getQuery(event)
  if (!token) {
    return sendRedirect(
      event,
      `/auth/verification-error?message=${encodeURIComponent('Missing verification token')}`,
    )
  }
  const storedToken = await findEmailVerificationCode(token as string)
  if (!storedToken) {
    return sendRedirect(
      event,
      `/auth/verification-error?message=${encodeURIComponent('Invalid verification code')}`,
    )
  }

  const user = await findUserById(storedToken.userId)
  if (!user) {
    return sendRedirect(
      event,
      `/auth/verification-error?message=${encodeURIComponent('User not found')}`,
    )
  }

  if (!isWithinExpiryDate(storedToken.expiresAt.getTime())) {
    return sendRedirect(
      event,
      `/auth/verification-error?message=${encodeURIComponent('Verification code has expired. Please check your inbox or request a new verification email.')}&email=${encodeURIComponent(user.email)}`,
    )
  }

  if (!user.emailVerified) {
    await verifyUser(user.id)
  }

  if (user.banned && user.bannedUntil && user.bannedUntil > new Date()) {
    return sendRedirect(
      event,
      `/auth/verification-error?message=${encodeURIComponent('Your account has been banned')}`,
    )
  }

  await updateLastActiveTimestamp(user.id)
  await setUserSession(event, { user: sanitizeUser(user) })
  await deleteEmailVerificationCode(user.id)
  return sendRedirect(event, '/dashboard')
})
