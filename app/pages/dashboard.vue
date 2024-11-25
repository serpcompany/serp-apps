<template>
  <UContainer class="space-y-4 py-12">
    <p class="text-3xl font-bold">Welcome {{ user?.name }}</p>
    <div class="rounded-lg bg-gray-100 p-4">
      <p>Name: {{ user?.name }}</p>
      <p>Email: {{ user?.email }}</p>
      <UAvatar :src="user?.avatarUrl ?? undefined" icon="i-lucide-user" />
    </div>
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
  await navigateTo('/')
}
</script>
