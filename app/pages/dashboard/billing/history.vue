<template>
  <AppContainer
    title="Credits History"
    :padding="false"
  >
    <UContainer class="py-4 sm:py-6 lg:py-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div class="order-last sm:order-first">
          <h1 class="text-3xl font-bold tracking-tight text-highlighted">
            Credits History
          </h1>
          <p class="mt-1 text-muted">
            A complete log of all your credit transactions.
          </p>
        </div>
        <div>
          <UButton
            icon="i-lucide-arrow-left"
            to="/dashboard/billing"
            color="neutral"
            variant="outline"
          >
            Back to Billing
          </UButton>
        </div>
      </div>

      <AppCreditsHistory />
    </UContainer>
  </AppContainer>
</template>
