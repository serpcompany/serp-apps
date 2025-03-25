<template>
  <div class="flex h-dvh min-w-0 flex-col">
    <AppAiChatHeader
      :title="newTitle ?? conversationWithMessages?.title ?? 'New Chat'"
    >
      <template #actions>
        <div class="flex items-center gap-2">
          <UTooltip text="New Chat" :delay-duration="0">
            <UButton
              icon="i-lucide-square-pen"
              variant="soft"
              color="neutral"
              :ui="{ leadingIcon: 'size-4' }"
            />
          </UTooltip>
          <UTooltip text="Share Chat Publicly" :delay-duration="0">
            <UButton
              icon="i-lucide-upload"
              variant="soft"
              color="neutral"
              :ui="{ leadingIcon: 'size-4' }"
            />
          </UTooltip>
          <UTooltip text="Delete Chat" :delay-duration="0">
            <UButton
              icon="i-lucide-trash-2"
              variant="soft"
              color="neutral"
              :ui="{ leadingIcon: 'size-4' }"
            />
          </UTooltip>
        </div>
      </template>
    </AppAiChatHeader>
    <AppAiChatMessagesList
      :messages="messages as UIMessage[]"
      :loading="isLoading"
    />
    <div class="h-4" />
    <div class="mx-auto flex w-full gap-2 px-4 pb-4 md:max-w-3xl md:pb-4">
      <AppAiChatInputBox
        :loading="isLoading"
        @stop="stop"
        @submit="
          ({ message, model }) => {
            input = message
            selectedModel = model
            handleSubmit()
          }
        "
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useChat, type UIMessage } from '@ai-sdk/vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, computed } from 'vue'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
}

const { currentTeam } = useTeam()
const { selectedModel } = useAiChat()

const route = useRoute()
const router = useRouter()

const body = computed(() => ({
  model: selectedModel.value,
  conversationId: route.params.id,
}))

const { data: conversationWithMessages } = await useFetch<Conversation>(
  `/api/teams/${currentTeam.value.id}/ai-chat/${route.params.id}`,
)

const { messages, input, handleSubmit, error, reload, stop, isLoading } =
  useChat({
    api: `/api/teams/${currentTeam.value.id}/ai-chat/chat`,
    body,
    initialMessages: conversationWithMessages.value?.messages.map(
      (msg: Message) => ({
        id: msg.id,
        content: msg.content,
        role: msg.role,
      }),
    ),
    initialInput: route.query.firstMessage as string,
    onFinish: async () => {
      if (messages.value.length === 2) {
        const updatedTitle = await $fetch(
          `/api/teams/${currentTeam.value.id}/ai-chat/update-title`,
          {
            method: 'PATCH',
            body: {
              chatId: route.params.id,
              initialMessage: messages.value[0]?.content,
            },
          },
        )
        updateConversationTitle(updatedTitle)
      }
    },
  })
const newTitle = ref<string | null>(null)
function updateConversationTitle(updatedTitle: string) {
  newTitle.value = updatedTitle
}

onMounted(async () => {
  if (route.query.firstMessage) {
    selectedModel.value = route.query.model as string
    await handleSubmit()
    await router.replace({
      query: {
        model: undefined,
        firstMessage: undefined,
      },
    })
  }
})
</script>
