export default defineAppConfig({
  ui: {
    icons: {
      loading: 'i-lucide-loader-circle'
    },
    button: {
      slots: {
        base: 'cursor-pointer'
      }
    },
    colors: {
      primary: 'indigo',
      neutral: 'neutral'
    },
    dropdownMenu: {
      slots: {
        content: 'rounded-xl',
        itemLeadingIcon: 'size-4',
        itemTrailingIcon: 'size-4'
      },
    }
  },
  seo: {
    title: 'Supersaas',
    description: 'The fullstack Nuxt 3 SaaS starter kit'
  }
});
