<template>
  <AppContainer title="">
    <section class="py-12 sm:py-16 lg:py-32">
      <div class="mx-auto max-w-2xl">
        <div class="mb-8 text-center">
          <h1 class="text-2xl font-bold">{{ greeting }}, {{ user?.name }}</h1>
          <p class="text-2xl">How can I help?</p>
        </div>
        <form
          class="relative flex w-full flex-col gap-4"
          @submit.prevent="startChat"
        >
          <UTextarea
            v-model="messageText"
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
          <UButton
            type="button"
            color="neutral"
            title="Upload image (WIP)"
            variant="subtle"
            icon="i-lucide-plus"
            size="sm"
            class="absolute bottom-3 left-3 rounded-full"
            disabled
            :ui="{ leadingIcon: 'size-4' }"
          />
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
              :disabled="!messageText"
              :ui="{ base: 'disabled:opacity-20' }"
            />
          </div>
        </form>
        <div class="mt-12">
          <AppAiChatStarterMessages @on-select="handleStarterMessageSelect" />
        </div>
      </div>
    </section>
  </AppContainer>
</template>

<script lang="ts" setup>
const { user } = useUserSession()
const {
  messageText,
  selectedModel,
  models,
  selectedModelIcon,
  startChat,
  handleKeyDown,
  handleStarterMessageSelect,
  greeting,
  loading,
} = useAiChat()
</script>
