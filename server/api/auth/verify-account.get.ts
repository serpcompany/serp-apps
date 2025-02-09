// flow
// 1. Validate query parameter (token)
// 2. Find and delete verification code (@method findAndDeleteEmailVerificationCode)
// 3. Check if token is expired (@method isWithinExpiryDate)
// 4. Find user by ID (@method findUserById)
// 5. Verify user's email if not already verified (@method verifyUser)
// 6. Check if user is banned
// 7. Update user's last active timestamp (@method updateLastActiveTimestamp)
// 8. Sanitize user data (@method sanitizeUser)
// 9. Set user session
// 10. Redirect to dashboard

// Used in:
// - emails/email-verification.vue

import { isWithinExpiryDate, sanitizeUser } from '@@/server/utils/auth'
import {
  findUserById,
  verifyUser,
  updateLastActiveTimestamp,
} from '@@/server/database/queries/users'
import {
  findEmailVerificationCode,
  deleteEmailVerificationCode,
} from '@@/server/database/queries/auth'

export default defineEventHandler(async (event) => {
  const { token } = getQuery(event)
  if (!token) {
    throw createError({ statusCode: 400, statusMessage: 'Missing token' })
  }

  const storedToken = await findEmailVerificationCode(token as string)
  if (!storedToken) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid verification code',
    })
  }

  if (!isWithinExpiryDate(storedToken.expiresAt.getTime())) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Verification code has expired',
    })
  }

  const user = await findUserById(storedToken.userId)
  if (!user) {
    throw createError({ statusCode: 400, statusMessage: 'User not found' })
  }

  if (!user.emailVerified) {
    await verifyUser(user.id)
  }

  if (user.banned) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Your account has been banned',
    })
  }

  await updateLastActiveTimestamp(user.id)
  const transformedUser = sanitizeUser(user)
  await setUserSession(event, { user: transformedUser })
  await deleteEmailVerificationCode(token as string)
  return sendRedirect(event, '/dashboard')
})
