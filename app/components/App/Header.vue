<template>
  <header class="border-b border-neutral-100 p-4 dark:border-white/10">
    <UContainer class="flex w-full items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-2">
        <img src="/logo.png" alt="logo" class="h-6 w-auto md:h-7">
        <p class="font-bold">SERP App</p>
      </NuxtLink>
      <div class="hidden flex-1 items-center justify-center gap-3 md:flex">
        <UButton label="Features" color="neutral" variant="ghost" />
        <UButton label="Pricing" color="neutral" variant="ghost" />
        <UButton label="Blog" color="neutral" variant="ghost" />
        <UButton label="Docs" color="neutral" variant="ghost" />
        <UButton label="Tools" color="neutral" variant="ghost" to="/tools" />
      </div>
      <div class="flex items-center gap-3">
        <AuthState v-slot="{ loggedIn: isAuthLoggedIn }">
          <UButton
            v-if="isAuthLoggedIn"
            color="neutral"
            variant="soft"
            label="Go to App"
            to="/dashboard"
          />
          <UButtonGroup v-else>
            <UButton
              color="neutral"
              variant="soft"
              to="/auth/login"
              label="Login"
            />
            <UDropdownMenu
              :items="authOptions"
              :content="{
                align: 'end',
                side: 'bottom',
                sideOffset: 8,
              }"
              :ui="{
                content: 'w-full',
                itemLeadingIcon: 'size-4',
              }"
            >
              <UButton
                color="neutral"
                variant="soft"
                icon="i-lucide-chevron-down"
                class="border-l border-neutral-200/50 dark:border-white/10"
              />
            </UDropdownMenu>
          </UButtonGroup>
        </AuthState>
        <ThemeToggle />
      </div>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
const authOptions = ref([
  {
    label: 'Login (Email/Password)',
    to: '/auth/login',
    icon: 'i-lucide-key-square',
  },
  {
    label: 'Login with Magic Link',
    to: '/auth/magic-link',
    icon: 'i-lucide-mail',
  },
  {
    label: 'Login with Passkey',
    to: '/auth/login-passkey',
    icon: 'i-lucide-fingerprint',
  },
  {
    label: 'Social Login',
    to: '/auth/social-login',
    icon: 'i-lucide-twitter',
  },
  {
    label: 'Phone Number Login',
    to: '/auth/login-phone',
    icon: 'i-lucide-phone',
  },
  {
    label: 'Register',
    to: '/auth/register',
    icon: 'i-lucide-user-plus',
  },
])
</script>
