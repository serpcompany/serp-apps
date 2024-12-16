import { z } from 'zod'
import { toast } from 'vue-sonner'
import type { Team } from '@@/types/database.js'

export const schema = z.object({
  name: z.string().min(1, 'Team name is required'),
  logo: z.string().optional(),
})

export type TeamSchema = z.output<typeof schema>

const COOKIE_OPTIONS = {
  maxAge: 60 * 60 * 24 * 30, // 30 days
  path: '/',
} as const

export const useTeams = () => {
  const loading = ref(false)
  const selectedFile = ref<File | null>(null)
  const teams = useState<Team[]>('teams')
  const selectedTeamCookie = useCookie<string>('selectedTeam', COOKIE_OPTIONS)
  const state = reactive<Partial<TeamSchema>>({
    name: '',
    logo: '',
  })

  const setSelectedTeam = (teamId: string) => {
    selectedTeamCookie.value = teamId
  }

  const getAvatarUrl = (team?: Team): string => {
    if (!team?.name) return ''
    return team.logo
      ? `/images/${team.logo}`
      : `https://api.dicebear.com/9.x/glass/svg?seed=${team.name}`
  }

  const activeTeam = computed(() => {
    const selectedId = selectedTeamCookie.value
    return selectedId
      ? teams.value?.find((team) => team.id === selectedId) || teams.value?.[0]
      : teams.value?.[0]
  })

  const uploadLogo = async () => {
    if (!selectedFile.value) return

    const formData = new FormData()
    formData.append('image', selectedFile.value)

    try {
      const response = await $fetch('/api/teams/upload-logo', {
        method: 'POST',
        body: formData,
      })
      return response
    } catch (error: any) {
      toast.error('Failed to upload logo', {
        description: error?.data?.message || 'Failed to upload logo',
      })
      console.error(error)
    }
  }

  const createTeam = async (teamData: TeamSchema) => {
    try {
      loading.value = true

      if (selectedFile.value) {
        const logoPath = await uploadLogo()
        state.logo = logoPath
      }

      const newTeam = await $fetch<Team>('/api/teams', {
        method: 'POST',
        body: teamData,
      })

      teams.value?.push(newTeam)
      setSelectedTeam(newTeam.id)

      toast.success('Success', {
        description: 'Team created successfully',
      })

      return navigateTo('/dashboard')
    } catch (error: any) {
      toast.error(error?.message || 'Failed to create team')
    } finally {
      loading.value = false
    }
  }

  const getUserTeams = async () => {
    return await $fetch('/api/teams/user-teams')
  }

  const updateTeam = async (teamId: string, teamData: TeamSchema) => {
    try {
      loading.value = true

      if (selectedFile.value) {
        const logoPath = await uploadLogo()
        teamData.logo = logoPath
      }

      const updatedTeam = await $fetch<Team>(`/api/teams/${teamId}`, {
        method: 'PATCH',
        body: teamData,
      })

      // Update the teams state with the new data
      if (teams.value) {
        const teamIndex = teams.value.findIndex((t) => t.id === teamId)
        if (teamIndex !== -1) {
          teams.value[teamIndex] = updatedTeam
        }
      }

      toast.success('Success', {
        description: 'Team updated successfully',
      })
    } catch (error: any) {
      toast.error('Failed to update team', {
        description:
          error?.data?.message || 'An error occurred while updating the team',
      })
    } finally {
      loading.value = false
    }
  }

  const isTeamOwner = computed(() => activeTeam.value?.role === 'owner')

  const deleteTeam = async (teamId: string) => {
    try {
      loading.value = true

      await $fetch<Team>(`/api/teams/${teamId}`, {
        method: 'DELETE',
      })

      // Remove the team from the teams array
      if (teams.value) {
        teams.value = teams.value.filter((team) => team.id !== teamId)
      }

      // If we're deleting the active team, switch to the first available team
      if (activeTeam.value?.id === teamId && teams.value?.length) {
        setSelectedTeam(teams.value[0].id)
      }

      toast.success('Success', {
        description: 'Team deleted successfully',
      })

      return navigateTo('/dashboard')
    } catch (error: any) {
      toast.error('Failed to delete team', {
        description:
          error?.data?.message || 'An error occurred while deleting the team',
      })
    } finally {
      loading.value = false
    }
  }

  return {
    schema,
    state,
    loading,
    selectedFile,
    teams,
    activeTeam,
    selectedTeamCookie,
    isTeamOwner,
    createTeam,
    getUserTeams,
    getAvatarUrl,
    setSelectedTeam,
    updateTeam,
    deleteTeam,
  }
}
