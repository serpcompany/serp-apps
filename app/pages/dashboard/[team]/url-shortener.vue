<template>
  <AppContainer title="Link Manager">
    <template #actions>
      <div class="flex items-center gap-2">
        <UInput
          v-model="searchQuery"
          placeholder="Search"
          icon="i-lucide-search"
          class="w-full"
        />
        <UButton label="Create New Link" @click="openModal" />
      </div>
    </template>
    <div>
      <ul class="divide-y divide-gray-200 dark:divide-white/10">
        <li v-for="url in urls" :key="url.id" class="p-4">
          <div class="flex w-full items-center gap-2">
            <UAvatar :src="url.logo" icon="i-lucide-globe" />
            <div class="flex flex-1 flex-col">
              <p class="text-sm font-medium">{{ url.shortcode }}</p>
              <p class="text-sm text-gray-500">{{ url.url }}</p>
            </div>
            <div class="flex items-center gap-2">
              <UButton
                color="neutral"
                variant="soft"
                icon="i-lucide-copy"
                @click="copy(url.shortcode)"
                :ui="{ leadingIcon: 'size-4' }"
              />
              <UButton
                color="neutral"
                variant="soft"
                icon="i-lucide-trash"
                @click="deleteUrl(url.id)"
                :ui="{ leadingIcon: 'size-4' }"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </AppContainer>

  <UDrawer
    v-model:open="isModalOpen"
    title="Create New Link"
    :ui="{ container: 'max-w-5xl mx-auto' }"
  >
    <template #body>
      <div class="grid grid-cols-4 gap-4">
        <UForm
          :schema="schema"
          :state="state"
          class="col-span-3 space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="Destination URL" name="url" hint="Required">
            <UInput v-model="state.url" class="w-full" size="lg" />
          </UFormField>

          <UFormField
            label="Short Link"
            name="shortcode"
            required
            :help="`${host}/${state.shortcode}`"
          >
            <UInput
              v-model="state.shortcode"
              class="w-full"
              size="lg"
              :ui="{ trailing: 'pr-1' }"
              ref="shortcodeInput"
            >
              <template #trailing>
                <UTooltip
                  text="Generate Short Link"
                  :content="{ side: 'right' }"
                >
                  <UButton
                    color="neutral"
                    variant="link"
                    size="sm"
                    type="button"
                    icon="i-lucide-sparkles"
                    @click="getUniqueShortcode"
                  />
                </UTooltip>
              </template>
            </UInput>
          </UFormField>

          <UFormField label="Tags" name="tags" hint="Optional">
            <USelectMenu
              v-model="state.tags"
              multiple
              :items="items"
              class="w-full"
              size="lg"
            />
          </UFormField>
          <UFormField label="Comments" name="comments" hint="Optional">
            <UTextarea v-model="state.comments" class="w-full" size="lg" />
          </UFormField>
          <UButton type="submit" :loading="loading" label="Create Link" />
        </UForm>
        <div class="h-full w-full space-y-4">
          <div v-html="qrCode"></div>
          <div class="flex items-center gap-2">
            <UButton
              icon="i-lucide-download"
              @click="downloadQRCode"
              color="neutral"
              variant="soft"
            />
            <UButton
              icon="i-lucide-copy"
              @click="copyQRCode"
              color="neutral"
              variant="soft"
            />
          </div>
        </div>
      </div>
    </template>
  </UDrawer>
</template>

<script lang="ts" setup>
import { renderSVG } from 'uqr'
import { useClipboard } from '@vueuse/core'
const { copy } = useClipboard()

const isModalOpen = ref(false)
const searchQuery = ref('')
const { currentTeam } = useTeam()
const { data: urls } = useFetch(`/api/teams/${currentTeam.value.id}/urls`)
const loading = ref(false)
const items = ref(['Social Media', 'Marketing', 'Sales', 'Product'])

const host = useRuntimeConfig().public.host

import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  url: z.string().url('Invalid URL'),
  comments: z.string().optional(),
  tags: z.array(z.string()).optional(),
  logo: z.string().optional(),
  shortcode: z.string().optional(),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  url: undefined,
  comments: undefined,
  tags: undefined,
  logo: undefined,
  shortcode: undefined,
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { data } = await useFetch(`/api/teams/${currentTeam.value.id}/urls`, {
    method: 'POST',
    body: event.data,
  })
  copy(`https://${host}/${data.value?.shortcode}`)
  toast.add({
    title: 'Your short link is ready',
    description: `https://${host}/${data.value?.shortcode} has been copied to your clipboard`,
    color: 'success',
  })
  isModalOpen.value = false
}

const qrCode = computed(() => {
  return renderSVG(state.url || '')
})

const downloadQRCode = () => {
  const svg = renderSVG(state.url || '')
  const blob = new Blob([svg], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'qr-code.svg'
  a.click()
  URL.revokeObjectURL(url)
}

const copyQRCode = () => {
  const svg = renderSVG(`${host}/${state.shortcode}`)
  const blob = new Blob([svg], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  navigator.clipboard.writeText(url)
}

const openModal = () => {
  isModalOpen.value = true
  getUniqueShortcode()
}

const getUniqueShortcode = async () => {
  const data = await $fetch(
    `/api/teams/${currentTeam.value.id}/urls/short-code`,
    {
      method: 'GET',
    },
  )
  state.shortcode = data
}
</script>
