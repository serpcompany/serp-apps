<template>
  <NuxtLink
    :to="to"
  >
    <UCard
      class="group cursor-pointer transition-shadow hover:shadow-lg relative"
    >
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-3">
          <UIcon :name="icon" class="size-6 text-primary" />
          <span class="font-semibold text-xl md:text-2xl">{{ title }}</span>
        </div>
        <p class="text-neutral-600 dark:text-neutral-300 text-sm pr-4">{{ description }}</p>
        <UIcon name="i-lucide-arrow-right" class="size-6 text-primary absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-2" />
      </div>
    </UCard>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  description: string
  to?: string
}>()
</script>
