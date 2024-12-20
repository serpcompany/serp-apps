import { z } from 'zod'
import type { User } from '@@/types/database'
import { toast } from 'vue-sonner'

export const useUserAccount = () => {
  const loading = ref(false)
  const schema = z.object({
    avatarUrl: z.string().optional(),
    name: z.string().min(1),
  })

  const passwordSchema = z.object({
    password: z.string().min(8),
  })

  const updateUser = async (userData: Partial<z.infer<typeof schema>>) => {
    loading.value = true
    try {
      await $fetch<User>('/api/me', {
        method: 'PATCH',
        body: userData,
      })
      toast.success('Your account has been updated successfully')
    } catch (error) {
      console.error(error)
      toast.error('Failed to update your account')
    } finally {
      loading.value = false
    }
  }

  const updatePassword = async (password: string) => {
    loading.value = true
    try {
      await $fetch('/api/me/update-password', {
        method: 'POST',
        body: { password },
      })
      toast.success('Your password has been updated successfully')
    } catch (error) {
      console.error(error)
      toast.error('Failed to update your password')
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    updateUser,
    updatePassword,
    schema,
    passwordSchema,
  }
}
