<template>
  <ul
    class="flex min-w-0 flex-1 flex-col-reverse gap-6 overflow-y-auto scroll-smooth pt-4"
  >
    <li
      v-for="message in messages"
      :key="message.id"
      class="group/message mx-auto w-full max-w-3xl px-4"
      :data-role="message.role"
    >
      <AppChatMessageBubble :message="message" :preview="preview" />
    </li>
  </ul>
  <div
    v-if="isMessageLoading"
    class="mx-auto flex w-full max-w-3xl items-center gap-4 px-4"
  >
    <UIcon name="i-lucide-loader" class="animate-spin" />
    <p>AI is thinking...</p>
  </div>
  <div class="min-h-[24px] min-w-[24px] shrink-0"></div>
</template>

<script setup lang="ts">
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

defineProps<{
  messages: Message[]
  preview?: boolean
}>()

const isMessageLoading = useState('isMessageLoading')
</script>
