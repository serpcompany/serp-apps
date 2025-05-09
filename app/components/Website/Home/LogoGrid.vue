<template>
  <div class="py-20">
    <div class="relative mb-6 max-w-3xl mx-auto">
      <WebsiteHomeMarquee pause-on-hover class="[--duration:120s]">
        <div
          v-for="logo in logos"
          :key="logo"
          class="p-4 flex items-center justify-center gap-2"
        >
          <UIcon :name="logo" class="text-xl" />
        </div>
      </WebsiteHomeMarquee>
      <div
        class="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-neutral-900"
      />

      <div
        class="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-neutral-900"
      />
    </div>
    <h2 class="text-center text-sm text-neutral-500">
      Trusted by fast-growing companies around the world
    </h2>
  </div>
</template>

<script lang="ts" setup>
const logos = [
  'i-logos-segment',
  'i-logos-redspread',
  'i-logos-qualcomm',
  'i-logos-applitools',
  'i-logos-angular',
  'i-logos-apigee',
  'i-logos-datocms',
  'i-logos-discord',
  'i-logos-descript',
  'i-logos-eventbrite',
  'i-logos-maxcdn',
  'i-logos-sanity',
  'i-logos-tnw',
  'i-logos-vimeo',
  'i-logos-todoist',
  'i-logos-spotify',
  'i-logos-microsoft',
  'i-logos-netflix',
]
</script>
