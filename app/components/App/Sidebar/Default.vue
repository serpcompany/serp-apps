<template>
  <header class="flex items-center gap-2 p-2">
    <img src="/logo.png" alt="logo" class="h-6 w-auto md:h-7">
    <p class="font-bold">SERP Apps</p>
  </header>
  <AppSidebarContent class="mt-2">
    <AppSidebarGroup>
      <AppSidebarLink v-for="link in links" :key="link.to" v-bind="link" />
    </AppSidebarGroup>
  </AppSidebarContent>
</template>

<script lang="ts" setup>
import { SerpTools } from '@@/constants'

const serpLinks = SerpTools.map((tool) => ({
  label: tool.title,
  icon: tool.icon,
  to: `/dashboard${tool.path || ''}`,
}))

const links = computed(() => [
  {
    label: 'Home',
    icon: 'i-lucide-home',
    to: '/dashboard',
  },
  {
    label: 'Posts',
    icon: 'i-lucide-file-text',
    to: '/dashboard/posts',
  },
  ...serpLinks,
  {
    label: 'Billing',
    icon: 'i-lucide-credit-card',
    to: '/dashboard/billing',
  },
])
</script>
