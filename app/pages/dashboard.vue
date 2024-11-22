<template>
  <UContainer class="space-y-4 py-12">
    <p class="text-3xl font-bold">Welcome {{ user?.name }}</p>
    <UButton @click="signOut"> Log out </UButton>
  </UContainer>
</template>

<script setup lang="ts">
const { user, clear } = useUserSession()
definePageMeta({
  middleware: 'auth',
})

async function signOut() {
  await clear()
  return navigateTo('/')
}
</script>
