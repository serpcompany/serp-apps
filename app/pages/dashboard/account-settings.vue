<template>
  <UContainer class="py-8">
    <div class="flex items-center gap-2">
      <UButton
        @click="$router.back()"
        icon="i-lucide-arrow-left"
        color="neutral"
        variant="soft"
      />
    </div>
    <div class="mt-8 space-y-8">
      <AppAccountSettings />
      <AppPasswordSettings />
      <AppPasskeySettings />
    </div>
  </UContainer>
</template>