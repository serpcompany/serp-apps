<template>
  <AppContainer title="Posts">
    <template #actions>
      <UButton label="New Post" @click="postModal.show = true" />
    </template>
    <div v-if="!posts?.length">
      <p>No posts found</p>
    </div>
    <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="post in posts"
        :key="post.id"
        class="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800"
      >
        <div class="flex items-start justify-between">
          <div class="text-sm">
            <h3 class="font-semibold">{{ post.title }}</h3>
            <p class="mt-2">{{ post.content }}</p>
          </div>
          <div class="flex space-x-2">
            <UButton
              icon="i-lucide-pencil"
              color="neutral"
              variant="ghost"
              size="sm"
              @click="editPost(post)"
            />
            <UButton
              icon="i-lucide-trash"
              color="error"
              variant="ghost"
              size="sm"
              @click="confirmDelete(post)"
            />
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
} = usePosts()

await initializePosts()
</script>
