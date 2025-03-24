<template>
  <header
    class="sticky top-0 z-40 flex h-12 items-center gap-2 bg-white px-4 dark:bg-neutral-900"
  >
    <div class="flex w-full items-center gap-2">
      <UButton
        icon="i-lucide-panel-left"
        color="neutral"
        variant="ghost"
        class="flex md:hidden"
        @click="mobileMenu = !mobileMenu"
      />
      <div class="min-w-0 flex-1">
        <h1 class="flex-1 truncate font-bold">{{ title }}</h1>
      </div>
      <slot name="actions"></slot>
    </div>
  </header>
</template>

<script setup lang="ts">
const mobileMenu = useState('mobileMenu')
defineProps<{
  title: string
}>()
</script>
