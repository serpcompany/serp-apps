<template>
  <div
    v-if="message.role === 'user'"
    class="flex w-full gap-4 group-data-[role=user]/message:ml-auto group-data-[role=user]/message:w-fit group-data-[role=user]/message:max-w-2xl"
    :class="{ preview: 'text-sm' }"
  >
    <div
      class="flex flex-col gap-4 rounded-xl bg-neutral-100 px-3 py-2 dark:bg-neutral-800"
    >
      <MDC
        :value="message.content"
        class="prose dark:prose-invert breakwords prose-pre:overflow-x-auto prose-pre:whitespace-pre-wrap prose-pre:border prose-pre:border-neutral-200 prose-pre:dark:border-white/10 prose-pre:bg-neutral-50 prose-pre:dark:bg-black prose-pre:p-4 prose-pre:rounded-2xl"
      />
    </div>
  </div>
  <div
    v-if="message.role === 'assistant'"
    class="group flex w-full gap-4 group-data-[role=user]/message:ml-auto group-data-[role=user]/message:w-fit group-data-[role=user]/message:max-w-2xl"
  >
    <UAvatar
      src="https://api.dicebear.com/9.x/glass/svg?seed=Maria"
      alt="assistant"
      size="xs"
      class="mt-0.5 ring-2 ring-neutral-500/10 dark:ring-white/10"
    />
    <div>
      <MDC
        :value="message.content"
        class="prose dark:prose-invert breakwords prose-pre:overflow-x-auto prose-pre:whitespace-pre-wrap prose-pre:border prose-pre:border-neutral-200 prose-pre:dark:border-white/10 prose-pre:bg-neutral-50 prose-pre:dark:bg-black prose-pre:p-4 prose-pre:rounded-2xl"
      />
      <div
        v-if="!preview"
        class="mt-2 flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        <UButton
          :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
          variant="ghost"
          size="sm"
          @click="copy(message.content)"
        />
        <UButton icon="i-lucide-trash-2" variant="ghost" size="sm" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
const { copy, copied } = useClipboard()

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

defineProps<{
  message: Message
  preview?: boolean
}>()
</script>
