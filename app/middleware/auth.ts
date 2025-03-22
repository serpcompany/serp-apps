import type { Team } from '@@/types/database'
import { getInvite } from '~~/server/database/queries/teams'
export default defineNuxtRouteMiddleware(async (to, from) => {
  const paramSlug =
    (Array.isArray(to.params.team) ? to.params.team[0] : to.params.team) || ''
  const toast = useToast()
  const { loggedIn } = useUserSession()
  const teams = useState<Team[]>('teams', () => [])
  const teamSlug = useState<string>('teamSlug')

  function handleTeamRedirect() {
    const { getLastUsedTeam, setLastUsedTeam } = useTeamPreferences()
    // Redirect to onboarding if no teams
    const memberships = teams.value
    const firstTeam = memberships[0]
    if (!firstTeam) {
      return navigateTo('/dashboard/onboard')
    }
    const lastTeamSlug = getLastUsedTeam()
    const targetTeam =
      memberships.find((team) => team.slug === lastTeamSlug) || firstTeam

    // Update last used team and redirect
    setLastUsedTeam(targetTeam.slug)
    return navigateTo(`/dashboard/${targetTeam.slug}`)
  }

  // Redirect to login if not logged in
  if (!loggedIn.value) {
    toast.add({
      title: 'You must be logged in to access this page',
      color: 'error',
    })
    if (teamSlug.value) teamSlug.value = ''
    if (teams.value.length) teams.value = []
    return navigateTo('/auth/login')
  }

  // Check for invite token, this means the user was not logged in or did not have an account when they clicked the verification link,
  // but now has successfully logged in or created an account and can verify the invite
  const inviteToken = useCookie('invite-token')
  if (inviteToken.value) {
    // Clear the cookies
    const inviteTokenStr = inviteToken.value
    inviteToken.value = null
    const inviteEmailCookie = useCookie('invite-email')
    if (inviteEmailCookie.value) inviteEmailCookie.value = null
    // Redirect if token still valid
    try {
      await getInvite(inviteTokenStr)
      return navigateTo(`/api/teams/verify-invite?token=${inviteTokenStr}`)
    } catch (error) {
      // Invalid token means user already verified it upon submitting registration
    }
  }

  // If teams aren't loaded yet, fetch them
  if (!teams.value?.length) {
    teams.value = await useTeam().getMemberships()
    if ((paramSlug || teamSlug.value) && !teams.value.length) {
      return handleTeamRedirect()
    }
  }

  // Redirect to onboarding or first available team
  if (
    to.fullPath === '/dashboard' ||
    to.fullPath === '/dashboard/' ||
    (teams.value.length && to.fullPath === '/dashboard/onboard')
  ) {
    return handleTeamRedirect()
  }

  // Validate that the team in the slug belongs to the user
  if (paramSlug && !teams.value.find((team) => team.slug === paramSlug)) {
    return handleTeamRedirect()
  } else if (paramSlug) {
    teamSlug.value = paramSlug
  }
})
