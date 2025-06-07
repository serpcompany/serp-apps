<template>
  <AppContainer
    title="Billing"
    description="Manage your billing information and subscription plans."
  >
    <UContainer>
      <AppSubscriptionBilling v-if="PURCHASE_METHOD === 'subscription'" />
      <AppOneTimeBilling v-else />
    </UContainer>
  </AppContainer>
</template>

<script lang="ts" setup>
import { PURCHASE_METHOD } from '~~/constants'
</script>
