<template>
  <AppContainer
    title="Billing"
    description="Manage your billing information and subscription plans."
  >
    <div
      v-if="activeSubscription"
      class="flex h-full flex-col rounded-xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div class="flex flex-col space-y-4">
        <div
          class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="space-y-2">
            <h3 class="text-lg font-medium">
              You are on
              <span class="font-bold">{{ currentPlan.name }}</span> plan
            </h3>
            <div class="flex flex-wrap items-center gap-3">
              <div class="flex items-center gap-2">
                <span class="text-xl font-semibold">{{
                  formatPrice(currentPlan.amount)
                }}</span>
                <span class="text-neutral-500"
                  >every {{ currentPlan.interval }}</span
                >
              </div>
              <UBadge
                :label="currentPlan.status"
                color="success"
                variant="subtle"
                class="capitalize"
              />
              <span class="text-sm text-neutral-500">
                Renews on
                {{
                  useDateFormat(currentPlan.currentPeriodEnd, 'MMM DD, YYYY')
                }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
      <AppPricingCard
        v-for="plan in plans"
        :key="plan.id"
        :title="plan.product.name"
        :description="plan.product.description || ''"
        :unit-amount="plan.unitAmount"
        :interval="plan.interval"
        :price-id="plan.id"
        :features="plan.product.features"
        :active="currentPlan.id === plan.id"
        :loading="loadingPriceId === plan.id"
        :disabled="disabled"
        @subscribe="handleSubscribe"
      />
    </div>
  </AppContainer>
</template>

<script lang="ts" setup>
import type { Subscription, Price } from '@@/types/database'
const { data: plans } = await useFetch('/api/stripe/plans')
interface ExpandedSubscription extends Subscription {
  expand: {
    price_id: Price
  }
}
const { currentTeam } = useTeam()
const { data: activeSubscription } = await useFetch<ExpandedSubscription>(
  '/api/stripe/subscription',
  {
    query: {
      teamId: currentTeam.value?.id,
    },
  },
)

const toast = useToast()
const loadingPriceId = ref<string | null>(null)
const disabled = ref(false)
const route = useRoute()
const { fetch: refreshSession } = useUserSession()

interface BillingPlan {
  id: string
  name: string
  description: string
  status?: string
  currentPeriodEnd?: Date
  currentPeriodStart?: Date
  amount: number
  interval: string
  priceId: string
}

const currentPlan = computed<BillingPlan>(() => {
  if (!activeSubscription.value?.priceId || !plans.value) {
    return {
      id: '',
      name: 'No active plan',
      description: '',
      amount: 0,
      interval: '',
      priceId: '',
    } as BillingPlan
  }

  const plan = plans.value.find(
    (p) => p.id === activeSubscription.value?.priceId,
  )

  if (!plan) {
    throw createError('Invalid plan configuration')
  }

  return {
    id: plan.id,
    name: plan.product.name || 'Unknown plan',
    description: plan.product.description || 'No description',
    status: activeSubscription.value.status,
    currentPeriodEnd: activeSubscription.value.currentPeriodEnd,
    currentPeriodStart: activeSubscription.value.currentPeriodStart,
    amount: plan.unitAmount,
    interval: plan.interval,
    priceId: plan.id,
  } as BillingPlan
})

const handleSubscribe = async (priceId: string) => {
  try {
    loadingPriceId.value = priceId
    disabled.value = true

    if (!currentTeam.value?.id || !currentTeam.value?.slug) {
      throw new Error('Team information is missing')
    }

    const checkoutUrl = await $fetch('/api/stripe/checkout', {
      method: 'POST',
      body: {
        priceId,
        teamId: currentTeam.value.id,
        teamSlug: currentTeam.value.slug,
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

const formatPrice = (price?: number): string => {
  if (!price) return '$0'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price / 100)
}

onMounted(async () => {
  if (route.query.success === 'true') {
    await refreshSession()
  }
})
</script>
