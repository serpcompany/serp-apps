<template>
  <AppContainer :title="`Welcome ${user?.name}`">
    <p>Home page here</p>
  </AppContainer>
</template>

<script setup lang="ts">
const { user } = useUserSession()
</script>
