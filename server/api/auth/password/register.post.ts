// flow
// 1. Validate body (email, name, password)
// 2. Check if user exists (@method findUserByEmail)
// 3. Hash the password (uses the hashPassword util provided by nuxt-auth-utils)
// 4. Create user (@method createUserWithPassword)
// 5. Create verification code (@method generateAndSaveVerificationCode)
// 6. Render email template (@method render)
// 7. Send verification email (@method sendEmail)
// 8. Sanitize user data (@method sanitizeUser)
// 9. Return user (email, name)

// Used in:
// - app/pages/auth/register.vue

import { registerUserSchema } from '@@/shared/validations/auth'
import { sendEmail } from '@@/server/services/email'
import { env } from '@@/env'
import {
  findUserByEmail,
  createUserWithPassword,
} from '@@/server/database/actions/users'
import { generateAndSaveVerificationCode } from '@@/server/database/actions/auth'
import { nanoid } from 'nanoid'
import { render } from '@vue-email/render'
import EmailVerification from '@@/emails/email-verification.vue'
import { sanitizeUser } from '@@/server/utils/auth'

export default defineEventHandler(async (event) => {
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

  await generateAndSaveVerificationCode({
    userId: user.id,
    code: emailVerificationCode,
    expiresAt: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes
  })

  const htmlTemplate = await render(EmailVerification, {
    verificationCode: emailVerificationCode,
  })

  if (env.DEV_LOGGER) {
    console.table({
      email: result.data.email,
      name: result.data.name,
      verificationLink: `${env.BASE_URL}/api/auth/verify?token=${emailVerificationCode}`,
    })
  } else {
    await sendEmail({
      subject: `Welcome to the ${env.APP_NAME}`,
      to: result.data.email,
      html: htmlTemplate,
    })
  }
  setResponseStatus(event, 201)
  return sanitizeUser(user)
})
