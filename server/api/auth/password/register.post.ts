import { registerUserSchema } from '@@/shared/validations/auth'
import { sendEmail } from '@@/server/services/email'
import { env } from '@@/env'
import {
  findUserByEmail,
  createUserWithPassword,
} from '@@/server/database/actions/users'
import {
  generateAndSaveVerificationCode,
  generateAndSaveOneTimePassword,
} from '@@/server/database/actions/auth'
import { OneTimePasswordTypes } from '@@/constants'
import { nanoid } from 'nanoid'
import { render } from '@vue-email/render'
import EmailVerification from '@@/emails/email-verification.vue'

export default defineEventHandler(async (event) => {
  // flow
  // 1. Validate body
  // 2. Check if user exists
  // 3. Hash the password
  // 4. Create user
  // 5. Create verification code
  // 6. Create One Time Password code
  // 7. Render email template
  // 8. Send verification email
  // 9. Return user

  // 1. Validate body
  const result = await readValidatedBody(event, (body) =>
    registerUserSchema.safeParse(body),
  )
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid input',
      data: result.error.issues,
    })
  }
  // 2. Check if user exists
  const existingUser = await findUserByEmail(result.data.email)
  if (existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User already exists',
    })
  }

  // 3. Hash the password
  const hashedPassword = await hashPassword(result.data.password)

  // 4. Create user

  const user = await createUserWithPassword({
    email: result.data.email,
    name: result.data.name,
    hashedPassword,
  })
  const emailVerificationCode = nanoid(32)
  const oneTimePassword = nanoid(6)

  await generateAndSaveVerificationCode({
    userId: user.id,
    code: emailVerificationCode,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
  })

  await generateAndSaveOneTimePassword({
    userId: user.id,
    code: oneTimePassword,
    type: OneTimePasswordTypes.signup,
    identifier: result.data.email,
    expiresAt: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes
  })

  const htmlTemplate = await render(EmailVerification, {
    verificationCode: emailVerificationCode,
    otp: oneTimePassword,
  })

  if (!env.DEV_LOGGER) {
    console.table({
      email: result.data.email,
      name: result.data.name,
      emailVerificationCode,
      oneTimePassword,
    })
  } else {
    await sendEmail({
      subject: `Welcome to the ${env.APP_NAME}`,
      to: result.data.email,
      html: htmlTemplate,
    })
  }
  return result.data
})
