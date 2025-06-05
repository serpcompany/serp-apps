<template>
  <AppContainer title="Screenshots Generator">
    <UContainer>
      <div class="flex flex-col gap-6 md:gap-8">
        <h1 class="text-3xl md:text-4xl font-bold">Website Screenshot Tool</h1>
        <ToolsScreenshotForm @screenshot-generated="handleScreenshot" @clear-screenshot="revokeMedia" />
        <ToolsScreenshotViewer
          v-if="mediaUrl"
          :media-url
          :media-type
          :is-full-page="isFullPage && !isScrollingAnimation"
          @download="downloadMedia"
        >
          <template #header>
            <h3 class="text-lg md:text-xl font-semibold">
              <span>
                {{ titlePrefix }}
              </span>
              <span class="text-primary-500 ml-1">{{ url }}</span>
            </h3>
          </template>
        </ToolsScreenshotViewer>
        <h3 class="text-2xl font-semibold ">How It Works</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ToolsHowItWorksCard
            v-for="howItWorksInfo in howItWorks"
            :key="howItWorksInfo.title"
            :icon="howItWorksInfo.icon"
            :title="howItWorksInfo.title"
            :description="howItWorksInfo.description"
          />
        </div>
      </div>
    </UContainer>
  </AppContainer>
</template>

<script setup lang="ts">
import type { ScreenshotEventData } from '@/components/tools/screenshot/Form.vue'

const howItWorks = [
  {
    icon: 'i-lucide-link',
    title: 'Enter URL',
    description: 'Provide the URL of the website you want to capture.',
  },
  {
    icon: 'i-lucide-camera',
    title: 'Capture Screenshot',
    description: 'Our tool will take a screenshot of the provided URL.',
  },
  {
    icon: 'i-lucide-image',
    title: 'View Results',
    description: 'You can view and download the captured screenshot.',
  },
]

const mediaUrl = ref<string | null>(null)
const mediaType = ref('')
const url = ref('')
const isFullPage = ref<boolean>()
const isScrollingAnimation = ref<boolean>()

const titlePrefix = computed(() => {
  if (isScrollingAnimation.value) {
    return 'Your scrolling animation for'
  }

  if (isFullPage.value) {
    return 'Your full size screenshot for'
  }

  return 'Your screenshot for'
})

const handleScreenshot = (data: ScreenshotEventData) => {
  if (mediaUrl.value) {
    URL.revokeObjectURL(mediaUrl.value)
    mediaUrl.value = null
    mediaType.value = ''
    url.value = ''
  }

  mediaUrl.value = URL.createObjectURL(data.blob)
  mediaType.value = data.blob.type
  url.value = data.url
  isFullPage.value = data.fullPage
  isScrollingAnimation.value = data.scrollingAnimation
}

const revokeMedia = () => {
  if (mediaUrl.value) {
    URL.revokeObjectURL(mediaUrl.value)
    mediaUrl.value = null
    mediaType.value = ''
    url.value = ''
    isFullPage.value = false
  }
}

onUnmounted(() => {
  revokeMedia()
})

const toast = useToast()
const downloadMedia = async () => {
  if (!mediaUrl.value || !url.value) {
    return
  }

  try {
    const link = document.createElement('a')
    link.href = mediaUrl.value
    link.download = generateFilename(url.value, mediaType.value)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    await nextTick(() => {
      revokeMedia()
    })
  } catch {
    toast.add({
      title: 'Download Failed',
      description: 'An error occurred while trying to download the media.',
      color: 'error',
    })
  }
}
</script>
