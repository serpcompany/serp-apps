<template>
  <UCard>
    <template #header>
      <div class="mb-2 flex justify-between text-lg font-bold">
        <h3>{{ plan.name }}</h3>
        <div class="flex items-baseline">
          <span>
            {{ formatPrice(getCurrentVariant?.price) }}
          </span>
          <span class="ml-1 text-gray-500">/{{ selectedInterval }} </span>
        </div>
      </div>
      <p class="text-sm text-gray-500">{{ plan.description }}</p>
    </template>
    <ul>
      <li
        v-for="feature in plan.marketing_features"
        :key="feature.name"
        class="flex items-center gap-2"
      >
        <UIcon name="i-lucide-circle-check" class="text-green-400" />
        <span>{{ feature.name }}</span>
      </li>
    </ul>
    <template #footer>
      <UButton>Subscribe</UButton>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import type { Plan } from '@@/types/stripe'

const props = defineProps<{
  plan: Plan
  selectedInterval: string
}>()

// Format price from cents to dollars with currency symbol
const formatPrice = (price?: number) => {
  if (!price) return '$0'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price / 100)
}

const getCurrentVariant = computed(() => {
  return props.plan.variants.find((v) => v.interval === props.selectedInterval)
})
</script>
