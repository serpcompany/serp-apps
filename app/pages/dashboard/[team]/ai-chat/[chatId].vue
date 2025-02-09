<template>
  <AppContainer :title="chat?.title ?? 'Untitled Chat'" :padding="false">
    <div class="flex h-[calc(100dvh-3rem)] w-full min-w-0 flex-col break-words">
      <AppChatMessagesList :messages="[...messages].reverse()" />
      <div class="mx-auto flex w-full gap-2 px-4 pb-4 md:max-w-3xl md:pb-6">
        <form
          class="relative flex w-full flex-col gap-4"
          @submit.prevent="handleSubmit"
        >
          <UTextarea
            v-model="input"
            placeholder="Type something..."
            color="neutral"
            variant="subtle"
            class="w-full"
            :rows="2"
            :max-rows="12"
            size="xl"
            :autoresize="true"
            :ui="{
              base: 'rounded-xl resize-none pb-12 md:text-sm',
            }"
            @keydown.enter.prevent="handleKeyDown"
          />
          <!-- // for future implementation - image attachments -->
          <UButton
            type="button"
            color="neutral"
            variant="subtle"
            icon="i-lucide-image-plus"
            class="absolute bottom-2 left-2 rounded-full"
          />
          <UButton
            v-if="!isLoading"
            type="submit"
            color="neutral"
            variant="solid"
            icon="i-lucide-arrow-up"
            class="absolute right-2 bottom-2 rounded-full"
            :disabled="!input || isLoading"
            :ui="{ base: 'disabled:opacity-20' }"
          />
          <UButton
            v-if="isLoading"
            type="button"
            color="neutral"
            variant="solid"
            icon="i-lucide-square"
            class="absolute right-2 bottom-2 rounded-full"
            @click="stop()"
          />
        </form>
      </div>
    </div>
  </AppContainer>
</template>

<script lang="ts" setup>
import type { Chat, Message } from '@@/types/database'
type ChatWithMessages = Chat & { messages: Message[] }
import { useChat } from '@ai-sdk/vue'
const { chatId } = useRoute().params
const { saveMessage } = useAiChat()

const { data: chat } = await useFetch<ChatWithMessages>(
  `/api/ai-chat/${chatId}`,
)

const { messages, input, handleSubmit, isLoading, stop } = useChat({
  api: '/api/ai-chat/message',
  initialMessages: chat.value?.messages ?? [],
  onFinish(message) {
    saveMessage(message, chatId)
  },
  body: {
    chatId,
  },
})

const handleKeyDown = (e: KeyboardEvent) => {
  // Allow new lines with Shift+Enter
  if (e.shiftKey) {
    return
  }

  // Submit on Enter
  handleSubmit()
}
</script>
