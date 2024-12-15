export default defineNuxtRouteMiddleware(async (to) => {
  // Only fetch teams if we're not already heading to the new team page
  if (to.path !== '/dashboard/teams/new') {
    const nuxtApp = useNuxtApp()
    
    const { data: teams } = await useFetch('/api/teams/user-teams', {
      key: 'user-teams',
      getCachedData(key) {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
      }
    })

    // If there are no teams, redirect to create team page
    if (!teams.value || teams.value.length === 0) {
      return navigateTo('/dashboard/teams/new')
    }

    // Store teams in state for use in components
    useState('teams', () => teams.value)
  }
})
