import { z } from 'zod'
import { toast } from 'vue-sonner'

export const usePasskeys = () => {
  const creating = ref(false)
  const deleting = ref<string | null>(null)
  
  const { register, authenticate } = useWebAuthn({
    registerEndpoint: '/api/auth/webauthn/link-passkey',
    authenticateEndpoint: '/api/auth/webauthn/authenticate'
  })

  const {
    data: passkeys,
    status,
    refresh
  } = useFetch('/api/auth/webauthn/linked-passkeys', {
    server: false,
    lazy: true,
  })

  const createPasskey = async (userName: string, displayName: string) => {
    try {
      creating.value = true
      await register({ userName, displayName })
      await refresh()
      toast.success('Passkey added successfully')
      return true
    } catch (error: any) {
      toast.error(error.data?.message || error.message)
      return false
    } finally {
      creating.value = false
    }
  }

  const deletePasskey = async (id: string) => {
    try {
      deleting.value = id
      await $fetch('/api/auth/webauthn/delete-passkey', {
        method: 'DELETE',
        body: { id },
      })
      await refresh()
      toast.success('Passkey deleted successfully')
      return true
    } catch (error: any) {
      toast.error(error.data?.statusMessage || 'Failed to delete passkey')
      return false
    } finally {
      deleting.value = null
    }
  }

  const authenticateWithPasskey = async (email: string) => {
    try {
      await authenticate(email)
      return true
    } catch (error: any) {
      toast.error(error.data?.message || 'Failed to authenticate with passkey')
      return false
    }
  }

  return {
    passkeys,
    status,
    creating,
    deleting,
    createPasskey,
    deletePasskey,
    authenticateWithPasskey
  }
}
