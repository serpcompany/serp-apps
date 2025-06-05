<template>
  <UCard>
    <div class="flex flex-col items-center gap-4">
      <slot name="header">
        <h3 class="text-lg font-semibold">Your Screenshot</h3>
      </slot>
      <div class="border border-accented p-4 rounded-md" :class="{ 'max-h-128 overflow-y-auto': isFullPage }">
        <img
          v-if="isImage"
          :src="mediaUrl"
          alt="Media content"
          class="w-full h-auto object-contain"
        >
        <video
          v-else-if="isVideo"
          :src="mediaUrl"
          controls
          class="w-full h-auto max-h-120"
          preload="metadata"
        >
          Your browser does not support the video tag.
        </video>
        <div v-else class="flex items-center justify-center py-4 px-6 text-muted gap-4">
          <UIcon name="i-lucide-eye" class="size-8" />
          <p>Preview not available</p>
        </div>
      </div>

      <UButton
        icon="i-lucide-download"
        label="Download"
        @click="$emit('download')"
      />
    </div>
  </UCard>
</template>

<script setup lang="ts">
const { mediaType } = defineProps<{
  mediaUrl: string
  mediaType: string
  isFullPage?: boolean
}>()

defineEmits<{
  (e: 'download'): void
}>()

const isImage = computed(() => mediaType.startsWith('image/'))
const isVideo = computed(() => mediaType.startsWith('video/'))
</script>
