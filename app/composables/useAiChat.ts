import type {
  Conversation,
} from '@@/types/database'

export const useAiChat = () => {
  const { currentTeam } = useTeam()
  const loading = ref(false)
  const messageText = ref('')
  const selectedModel = ref('gpt-4o-mini')
  const toast = useToast()
  const models = ref([
    {
      label: 'GPT-4o Mini',
      value: 'gpt-4o-mini',
      icon: 'i-simple-icons-openai',
    },
    {
      label: 'Gemini 2.0 Flash',
      value: 'gemini-2.0-flash',
      icon: 'i-simple-icons-googlegemini',
    },
    {
      label: 'Claude 3.5 Sonnet',
      value: 'claude-3.5-sonnet',
      icon: 'i-logos-claude-icon',
      disabled: true,
    },
    {
      label: 'Mistral Small',
      value: 'mistral-small-latest',
      icon: 'i-logos-mistral-ai-icon',
    },
  ])

  const selectedModelIcon = computed(() => {
    return models.value.find((model) => model.value === selectedModel.value)
      ?.icon
  })

  const startChat = async ({ message, model }: { message: string, model: string }) => {
    try {
      loading.value = true
      const newChat = await $fetch<Conversation>(
        `/api/teams/${currentTeam.value.id}/ai-chat`,
        {
          method: 'POST',
          body: {
            model,
          },
        },
      )
      navigateTo(
        `/dashboard/${currentTeam.value.slug}/ai-chat/${newChat.id}?firstMessage=${message}&model=${model}`,
      )
    } catch (error) {
      toast.add({
        title: 'Error',
        description: 'Failed to start chat',
        color: 'error',
      })
      console.error(error)
      loading.value = false
    }
  }

  const greeting = computed(() => {
    const time = new Date()
    const hours = time.getHours()
    if (hours < 12) {
      return 'Good morning'
    } else if (hours < 18) {
      return 'Good afternoon'
    } else {
      return 'Good evening'
    }
  })

  const handleStarterMessageSelect = (message: string) => {
    messageText.value = message
  }

  return {
    messageText,
    selectedModel,
    models,
    selectedModelIcon,
    greeting,
    loading,
    startChat,
    handleStarterMessageSelect,
  }
}
