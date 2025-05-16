import { validateBody } from '@@/server/utils/validateBody'
import { emailPasswordRegisterSchema } from '@@/shared/zod-schema'
import { createUserWithPassword, findUserByEmail } from '@@/server/database/queries/users'
import { 
  sanitizeUser, 
  type AuthError,
  sendEmailVerification,
  handleSuccessfulLogin
} from '@@/server/utils'

export default defineEventHandler(async (event) => {
  const data = await validateBody(event, emailPasswordRegisterSchema)
  const existingUser = await findUserByEmail(data.email)

  if (existingUser) {
    // If user exists but email is not verified, show resend option
    if (!existingUser.emailVerified) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email not verified',
        needsVerification: true,
        email: data.email,
      } as AuthError)
    }

    // If user exists and email is verified, return error
    throw createError({
      statusCode: 400,
      statusMessage: 'An account with this email already exists, please login.',
    })
  }

  const hashedPassword = await hashPassword(data.password)

  const user = await createUserWithPassword({
    name: data.name,
    email: data.email,
    hashedPassword,
  })
  const sanitizedUser = sanitizeUser(user)

  if (sanitizedUser.emailVerified) {
    // If email is already verified (likely in development or test environment),
    // handle successful login flow
    await handleSuccessfulLogin(event, user)
  }
  else {
    // Send email verification
    await sendEmailVerification(user.id, data.email, data.name)
  }

  setResponseStatus(event, 201)
  return sanitizedUser
})
