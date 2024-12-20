<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { data } = await useFetch('/api/me/memberships')
const route = useRoute()
useState('teams', () => data.value)

if (route.path === '/dashboard' || route.path === '/dashboard/') {
  if (!data.value?.length) {
    await navigateTo('/dashboard/onboard')
  } else {
    await navigateTo(`/dashboard/${data.value[0]?.slug}`)
  }
}
</script>
