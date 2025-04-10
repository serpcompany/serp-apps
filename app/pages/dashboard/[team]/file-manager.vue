<template>
  <div class="flex h-screen flex-col">
    <header
      class="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-neutral-200 bg-white px-4 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <UButton
        icon="i-lucide-menu"
        color="neutral"
        variant="ghost"
        class="flex md:hidden"
        @click="mobileMenu = !mobileMenu"
      />
      <p class="font-semibold">File Manager</p>
      <UButton
        icon="i-lucide-upload"
        color="neutral"
        size="sm"
        label="Upload"
        :loading="loading"
        @click="openFileDialog()"
      />
    </header>

    <!-- Main Content Area -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Main Content -->
      <div class="flex-1 overflow-y-auto">
        <div class="overflow-x-auto">
          <table
            class="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800"
          >
            <thead>
              <tr
                class="text-left text-xs tracking-wider text-neutral-500 uppercase dark:text-neutral-400"
              >
                <th class="px-4 py-3">File</th>
                <th class="px-4 py-3">Name</th>
                <th class="px-4 py-3">Size</th>
                <th class="px-4 py-3">Created</th>
                <th class="px-4 py-3 text-right" />
              </tr>
            </thead>
            <tbody class="divide-y divide-neutral-200 dark:divide-neutral-800">
              <tr
                v-for="file in files"
                :key="file.id"
                class="cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                :class="{
                  'bg-neutral-100 dark:bg-neutral-800':
                    selectedFile?.id === file.id,
                }"
                @click="selectedFile = file"
              >
                <td class="px-4 py-3">
                  <img
                    v-if="file.type.startsWith('image/')"
                    :src="getFileUrl(file) || ''"
                    class="h-12 w-12 rounded object-cover"
                    :alt="file.fileName"
                  />
                  <div
                    v-else
                    class="flex h-12 w-12 items-center justify-center rounded bg-neutral-100 dark:bg-neutral-800"
                  >
                    <UIcon
                      :name="getFileIcon(file.type)"
                      class="h-8 w-8 text-neutral-400"
                    />
                  </div>
                </td>
                <td class="px-4 py-3">
                  <div class="max-w-xs truncate text-sm font-medium">
                    {{ file.fileName }}
                  </div>
                </td>
                <td class="px-4 py-3">
                  <div class="text-sm text-neutral-600 dark:text-neutral-400">
                    {{ formatFileSize(file.size) }}
                  </div>
                </td>
                <td class="px-4 py-3">
                  <div class="text-sm text-neutral-600 dark:text-neutral-400">
                    {{ useDateFormat(file.createdAt, 'MMM D, YYYY').value }}
                  </div>
                </td>
                <td class="px-4 py-3 text-right">
                  <div class="flex justify-end gap-2">
                    <UButton
                      icon="i-lucide-download"
                      color="neutral"
                      variant="ghost"
                      size="xs"
                      :to="`/files/${file.pathname}`"
                      target="_blank"
                    />
                    <UButton
                      icon="i-lucide-trash-2"
                      color="error"
                      variant="ghost"
                      size="xs"
                      :loading="deletingFileId === file.id"
                      @click.stop="handleDeleteFile(file.id)"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Fixed Sidebar -->
      <div
        class="hidden w-80 flex-shrink-0 overflow-y-auto border-l border-neutral-200 bg-white md:block dark:border-neutral-800 dark:bg-neutral-900"
      >
        <AppFileDetails
          :file="selectedFile"
          @close="selectedFile = null"
          @delete="handleDeleteFile"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { z } from 'zod'
import type { File, InsertFile } from '@@/types/database'

import { useDateFormat, useFileDialog } from '@vueuse/core'
import { getFileIcon } from '@/utils/fileicons'

const deletingFileId = ref<string | null>(null)
const mobileMenu = useState('mobileMenu')
const { currentTeam } = useTeam()
const selectedFile = ref<File | null>(null)
const loading = ref(false)

// File upload handling
const { open: openFileDialog, onChange: onFileSelect } = useFileDialog({
  multiple: false,
})

// File selection handler
onFileSelect((files) => {
  if (!files?.[0]) return
  handleFileUpload(files[0])
})

async function handleFileUpload(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('size', file.size.toString())
  formData.append('type', file.type)
  formData.append('fileName', file.name)
  try {
    loading.value = true
    await createFile(formData)
    refresh()
  } catch (error) {
    console.error(error)
    throw createError('Failed to upload file')
  } finally {
    loading.value = false
  }
}

async function createFile(formData: FormData) {
  try {
    const response = await $fetch(`/api/teams/${currentTeam.value?.id}/files`, {
      method: 'POST',
      body: formData,
    })
    return response
  } catch (error) {
    console.error(error)
    throw createError('Failed to upload file')
  }
}

const { data: files, refresh } = await useFetch<File[]>(
  `/api/teams/${currentTeam.value?.id}/files`,
  {
    watch: [currentTeam],
  },
)

// File size formatter
function formatFileSize(bytes: string) {
  const size = parseInt(bytes)
  if (size < 1024) return size + ' B'
  if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB'
  return (size / (1024 * 1024)).toFixed(1) + ' MB'
}

const getFileUrl = (file: File) => {
  return `/files/${file.pathname}`
}

const handleDeleteFile = async (fileId: string) => {
  try {
    deletingFileId.value = fileId
    await $fetch(`/api/teams/${currentTeam.value?.id}/files/${fileId}`, {
      method: 'DELETE',
    })
    refresh()
    selectedFile.value = null
  } catch (error) {
    console.error(error)
    throw createError('Failed to delete file')
  }
}
</script>
