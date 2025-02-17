<template>
  <AppContainer title="Notes">
    <template #actions>
      <UButton label="New Note" @click="newPostModal = true" />
    </template>
    <div v-if="!posts?.length">
      <p>No posts found</p>
    </div>
    <div v-else>
      <div v-for="post in posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
      </div>
    </div>
    <UModal v-model:open="newPostModal" title="New Note">
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
  </AppContainer>
</template>

<script lang="ts" setup>
const newPostModal = ref(false)
const { getAllPosts, createPost } = usePosts()
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
async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  const newPost = await createPost(event.data)
  toast.add({
    title: 'Success',
    description: 'Post Created',
    color: 'success',
  })
  posts.value?.push(newPost)
  newPostModal.value = false
  loading.value = false
}
</script>
