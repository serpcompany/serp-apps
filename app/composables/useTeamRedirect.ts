import type { Team } from '@@/types/database'

export function useTeamRedirect() {
  const teams = useState<Team[]>('teams')
  const { getLastUsedTeam, setLastUsedTeam } = useTeamPreferences()

  const handleTeamRedirect = async (checkInvite = true) => {
    // Check for invite token if requested
    if (checkInvite) {
      const inviteToken = useCookie('invite-token')
      if (inviteToken.value) {
        const url = `/api/teams/verify-invite?token=${inviteToken.value}`
        inviteToken.value = null
        return await navigateTo(url)
      }
    }

    // Redirect to onboarding if no teams
    if (!teams.value?.length) {
      return await navigateTo('/dashboard/onboard')
    }

    const lastTeamSlug = getLastUsedTeam()
    const targetTeam =
      teams.value.find((team) => team.slug === lastTeamSlug) ?? teams.value[0]

    if (!targetTeam) {
      throw createError('No team found despite having memberships')
    }

    // Update last used team and redirect
    setLastUsedTeam(targetTeam.slug)
    return await navigateTo(`/dashboard/${targetTeam.slug}`)
  }

  return {
    handleTeamRedirect,
  }
}
