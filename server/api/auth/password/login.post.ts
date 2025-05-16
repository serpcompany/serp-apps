import { validateBody } from '@@/server/utils/validateBody'
import { emailPasswordLoginSchema } from '@@/shared/zod-schema'
import { findUserByEmail } from '@@/server/database/queries/users'
import {
  checkIfUserShouldUseOAuth,
  validateUserHasPassword,
  validateEmailVerification,
  checkUserBanned,
  handleSuccessfulLogin
} from '@@/server/utils'

export default defineEventHandler(async (event) => {
  const data = await validateBody(event, emailPasswordLoginSchema)
  const user = await findUserByEmail(data.email)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    })
  }

  // Check if user should use OAuth login instead, in case if they have used oauth when registering
  await checkIfUserShouldUseOAuth(user)

  // Verify the user has a password
  validateUserHasPassword(user)

  // At this point, we know user.hashedPassword exists because validateUserHasPassword would have thrown an error otherwise
  const isPasswordCorrect = await verifyPassword(
    user.hashedPassword as string,
    data.password,
  )

  if (!isPasswordCorrect) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid password',
    })
  }

  // Verify email is verified
  validateEmailVerification(user)

  // Check if user is banned
  checkUserBanned(user)

  // Handle successful login and return response
  return await handleSuccessfulLogin(event, user)
})
