<template>
  <AppContainer
    title="Billing"
    description="Manage your billing information and subscription plans."
    :padding="false"
  >
    <UContainer class="py-4 sm:py-6 lg:py-8">
      <AppSubscriptionBilling v-if="PURCHASE_METHOD === 'subscription'" />
      <AppOneTimeBilling v-else />
    </UContainer>
  </AppContainer>
</template>

<script lang="ts" setup>
import { PURCHASE_METHOD } from '~~/constants'
</script>
