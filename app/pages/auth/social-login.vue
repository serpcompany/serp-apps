<template>
  <main class="flex min-h-screen items-center justify-center">
    <div class="mx-auto w-full max-w-sm space-y-4">
      <img src="/logo.png" alt="logo" class="mx-auto h-10 w-10" />
      <div class="text-center">
        <p class="text-lg font-bold">Sign in to your account</p>
        <p class="text-sm text-gray-500">
          Welcome back! Please sign in to continue.
        </p>
      </div>
      <div class="space-y-2">
        <AuthSocialLoginButton
          label="Google"
          icon="i-mdi-google"
          provider="google"
        />
        <AuthSocialLoginButton
          label="Github"
          icon="i-mdi-github"
          provider="github"
        />
        <AuthSocialLoginButton
          label="Discord"
          icon="i-mdi-discord"
          provider="discord"
        />
      </div>
    </div>
  </main>
</template>
