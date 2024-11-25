<template>
  <UContainer class="space-y-4 py-12">
    <p class="text-7xl font-bold">Supersaas V3</p>
    <NuxtLink class="block hover:underline" to="/auth/login-email-password"> Login (Email/Password) </NuxtLink>
    <NuxtLink class="block hover:underline" to="/auth/magic-link"> Login (Magic Link) </NuxtLink>
    <NuxtLink class="block hover:underline" to="/auth/login-passkey"> Login (Passkey) </NuxtLink>
    <NuxtLink class="block hover:underline" to="/auth/social-login"> Social Login </NuxtLink>
    <NuxtLink class="block hover:underline" to="/auth/register"> Register </NuxtLink>
    <NuxtLink class="block hover:underline" to="/dashboard"> Dashboard </NuxtLink>
  </UContainer>
</template>
