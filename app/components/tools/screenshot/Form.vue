<template>
  <UCard variant="subtle">
    <div class="mb-6">
      <h2 class="text-xl font-bold mb-1">Generate Screenshot</h2>
      <p class="text-muted text-sm">
        Enter a website URL and choose how you'd like to capture the screenshot.
      </p>
    </div>
    <UForm
      @submit="onSubmit"
      :schema="schema"
      :state="state"
      class="flex flex-col gap-6"
    >
      <UFormField label="Website URL" name="url" required>
        <UInput
          v-model.trim="state.url"
          class="w-full"
          placeholder="example.com"
          :ui="{
            base: 'pl-14.5',
            leading: 'pointer-events-none',
          }"
        >
          <template #leading>
            <span class="text-sm text-muted">
              https://
            </span>
          </template>
        </UInput>
      </UFormField>

      <URadioGroup
        v-model="state.captureOption"
        legend="Capture Options"
        orientation="vertical"
        value-key="mode"
        variant="card"
        :items="captureOptions"
        :ui="{ fieldset: 'gap-x-4 gap-y-2 md:flex-row', item: 'flex-1' }"
      />

      <UButton
        type="submit"
        :loading="isSubmitting"
        :disabled="!toolUsageAllowed"
        :icon="buttonIcon"
        :label="buttonLabel"
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
import { SCREENSHOT_MODES } from '~~/types/tool'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { ScreenshotMode } from '~~/types/tool'

export type ScreenshotEventData = {
  url: string
  blob: Blob
  fullPage?: boolean
  scrollingAnimation?: boolean
}

const emit = defineEmits<{
  (e: 'screenshotGenerated', data: ScreenshotEventData): void
  (e: 'clearScreenshot'): void
}>()

const captureOptions: { label: string, mode: ScreenshotMode, description: string }[] = [
  {
    label: 'Visible Part',
    mode: 'visible',
    description: 'Captures the visible part of the page.',
  },
  {
    label: 'Full Page',
    mode: 'fullPage',
    description: 'Captures the entire page.',
  },
  {
    label: 'Full Page Scrolling Animation',
    mode: 'scrollingAnimation',
    description: 'Generates a scrolling animation of the entire page.',
  },
]

const schema = z.object({
  url: z.string()
    .transform((val) => {
      return val.replace(/^https?:\/\//, '').replace(/\/+$/, '')
    })
    .refine((val) => {
      try {
        const url = new URL(`https://${val}`)
        return url.hostname.includes('.') && url.hostname.length > 3
      } catch {
        return false
      }
    }, {
      message: 'Please enter a valid URL (e.g. example.com)',
    }),
  captureOption: z.enum(SCREENSHOT_MODES).default('visible'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  url: undefined,
  captureOption: 'visible',
})

const scrollingAnimation = computed(() => {
  return state.captureOption === 'scrollingAnimation'
})

const fullPage = computed(() => {
  return state.captureOption === 'fullPage'
})

const buttonIcon = computed(() => scrollingAnimation.value ? 'i-lucide-video' : 'i-lucide-camera')
const buttonLabel = computed(() =>
  scrollingAnimation.value ? 'Generate Scrolling Animation' : 'Generate Screenshot',
)

const { isToolUsageAllowed, insufficientCreditsAlert } = useTool('website_screenshot')
const toolUsageAllowed = computed(() => isToolUsageAllowed({ mode: state.captureOption }))
const alert = computed(() => {
  if (!toolUsageAllowed.value) {
    return insufficientCreditsAlert.value
  }

  return {
    title: scrollingAnimation.value ? 'Generating your scrolling animation!' : 'Generating your screenshot!',
    description: 'This may take a few seconds... Please wait.',
    icon: 'i-lucide-info',
    color: 'info' as const,
  }
})

const isSubmitting = ref(false)
const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (isSubmitting.value) {
    return
  }

  isSubmitting.value = true
  emit('clearScreenshot')

  const url = `https://${event.data.url}`

  try {
    const screenshotBlob = await $fetch<Blob>('/api/tools/generate-screenshot', {
      method: 'POST',
      body: {
        url,
        fullPage: fullPage.value,
        scrollingAnimation: scrollingAnimation.value,
      },
    })

    emit('screenshotGenerated', { url, blob: screenshotBlob, fullPage: fullPage.value, scrollingAnimation: scrollingAnimation.value })

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
