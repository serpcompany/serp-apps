<template>
  <AppContainer
    title="Billing"
    description="Manage your billing information and subscription plans."
  >
    <AppSubscriptionBilling v-if="PURCHASE_METHOD === 'subscription'" />
  </AppContainer>
</template>

<script lang="ts" setup>
import { PURCHASE_METHOD } from '~~/constants'
</script>
