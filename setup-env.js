// WIP

import { z } from 'zod'
import {
  intro,
  outro,
  text,
  confirm,
  select,
  spinner,
  multiselect,
  note,
} from '@clack/prompts'
import { promises as fs } from 'fs'

const envSchema = z.object({
  MOCK_EMAIL: z
    .string()
    .transform((val) => val === 'true')
    .pipe(z.boolean())
    .optional(),
  BASE_URL: z.string().url(),
  APP_NAME: z.string(),
  APP_DESCRIPTION: z.string(),
  LOGO_URL: z.string().url(),
  NUXT_OAUTH_GITHUB_CLIENT_ID: z.string().min(1).optional(),
  NUXT_OAUTH_GITHUB_CLIENT_SECRET: z.string().min(1).optional(),
  NUXT_OAUTH_GOOGLE_CLIENT_ID: z.string().min(1).optional(),
  NUXT_OAUTH_GOOGLE_CLIENT_SECRET: z.string().min(1).optional(),
  NUXT_OAUTH_X_CLIENT_ID: z.string().min(1).optional(),
  NUXT_OAUTH_X_CLIENT_SECRET: z.string().min(1).optional(),
  NUXT_SESSION_PASSWORD: z.string().min(32),
  STRIPE_SECRET_KEY: z.string().min(1).optional(),
  STRIPE_PUBLIC_KEY: z.string().min(1).optional(),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).optional(),
  LEMONSQUEEZY_SECRET_KEY: z.string().min(1).optional(),
  LEMONSQUEEZY_STORE_ID: z.string().min(1).optional(),
  LEMONSQUEEZY_WEBHOOK_SECRET: z.string().min(1).optional(),
  // Email related
  EMAIL_PROVIDER: z.enum([
    'resend',
    'mailgun',
    'sendgrid',
    'postmark',
    'plunk',
  ]),
  FROM_EMAIL: z.string().email(),
  RESEND_API_TOKEN: z.string().min(1).optional(),
  MAILGUN_API_KEY: z.string().min(1).optional(),
  MAILGUN_DOMAIN: z.string().min(1).optional(),
  POSTMARK_SERVER_TOKEN: z.string().min(1).optional(),
  SENDGRID_API_KEY: z.string().min(1).optional(),
  PLUNK_API_TOKEN: z.string().min(1).optional(),
  PAYMENT_PROVIDER: z.enum(['stripe', 'lemonsqueezy']),
  // Storage
  STORAGE_PROVIDER: z.enum(['s3', 'local', 'nuxthub']),
  S3_REGION: z.string().min(1).optional(),
  S3_ACCESS_KEY_ID: z.string().min(1).optional(),
  S3_ACCESS_KEY_ID: z.string().min(1).optional(),
  S3_SECRET_ACCESS_KEY: z.string().min(1).optional(),
  S3_BUCKET_NAME: z.string().min(1).optional(),
  S3_ENDPOINT: z.string().min(1).optional(),
  S3_PUBLIC_ACCESS_URL: z.string().min(1).optional(),
  NUXT_HUB_PROJECT_KEY: z.string().min(1).optional(),
  TWILIO_ACCOUNT_SID: z.string().min(1),
  TWILIO_AUTH_TOKEN: z.string().min(1),
  TWILIO_PHONE_NUMBER: z
    .string()
    .regex(
      /^\+[1-9]\d{1,14}$/,
      'Phone number must be in E.164 format (e.g. +12125551234)',
    ),
})

function createValidator(schema) {
  return (value) => {
    const result = schema.safeParse(value)
    return result.success ? undefined : result.error.errors[0].message
  }
}

async function createEnvForm() {
  const config = {}
  intro(`SuperSaaS - Environment Configuration Setup`)

  note(
    [
      'Hey, this setup wizard will help you configure the environment variables.',
      'Please note that this will override your existing .env file, so make sure you have a backup.',
      'You can find more about these options here: https://supersaas.dev/docs/environment-variables',
    ].join('\n'),
  )

  try {
    config.MOCK_EMAIL = await confirm({
      message: 'Enable mock email?',
      default: false,
    })

    config.BASE_URL = await text({
      message: 'Enter the base URL:',
      defaultValue: 'http://localhost:3000',
      validate: createValidator(envSchema.shape.BASE_URL),
    })

    config.APP_NAME = await text({
      message: 'Enter the application name:',
      validate: createValidator(envSchema.shape.APP_NAME),
    })

    config.APP_DESCRIPTION = await text({
      message: 'Describe your app in one line:',
      validate: createValidator(envSchema.shape.APP_DESCRIPTION),
    })

    config.LOGO_URL = await text({
      message: 'Enter the logo URL:',
      placeholder: 'You can configure this later',
      validate: createValidator(envSchema.shape.LOGO_URL),
    })

    const oauthProviders = await multiselect({
      message: 'Select OAuth providers to configure:',
      options: [
        { value: 'github', label: 'GitHub' },
        { value: 'google', label: 'Google' },
        { value: 'x', label: 'X / Twitter' },
      ],
      required: true,
      validate: (value) => {
        if (value.length === 0) return 'Select at least one provider'
      },
    })

    if (oauthProviders.includes('github')) {
      config.NUXT_OAUTH_GITHUB_CLIENT_ID = await text({
        message: 'Enter your GitHub OAuth Client ID:',
        validate: createValidator(envSchema.shape.NUXT_OAUTH_GITHUB_CLIENT_ID),
      })

      config.NUXT_OAUTH_GITHUB_CLIENT_SECRET = await text({
        message: 'Enter your GitHub OAuth Client Secret:',
        validate: createValidator(
          envSchema.shape.NUXT_OAUTH_GITHUB_CLIENT_SECRET,
        ),
      })
    }

    if (oauthProviders.includes('google')) {
      config.NUXT_OAUTH_GOOGLE_CLIENT_ID = await text({
        message: 'Enter your Google OAuth Client ID:',
        validate: createValidator(envSchema.shape.NUXT_OAUTH_GOOGLE_CLIENT_ID),
      })

      config.NUXT_OAUTH_GOOGLE_CLIENT_SECRET = await text({
        message: 'Enter your Google OAuth Client Secret:',
        validate: createValidator(
          envSchema.shape.NUXT_OAUTH_GOOGLE_CLIENT_SECRET,
        ),
      })
    }

    if (oauthProviders.includes('x')) {
      config.NUXT_OAUTH_X_CLIENT_ID = await text({
        message: 'Enter your X OAuth Client ID:',
        validate: createValidator(envSchema.shape.NUXT_OAUTH_X_CLIENT_ID),
      })

      config.NUXT_OAUTH_X_CLIENT_SECRET = await text({
        message: 'Enter your X OAuth Client Secret:',
        validate: createValidator(envSchema.shape.NUXT_OAUTH_X_CLIENT_SECRET),
      })
    }

    config.NUXT_SESSION_PASSWORD = await text({
      message: 'Enter your session password (min 32 chars):',
      validate: createValidator(envSchema.shape.NUXT_SESSION_PASSWORD),
    })

    config.EMAIL_PROVIDER = await select({
      message: 'Select your email provider:',

      options: [
        { value: 'none', label: 'Skip Email Configuration' },
        { value: 'resend', label: 'Resend' },
        { value: 'mailgun', label: 'Mailgun' },
        { value: 'sendgrid', label: 'SendGrid' },
        { value: 'postmark', label: 'Postmark' },
        { value: 'plunk', label: 'Plunk' },
      ],
    })

    if (config.EMAIL_PROVIDER !== 'none') {
      config.FROM_EMAIL = await text({
        message: 'Enter the from email address:',
        validate: createValidator(envSchema.shape.FROM_EMAIL),
      })

      if (config.EMAIL_PROVIDER === 'resend') {
        config.RESEND_API_TOKEN = await text({
          message: 'Enter your Resend API token:',
          validate: createValidator(envSchema.shape.RESEND_API_TOKEN),
        })
      }

      if (config.EMAIL_PROVIDER === 'mailgun') {
        config.MAILGUN_API_KEY = await text({
          message: 'Enter your Mailgun API key:',
          validate: createValidator(envSchema.shape.MAILGUN_API_KEY),
        })
        config.MAILGUN_DOMAIN = await text({
          message: 'Enter your Mailgun domain:',
          validate: createValidator(envSchema.shape.MAILGUN_DOMAIN),
        })
      }

      if (config.EMAIL_PROVIDER === 'plunk') {
        config.PLUNK_API_TOKEN = await text({
          message: 'Enter your Plunk API token:',
          validate: createValidator(envSchema.shape.PLUNK_API_TOKEN),
        })
      }

      if (config.EMAIL_PROVIDER === 'postmark') {
        config.POSTMARK_SERVER_TOKEN = await text({
          message: 'Enter your Postmark server token:',
          validate: createValidator(envSchema.shape.POSTMARK_SERVER_TOKEN),
        })
      }

      if (config.EMAIL_PROVIDER === 'sendgrid') {
        config.SENDGRID_API_KEY = await text({
          message: 'Enter your SendGrid API key:',
          validate: createValidator(envSchema.shape.SENDGRID_API_KEY),
        })
      }
    }

    config.STORAGE_PROVIDER = await select({
      message: 'Select your storage provider:',

      options: [
        { value: 'none', label: 'Skip Storage Configuration' },
        { value: 's3', label: 'AWS S3' },
        { value: 'local', label: 'Local' },
        { value: 'nuxthub', label: 'NuxtHub' },
      ],
    })

    if (config.STORAGE_PROVIDER !== 'none') {
      if (config.STORAGE_PROVIDER === 's3') {
        config.S3_REGION = await text({
          message: 'Enter your S3 region:',
          validate: createValidator(envSchema.shape.S3_REGION),
        })

        config.S3_ACCESS_KEY_ID = await text({
          message: 'Enter your S3 access key ID:',
          validate: createValidator(envSchema.shape.S3_ACCESS_KEY_ID),
        })

        config.S3_SECRET_ACCESS_KEY = await text({
          message: 'Enter your S3 secret access key:',
          validate: createValidator(envSchema.shape.S3_SECRET_ACCESS_KEY),
        })

        config.S3_BUCKET_NAME = await text({
          message: 'Enter your S3 bucket name:',
          validate: createValidator(envSchema.shape.S3_BUCKET_NAME),
        })

        config.S3_ENDPOINT = await text({
          message: 'Enter your S3 endpoint:',
          validate: createValidator(envSchema.shape.S3_ENDPOINT),
        })

        config.S3_PUBLIC_ACCESS_URL = await text({
          message: 'Enter your S3 public access URL:',
          validate: createValidator(envSchema.shape.S3_PUBLIC_ACCESS_URL),
        })
      }

      if (config.STORAGE_PROVIDER === 'nuxthub') {
        config.NUXT_HUB_PROJECT_KEY = await text({
          message: 'Enter your NuxtHub project key',
          validate: createValidator(envSchema.shape.NUXT_HUB_PROJECT_KEY),
        })
      }
    }

    const setupPayment = await confirm({
      message: 'Would you like to setup a payment provider?',
    })

    if (setupPayment) {
      config.PAYMENT_PROVIDER = await select({
        message: 'Select your payment provider:',
        options: [
          { value: 'stripe', label: 'Stripe' },
          { value: 'lemonsqueezy', label: 'LemonSqueezy' },
        ],
      })

      if (config.PAYMENT_PROVIDER === 'stripe') {
        config.STRIPE_SECRET_KEY = await text({
          message: 'Enter your Stripe secret key:',
          validate: createValidator(envSchema.shape.STRIPE_SECRET_KEY),
          validate: createValidator(envSchema.shape.STRIPE_SECRET_KEY),
        })

        config.STRIPE_PUBLIC_KEY = await text({
          message: 'Enter your Stripe public key:',
          validate: createValidator(envSchema.shape.STRIPE_PUBLIC_KEY),
        })

        config.STRIPE_WEBHOOK_SECRET = await text({
          message: 'Enter your Stripe webhook secret:',
          validate: createValidator(envSchema.shape.STRIPE_WEBHOOK_SECRET),
        })
      } else {
        config.LEMONSQUEEZY_SECRET_KEY = await text({
          message: 'Enter your LemonSqueezy secret key:',
          validate: createValidator(envSchema.shape.LEMONSQUEEZY_SECRET_KEY),
        })

        config.LEMONSQUEEZY_STORE_ID = await text({
          message: 'Enter your LemonSqueezy store ID:',
          validate: createValidator(envSchema.shape.LEMONSQUEEZY_STORE_ID),
        })

        config.LEMONSQUEEZY_WEBHOOK_SECRET = await text({
          message: 'Enter your LemonSqueezy webhook secret:',
          validate: createValidator(
            envSchema.shape.LEMONSQUEEZY_WEBHOOK_SECRET,
          ),
        })
      }
    }

    const setupTwilio = await confirm({
      message: 'Would you like to setup Twilio?',
    })

    if (setupTwilio) {
      config.TWILIO_ACCOUNT_SID = await text({
        message: 'Enter your Twilio Account SID:',
        validate: createValidator(envSchema.shape.TWILIO_ACCOUNT_SID),
      })

      config.TWILIO_AUTH_TOKEN = await text({
        message: 'Enter your Twilio Auth Token:',
        validate: createValidator(envSchema.shape.TWILIO_AUTH_TOKEN),
      })

      config.TWILIO_PHONE_NUMBER = await text({
        message: 'Enter your Twilio Phone Number (E.164 format):',
        validate: createValidator(envSchema.shape.TWILIO_PHONE_NUMBER),
      })
    }

    const s = spinner()
    s.start('Creating .env file')

    const envContent = Object.entries(config)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n')

    await fs.writeFile('.env', envContent)

    outro('✨ Configuration completed successfully!')
  } catch (error) {
    outro('Configuration failed. Please try again.')
    process.exit(1)
  }
}

createEnvForm()
