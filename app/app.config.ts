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
})
