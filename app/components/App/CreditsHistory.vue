<template>
  <UTable
    class="flex-1"
    :data="transactions"
    :columns="columns"
    :loading="loading"
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
</template>

<script lang="ts" setup>
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { CreditTransaction } from '@@/types/database'

const UBadge = resolveComponent('UBadge')

interface Props {
  transactions: CreditTransaction[]
  loading?: boolean
}

defineProps<Props>()

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
