import { z } from 'zod'
import type { Team } from '@@/types/database'

export const useTeam = () => {
  const toast = useToast()
  const teamSchema = z.object({
    name: z.string().min(1, 'Team name is required'),
    logo: z.string().optional(),
    slug: z
      .string()
      .min(1, 'Team slug is required')
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        'Only lowercase letters, numbers, and single hyphens between characters allowed',
      ),
  })
  const teamSlug = useRoute().params.team as string
  const loading = ref(false)
  const teams = useState<Team[]>('teams')
  const currentTeam = computed(() =>
    teams.value.find((team) => team.slug === teamSlug),
  )

  const createTeam = async (teamData: z.infer<typeof teamSchema>) => {
    loading.value = true
    try {
      const newTeam = await $fetch<Team>('/api/teams', {
        method: 'POST',
        body: teamData,
      })
      toast.add({
        title: 'Team created successfully',
        color: 'success',
      })
      return newTeam
    } catch (error) {
      toast.add({
        title: 'Failed to create team',
        description: (error as any).statusMessage,
        color: 'error',
      })
      throw error
    } finally {
      loading.value = false
    }
  }

  const updateTeam = async (
    teamId: string,
    teamData: Partial<z.infer<typeof teamSchema>>,
  ) => {
    loading.value = true
    try {
      const updatedTeam = await $fetch<Team>(`/api/teams/${teamId}`, {
        method: 'PATCH',
        body: teamData,
      })
      teams.value = teams.value.map((team) =>
        team.id === teamId ? updatedTeam : team,
      )
      toast.add({
        title: 'Team updated successfully',
        color: 'success',
      })
      return updatedTeam
    } catch (error) {
      toast.add({
        title: 'Failed to update team',
        description: (error as any).statusMessage,
        color: 'error',
      })
      throw error
    } finally {
      loading.value = false
    }
  }

  const deleteTeam = async (teamId: string) => {
    loading.value = true
    try {
      await $fetch(`/api/teams/${teamId}`, { method: 'DELETE' })
      teams.value = teams.value.filter((team) => team.id !== teamId)
      toast.add({
        title: 'Team deleted successfully',
        color: 'success',
      })
    } catch (error) {
      toast.add({
        title: 'Failed to delete team',
        description: (error as any).statusMessage,
        color: 'error',
      })
      throw error
    } finally {
      loading.value = false
    }
  }

  const inviteMember = async (email: string) => {
    loading.value = true
    try {
      await $fetch(`/api/teams/${currentTeam?.value?.id}/members`, {
        method: 'POST',
        body: { email },
      })
    } catch (error) {
      toast.add({
        title: 'Failed to invite member',
        description: (error as any).statusMessage,
        color: 'error',
      })
      throw error
    } finally {
      loading.value = false
    }
  }

  const cancelInvite = async (inviteId: string) => {
    loading.value = true
    try {
      await $fetch(`/api/teams/${currentTeam?.value?.id}/invites/${inviteId}`, {
        method: 'DELETE',
      })
      toast.add({
        title: 'Invite cancelled successfully',
        color: 'success',
      })
    } catch (error) {
      toast.add({
        title: 'Failed to cancel invite',
        description: (error as any).statusMessage,
        color: 'error',
      })
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    createTeam,
    updateTeam,
    deleteTeam,
    inviteMember,
    cancelInvite,
    teamSchema,
    currentTeam,
    teams,
  }
}
