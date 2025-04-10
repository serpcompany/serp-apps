import { useFileDialog } from '@vueuse/core'
import type { File } from '@@/types/database'

export const useFileManager = (teamId?: string) => {
  const loading = ref(false)
  const deletingFileId = ref<string | null>(null)
  const selectedFile = ref<File | null>(null)

  // File upload handling
  const { open: openFileDialog, onChange: onFileSelect } = useFileDialog({
    multiple: false,
  })

  // File selection handler
  onFileSelect((files) => {
    if (!files?.[0]) return
    handleFileUpload(files[0])
  })

  const { data: files, refresh } = teamId
    ? useFetch<File[]>(`/api/teams/${teamId}/files`)
    : { data: ref([]), refresh: () => {} }

  async function handleFileUpload(file: globalThis.File) {
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
    if (!teamId) return
    try {
      const response = await $fetch(`/api/teams/${teamId}/files`, {
        method: 'POST',
        body: formData,
      })
      return response
    } catch (error) {
      console.error(error)
      throw createError('Failed to upload file')
    }
  }

  // File size formatter
  function formatFileSize(bytes: string | number | null) {
    if (!bytes) return '0 B'
    const size = typeof bytes === 'string' ? parseInt(bytes) : bytes
    if (size < 1024) return size + ' B'
    if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB'
    return (size / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const getFileUrl = (file: File) => {
    return `/files/${file.pathname}`
  }

  const handleDeleteFile = async (fileId: string) => {
    if (!teamId) return
    try {
      deletingFileId.value = fileId
      await $fetch(`/api/teams/${teamId}/files/${fileId}`, {
        method: 'DELETE',
      })
      refresh()
      selectedFile.value = null
    } catch (error) {
      console.error(error)
      throw createError('Failed to delete file')
    } finally {
      deletingFileId.value = null
    }
  }

  return {
    loading,
    files,
    selectedFile,
    deletingFileId,
    openFileDialog,
    formatFileSize,
    getFileUrl,
    handleDeleteFile,
    refresh,
  }
}
