<template>
  <form
    class="relative flex w-full flex-col gap-4"
    @submit.prevent="handleSubmit"
  >
    <UTextarea
      v-model="inputValue"
      placeholder="Ask me anything..."
      color="neutral"
      variant="subtle"
      class="w-full"
      :rows="3"
      :max-rows="12"
      size="xl"
      :autoresize="true"
      ref="textareaRef"
      :loading="loading"
      :ui="{
        base: 'rounded-3xl resize-none pb-12 px-4 pt-4 md:text-sm',
      }"
      @keydown.enter.prevent="handleKeyDown"
    />
    <!-- // for future implementation - image attachments -->
    <UTooltip text="Attach (WIP)" :delay-duration="0">
      <UButton
        type="button"
        color="neutral"
        variant="subtle"
        icon="i-lucide-plus"
        size="sm"
        class="absolute bottom-3 left-3 rounded-full"
        disabled
        :ui="{ leadingIcon: 'size-4' }"
      />
    </UTooltip>
    <div class="absolute right-3 bottom-3 flex items-center gap-2">
      <USelect
        v-model="selectedModel"
        :items="models"
        variant="soft"
        size="sm"
        :icon="selectedModelIcon"
        class="text-neutral-600 dark:text-neutral-200"
        :content="{
          align: 'end',
          side: 'bottom',
          sideOffset: 8,
        }"
        :ui="{
          trailingIcon: 'size-4',
          content: 'w-48',
        }"
      />
      <UButton
        type="button"
        color="neutral"
        variant="solid"
        size="sm"
        :icon="loading ? 'i-heroicons-stop-16-solid' : 'i-lucide-arrow-up'"
        class="rounded-full transition-opacity"
        :disabled="!inputValue && !loading"
        :ui="{ base: 'disabled:opacity-20' }"
        @click="loading ? $emit('stop') : handleSubmit()"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
defineProps<{
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', value: { message: string; model: string }): void
  (e: 'stop'): void
}>()

const {
  messageText: inputValue,
  selectedModel,
  models,
  selectedModelIcon,
} = useAiChat()

const handleSubmit = () => {
  if (!inputValue.value) return
  emit('submit', {
    message: inputValue.value,
    model: selectedModel.value,
  })
  inputValue.value = ''
}

const setMessage = (message: string) => {
  inputValue.value = message
}

const handleKeyDown = (e: KeyboardEvent) => {
  // Allow new lines with Shift+Enter
  if (e.shiftKey) {
    return
  }
  handleSubmit()
}

// Expose the setMessage method to parent components
defineExpose({
  setMessage,
})
</script>
