<template>
  <main>
    <header class="border-b border-neutral-200 dark:border-white/10">
      <UContainer class="flex w-full items-center justify-between py-3">
        <NuxtLink to="/" class="flex items-center gap-2">
          <img src="/logo.png" alt="logo" class="h-6 w-auto md:h-7" />
          <p class="font-bold">Supersaas V3</p>
        </NuxtLink>
        <div class="hidden flex-1 items-center justify-center gap-3 md:flex">
          <UButton label="Features" color="neutral" variant="ghost" />
          <UButton label="Pricing" color="neutral" variant="ghost" />
          <UButton label="Blog" color="neutral" variant="ghost" />
          <UButton label="Docs" color="neutral" variant="ghost" />
        </div>
        <div class="flex items-center gap-3">
          <AuthState v-slot="{ loggedIn }">
            <UButton
              v-if="loggedIn"
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
    <UContainer class="relative space-y-12">
      <div class="pt-12 pb-12 sm:pt-32 sm:pb-16">
        <div class="mx-auto max-w-4xl space-y-6 text-center sm:space-y-8">
          <p class="text-4xl font-bold tracking-tight text-balance sm:text-6xl">
            Ship 🏴‍☠️ a fullstack SaaS app faster than ever.
          </p>
          <p class="text-base text-balance text-neutral-500 sm:text-xl">
            Teams, Typescript, Drizzle ORM, NuxtHub, Postgres, Turso,
            TailwindCSS V4, Nuxt UI V3. All in one package. This is a mock
            title.
          </p>

          <div class="flex items-center justify-center gap-3">
            <UButton
              label="Get Started"
              color="primary"
              size="xl"
              class="rounded-2xl"
              trailing-icon="i-lucide-arrow-right"
              :ui="{
                trailingIcon: 'size-5',
              }"
              :to="loggedIn ? '/dashboard' : '/auth/register'"
            />
            <UButton
              label="Get a demo"
              color="neutral"
              variant="ghost"
              size="xl"
              class="rounded-2xl"
            />
          </div>
        </div>
      </div>
      <div
        class="relative aspect-video rounded-3xl bg-neutral-200 dark:bg-neutral-800"
      ></div>
    </UContainer>
  </main>
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
