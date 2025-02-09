<template>
  <AppContainer title="AI Chat">
    <template #actions>
      <UButton :loading="loading" @click="createChat()"> New Chat </UButton>
    </template>
    <div v-for="chat in chats" :key="chat.id" class="mx-auto mt-12 max-w-2xl">
      <NuxtLink
        :to="`/dashboard/${currentTeam.slug}/ai-chat/${chat.id}`"
        class="group flex items-center justify-between gap-3 rounded-lg border border-neutral-100 p-4 hover:bg-neutral-50 dark:border-white/10 dark:hover:bg-neutral-950"
      >
        <UIcon name="i-lucide-circle" class="h-4 w-4 text-neutral-500" />
        <p class="flex-1">{{ chat.title }}</p>
        <p class="text-sm text-neutral-500">
          {{ useDateFormat(chat.createdAt ?? new Date(), 'MM/DD/YYYY').value }}
        </p>
        <UButton
          icon="i-lucide-trash-2"
          variant="ghost"
          size="sm"
          @click.prevent="deleteChat(chat.id)"
          :loading="deletingChatId === chat.id"
          color="error"
          class="opacity-20 group-hover:opacity-100"
        />
      </NuxtLink>
    </div>
  </AppContainer>
</template>

<script lang="ts" setup>
import { useDateFormat } from '@vueuse/core'
const { data: chats } = await useFetch('/api/ai-chat')
const { loading, createChat } = useAiChat()
const deletingChatId = ref<string | null>(null)
const toast = useToast()
const deleteChat = async (chatId: string) => {
  deletingChatId.value = chatId
  try {
    await $fetch(`/api/ai-chat/${chatId}`, {
      method: 'DELETE',
    })
    if (chats.value) {
      chats.value = chats.value.filter((chat) => chat.id !== chatId)
    }
  } catch (error) {
    console.error(error)
    toast.add({
      title: 'Error',
      description: 'Failed to delete chat',
      color: 'error',
    })
  } finally {
    deletingChatId.value = null
  }
}
const { currentTeam } = useTeam()
</script>
