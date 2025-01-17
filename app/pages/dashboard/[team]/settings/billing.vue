<template>
  <AppContainer
    title="Billing"
    description="Manage your billing information and subscription plans."
  >
    <template #actions>
      <div class="flex justify-center">
        <UTabs
          color="neutral"
          v-if="hasMultipleIntervals"
          size="sm"
          :items="[
            { label: 'Monthly', value: 'month' },
            { label: 'Yearly', value: 'year' },
          ]"
          v-model="selectedInterval"
        />
      </div>
    </template>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-4">
      <div v-for="plan in plans" :key="plan.id">
        <AppPricingCard
          :plan="plan"
          :selected-interval="selectedInterval"
          :highlight="plan.id === currentPlan"
          @subscribe="subscribe(plan.id)"
          :loading="loading"
        />
      </div>
    </div>
    <div class="mt-12">
      <p class="font-bold">Billing history</p>
      <p class="truncate text-xs text-zinc-500 md:text-sm">
        Find and download invoices
      </p>
      <AppInvoices />
    </div>
  </AppContainer>
</template>

<script lang="ts" setup>
import type { Plan } from '@@/types/stripe'
const currentPlan = ref('prod_Ra34EdJKmjJyIS')
const selectedInterval = ref('month')
const { currentTeam } = useTeam()
const { data: plans } = await useFetch<Plan[]>(`/api/payments/plans`)
const loading = ref(false)
// Check if we have multiple billing intervals
const hasMultipleIntervals = computed(() => {
  if (!plans.value?.[0]?.variants) return false
  const intervals = new Set(plans.value[0].variants.map((v) => v.interval))
  return intervals.size > 1
})

const getCurrentVariant = (plan: Plan) => {
  return plan.variants.find((v) => v.interval === selectedInterval.value)
}

const subscribe = async (planId: string) => {
  const plan = plans.value?.find((p) => p.id === planId)
  if (!plan) return
  const variant = getCurrentVariant(plan)
  if (!variant) {
    throw createError('No pricing variant found for selected interval')
  }
  if (!currentTeam.value) return

  loading.value = true
  const checkoutSession = await $fetch('/api/payments/create-checkout', {
    query: {
      teamId: currentTeam.value.id,
      variantId: variant.id,
    },
  })
  if (!checkoutSession.url) return
  window.location.href = checkoutSession.url
}
</script>
