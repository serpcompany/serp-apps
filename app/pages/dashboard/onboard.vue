<template>
  <main class="flex min-h-screen items-center justify-center">
    <UContainer class="w-full py-20">
      <div class="text-center">
        <h1 class="text-2xl font-bold">Welcome {{ user?.name }}</h1>
        <p class="mt-2 text-gray-500">
          Let's get you started by creating your first team.
        </p>
      </div>
      <UForm
        :schema="schema"
        :state="state"
        class="mx-auto mt-12 max-w-md space-y-4"
        @submit="onSubmit as any"
      >
        <UFormField
          label="Team logo (Recommended size: 1 MB, 1:1 aspect ratio)"
          name="logo"
        >
          <AppTeamAvatarUploader
            v-model="imagePreview"
            @file-selected="handleFileSelected"
          />
        </UFormField>

        <UFormField required label="Team name" name="name">
          <UInput
            placeholder="Personal or Company Name"
            v-model="state.name"
            class="w-full"
            size="lg"
          />
        </UFormField>

        <UFormField
          label="Team URL"
          name="slug"
          required
          :help="`${host}/dashboard/${state.slug}`"
        >
          <UInput
            placeholder="my-awesome-team"
            v-model="state.slug"
            class="w-full"
            size="lg"
          />
        </UFormField>

        <UButton
          color="neutral"
          type="submit"
          size="lg"
          block
          :loading="loading"
          :disabled="loading"
        >
          Create team
        </UButton>
      </UForm>
      <div class="mt-4 flex justify-center">
        <UButton
          variant="ghost"
          @click="signOut"
          color="neutral"
          size="lg"
          icon="i-lucide-arrow-left"
          label="Sign out"
        />
      </div>
    </UContainer>
  </main>
</template>

<script setup lang="ts">
const { user, clear } = useUserSession()
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import type { Team } from '@@/types/database'
import { toast } from 'vue-sonner'
const teams = useState<Team[]>('teams')
const loading = ref(false)
const imagePreview = ref<string | undefined>(undefined)
const selectedFile = ref<File | null>(null)

const handleFileSelected = (file: File | null) => {
  selectedFile.value = file
}

const schema = z.object({
  name: z.string().min(1, 'Team name is required'),
  logo: z.string().optional(),
  slug: z
    .string()
    .min(1, 'Team slug is required')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Only lowercase letters, numbers, and single hyphens between characters allowed',
    ),
})

const state = reactive({
  name: '',
  slug: '',
  logo: '',
})

const onSubmit = async (event: FormSubmitEvent<typeof schema>) => {
  loading.value = true
  try {
    const filePath = selectedFile.value
      ? await uploadLogo()
      : `https://api.dicebear.com/9.x/glass/svg?seed=${event.data.name}`
    const teamData = { ...event.data, logo: filePath }
    const newTeam = await $fetch<Team>('/api/teams', {
      method: 'POST',
      body: teamData,
    })
    teams.value.push(newTeam)
    toast.success('Team created successfully')
    return navigateTo(`/dashboard/${newTeam.slug}`)
  } catch (error) {
    toast.error((error as any).statusMessage || 'Failed to create team')
  } finally {
    loading.value = false
  }
}

const uploadLogo = async () => {
  try {
    if (!selectedFile.value) return ''
    const formData = new FormData()
    formData.append('image', selectedFile.value)
    const filePath = await $fetch('/api/teams/upload-logo', {
      method: 'POST',
      body: formData,
    })
    return `/images/${filePath}`
  } catch (error) {
    throw new Error('Failed to upload logo')
  }
}

const host = useRuntimeConfig().public.host

async function signOut() {
  await clear()
  await navigateTo('/')
}
</script>
