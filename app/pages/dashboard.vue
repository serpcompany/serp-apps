<template>
  <div>
    <SuperAdminImpersonationBanner v-if="user?._impersonated" :user="user" />
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
  layout: 'dashboard'
});
const { user } = useUserSession();
</script>
