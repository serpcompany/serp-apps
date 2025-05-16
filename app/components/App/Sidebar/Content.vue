<template>
  <div class="flex-1 overflow-y-auto">
    <AppSidebarLink v-for="item in items" :key="item.label" :to="item.to" :icon="item.icon" :label="item.label" />
  </div>
  <footer>
    <AppUserDropdown />
  </footer>
</template>

<script lang="ts" setup>
const items = [
  {
    icon: 'i-custom-home',
    label: 'Dashboard',
    to: '/dashboard'
  },
  {
    icon: 'i-lucide-file-text',
    label: 'Posts',
    to: '/dashboard/posts'
  },
  {
    icon: 'i-lucide-message-square',
    label: 'AI Chat',
    to: '/dashboard/ai-chat'
  },
];
</script>
