<template>
  <div class="chunky-card bg-white dark:bg-neutral-950 p-4 md:p-6 rounded-3xl">
    <p class="text-sm font-semibold text-primary-600">{{ title }}</p>
    <p class="text-4xl font-semibold mt-4">
      {{ currency }} {{ price
      }}<span class="text-sm font-normal">/{{ interval }}</span>
    </p>
    <p class="text-sm text-gray-500 dark:text-gray-400">{{ description }}</p>
    <UButton
      class="mt-4 rounded-2xl"
      label="Get Started"
      size="xl"
      block
      :variant="highlight ? 'solid' : 'soft'"
    />
    <USeparator class="my-4" />
    <ul class="space-y-3">
      <li
        v-for="feature in features"
        :key="feature.label"
        class="flex items-center gap-2"
      >
        <div class="h-8 w-8 flex items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/10">
          <UIcon :name="feature.icon" class="text-primary-600 text-lg" />
        </div>
        <p class="text-gray-500 dark:text-gray-400">
          {{ feature.label }}
        </p>
        <UTooltip v-if="feature.info" :text="feature.info" :delay-duration="0">
          <UIcon name="i-lucide-info" class="text-gray-500 dark:text-gray-400" />
        </UTooltip>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  price: string
  description: string
  interval: string
  currency: string
  features: {
    icon: string
    label: string
    info?: string
  }[]
  highlight?: boolean
}>()
</script>
