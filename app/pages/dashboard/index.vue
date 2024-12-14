<template>
  <UContainer class="p-4">
    <p class="text-xl font-bold">Welcome {{ user?.name }}</p>
  </UContainer>
</template>

<script setup lang="ts">
const { user } = useUserSession()
</script>
