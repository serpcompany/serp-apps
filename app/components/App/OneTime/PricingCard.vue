<template>
  <UCard
    class="relative overflow-hidden h-full ring-accented group transition-all duration-300"
    :class="{
      'ring-2 ring-primary bg-primary-50 dark:bg-primary-950': isRecommended,
      'hover:ring-primary hover:shadow-xl hover:-translate-y-1': !disabled,
    }"
    :ui="{
      body: 'p-6 sm:p-8 flex flex-col h-full',
    }"
  >
    <div
      v-if="isRecommended"
      class="absolute -right-8 top-6 rotate-45  bg-primary px-8 py-1 text-sm font-medium text-gray-800"
    >
      Best Value
    </div>

    <div class="flex-grow">
      <div class="text-center">
        <h2 v-if="name" class="text-2xl font-bold">
          {{ name }}
        </h2>
        <p v-if="description" class="text-sm text-muted mt-2">
          {{ description }}
        </p>
      </div>

      <div class="my-8 flex items-baseline justify-center gap-x-2">
        <span class="text-5xl font-bold tracking-tight text-highlighted">
          {{ formatNumber(credits) }}
        </span>
        <span class="text-lg font-semibold leading-6 tracking-wide text-toned">
          Credits
        </span>
      </div>

      <div class="text-center space-y-4">
        <h3 class="text-4xl font-bold text-highlighted">
          {{ formatPrice(unitAmount) }}
        </h3>

        <p class="text-sm text-toned">
          ({{ formatPrice(pricePerCredit, 3) }} per credit)
        </p>
      </div>
    </div>

    <div class="mt-8 space-y-3">
      <div class="flex justify-center h-7">
        <UBadge v-if="savingsPercentage > 0" class="font-bold rounded-full" color="success" variant="subtle" size="md">
          Save {{ savingsPercentage }}%
        </UBadge>
      </div>

      <UButton
        block
        class="font-semibold"
        icon="i-lucide-credit-card"
        size="lg"
        color="primary"
        :loading="loading"
        :disabled="disabled"
        @click="$emit('purchase', priceId, credits)"
      >
        {{ buttonLabel }}
      </UButton>

      <div class="flex items-center justify-center gap-1.5 text-muted">
        <UIcon name="i-lucide-shield-check" class="size-4" />
        <span class="text-xs font-medium">
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

const formatPrice = (price: number, minimumFractionDigits = 2): string => {
  if (!price) {
    return '$0.00'
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits,
  }).format(price / 100)
}

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace('.0', '') + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K'
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
