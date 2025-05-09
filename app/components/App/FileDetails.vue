<template>
  <div v-if="file" class="p-4">
    <div class="mb-6 flex items-center justify-between">
      <h3 class="font-semibold">File Details</h3>
      <UButton
        icon="i-lucide-x"
        color="neutral"
        variant="ghost"
        size="xs"
        @click="$emit('close')"
      />
    </div>

    <div class="space-y-6">
      <!-- Preview -->
      <div
        class="flex min-h-48 items-center justify-center overflow-hidden rounded-lg bg-neutral-50 dark:bg-neutral-800"
      >
        <img
          v-if="file.type.startsWith('image/')"
          :src="getFileUrl(file)"
          class="h-full w-full object-cover"
          :alt="file.fileName"
        >
        <video
          v-else-if="file.type.startsWith('video/')"
          :src="getFileUrl(file)"
          class="h-full w-full"
          controls
          playsinline
        />
        <div v-else-if="file.type.startsWith('audio/')" class="w-full p-4">
          <audio :src="getFileUrl(file)" class="w-full" controls />
        </div>
        <div v-else class="flex h-full w-full items-center justify-center">
          <UIcon
            :name="getFileIcon(file.type)"
            class="h-16 w-16 text-neutral-400"
          />
        </div>
      </div>

      <!-- Info -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <p class="text-sm text-neutral-500 dark:text-neutral-400">Type</p>
          <p class="text-sm font-medium">{{ file.type }}</p>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-sm text-neutral-500 dark:text-neutral-400">Size</p>
          <p class="text-sm font-medium">
            {{ formatFileSize(file.size) }}
          </p>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-sm text-neutral-500 dark:text-neutral-400">Owner</p>
          <p class="flex items-center gap-2 text-sm font-medium">
            <UAvatar :src="file.userId.avatarUrl" size="xs" />
            {{ file.userId.name }}
          </p>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-sm text-neutral-500 dark:text-neutral-400">Modified</p>
          <p class="text-sm font-medium">
            {{
              file.updatedAt
                ? useDateFormat(file.updatedAt, 'MMM D, YYYY h:mm').value
                : '-'
            }}
          </p>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-sm text-neutral-500 dark:text-neutral-400">Created</p>
          <p class="text-sm font-medium">
            {{
              file.createdAt
                ? useDateFormat(file.createdAt, 'MMM D, YYYY h:mm').value
                : '-'
            }}
          </p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-2">
        <UButton
          icon="i-lucide-download"
          color="neutral"
          variant="solid"
          block
          :to="getFileUrl(file)"
          target="_blank"
        >
          Download
        </UButton>
        <UButton
          icon="i-lucide-trash"
          color="error"
          block
          @click="handleDeleteFile(file.id)"
        >
          Delete
        </UButton>
      </div>
    </div>
  </div>
  <div v-else class="flex h-full items-center justify-center p-4">
    <div class="text-center">
      <UIcon
        name="i-lucide-file"
        class="mx-auto mb-2 h-8 w-8 text-neutral-400"
      />
      <p class="text-sm text-neutral-500 dark:text-neutral-400">
        Select a file to view details
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { getFileIcon } from '~/utils/fileicons'

interface File {
  id: string
  userId: {
    id: string
    name: string
    avatarUrl: string
    email: string
  }
  createdAt: Date | null
  updatedAt: Date | null
  teamId: string
  pathname: string
  fileName: string
  size: number | null
  type: string
}

const { file } = defineProps<{
  file: File | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'delete', id: string): void
}>()

const handleDeleteFile = async (id: string) => {
  emit('delete', id)
}

const formatFileSize = (bytes: number | null) => {
  if (!bytes) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getFileUrl = (file: File) => {
  return `/files/${file.pathname}`
}
</script>
