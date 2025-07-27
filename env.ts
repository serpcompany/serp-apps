import { createEnv } from '@t3-oss/env-nuxt'
import { z } from 'zod'

function createAppEnv() {
  console.info('Loading environment variables...: NODE_ENV:', process.env.NODE_ENV)

  const shouldValidate = !process.argv.includes('prepare') && !process.argv.includes('ensure')
  console[shouldValidate ? 'info' : 'warn'](
    `${shouldValidate ? 'Validating environment variables...' : 'Skipping environment variables validation...'} `,
  )

  return createEnv({
    server: {
      MOCK_EMAIL: z
        .string()
        .transform((val) => val === 'true')
        .pipe(z.boolean())
        .optional(),
      BASE_URL: z.string().url(),
      APP_NAME: z.string(),
      APP_DESCRIPTION: z.string(),
      LOGO_URL: z.string().url(),
      RESEND_API_TOKEN: z.string().min(1),
      MAILGUN_API_KEY: z.string().min(1),
      MAILGUN_DOMAIN: z.string().min(1),
      NUXT_OAUTH_GITHUB_CLIENT_ID: z.string().min(1),
      NUXT_OAUTH_GITHUB_CLIENT_SECRET: z.string().min(1),
      NUXT_OAUTH_GOOGLE_CLIENT_ID: z.string().min(1),
      NUXT_OAUTH_GOOGLE_CLIENT_SECRET: z.string().min(1),
      NUXT_SESSION_PASSWORD: z.string().min(32),
      NUXT_STRIPE_SECRET_KEY: z.string().min(1),
      NUXT_STRIPE_WEBHOOK_SECRET: z.string().min(1),
      FROM_EMAIL: z.string().email(),
      EMAIL_PROVIDER: z.enum([
        'resend',
        'mailgun',
        'sendgrid',
        'postmark',
        'plunk',
        'zeptomail',
      ]),
      PAYMENT_PROVIDER: z.enum(['stripe', 'lemonsqueezy']),
      TWILIO_ACCOUNT_SID: z.string().min(1),
      TWILIO_AUTH_TOKEN: z.string().min(1),
      TWILIO_PHONE_NUMBER: z
        .string()
        .regex(
          /^\+[1-9]\d{1,14}$/,
          'Phone number must be in E.164 format (e.g. +12125551234)',
        ),
      SCREENSHOT_API_BASE_URL: z.string().url(),
      SCREENSHOT_API_ACCESS_KEY: z.string().min(14),
      SCREENSHOT_API_URL_STILL_SUFFIX: z.string().min(1),
      SCREENSHOT_API_URL_SCROLLING_SUFFIX: z.string().min(1),
      USE_MOCK_IMAGES: z
        .string()
        .optional()
        .default('false')
        .transform((val) => val === 'true'),
    },
    skipValidation: !shouldValidate,
  })
}

export const env = createAppEnv()
