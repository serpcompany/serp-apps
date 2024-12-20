export default defineNuxtRouteMiddleware(async (to) => {
  // Only run this middleware for the dashboard root path
  if (to.path !== '/dashboard' && to.path !== '/dashboard/') {
    return
  }

  try {
    const { data: memberships } = await useFetch('/api/me/memberships')

    // Handle case when no memberships exist
    if (!memberships.value?.length) {
      return navigateTo('/dashboard/onboard')
    }

    const { getLastUsedTeam, setLastUsedTeam } = useTeamPreferences()
    const lastTeamSlug = getLastUsedTeam()

    // Find the last used team or fallback to first team
    const defaultTeam =
      memberships.value.find((team) => team.slug === lastTeamSlug) ??
      memberships.value[0]

    // Safety check - should never happen if API is working correctly
    if (!defaultTeam) {
      throw createError({
        statusCode: 500,
        message: 'No team found despite having memberships',
      })
    }

    setLastUsedTeam(defaultTeam.slug)
    return navigateTo(`/dashboard/${defaultTeam.slug}`)
  } catch (error) {
    console.error('Error in onboard middleware:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to process team information',
    })
  }
})
