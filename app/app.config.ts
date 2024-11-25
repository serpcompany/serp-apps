export default defineAppConfig({
  ui: {
    icons: {
      loading: 'i-lucide-loader-circle',
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
