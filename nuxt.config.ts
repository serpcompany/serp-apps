import './env'
import vue from '@vitejs/plugin-vue'

export default defineNuxtConfig({
  modules: ['@nuxthub/core', '@nuxt/ui', '@vueuse/nuxt', 'nuxt-auth-utils'],
  colorMode: {
    preference: 'system',
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
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
  auth: {
    webAuthn: true,
  },
  nitro: {
    rollupConfig: {
      // @ts-expect-error - Rollup plugin type definitions are incomplete for vue plugin
      plugins: [vue()],
    },
  },
  hub: {
    database: true,
    blob: true,
    kv: true,
  },
  vite: {
    server: {
      allowedHosts:['local.supersaas.dev']
    }
  }
})
