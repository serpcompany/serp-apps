<template>
  <main>
    <UContainer class="py-20">
      <div class="text-center">
        <h1 class="text-2xl font-bold">Create a new team</h1>
        <p class="mt-2 text-gray-500">
          A team is a workspace for your organization.
        </p>
      </div>
      <UForm
        :schema="schema"
        :state="state"
        class="mx-auto mt-12 max-w-md space-y-4"
        @submit="onSubmit"
      >
        <TeamsAvatarUpload
          v-model="state.logo"
          :name="state.name"
          @update:file="selectedFile = $event"
        />

        <UFormField label="Team name" name="name">
          <UInput v-model="state.name" class="w-full" size="lg" />
        </UFormField>

        <UFormField label="Slug" name="slug" :help="`${host}/${state.slug}`">
          <UInput v-model="state.slug" class="w-full" size="lg" />
        </UFormField>

        <UButton
          color="neutral"
          type="submit"
          size="lg"
          block
          :loading="loading"
          :disabled="loading"
        >
          Submit
        </UButton>
      </UForm>
    </UContainer>
  </main>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { toast } from 'vue-sonner'
const schema = z.object({
  name: z.string().min(1, 'Team name is required'),
  logo: z.string().optional(),
  slug: z
    .string()
    .min(1, 'Team slug is required')
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      'Only letters, numbers, hyphens and underscores allowed',
    ),
})

const host = computed(() => window.location.host)
const loading = ref(false)
const selectedFile = ref<File | null>(null)

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: '',
  logo: '',
  slug: '',
})

async function uploadLogo() {
  if (!selectedFile.value) return

  const formData = new FormData()
  formData.append('image', selectedFile.value)

  try {
    const response = await $fetch('/api/teams/upload-logo', {
      method: 'POST',
      body: formData,
    })
    return response
  } catch (error) {
    throw new Error('Failed to upload logo')
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    loading.value = true

    // Upload logo if file is selected
    if (selectedFile.value) {
      const logoPath = await uploadLogo()
      state.logo = logoPath
    }

    // Create team
    await $fetch('/api/teams', {
      method: 'POST',
      body: event.data,
    })

    toast.success('Success', {
      description: 'Team created successfully',
    })

    // Optionally redirect to teams list
    navigateTo('/dashboard/teams')
  } catch (error) {
    toast.error(error.message || 'Failed to create team')
  } finally {
    loading.value = false
  }
}
</script>
