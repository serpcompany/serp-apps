<template>
  <main class="fixed inset-0 flex overflow-hidden">
    <AppSidebar />
    <div class="w-full min-w-0 flex-1 overflow-y-auto h-full">
      <slot />
    </div>
  </main>
</template>

<script lang="ts" setup>
useState('mobileMenu', () => false);
</script>
