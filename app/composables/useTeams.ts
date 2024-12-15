import { z } from 'zod'
import { toast } from 'vue-sonner'

export const schema = z.object({
  name: z.string().min(1, 'Team name is required'),
  logo: z.string().optional(),
})

export type TeamSchema = z.output<typeof schema>

export const useTeams = () => {
  const loading = ref(false)
  const selectedFile = ref<File | null>(null)
  const state = reactive<Partial<TeamSchema>>({
    name: '',
    logo: '',
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
    } catch (error) {
      toast.error('Failed to upload logo', {
        description: error.data.message,
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

      await $fetch('/api/teams', {
        method: 'POST',
        body: teamData,
      })

      toast.success('Success', {
        description: 'Team created successfully',
      })

      return navigateTo('/dashboard/teams')
    } catch (error) {
      toast.error(error.message || 'Failed to create team')
    } finally {
      loading.value = false
    }
  }

  const getUserTeams = async () => {
    return await $fetch('/api/teams/user-teams')
  }

  return {
    schema,
    state,
    loading,
    selectedFile,
    createTeam,
    getUserTeams,
  }
}
