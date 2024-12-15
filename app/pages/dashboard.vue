<template>
  <main class="fixed inset-0 flex overflow-hidden">
    <AppSidebar />
    <div class="w-full min-w-0 flex-1 overflow-y-auto">
      <NuxtPage />
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { data } = await useFetch('/api/teams/user-teams')
useState('teams', () => data.value)
</script>
