<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormField>

    <UFormField label="Message" name="message">
      <UTextarea v-model="state.message" />
    </UFormField>

    <UButton type="submit"> Submit </UButton>
  </UForm>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  userId: z.string(),
  name: z.string(),
  email: z.string().email('Invalid email'),
  message: z.string().min(1, 'Message is required'),
})

const { user } = useUserSession()
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  userId: user?.id,
  name: user?.name,
  email: user?.email,
  message: undefined,
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
