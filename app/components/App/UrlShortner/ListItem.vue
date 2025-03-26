<template>
  <li class="p-4">
    <div
      class="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:gap-2"
    >
      <div class="flex flex-1 items-center gap-2">
        <div
          class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 dark:border-white/10"
        >
          <UAvatar
            :src="`https://logo.clearbit.com/${encodeURIComponent(url.url)}`"
            icon="i-lucide-globe"
            :ui="{ root: 'size-4' }"
          />
        </div>
        <div class="flex flex-1 flex-col">
          <p class="text-sm font-medium">{{ fullUrl }}</p>
          <div class="mt-0.5 flex items-center gap-2">
            <UIcon
              name="i-fluent-arrow-enter-24-filled"
              class="scale-x-[-1] text-sm ml-1"
            />
            <p class="text-xs text-gray-500">{{ url.url }}</p>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap items-center justify-end gap-2">
        <UBadge :label="`${url.clicks} clicks`" color="neutral" />
        <UButton
          color="neutral"
          variant="soft"
          icon="i-lucide-globe"
          :to="fullUrl"
          external
          target="_blank"
          :ui="{ leadingIcon: 'size-4' }"
        />
        <UButton
          color="neutral"
          variant="soft"
          :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
          @click="copyUrl(url.shortcode)"
          :ui="{ leadingIcon: 'size-4' }"
        />
        <UPopover mode="hover">
          <UButton
            color="neutral"
            variant="soft"
            icon="i-lucide-qr-code"
            :ui="{ leadingIcon: 'size-4' }"
          />
          <template #content>
            <div class="p-2">
              <div v-html="qrCode" class="h-32 w-32"></div>
            </div>
          </template>
        </UPopover>
        <UButton
          color="error"
          variant="soft"
          :loading="isDeleting"
          icon="i-lucide-trash"
          @click="deleteUrl(url.id)"
          :ui="{ leadingIcon: 'size-4' }"
        />
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import type { Url } from '@@/types/database'

const props = defineProps<{
  url: Url
}>()

const { host, copyUrl, copied, generateQRCode, deleteUrl, isDeleting } = useUrlShortner()

const fullUrl = computed(() => {
  return `${host}/l/${props.url.shortcode}`
})

const qrCode = computed(() => {
  return generateQRCode(props.url.shortcode)
})
</script>
