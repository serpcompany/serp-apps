<template>
  <UCard variant="subtle">
    <div class="mb-6">
      <h2 class="text-xl font-bold mb-1">Start a New Batch Job</h2>
    </div>

    <UForm
      class="flex flex-col gap-6"
      :schema="schema"
      :state="state"
      @submit="onSubmit"
    >
      <UFormField label="Image Prompt" name="prompt" :required="!hasValidCsv">
        <UTextarea
          v-model="state.prompt"
          autoresize
          class="w-full"
          placeholder="Enter your prompt here"
          :disabled="hasValidCsv"
          :maxrows="8"
          :rows="4"
        />
      </UFormField>
      <UFormField
        name="count"
        :label="`Image Count (${MIN_IMAGE_COUNT}-${MAX_IMAGE_COUNT})`"
        :required="!hasValidCsv"
      >
        <UInputNumber
          v-model="state.count"
          class="w-full"
          orientation="vertical"
          placeholder="Number of images to generate"
          variant="outline"
          :min="MIN_IMAGE_COUNT"
          :disabled="hasValidCsv"
        />
      </UFormField>

      <USeparator label="OR" size="sm" />

      <UFormField
        label="Upload CSV for batch processing"
        name="csvFile"
        :error="parseError ?? ''"
        :help="`The CSV file should have columns 'prompt' and 'count' (max ${MAX_IMAGE_PER_PROMPT} per prompt).`"
      >
        <UInput
          v-model="state.csvFile"
          accept=".csv"
          class="w-full"
          type="file"
          :loading="isParsing"
          :ui="{ trailing: 'pe-1' }"
          @change="handleFileChange"
        >
          <template v-if="state.csvFile" #trailing>
            <UButton
              color="neutral"
              variant="link"
              size="sm"
              icon="i-lucide-circle-x"
              aria-label="Clear input"
              @click="clearFileInput"
            />
          </template>
        </UInput>
      </UFormField>

      <UAlert
        v-if="hasValidCsv"
        color="success"
        icon="i-lucide-check-circle"
        title="CSV File Ready"
        variant="subtle"
        :description="`Found ${validatedData?.length || 0} valid entries in CSV file`"
      />

      <UButton
        block
        class="mt-2"
        label="Generate Images"
        size="xl"
        type="submit"
        :disabled="!canSubmit || !toolUsageAllowed"
        :loading="isSubmitting"
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
import { MAX_IMAGE_PER_PROMPT } from '~/composables/useCsvParser'

const MIN_IMAGE_COUNT = 1
const MAX_IMAGE_COUNT = 20

const {
  validatedData,
  error: parseError,
  isLoading: isParsing,
  totalImageCount: csvImageCount,
  parseImageCsv: parseCsv,
  reset: resetParser,
} = useCsvParser()

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    parseCsv(input.files[0]!)
  } else {
    resetParser()
  }
}

const clearFileInput = () => {
  state.csvFile = undefined
  resetParser()
}

const { isToolUsageAllowed, insufficientCreditsAlert } = useTool('bulk_ai_images')
const toolUsageAllowed = computed(() => isToolUsageAllowed({
  count: hasValidCsv.value
    ? csvImageCount.value
    : state.count || 1,
}))

const hasValidCsv = computed(() => {
  return validatedData.value.length > 0 && !parseError.value
})

const canSubmit = computed(() => {
  if (hasValidCsv.value) {
    return true
  }

  return state.prompt && state.prompt.trim().length > 0
    && state.count && state.count >= MIN_IMAGE_COUNT && state.count <= MAX_IMAGE_COUNT
})

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
  prompt: z.string().optional(),
  count: z.number().optional(),
  csvFile: z.string().optional(),
}).superRefine((data, ctx) => {
  if (hasValidCsv.value) {
    return
  }

  const hasPrompt = data.prompt && data.prompt.trim().length > 0
  const hasValidCount = data.count && data.count >= MIN_IMAGE_COUNT && data.count <= MAX_IMAGE_COUNT

  if (!hasPrompt) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Prompt is required when not using CSV file',
      path: ['prompt'],
    })
  }

  if (!hasValidCount) {
    if (!data.count) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Image count is required when not using CSV file',
        path: ['count'],
      })
    } else if (data.count < MIN_IMAGE_COUNT || data.count > MAX_IMAGE_COUNT) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Image count must be between ${MIN_IMAGE_COUNT} and ${MAX_IMAGE_COUNT}`,
        path: ['count'],
      })
    }
  }
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  prompt: undefined,
  count: 1,
})

const isSubmitting = ref(false)
const toast = useToast()
function onSubmit(event: FormSubmitEvent<Schema>) {
  if (isSubmitting.value || !canSubmit.value || !toolUsageAllowed.value) {
    return
  }

  isSubmitting.value = true

  try {
    console.log('Generating images with data:', event.data)

    toast.add({
      title: 'Images generation started!',
      description: 'You will be notified when your images are ready.',
      color: 'success',
      icon: 'i-lucide-circle-check',
    })
  } catch (error) {
    const msg = (error as { data: { message: string } }).data.message
    toast.add({
      title: 'Error generating images!',
      description: msg,
      color: 'error',
      icon: 'i-lucide-circle-alert',
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>
