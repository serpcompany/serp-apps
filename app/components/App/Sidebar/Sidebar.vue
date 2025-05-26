<template>
  <div
    class="relative w-0 flex-col overflow-hidden border-r border-neutral-200 dark:border-white/10 md:w-64 h-full bg-neutral-50 dark:bg-neutral-900 hidden md:flex p-2"
  >
    <AppSidebarContent />
  </div>
  <USlideover v-model:open="mobileMenu" side="left" :ui="{ content: 'max-w-[75%] sm:max-w-[35%]' }">
    <template #content>
      <div
        class="flex-col overflow-hidden h-full bg-neutral-50 dark:bg-neutral-900 flex md:hidden p-2 border-r border-neutral-200 dark:border-white/10"
      >
        <AppSidebarContent />
      </div>
    </template>
  </USlideover>
</template>

<script lang="ts" setup>
const mobileMenu = useState('mobileMenu', () => false);
</script>
