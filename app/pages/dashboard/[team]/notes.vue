<template>
  <AppContainer title="Notes">
    <template #actions>
      <UButton label="New Note" @click="postModal.show = true" />
    </template>
    <div v-if="!posts?.length">
      <p>No posts found</p>
    </div>
    <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="post in posts"
        :key="post.id"
        class="rounded-lg bg-gray-100 p-4 dark:bg-gray-800"
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
          @submit="onSubmit"
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
import type { Post } from '@@/types/database'
const postModal = reactive({
  show: false,
  isEdit: false,
  currentPost: null as Post | null,
})

const confirmModal = reactive({
  show: false,
  post: null as Post | null,
})

const { getAllPosts, createPost, updatePost, deletePost } = usePosts()
const { data: posts } = await getAllPosts()

import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  content: z
    .string()
    .min(1, 'Content is required')
    .max(1000, 'Content must be less than 1000 characters'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  title: undefined,
  content: undefined,
})

const toast = useToast()
const loading = ref(false)

// Add a watch to reset the state when modal is closed
watch(
  () => postModal.show,
  (isOpen) => {
    if (!isOpen) {
      // Reset everything when modal is closed
      postModal.isEdit = false
      postModal.currentPost = null
      state.title = undefined
      state.content = undefined
    }
  }
)

function editPost(post: Post) {
  postModal.isEdit = true
  postModal.currentPost = post
  state.title = post.title
  state.content = post.content
  postModal.show = true
}

function confirmDelete(post: Post) {
  confirmModal.post = post
  confirmModal.show = true
}

async function handleDelete() {
  if (!confirmModal.post) return

  loading.value = true
  try {
    await deletePost(confirmModal.post.id)
    posts.value = posts.value?.filter((p) => p.id !== confirmModal.post?.id)
    toast.add({
      title: 'Success',
      description: 'Note deleted',
      color: 'success',
    })
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to delete note',
      color: 'error',
    })
  } finally {
    loading.value = false
    confirmModal.show = false
    confirmModal.post = null
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    if (postModal.isEdit && postModal.currentPost) {
      const updatedPost = await updatePost(postModal.currentPost.id, event.data)
      const index =
        posts.value?.findIndex((p) => p.id === postModal.currentPost?.id) ?? -1
      if (index !== -1 && posts.value) {
        posts.value[index] = updatedPost
      }
      toast.add({
        title: 'Success',
        description: 'Note updated',
        color: 'success',
      })
    } else {
      const newPost = await createPost(event.data)
      if (posts.value) {
        posts.value.unshift(newPost)
      }
      toast.add({
        title: 'Success',
        description: 'Note created',
        color: 'success',
      })
    }
    postModal.show = false
    postModal.isEdit = false
    postModal.currentPost = null
    state.title = undefined
    state.content = undefined
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to save note',
      color: 'error',
    })
  } finally {
    loading.value = false
  }
}
</script>
