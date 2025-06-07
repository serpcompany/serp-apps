<template>
  <UCard
    class="max-w-sm group relative transition-all duration-300 hover:shadow-xl hover:scale-105"
    :class="{
      'border-2 border-primary-300 dark:border-primary-700 hover:border-primary-300 dark:hover:border-primary-600 bg-primary-50 dark:bg-primary-950': isRecommended,
    }"
  >
    <div
      v-if="isRecommended"
      class="absolute -top-3 left-1/2 transform -translate-x-1/2"
    >
      <UBadge color="primary" variant="solid" size="sm">
        Best Value
      </UBadge>
    </div>

    <div class="text-center">
      <h2 v-if="name" class="text-2xl font-bold text-toned">
        {{ name }}
      </h2>
      <p v-if="description" class="text-sm text-muted mt-1">
        {{ description }}
      </p>

      <div class="mt-8 mb-4">
        <span class="text-xl font-medium">
          {{ formatNumber(credits) }}
        </span>
        <span class="text-sm text-muted uppercase tracking-wide">
          Credits
        </span>
      </div>
    </div>

    <div class="text-center mb-8">
      <h3 class="text-4xl font-bold text-gray-900 dark:text-white">
        {{ formatPrice(unitAmount) }}
      </h3>

      <p class="text-sm text-gray-600 dark:text-gray-400">
        ({{ formatPrice(pricePerCredit, 3) }} per credit)
      </p>

      <UBadge v-if="savingsPercentage > 0" class="mt-6 font-bold rounded-full" color="success" trailing-icon="i-lucide-percent" size="md" variant="soft">
        Save {{ savingsPercentage }}
      </UBadge>
    </div>

    <div class="space-y-2">
      <UButton
        block
        class="font-semibold"
        icon="i-lucide-credit-card"
        size="lg"
        :color="isRecommended ? 'primary' : 'neutral'"
        :loading="loading"
        :disabled="loading || disabled"
        @click="$emit('purchase', priceId, credits)"
      >
        {{ buttonLabel }}
      </UButton>

      <div class="flex items-center justify-center gap-1 text-muted">
        <UIcon name="i-lucide-shield-check" class="size-4" />
        <span class="text-sm">
          Secure Payment
        </span>
      </div>
    </div>
  </UCard>
</template>

<script lang="ts" setup>
interface PricingCardProps {
  unitAmount: number
  credits: number
  loading?: boolean
  disabled?: boolean
  priceId: string
  metadata: Record<string, string>
  isRecommended?: boolean
  basePricePerCredit?: number
}

const { unitAmount, credits, basePricePerCredit, metadata } = defineProps<PricingCardProps>()

defineEmits<{
  purchase: [id: string, credits: number]
}>()

const formatPrice = (price: number, minimumFractionDigits = 0): string => {
  if (!price) {
    return '$0'
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits,
  }).format(price / 100)
}

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toLocaleString()
}

const name = computed(() => {
  return metadata['name']
})

const description = computed(() => {
  return metadata['description']
})

const pricePerCredit = computed(() => {
  return unitAmount / credits
})

const savingsPercentage = computed(() => {
  if (!basePricePerCredit) {
    return 0
  }

  const currentPerCredit = unitAmount / credits
  const savings = ((basePricePerCredit - currentPerCredit) / basePricePerCredit) * 100

  return Math.round(Math.max(0, savings))
})

const buttonLabel = computed(() => {
  return `Purchase ${formatNumber(credits)} Credits`
})
</script>
