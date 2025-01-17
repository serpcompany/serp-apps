<template>
  <AppContainer title="Payment successful">
    <div
      class="flex min-h-[calc(100vh-28px)] flex-col items-center justify-center py-12"
    >
      <UIcon name="i-lucide-loader-circle" class="animate-spin text-3xl" />
      <h1 class="mt-4 font-bold">Processing your subscription...</h1>
      <p class="mt-1 text-sm text-gray-500">
        Please wait while we set up your account.
      </p>
    </div>
  </AppContainer>
</template>

<script setup lang="ts">
const { currentTeam } = useTeam()

// Sync subscription data on page load
onMounted(async () => {
  if (!currentTeam.value?.id) {
    throw createError('No team found')
  }

  try {
    await $fetch('/api/payments/sync-subscription', {
      query: {
        teamId: currentTeam.value.id,
      },
    })
    // Redirect to billing page after successful sync
    return navigateTo(`/dashboard/${currentTeam.value.id}/settings/billing`)
  } catch (error) {
    throw createError('Failed to sync subscription data')
  }
})
</script>
