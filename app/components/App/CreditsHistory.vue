<template>
  <div class="w-full space-y-4">
    <UTable
      class="flex-1"
      :data="transactions"
      :columns="columns"
      :loading="status === 'pending'"
    >
      <template #empty>
        <div class="flex flex-col items-center justify-center py-6 gap-3">
          <UIcon name="i-lucide-history" class="size-8 mx-auto text-muted" />
          <span class="italic text-sm">No transaction history found.</span>
          <UButton class="mt-3" to="/dashboard/billing">
            Purchase Credits
          </UButton>
        </div>
      </template>
    </UTable>

    <div class="flex justify-center border-t border-default pt-4">
      <UPagination
        v-model:page="page"
        :items-per-page="limit"
        :total="data?.total"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { CreditTransaction } from '@@/types/database'

const UBadge = resolveComponent('UBadge')

interface CreditsHistory {
  transactions: CreditTransaction[]
  total: number
}

const route = useRoute()
const router = useRouter()

const page = ref(Number(route.query.page) || 1)
const limit = ref(25)

watch(page, (newPage) => {
  void router.push({
    query: {
      ...route.query,
      page: newPage > 1 ? newPage : undefined,
    },
  })
})

const { data, status } = await useFetch<CreditsHistory>('/api/credit-transactions', {
  key: 'credit-transactions',
  query: {
    page,
    limit,
  },
})

const transactions = computed(() => {
  return data.value?.transactions || []
})

const columns: TableColumn<CreditTransaction>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Transaction Date',
    cell: ({ row }) => {
      return new Date(row.getValue('createdAt')).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type')
      const color = {
        purchase: 'success' as const,
        usage: 'neutral' as const,
        refund: 'info' as const,
        bonus: 'warning' as const,
      }[type as string]

      return h(
        UBadge,
        { class: 'capitalize', variant: 'subtle', color },
        () => type,
      )
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))

      return h('div', { class: 'text-right font-medium' }, amount)
    },
  },
]
</script>
