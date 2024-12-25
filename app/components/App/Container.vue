<template>
  <div class="p-4">
    <header class="flex items-start gap-2 md:items-center">
      <UButton
        icon="i-lucide-menu"
        color="neutral"
        variant="ghost"
        class="flex md:hidden"
        @click="mobileMenu = !mobileMenu"
      />
      <div class="min-w-0 flex-1">
        <h1 class="flex-1 truncate font-bold">{{ title }}</h1>
        <p class="truncate text-xs text-gray-500 md:text-sm">
          {{ description }}
        </p>
      </div>
      <slot name="actions" />
    </header>
    <div class="mt-4">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const mobileMenu = useState('mobileMenu')
defineProps<{
  title: string
  description?: string
}>()
</script>
