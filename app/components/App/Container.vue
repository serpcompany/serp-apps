<template>
  <div class="px-4 py-2">
    <header class="flex items-center gap-2">
      <UButton
        icon="i-lucide-menu"
        color="neutral"
        variant="ghost"
        class="flex md:hidden"
        @click="mobileMenu = !mobileMenu"
      />
      <h1 class="font-bold">{{ title }}</h1>
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
}>()
</script>
