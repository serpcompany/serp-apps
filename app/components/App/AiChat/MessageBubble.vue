<template>
  <div
    v-if="message.role === 'user'"
    class="group flex w-full justify-end gap-2 pb-12"
  >
    <div class="flex items-end gap-2">
      <div class="opacity-0 group-hover:opacity-100">
        <UTooltip text="Copy message" :delay-duration="0">
          <UButton
            :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
            variant="ghost"
            size="sm"
            color="neutral"
            @click="copy(message.content)"
          />
        </UTooltip>
      </div>
    </div>
    <MDC
      class="prose dark:prose-invert breakwords prose-pre:overflow-x-auto prose-pre:whitespace-pre-wrap prose-pre:border prose-pre:border-neutral-200 prose-pre:dark:border-white/10 prose-pre:bg-neutral-50 prose-pre:dark:bg-neutral-950 prose-pre:p-4 prose-pre:rounded-2xl max-w-2xl rounded-xl bg-neutral-100 px-3 py-2 dark:bg-neutral-800"
      :value="message.content"
    />
  </div>
  <div v-if="message.role === 'assistant'" class="group space-y-4 pb-6">
    <MDC
      :value="message.content"
      class="prose dark:prose-invert breakwords prose-pre:overflow-x-auto prose-pre:whitespace-pre-wrap prose-pre:border prose-pre:border-neutral-200 prose-pre:dark:border-white/10 prose-pre:bg-neutral-50 prose-pre:dark:bg-neutral-950 prose-pre:p-4 prose-pre:rounded-2xl max-w-none"
    />
    <div
      class="action-buttons mt-2 flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
    >
      <UTooltip text="Copy message" :delay-duration="0">
        <UButton
          :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
          variant="ghost"
          size="sm"
          color="neutral"
          @click="copy(message.content)"
        />
      </UTooltip>
      <UTooltip text="Regenerate" :delay-duration="0">
        <UButton
          icon="i-lucide-refresh-cw"
          variant="ghost"
          size="sm"
          color="neutral"
          @click="deleteMessage(message.id)"
        />
      </UTooltip>
      <UTooltip text="Delete message" :delay-duration="0">
        <UButton
          icon="i-lucide-trash-2"
          variant="ghost"
          size="sm"
          color="error"
          @click="deleteMessage(message.id)"
        />
      </UTooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
const { copy, copied } = useClipboard()
import { type UIMessage } from '@ai-sdk/vue'

defineProps<{
  message: UIMessage
  preview?: boolean
}>()

const deleteMessage = (id: string) => {
  console.log(id)
}
</script>
