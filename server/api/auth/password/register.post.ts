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
} from '@@/server/database/queries/users'
import { saveEmailVerificationCode } from '@@/server/database/queries/auth'
import { generateAlphaNumericCode } from '@@/server/utils/nanoid'
import { render } from '@vue-email/render'
import EmailVerification from '@@/emails/email-verification.vue'
import { sanitizeUser } from '@@/server/utils/auth'
import { validateBody } from '@@/server/utils/bodyValidation'

export default defineEventHandler(async (event) => {
  // 1. Validate body
  const data = await validateBody(event, registerUserSchema)

  // 2. Check if user exists
  const existingUser = await findUserByEmail(data.email)
  if (existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: 'An account with this email already exists, please login.',
    })
  }

  // 3. Hash the password
  const hashedPassword = await hashPassword(data.password)

  // 4. Create user

  const user = await createUserWithPassword({
    email: data.email,
    name: data.name,
    hashedPassword,
  })
  const emailVerificationCode = generateAlphaNumericCode(32)

  await saveEmailVerificationCode({
    userId: user.id,
    code: emailVerificationCode,
    expiresAt: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes
  })

  const htmlTemplate = await render(EmailVerification, {
    verificationCode: emailVerificationCode,
  })

  if (env.MOCK_EMAIL) {
    console.table({
      email: data.email,
      name: data.name,
      verificationLink: `${env.BASE_URL}/api/auth/verify-account?token=${emailVerificationCode}`,
    })
  } else {
    await sendEmail({
      subject: `Welcome to the ${env.APP_NAME}`,
      to: data.email,
      html: htmlTemplate,
    })
  }
  setResponseStatus(event, 201)
  return sanitizeUser(user)
})
