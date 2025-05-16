<template>
  <main class="py-12 space-y-4">
    <h1 class="text-4xl font-bold">This is your home page</h1>
    <div>
      <AuthState v-slot="{ loggedIn: isAuthLoggedIn }">
        <UButton
          v-if="isAuthLoggedIn"
          color="neutral"
          variant="soft"
          label="Go to App"
          to="/dashboard"
        />
        <UButton
          v-else
          color="neutral"
          variant="soft"
          label="Login"
          to="/auth/login"
        />
      </AuthState>
    </div>
    <ThemeToggle />
  </main>
</template>
