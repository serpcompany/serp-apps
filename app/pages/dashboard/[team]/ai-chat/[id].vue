<template>
  <div class="flex h-dvh min-w-0 flex-col">
    <AppAiChatHeader title="New Conversation">
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
    <AppAiChatMessagesList :messages="messages || []" :loading="isLoading" />
    <div class="h-4" />
    <div class="mx-auto flex w-full gap-2 px-4 pb-4 md:max-w-3xl md:pb-4">
      <form
        class="relative flex w-full flex-col gap-4"
        @submit.prevent="handleSubmit"
      >
        <UTextarea
          v-model="input"
          placeholder="Ask me anything..."
          color="neutral"
          variant="subtle"
          class="w-full"
          ref="textareaRef"
          :rows="3"
          :maxrows="12"
          size="xl"
          :autoresize="true"
          :ui="{
            base: 'rounded-3xl resize-none pb-12 px-4 pt-4 md:text-sm',
          }"
          @keydown.enter="handleKeyDown"
        />
        <!-- // for future implementation - image attachments -->
        <UTooltip text="Attach (WIP)" :delay-duration="0">
          <UButton
            type="button"
            color="neutral"
            variant="subtle"
            icon="i-lucide-plus"
            size="sm"
            class="absolute bottom-3 left-3 rounded-full bg-white dark:bg-white/10"
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
            type="submit"
            color="neutral"
            variant="solid"
            size="sm"
            icon="i-lucide-arrow-up"
            class="rounded-full transition-opacity"
            :disabled="!input"
            :ui="{ base: 'disabled:opacity-20' }"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useChat } from '@ai-sdk/vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, computed } from 'vue'

const { currentTeam } = useTeam()
const { selectedModel, models, selectedModelIcon } = useAiChat()

const route = useRoute()
const router = useRouter()

const body = computed(() => ({
  model: selectedModel.value
}))

const { messages, input, handleSubmit, isLoading } = useChat({
  api: `/api/teams/${currentTeam.value.id}/ai-chat/chat`,
  body,
})

// Handle initial message on page load
onMounted(async () => {
  if (route.query.firstMessage) {
    // Set the input value
    console.log(route.query.model, 'route.query.model')
    input.value = route.query.firstMessage as string
    selectedModel.value = route.query.model as string
    console.log(selectedModel.value, 'selectedModel.value')
    // Trigger the submission
    await handleSubmit()
    
    // Remove the firstMessage query parameter
    await router.replace({ 
      query: { 
        ...route.query,
        firstMessage: undefined 
      }
    })
  }
})

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.shiftKey) {
    return
  }
  handleSubmit()
}
</script>
