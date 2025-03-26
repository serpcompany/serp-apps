<template>
  <div
    class="flex h-full w-full flex-shrink-0 snap-mandatory snap-center flex-col sm:w-72"
  >
    <div>
      <UForm
        :schema="schema"
        :state="state"
        @submit="onSubmit"
        class="mb-4 flex items-start justify-between gap-2"
      >
        <UFormField name="name" class="w-full">
          <UInput
            v-model="state.name"
            placeholder="Create a new board"
            class="w-full"
            size="lg"
            color="neutral"
            variant="soft"
          />
        </UFormField>

        <UButton
          type="submit"
          icon="i-lucide-arrow-right"
          color="neutral"
          variant="soft"
          class="h-9 w-9 flex-shrink-0"
        />
      </UForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const emit = defineEmits(['create'])

const schema = z.object({
  name: z.string().min(1, 'Enter a board name'),
})

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
  name: '',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  state.name = ''
  emit('create', event.data.name)
}
</script>
