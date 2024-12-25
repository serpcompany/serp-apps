export default defineNuxtRouteMiddleware((to, from) => {
  const toast = useToast()
  const { loggedIn } = useUserSession()
  if (!loggedIn.value) {
    toast.add({
      title: 'You must be logged in to access this page',
      color: 'error',
    })
    return navigateTo('/auth/login')
  }
})
