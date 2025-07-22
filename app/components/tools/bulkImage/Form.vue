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
      <UFormField label="Image Prompt" name="prompt" :required="!hasValidCsv">
        <UTextarea
          v-model.trim="state.prompt"
          autoresize
          class="w-full"
          placeholder="Enter your prompt here"
          :disabled="hasValidCsv"
          :maxrows="8"
          :rows="4"
        />
      </UFormField>
      <UFormField label="Image Count (1-50)" name="imageCount" :required="!hasValidCsv">
        <UInputNumber
          v-model="state.count"
          class="w-full"
          orientation="vertical"
          placeholder="Number of images to generate"
          variant="outline"
          :min="1"
          :max="50"
          :disabled="hasValidCsv"
        />
      </UFormField>

      <USeparator label="OR" size="sm" />

      <UFormField
        label="Upload CSV for batch processing"
        name="csvFile"
        help="The CSV file should have columns 'prompt' and 'count' (max 10 per prompt)."
        :error="parseError ?? ''"
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
    state.prompt = undefined
    state.count = 1
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
const toolUsageAllowed = computed(() => isToolUsageAllowed({ count: hasValidCsv.value ? csvImageCount.value : state.count || 1 }))

const hasValidCsv = computed(() => {
  return validatedData.value.length > 0 && !parseError.value
})

const canSubmit = computed(() => {
  if (hasValidCsv.value) {
    return true
  }

  return state.prompt && state.prompt.trim().length > 0 && state.count && state.count >= 1
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
}).refine((data) => {
  if (hasValidCsv.value) {
    return true
  }

  return data.prompt && data.prompt.trim().length > 0
    && data.count && data.count >= 1 && data.count <= 50
}, {
  message: 'Either upload a valid CSV file or provide both prompt and count',
  path: ['prompt'],
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
