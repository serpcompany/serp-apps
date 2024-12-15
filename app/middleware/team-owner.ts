import { toast } from 'vue-sonner'
export default defineNuxtRouteMiddleware(() => {
  const { isTeamOwner } = useTeams()
  // If user is not the owner, redirect to team dashboard
  if (!isTeamOwner) {
    toast.error('You are not authorized to access this page')
    return navigateTo(`/dashboard`, {
      replace: true,
    })
  }
})
