// Used in:
// - /auth/login.vue

// flow
// 1. Validate body (email, name, password)
// 2. Check if user exists (@method findUserByEmail)
// 3. Hash the password (uses the hashPassword util provided by nuxt-auth-utils)
// 4. Create user (@method createUserWithPassword)
// 5. Create verification code (@method generateAndSaveVerificationCode)
// 6. Create One Time Password code (@method generateAndSaveOneTimePassword)
// 7. Render email template (@method render)
// 8. Send verification email (@method sendEmail)
// 9. Sanitize user data (@method sanitizeUser)
// 10. Return sanitized user object

import {
  findUserByEmail,
  findLinkedAccountsByUserId,
  updateLastActiveTimestamp,
} from '@@/server/database/actions/users'
import { loginUserSchema } from '@@/shared/validations/auth'
import { validateBody } from '@@/server/utils/bodyValidation'

export default defineEventHandler(async (event) => {
  // 1. Validate body
  const data = await validateBody(event, loginUserSchema)

  // 2. Find user by email
  const user = await findUserByEmail(data.email)
  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User not found',
    })
  }

  // 3. Check if user uses OAuth (should use OAuth login instead)
  if (!user.hashedPassword && user.emailVerified) {
    const linkedAccounts = await findLinkedAccountsByUserId(user.id)
    const providers = linkedAccounts.map((account) => account.provider)
    throw createError({
      statusCode: 400,
      statusMessage: `Looks like you had signed up with ${providers.join(
        ', ',
      )}. Please use ${providers.join(', ')} to login instead.`,
    })
  }

  // 4. Verify password
  if (!user.hashedPassword) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'This account was registered via a social login (e.g., Google, GitHub). Please use the same method to log in.',
    })
  }

  const isPasswordCorrect = await verifyPassword(
    user.hashedPassword,
    data.password,
  )

  if (!isPasswordCorrect) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid password',
    })
  }

  // 5. Check if email is verified
  if (!user.emailVerified) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email not verified',
    })
  }

  // 6. Check if user is banned
  if (user.banned) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You account has been banned',
    })
  }

  // 7. Update last active timestamp
  await updateLastActiveTimestamp(user.id)

  const sanitizedUser = sanitizeUser(user)

  if (!sanitizedUser) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to process user data',
    })
  }
  await setUserSession(event, { user: sanitizedUser })
  return sendNoContent(event)
})
