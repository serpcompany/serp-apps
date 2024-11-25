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
})
