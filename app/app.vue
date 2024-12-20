<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator />
  <UApp>
    <NuxtPage />
  </UApp>
  <Toaster position="top-center" class="z-50"/>
</template>

<script lang="ts" setup>
import { Toaster } from 'vue-sonner'
useSeoMeta({
  title: 'Supersaas',
  description: 'The fullstack Nuxt 3 SaaS starter kit',
})
</script>
