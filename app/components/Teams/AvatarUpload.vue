<template>
  <UFormField name="logo" help="Recommended size: 1 MB, 1:1 aspect ratio">
    <div class="relative flex items-center space-x-2">
      <UAvatar
        :src="fileUrl || model"
        icon="i-lucide-upload"
        size="3xl"
        :ui="{ icon: 'text-lg' }"
        :alt="props.name"
      />
      <UButton
        type="button"
        color="neutral"
        variant="soft"
        :label="fileUrl ? 'Change' : 'Upload'"
        size="sm"
        @click="open"
      />
      <UButton
        v-if="fileUrl"
        type="button"
        color="error"
        variant="soft"
        label="Remove"
        size="sm"
        @click="remove"
      />
    </div>
  </UFormField>
</template>

<script lang="ts" setup>
import { useFileDialog, useObjectUrl } from '@vueuse/core'

const model = defineModel<string>()
const props = defineProps<{
  name: string
}>()

const fileUrl = ref<string | null>(null)
const { files, open, onChange } = useFileDialog({
  accept: 'image/*',
  multiple: false,
})

// Emit the selected file to parent
const emit = defineEmits<{
  'update:file': [File | null]
}>()

onChange(() => {
  const file = files.value?.[0]
  if (file) {
    const objectUrl = useObjectUrl(file)
    fileUrl.value = objectUrl.value || objectUrl
    emit('update:file', file)
  }
})

const remove = () => {
  fileUrl.value = null
  emit('update:file', '')
}
</script>
