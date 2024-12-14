<template>
  <UFormField
    label="Team Logo"
    name="logo"
    help="Recommended size: 1 MB, 1:1 aspect ratio"
  >
    <div class="flex items-center">
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
        label="Upload"
        class="ml-2"
        size="sm"
        @click="open"
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
</script>
