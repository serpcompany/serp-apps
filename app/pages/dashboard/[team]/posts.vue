<template>
  <AppContainer title="Posts">
    <template #actions>
      <UButton label="New Post" @click="postModal.show = true" />
    </template>
    <div v-if="!posts?.length">
      <p>No posts found</p>
    </div>
    <div
      v-else
      class="w-full columns-1 gap-3 space-y-3 md:columns-2 xl:columns-4"
    >
      <div
        v-for="post in posts"
        :key="post.id"
        class="break-inside-avoid-column rounded-2xl bg-neutral-100 dark:bg-neutral-950"
      >
        <div class="rounded-xl bg-[#fbfaf9] p-1.5 dark:bg-neutral-950">
          <div
            class="card-shadow group rounded-md bg-white dark:bg-neutral-900"
          >
            <header
              class="flex min-w-0 items-center gap-2 border-b border-neutral-100 px-4 py-2 dark:border-white/10"
            >
              <p
                class="flex-1 truncate text-sm text-neutral-600 dark:text-neutral-400"
              >
                {{ post.title }}
              </p>
              <div
                class="flex opacity-10 transition-opacity group-hover:opacity-100"
              >
                <UButton
                  icon="i-lucide-pencil"
                  color="neutral"
                  variant="ghost"
                  size="xs"
                  @click="editPost(post)"
                />
                <UButton
                  icon="i-lucide-trash"
                  color="error"
                  variant="ghost"
                  size="xs"
                  @click="confirmDelete(post)"
                />
              </div>
            </header>
            <div class="px-4 py-6">
              <img
                v-if="post.image"
                :src="post.image"
                class="mb-2 min-h-40 w-full rounded-md object-cover"
                :alt="post.title"
              />
              <p
                class="text-sm whitespace-pre-wrap text-neutral-500 dark:text-neutral-400"
              >
                {{ post.content }}
              </p>
            </div>
            <footer
              class="flex min-w-0 items-center justify-between gap-2 border-t border-neutral-100 px-4 py-2 dark:border-white/10"
            >
              <div class="flex items-center gap-2">
                <UAvatar :src="post.userId.avatarUrl" size="xs" />
                <p class="text-xs font-medium text-neutral-500">
                  {{ post.userId.name }}
                </p>
              </div>
              <p class="text-xs font-medium text-neutral-500">
                {{ useDateFormat(post.createdAt, 'MMM DD hh:mm A') }}
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>

    <UModal
      v-model:open="postModal.show"
      :title="postModal.isEdit ? 'Edit Note' : 'New Note'"
    >
      <template #body>
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="handleSubmit"
        >
          <UFormField label="Image" name="imagePath">
            <AppPostImageUploader
              v-model="state.image"
              @file-selected="handleFileSelected"
            />
          </UFormField>

          <UFormField label="Title" name="title">
            <UInput v-model="state.title" class="w-full" size="xl" />
          </UFormField>

          <UFormField label="Content" name="content">
            <UTextarea v-model="state.content" class="w-full" size="xl" />
          </UFormField>

          <UButton label="Submit" type="submit" :loading="loading" />
        </UForm>
      </template>
    </UModal>

    <UModal v-model:open="confirmModal.show" size="xs" title="Delete Note">
      <template #body>
        <p>
          Are you sure you want to delete this note? This action cannot be
          undone.
        </p>
      </template>
      <template #footer>
        <div class="flex justify-end space-x-2">
          <UButton
            color="neutral"
            variant="ghost"
            label="Cancel"
            @click="confirmModal.show = false"
          />
          <UButton
            color="error"
            label="Delete"
            :loading="loading"
            @click="handleDelete"
          />
        </div>
      </template>
    </UModal>
  </AppContainer>
</template>

<script lang="ts" setup>
import type { Post } from '@@/types/database'
import { useDateFormat } from '@vueuse/core'

const {
  posts,
  loading,
  postModal,
  confirmModal,
  state,
  schema,
  editPost,
  confirmDelete,
  handleDelete,
  handleSubmit,
  initializePosts,
  handleFileSelected,
} = usePosts()

await initializePosts()

const options = ref([
  {
    label: 'Edit',
    onSelect(e: Event) {
      console.log(e)
    },
  },
  {
    label: 'Delete',
    color: 'error',
    onSelect(e: Event) {
      console.log(e)
    },
  },
])
</script>

<style scoped>
.card-shadow {
  box-shadow:
    0 1px 2px #5f4a2e14,
    0 4px 6px #5f4a2e0a,
    0 24px 40px -16px #684b2514;
}
</style>
