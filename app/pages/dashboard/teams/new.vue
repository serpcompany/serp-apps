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
        <UFormField
          label="Team Logo"
          name="logo"
          help="Recommended size: 1 MB, 1:1 aspect ratio"
        >
          <UAvatar
            :src="state.logo"
            icon="i-lucide-upload"
            size="3xl"
            class="border border-zinc-200 ring-[2px] ring-zinc-500/10"
            :alt="state.name"
          />
          <UButton
            type="button"
            color="neutral"
            variant="subtle"
            label="Upload"
            class="ml-2"
            size="sm"
          />
        </UFormField>

        <UFormField label="Team name" name="name">
          <UInput v-model="state.name" class="w-full" size="lg" />
        </UFormField>

        <UFormField label="Slug" name="slug" :help="`${host}/${state.slug}`">
          <UInput v-model="state.slug" class="w-full" size="lg" />
        </UFormField>

        <UButton color="neutral" type="submit" size="lg" block>
          Submit
        </UButton>
      </UForm>
    </UContainer>
  </main>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
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

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: '',
  logo: '',
  slug: '',
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: 'Success',
    description: 'The form has been submitted.',
    color: 'success',
  })
  console.log(event.data)
}
</script>
