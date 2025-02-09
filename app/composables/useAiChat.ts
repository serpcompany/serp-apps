import type { InsertChat, InsertMessage, Chat } from '@@/types/database'

export const useAiChat = () => {
  const { user } = useUserSession()
  const { currentTeam } = useTeam()
  const toast = useToast()
  const loading = ref(false)

  const createChat = async () => {
    loading.value = true
    try {
      if (!currentTeam.value?.id || !user.value?.id) {
        throw createError('Team or user not found')
      }

      const chat: InsertChat = {
        teamId: currentTeam.value.id,
        userId: user.value.id,
        title: 'New Untitled Chat',
      }

      const response = await $fetch<Chat>('/api/ai-chat', {
        method: 'POST',
        body: chat,
      })

      return navigateTo(
        `/dashboard/${currentTeam.value.slug}/ai-chat/${response.id}`,
      )
    } catch (error) {
      console.error(error)
      toast.add({
        title: 'Error',
        description: 'Failed to create chat',
        color: 'error',
      })
    } finally {
      loading.value = false
    }
  }

  const saveMessage = async (
    message: Partial<InsertMessage>,
    chatId: string,
  ) => {
    await $fetch('/api/ai-chat/save-message', {
      method: 'POST',
      body: {
        message,
        chatId,
      },
    })
  }

  return {
    loading,
    createChat,
    saveMessage,
  }
}
