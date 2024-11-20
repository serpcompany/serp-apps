import { createEnv } from '@t3-oss/env-nuxt'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DEV_LOGGER: z
      .string()
      .transform((val) => val === 'true')
      .pipe(z.boolean())
      .optional(),
    BASE_URL: z.string().url(),
    RPID: z.string(),
    APP_NAME: z.string(),
    APP_DESCRIPTION: z.string(),
    LOGO_URL: z.string().url(),
    RESEND_API_TOKEN: z.string().min(1),
    NUXT_OAUTH_GITHUB_CLIENT_ID: z.string().min(1),
    NUXT_OAUTH_GITHUB_CLIENT_SECRET: z.string().min(1),
    NUXT_OAUTH_GOOGLE_CLIENT_ID: z.string().min(1),
    NUXT_OAUTH_GOOGLE_CLIENT_SECRET: z.string().min(1),
    NUXT_SESSION_PASSWORD: z.string().min(1),
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    FROM_EMAIL: z.string().email(),
    EMAIL_PROVIDER: z.enum([
      'resend',
      'mailgun',
      'sendgrid',
      'postmark',
      'plunk',
    ]),
    PAYMENT_PROVIDER: z.enum(['stripe', 'lemonsqueezy']),
  },
})
