import { createEnv } from "@t3-oss/env-nuxt";
import { z } from "zod";

export const env = createEnv({
  server: {
    MOCK_EMAIL: z
      .string()
      .transform((val) => val === 'true')
      .pipe(z.boolean())
      .optional(),
    EMAIL_FROM_NAME: z.string().min(1),
    EMAIL_PROVIDER: z.enum([
      'resend',
      'mailgun',
      'sendgrid',
      'postmark',
      'plunk',
      'zeptomail',
    ]),
    ZEPTOMAIL_API_KEY: z.string().min(1),
    EMAIL_FROM_EMAIL: z.string().email(),
    BASE_URL: z.string().url(),
    APP_NAME: z.string(),
    APP_DESCRIPTION: z.string(),
    LOGO_URL: z.string().url(),
    RESEND_API_TOKEN: z.string().min(1),
    NUXT_SESSION_PASSWORD: z.string().min(32),
    NUXT_STRIPE_SECRET_KEY: z.string().min(1),
    NUXT_STRIPE_WEBHOOK_SECRET: z.string().min(1),
  },
});