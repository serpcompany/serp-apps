<template>
  <div
    class="flex h-full flex-col rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900"
    :class="{
      'border-zinc-300 bg-zinc-50 ring-4 ring-zinc-500/20': highlight,
    }"
  >
    <p class="font-semibold">{{ plan.name }}</p>
    <p class="mt-1 text-sm text-gray-500">{{ plan.description }}</p>
    <div class="mt-auto mb-2 flex items-baseline pt-4">
      <span class="text-3xl font-bold">
        {{ formatPrice(getCurrentVariant?.price) }}
      </span>
      <span class="ml-1 text-gray-500">/{{ selectedInterval }} </span>
    </div>
    <UButton
      color="neutral"
      :variant="highlight ? 'solid' : 'outline'"
      block
      :label="highlight ? 'Manage plan' : 'Subscribe'"
      @click="$emit('subscribe', plan.id)"
      :loading="loading"
    />
    <ul class="mt-4 space-y-1">
      <li
        v-for="feature in plan.marketing_features"
        :key="feature.name"
        class="flex items-center gap-3 text-[var(--ui-text-muted)]"
      >
        <UIcon name="i-lucide-circle-check" class="h-4 w-4 text-zinc-400" />
        <span class="text-sm">{{ feature.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { Plan } from '@@/types/stripe'

const props = defineProps<{
  plan: Plan
  selectedInterval: string
  highlight?: boolean
  loading?: boolean
}>()

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
