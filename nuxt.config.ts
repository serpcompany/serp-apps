import './env'
import vue from '@vitejs/plugin-vue'

export default defineNuxtConfig({
  modules: [
    '@nuxthub/core',
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-auth-utils',
    'nuxthub-ratelimit',
    '@nuxt/eslint',
    '@formkit/auto-animate/nuxt',
    '@nuxtjs/mdc',
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'system',
  },
  // Used by the AI Chat to highlight code
  mdc: {
    headings: {
      anchorLinks: false,
    },
    highlight: {
      langs: [
        'ts',
        'js',
        'html',
        'css',
        'json',
        'md',
        'yaml',
        'bash',
        'css',
        'py',
        'tsx',
        'jsx',
        'go',
        'rust',
        'java',
        'kotlin',
        'swift',
        'csharp',
      ],
    },
  },
  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY,
    googleApiKey: process.env.GOOGLE_GEMINI_API_KEY,
    mistralApiKey: process.env.MISTRAL_API_KEY,
    fromEmail: process.env.FROM_EMAIL,
    emailProvider: process.env.EMAIL_PROVIDER,
    // @ts-expect-error - We're just extending the type
    session: {
      maxAge: 60 * 60 * 24 * 7, // Session expires after 7 days - change it accordingly
    },
    public: {
      host: process.env.BASE_URL,
    },
  },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-07-30',
  nitro: {
    rollupConfig: {
      // @ts-expect-error - Rollup plugin type definitions are incomplete for vue plugin
      plugins: [vue()],
    },
    experimental: {
      tasks: true,
    },
  },
  hub: {
    database: true,
    blob: true,
    kv: true,
    cache: true,
  },
  auth: {
    webAuthn: true,
  },
  eslint: {
    config: {
      standalone: true,
      typescript: {
        strict: false,
      },
      stylistic: {
        indent: 2,
        semi: false,
        quotes: 'single',
        commaDangle: 'always-multiline',
      },
    },
  },
  fonts: {
    families: [
      {
        name: 'Geist',
        provider: 'google',
        weights: ['400', '500', '600', '700', '800'],
      },
      {
        name: 'Cal Sans',
        provider: 'google',
        weights: ['400'],
      },
    ],
  },
  nuxtHubRateLimit: {
    routes: {
      '/api/auth/*': {
        maxRequests: 15,
        intervalSeconds: 60, // Minimum 60 seconds due to NuxtHub KV TTL limitation
      },
      '/api/**': {
        maxRequests: 150,
        intervalSeconds: 60, // Minimum 60 seconds due to NuxtHub KV TTL limitation
      },
    },
  },
})
