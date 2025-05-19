import vue from '@vitejs/plugin-vue';
import './env';

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxt/ui', '@nuxt/eslint', '@vueuse/nuxt', 'nuxt-auth-utils', '@nuxthub/core'],

  css: ['~/assets/css/main.css'],

  future: {
    compatibilityVersion: 4
  },

  fonts: {
    families: [
      {
        name: 'Geist',
        provider: 'google',
        weights: ['400', '500', '600', '700', '800']
      }
    ]
  },
  auth: {
    webAuthn: true
  },
  icon: {
    customCollections: [
      {
        prefix: 'custom',
        dir: './app/assets/icons'
      }
    ]
  },
  hub: {
    database: true,
    blob: true
  },
  nitro: {
    preset: 'cloudflare-pages',
    rollupConfig: {
      // @ts-expect-error - Rollup plugin type definitions are incomplete for vue plugin
      plugins: [vue()]
    }
  },
  compatibilityDate: '2024-11-27'
});
