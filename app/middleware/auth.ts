export default defineNuxtRouteMiddleware(() => {
  const toast = useToast()
  const { loggedIn } = useUserSession()

  // Redirect to login if not logged in
  if (!loggedIn.value) {
    toast.add({
      title: 'You must be logged in to access this page',
      color: 'error',
    })

    return navigateTo('/auth/login')
  }
})
