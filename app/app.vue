<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator />
  <NuxtPage />
  <Toaster position="top-center" />
</template>

<script lang="ts" setup>
import { Toaster } from 'vue-sonner'
useSeoMeta({
  title: 'Supersaas',
  description: 'The fullstack Nuxt 3 SaaS starter kit',
})
</script>
