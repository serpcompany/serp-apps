<template>
  <AppContainer title="">
    <section class="py-12 sm:py-16 lg:py-32">
      <div class="mx-auto max-w-2xl">
        <div class="mb-8 text-center">
          <h1 class="text-2xl font-bold">{{ greeting }}, {{ user?.name }}</h1>
          <p class="text-2xl">How can I help?</p>
        </div>
        <AppAiChatInputBox :loading="loading" @submit="startChat" />
        <div class="mt-12">
          <AppAiChatStarterMessages @on-select="handleStarterMessageSelect" />
        </div>
      </div>
    </section>
  </AppContainer>
</template>

<script setup lang="ts">
const { user } = useUserSession()
const {
  startChat,
  handleStarterMessageSelect,
  greeting,
  loading,
} = useAiChat()
</script>
