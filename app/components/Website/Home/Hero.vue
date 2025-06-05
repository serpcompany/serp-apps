<template>
  <section class="py-20 sm:py-24">
    <div class="text-center max-w-3xl mx-auto space-y-4 sm:space-y-8">
      <h1 class="text-4xl sm:text-7xl font-black font-display">
        SERP App
      </h1>
      <p
        class="text-base sm:text-xl text-neutral-500 leading-relaxed dark:text-neutral-400 animate-3 text-center text-balance max-w-3xl mx-auto"
      >
        Growth & automation tools to help brands grow online.
      </p>
      <div class="flex items-center gap-4 animate-4 justify-center flex-col">
        <AuthState v-slot="{ loggedIn: isAuthLoggedIn }">
          <UButton
            size="xl" color="primary"
            class="rounded-2xl ring-4 ring-neutral-900/10 dark:ring-white/20 px-6 hover:ring-2 transition-shadow duration-300"
            :label="isAuthLoggedIn ? 'Tool' : 'Get Started'" :to="isAuthLoggedIn ? '/dashboard' : '/auth/register'"
            trailing-icon="i-lucide-arrow-right"
          />
        </AuthState>
        <!-- <p class="text-xs text-neutral-500 dark:text-neutral-400">
          No credit card required
        </p> -->
      </div>
    </div>
  </section>
</template>
