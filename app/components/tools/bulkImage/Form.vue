<template>
  <UCard variant="subtle">
    <div v-if="!isProcessing">
      <div class="mb-6">
        <h2 class="text-xl font-bold mb-1">Start a New Batch Job</h2>
      </div>

      <UForm
        ref="form"
        class="flex flex-col gap-6"
        :schema="schema"
        :state="state"
        @submit="onSubmit"
      >
        <UFormField
          help="Your API key is not stored and only used for this request"
          label="OpenAI API Key"
          name="apiKey"
          required
        >
          <UInput
            v-model="state.apiKey"
            class="w-full"
            placeholder="sk-..."
            type="password"
          />
        </UFormField>

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
          :help="`The CSV file should have columns 'prompt' and 'count' (max ${MAX_IMAGE_PER_PROMPT} per prompt, and max ${MAX_IMAGE_COUNT} images in total).`"
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

        <UButton
          block
          class="mt-2"
          label="Generate Images"
          size="xl"
          type="submit"
          :disabled="!canSubmit"
          :loading="isProcessing"
        />

        <UAlert
          v-if="!toolUsageAllowed"
          v-bind="insufficientCreditsAlert"
          variant="subtle"
        />
      </UForm>
    </div>

    <div v-else>
      <h2 class="text-xl font-bold mb-4">Generating Your Images... 🎨</h2>

      <div class="flex items-center gap-4 mb-2">
        <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
          {{ generationProgress }} / {{ totalImagesToGenerate }} images
        </span>
        <UProgress :value="generationProgress" :max="totalImagesToGenerate" class="flex-1" />
      </div>

      <UAlert
        v-if="isFinished"
        class="mt-6"
        title="Generation Complete"
        variant="subtle"
        :actions="[
          {
            icon: 'i-lucide-download',
            label: 'Download ZIP Again',
            onClick: downloadZip,
          },
          {
            label: 'Start New Job',
            color: 'neutral',
            variant: 'subtle',
            onClick: resetGenerationState,
          },
        ]"
        :color="failureCount === 0 ? 'primary' : 'warning'"
        :description="`Finished processing all ${totalImagesToGenerate} images. Succeeded: ${successCount}, Failed: ${failureCount}.`"
        :icon="failureCount === 0 ? 'i-lucide-party-popper' : 'i-lucide-info'"
      />

      <div v-else class="flex items-center gap-6 mt-3 text-sm">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-check-circle" class="text-green-500" />
          <span>Succeeded: {{ successCount }}</span>
        </div>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-alert-triangle" class="text-red-500" />
          <span>Failed: {{ failureCount }}</span>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import {
  MIN_IMAGE_COUNT,
  MAX_IMAGE_COUNT,
  MAX_IMAGE_PER_PROMPT,
} from '~~/constants'

const toast = useToast()

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

const hasValidCsv = computed(() => {
  return validatedData.value.length > 0 && !parseError.value
})

const form = useTemplateRef('form')
const resetPrompt = () => {
  form.value?.clear()
  state.prompt = undefined
  state.count = 1
}

watch(hasValidCsv, (valid) => {
  if (valid) {
    resetPrompt()

    toast.add({
      id: 'csv_ready',
      title: 'CSV File Ready',
      description: `Found ${validatedData.value.length || 0} valid entries.`,
      color: 'success',
      icon: 'i-lucide-check-circle',
    })
  }
})

const { isToolUsageAllowed, insufficientCreditsAlert } = useTool('bulk_ai_images')
const toolUsageAllowed = computed(() => isToolUsageAllowed({
  count: hasValidCsv.value
    ? csvImageCount.value
    : state.count || 1,
}))

const canSubmit = computed(() => {
  if (!toolUsageAllowed.value || !state.apiKey || !state.apiKey.trim()) {
    return false
  }

  if (hasValidCsv.value) {
    return true
  }

  return state.prompt && state.prompt.trim().length > 0
    && state.count && state.count >= MIN_IMAGE_COUNT && state.count <= MAX_IMAGE_COUNT
})

const schema = z.object({
  prompt: z.string().optional(),
  count: z.number().optional(),
  csvFile: z.string().optional(),
  apiKey: z.string().optional(),
}).superRefine((data, ctx) => {
  if (!data.apiKey || data.apiKey.trim().length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'OpenAI API key is required',
      path: ['apiKey'],
    })
  }

  if (hasValidCsv.value) {
    return
  }

  if (!data.prompt || data.prompt.trim().length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Prompt is required when not using CSV file',
      path: ['prompt'],
    })
  }

  if (!data.count || data.count < MIN_IMAGE_COUNT || data.count > MAX_IMAGE_COUNT) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Image count must be between ${MIN_IMAGE_COUNT} and ${MAX_IMAGE_COUNT}`,
      path: ['count'],
    })
  }
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  prompt: undefined,
  count: 1,
  apiKey: undefined,
})

const isProcessing = ref(false)
const isFinished = ref(false)
const jobId = ref<string | null>(null)
const generationProgress = ref(0)
const totalImagesToGenerate = ref(0)
const successCount = ref(0)
const failureCount = ref(0)

function resetGenerationState() {
  isProcessing.value = false
  isFinished.value = false
  jobId.value = null
  generationProgress.value = 0
  totalImagesToGenerate.value = 0
  successCount.value = 0
  failureCount.value = 0
  clearFileInput()
  resetPrompt()
}

function downloadZip() {
  if (!jobId.value) {
    toast.add({ title: 'Error', description: 'Job ID not found, cannot download.', color: 'error', icon: 'i-lucide-circle-alert' })
    return
  }

  const downloadUrl = `/api/tools/stream-zip?jobId=${jobId.value}`
  const a = document.createElement('a')
  a.href = downloadUrl
  a.download = `generated-images-${jobId.value}.zip`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (isProcessing.value || !canSubmit.value) {
    return
  }

  isProcessing.value = true

  try {
    const response = await $fetch<ReadableStream>('/api/tools/generate-images', {
      method: 'POST',
      body: {
        ...(hasValidCsv.value
          ? { type: 'csv', data: validatedData.value, apiKey: event.data.apiKey }
          : {
              type: 'form',
              data: { prompt: state.prompt?.trim(), count: state.count },
              apiKey: event.data.apiKey,
            }
        ),
      },
      responseType: 'stream',
    })

    const reader = response.pipeThrough(new TextDecoderStream()).getReader()

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    while (true) {
      const { value, done } = await reader.read()

      if (done) {
        if (!isFinished.value) {
          toast.add({ title: 'Connection Lost', description: 'The connection to the server was lost.', color: 'error' })
        }

        break
      }

      const lines = value.split('\n').filter((line) => line.trim() !== '')
      for (const line of lines) {
        try {
          if (line.startsWith('data: ')) {
            const dataString = line.substring(6).trim()
            const eventData = JSON.parse(dataString)
            switch (eventData.type) {
              case 'info':
                jobId.value = eventData.jobId
                totalImagesToGenerate.value = eventData.totalImages
                break
              case 'progress':
                generationProgress.value++
                successCount.value++
                break
              case 'error':
                generationProgress.value++
                failureCount.value++
                break
              case 'complete':
                isFinished.value = true
                toast.add({
                  title: 'Generation Complete!',
                  description: 'Your ZIP file will download automatically.',
                  color: 'success',
                  icon: 'i-lucide-party-popper',
                })
                downloadZip()
                await reader.cancel()
                break
              case 'fatal':
                toast.add({
                  title: 'Fatal Error!',
                  description: eventData.error,
                  color: 'error',
                  icon: 'i-lucide-circle-alert',
                })
                isFinished.value = true
                await reader.cancel()
                break
            }
          }
        } catch (e) {
          console.error('Failed to parse SSE event chunk:', line, e)
        }
      }
    }
  } catch (error) {
    const msg = (error as { data: { message: string } }).data.message
    toast.add({
      title: 'Error starting job!',
      description: msg,
      color: 'error',
      icon: 'i-lucide-circle-alert',
    })

    resetGenerationState()
  }
}
</script>
