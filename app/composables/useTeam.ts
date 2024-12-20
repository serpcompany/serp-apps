import { z } from 'zod'
import type { Team } from '@@/types/database'
import { toast } from 'vue-sonner'

export const useTeam = () => {
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
      toast.success('Team created successfully')
      return newTeam
    } catch (error) {
      toast.error((error as any).statusMessage || 'Failed to create team')
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
      toast.success('Team updated successfully')
      return updatedTeam
    } catch (error) {
      toast.error((error as any).statusMessage || 'Failed to update team')
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
      toast.success('Team deleted successfully')
    } catch (error) {
      toast.error('Failed to delete team')
      throw error
    }
  }

  return {
    loading,
    createTeam,
    updateTeam,
    deleteTeam,
    teamSchema,
    currentTeam,
    teams,
  }
}
