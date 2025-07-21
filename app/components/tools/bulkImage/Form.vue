<template>
  <UCard variant="subtle">
    <div class="mb-6">
      <h2 class="text-xl font-bold mb-1">Start a New Batch Job</h2>
    </div>

    <UForm
      @submit="onSubmit"
      :schema="schema"
      :state="state"
      class="flex flex-col gap-6"
    >
      <UFormField label="Image Prompt" name="prompt" required>
        <UTextarea
          v-model.trim="state.prompt"
          autoresize
          class="w-full"
          placeholder="Enter your prompt here"
          :maxrows="8"
          :rows="4"
        />
      </UFormField>
      <UFormField label="Image Count (1-50)" name="imageCount" required>
        <UInputNumber
          v-model="state.count"
          class="w-full"
          orientation="vertical"
          placeholder="Number of images to generate"
          variant="outline"
          :min="1"
          :max="50"
        />
      </UFormField>

      <USeparator label="OR" size="sm" />

      <UFormField label="Upload CSV for batch processing" name="csvFile" help="CSV file should have columns 'prompt' and 'count' (max 10 per prompt).">
        <UInput
          v-model="state.csvFile"
          type="file"
          accept=".csv"
          class="w-full"
        />
      </UFormField>

      <UButton
        type="submit"
        :loading="isSubmitting"
        :disabled="!toolUsageAllowed"
        label="Generate Images"
        class="mt-2"
        size="xl"
        block
      />

      <UAlert
        v-if="isSubmitting || !toolUsageAllowed"
        v-bind="alert"
        variant="subtle"
      />
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const { isToolUsageAllowed, insufficientCreditsAlert } = useTool('bulk_ai_images')
const toolUsageAllowed = computed(() => isToolUsageAllowed())
const alert = computed(() => {
  if (!toolUsageAllowed.value) {
    return insufficientCreditsAlert.value
  }

  return {
    title: 'Generating your images!',
    description: 'This may take a few seconds... Please wait.',
    icon: 'i-lucide-info',
    color: 'info' as const,
  }
})

const schema = z.object({
  prompt: z.string()
    .min(1, 'Prompt is required'),
  count: z.number()
    .min(1, 'At least one image is required')
    .max(100, 'Maximum 100 images can be generated'),
  csvFile: z.string()
    .optional(),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  prompt: undefined,
  count: 1,
})

const isSubmitting = ref(false)
const toast = useToast()
function onSubmit(event: FormSubmitEvent<Schema>) {
  if (isSubmitting.value) {
    return
  }

  isSubmitting.value = true

  try {
    // Simulate API call to generate images
    console.log('Generating images with data:', event.data)

    toast.add({
      title: 'Screenshot generated successfully!',
      description: 'You can view and download your screenshot below.',
      color: 'success',
      icon: 'i-lucide-circle-check',
    })
  } catch (error) {
    const msg = (error as { data: { message: string } }).data.message
    toast.add({
      title: 'Error generating screenshot!',
      description: msg,
      color: 'error',
      icon: 'i-lucide-circle-alert',
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>
