<template>
  <UCard variant="soft">
    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="space-y-2">
        <h3 class="text-lg font-medium">
          You have <span class="font-bold text-toned">{{ user?.credits }}</span> credits.
        </h3>
        <p class="text-sm text-neutral-500">
          Get more credits to continue using Serp Apps uninterrupted.
        </p>
      </div>
      <UButton
        color="neutral"
        variant="outline"
        label="Manage Subscription"
        :loading="loadingPortal"
        :disabled="loadingPortal"
        @click="handleManageSubscription"
      />
      <UButton
        color="neutral"
        variant="outline"
        label="View Credits History"
        :loading="loadingHistory"
        :disabled="loadingHistory"
        @click="handleCreditsHistory"
      />
    </div>
  </UCard>

  <div class="mt-4 space-y-16">
    <AppOneTimeProduct
      v-for="product in products"
      :key="product.id"
      :title="product.name"
      :description="product.description"
      :features="product.features"
    >
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 items-center">
        <template v-for="(plan, index) in getProductPlans(product.id)" :key="plan.id">
          <AppOneTimePricingCard
            v-if="plan.credits"
            :unit-amount="plan.unitAmount"
            :credits="plan.credits"
            :price-id="plan.id"
            :metadata="plan.metadata"
            :loading="loadingPriceId === plan.id"
            :disabled="disabled"
            :is-recommended="index === 1"
            :base-price-per-credit="getBasePriceForComparison(product.id)"
            @purchase="handlePurchase"
          />
        </template>
      </div>
    </AppOneTimeProduct>
  </div>
</template>

<script setup lang="ts">
import type { Price, Product } from '@@/types/database'

interface Plan extends Price {
  product: Product
}
const { data: plans } = await useFetch<Plan[]>('/api/stripe/plans')

const products = computed(() => {
  if (!plans.value) {
    return []
  }

  const productMap = new Map<string, Product>()
  plans.value.forEach((plan) => {
    if (!productMap.has(plan.product.id)) {
      productMap.set(plan.product.id, plan.product)
    }
  })

  return Array.from(productMap.values())
})

// Get all plans for a specific product
const getProductPlans = (productId: string) => {
  if (!plans.value) {
    return []
  }

  return plans.value.filter((plan) => plan.productId === productId)
}

const getBasePriceForComparison = (productId: string) => {
  const productPlans = getProductPlans(productId)

  const smallestPlan = productPlans.reduce((min, plan) => {
    return plan.unitAmount < min.unitAmount ? plan : min
  })

  if (smallestPlan.credits) {
    return smallestPlan.unitAmount / smallestPlan.credits
  }
}

const toast = useToast()
const loadingPriceId = ref<string | null>(null)
const disabled = ref(false)
const route = useRoute()
const { user, fetch: refreshSession } = useUserSession()
const loadingPortal = ref(false)
const loadingHistory = ref(false)

const handlePurchase = async (priceId: string, credits: number) => {
  try {
    loadingPriceId.value = priceId
    disabled.value = true

    const checkoutUrl = await $fetch('/api/stripe/checkout', {
      method: 'POST',
      body: {
        priceId,
        credits,
      },
    })

    if (!checkoutUrl) {
      throw new Error('No checkout URL returned from the server')
    }

    window.location.href = checkoutUrl
  } catch (error) {
    toast.add({
      title: 'Failed to create checkout session',
      description:
        error instanceof Error ? error.message : 'An unexpected error occurred',
      color: 'error',
    })
    console.error('Stripe checkout error:', error)
  } finally {
    loadingPriceId.value = null
    disabled.value = false
  }
}

const handleManageSubscription = async () => {
  try {
    loadingPortal.value = true

    const portalUrl = await $fetch('/api/stripe/portal', {
      method: 'POST',
    })

    if (!portalUrl) {
      throw new Error('No portal URL returned from the server')
    }

    window.location.href = portalUrl
  } catch (error) {
    toast.add({
      title: 'Failed to access billing portal',
      description:
        error instanceof Error ? error.message : 'An unexpected error occurred',
      color: 'error',
    })
    console.error('Billing portal error:', error)
  } finally {
    loadingPortal.value = false
  }
}

const handleCreditsHistory = () => {}

onMounted(async () => {
  if (route.query.success === 'true') {
    await refreshSession()
  }
})
</script>
