<template>
  <AppContainer title="Billing">
    <div class="mx-auto max-w-7xl">
      <div class="mb-8 flex justify-center">
        <UTabs
          v-if="hasMultipleIntervals"
          :items="[
            { label: 'Monthly', value: 'month' },
            { label: 'Yearly', value: 'year' },
          ]"
          v-model="selectedInterval"
        />
      </div>

      <!-- Pricing cards grid -->
      <div class="grid gap-6 md:grid-cols-3">
        <div v-for="plan in plans" :key="plan.id">
          <AppPricingCard :plan="plan" :selected-interval="selectedInterval" />
        </div>
      </div>
    </div>
  </AppContainer>
</template>

<script lang="ts" setup>
import type { Plan } from '@@/types/stripe'

const selectedInterval = ref('month')
const { currentTeam } = useTeam()
const { data: plans } = await useFetch<Plan[]>(`/api/payments/plans`)

// Check if we have multiple billing intervals
const hasMultipleIntervals = computed(() => {
  if (!plans.value?.[0]?.variants) return false
  const intervals = new Set(plans.value[0].variants.map((v) => v.interval))
  return intervals.size > 1
})
</script>
