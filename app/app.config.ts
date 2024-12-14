import { desc } from "drizzle-orm";

export default defineAppConfig({
  ui: {
    icons: {
      loading: 'i-lucide-loader',
    },
    button: {
      slots: {
        base: ['cursor-pointer'],
      },
    },
    colors: {
      primary: 'indigo',
      neutral: 'zinc',
    },
  },
  seo: {
    title: 'Supersaas',
    description: 'The fullstack Nuxt 3 SaaS starter kit',
  }
})
