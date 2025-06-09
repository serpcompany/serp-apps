<template>
  <AppContainer
    title="Credits History"
    :padding="false"
  >
    <UContainer class="py-4 sm:py-6 lg:py-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div class="order-last sm:order-first">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Credits History
          </h1>
          <p class="mt-1 text-gray-500 dark:text-gray-400">
            A complete log of all your credit transactions.
          </p>
        </div>
        <div>
          <UButton
            icon="i-lucide-arrow-left"
            to="/dashboard/billing"
            color="neutral"
            variant="outline"
          >
            Back to Billing
          </UButton>
        </div>
      </div>

      <AppCreditsHistory
        :transactions="data?.transactions ?? []"
        :loading="pending"
      />

      <div v-if="pageCount > 1" class="flex justify-center mt-6">
        <UPagination
          v-model="page"
          :page-count="limit"
          :total="data?.total ?? 0"
        />
      </div>
    </UContainer>
  </AppContainer>
</template>

<script lang="ts" setup>
import type { CreditTransaction } from '@@/types/database'

const page = ref(1)
const limit = ref(25)

type CreditsHistory = {
  transactions: CreditTransaction[]
  total: number
}

const { data, pending, error } = await useFetch<CreditsHistory>('/api/credit-transactions', {
  query: {
    page,
    limit,
  },
  watch: [page],
})

if (error.value) {
  console.error('Failed to load history:', error.value)
}

const pageCount = computed(() => {
  if (!data.value?.total || !limit.value) {
    return 0
  }

  return Math.ceil(data.value.total / limit.value)
})
</script>
