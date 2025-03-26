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
        <AppUrlShortnerListItem v-for="url in urls" :key="url.id" :url="url" />
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
            :help="`${host}/l/${state.shortcode}`"
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
                    @click="randomizeShortcode"
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
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useDocumentVisibility } from '@vueuse/core'

const visibility = useDocumentVisibility()

const isModalOpen = ref(false)
const searchQuery = ref('')
const loading = ref(false)
const items = ref(['Social Media', 'Marketing', 'Sales', 'Product'])

const {
  host,
  urls,
  generateQRCode,
  downloadQRCode,
  getUniqueShortcode,
  createUrl,
  refresh,
  generateNewShortcode,
} = useUrlShortner()

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

const qrCode = computed(() => {
  return generateQRCode(state.shortcode || '')
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    await createUrl(event.data)
    isModalOpen.value = false
  } finally {
    loading.value = false
  }
}

const openModal = async () => {
  isModalOpen.value = true
  state.shortcode = await getUniqueShortcode()
}

const copyQRCode = () => {
  const svg = generateQRCode(state.shortcode || '')
  const blob = new Blob([svg], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  navigator.clipboard.writeText(url)
}

const randomizeShortcode = async () => {
  state.shortcode = await getUniqueShortcode()
}

watch(visibility, (current, previous) => {
  if (current === 'visible' && previous === 'hidden') {
    refresh()
  }
})
</script>
