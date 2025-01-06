import type { Team } from '@@/types/database'
export default defineNuxtRouteMiddleware(async (to, from) => {
  const toast = useToast()
  const { loggedIn } = useUserSession()
  const teams = useState<Team[]>('teams')

  // Is user logged in?
  if (!loggedIn.value) {
    return navigateTo('/auth/login')
  }

  // If teams aren't loaded yet, fetch them
  if (!teams.value) {
    const { data: memberships } = await useFetch<Team[]>('/api/me/memberships')
    teams.value = memberships.value || []
  }

  // Get team slug from route parameter
  const teamSlug = to.params.team as string
  const currentTeam = teams.value?.find((team) => team.slug === teamSlug)

  if (!currentTeam) {
    toast.add({
      title: 'Team not found',
      color: 'error',
    })
    return navigateTo('/dashboard')
  }

  const { isTeamOwner } = useTeam()
  if (!isTeamOwner.value) {
    toast.add({
      title: 'Unauthorized Access',
      color: 'error',
    })
    return navigateTo('/dashboard')
  }
})
