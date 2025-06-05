<template>
  <UCard
    class="transition-shadow hover:shadow-lg"
  >
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-3">
        <UIcon :name="icon" class="size-6 text-primary" />
        <span class="font-semibold text-xl md:text-2xl">{{ title }}</span>
      </div>
      <p class="text-muted text-sm pr-4">{{ description }}</p>
    </div>
  </UCard>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  description: string
}>()
</script>
