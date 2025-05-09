<template>
  <div class="rounded-2xl bg-[#fbfaf9] p-1.5 dark:bg-neutral-950">
    <div class="card-shadow rounded-xl bg-white dark:bg-neutral-900">
      <header
        v-if="title"
        class="border-b border-neutral-100 px-4 py-2 dark:border-white/10"
      >
        <p class="text-sm text-neutral-500">{{ title }}</p>
      </header>
      <div class="p-4">
        <slot />
        <p v-if="description" class="text-sm text-neutral-500">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>
