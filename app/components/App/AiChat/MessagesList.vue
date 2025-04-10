<template>
  <ScrollAreaRoot class="relative flex min-w-0 flex-1 overflow-hidden">
    <ScrollAreaViewport ref="chatContainer" class="h-full w-full">
      <ul class="flex flex-col-reverse pt-4">
        <li
          v-for="message in [...messages].reverse()"
          :key="message.id"
          class="mx-auto w-full max-w-3xl px-4 [&:first-child[data-role='assistant']_.action-buttons]:!opacity-100"
          :data-role="message.role"
        >
          <AppAiChatMessageBubble :message="message" :preview="preview" />
        </li>
      </ul>
    </ScrollAreaViewport>

    <ScrollAreaScrollbar
      class="z-20 flex touch-none rounded-full p-0.5 select-none hover:bg-neutral-200 data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col data-[orientation=vertical]:w-2.5 dark:bg-neutral-800 dark:hover:bg-neutral-700"
      orientation="vertical"
    >
      <ScrollAreaThumb
        class="relative flex-1 rounded-[10px] bg-neutral-400 before:absolute before:top-1/2 before:left-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] dark:bg-neutral-600"
      />
    </ScrollAreaScrollbar>
  </ScrollAreaRoot>
</template>

<script setup lang="ts">
import { type UIMessage } from '@ai-sdk/vue'
import {
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from 'reka-ui'
import { ref, watch, onMounted, nextTick } from 'vue'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt?: Date
  updatedAt?: Date
}

const props = defineProps<{
  messages: UIMessage[]
  preview?: boolean
  loading?: boolean
}>()

const chatContainer = ref<HTMLElement | null>(null)

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

// Watch for changes in the messages array
watch(
  () => props.messages,
  () => {
    scrollToBottom()
  },
  { deep: true },
)

// Initial scroll when component is mounted
onMounted(() => {
  scrollToBottom()
})
</script>
