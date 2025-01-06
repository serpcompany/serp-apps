<template>
  <div>
    <table class="min-w-full divide-y divide-zinc-200 dark:divide-white/10">
      <thead>
        <tr class="text-sm">
          <th
            v-for="column in columns"
            :key="column"
            class="px-4 py-3 text-left text-sm font-semibold"
          >
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
        <tr
          v-for="invite in invites"
          :key="invite.id"
          class="text-sm [&>td]:whitespace-nowrap"
        >
          <td class="px-4 py-3">{{ invite.email }}</td>
          <td class="px-4 py-3">
            <UBadge
              :color="invite.status === 'pending' ? 'primary' : 'neutral'"
              size="sm"
              variant="subtle"
              class="uppercase"
            >
              {{ invite.status }}
            </UBadge>
          </td>
          <td class="px-4 py-3">
            {{ useDateFormat(invite.expiresAt, 'MMM D, YYYY').value }} ({{
              useTimeAgo(invite.expiresAt).value
            }})
          </td>
          <td class="px-4 py-3">
            {{ useDateFormat(invite.createdAt, 'MMM D, YYYY').value }}
          </td>
          <td class="px-4 py-3">
            <UDropdownMenu
              :items="getRowItems(invite)"
              :content="{
                align: 'end',
                side: 'bottom',
              }"
            >
              <UButton
                icon="i-lucide-ellipsis"
                variant="ghost"
                color="neutral"
              />
            </UDropdownMenu>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { useTimeAgo } from '@vueuse/core'
import { useDateFormat } from '@vueuse/core'
type TeamInvite = {
  id: string
  teamId: string
  email: string
  role: string
  token: string
  status: string
  expiresAt: Date
  createdAt: Date
}
const props = defineProps<{
  invites: TeamInvite[]
}>()
const toast = useToast()
const columns = ['Email', 'Status', 'Expires At', 'Created At']
const { cancelInvite } = useTeam()
const emit = defineEmits(['invite-cancelled'])
const getRowItems = (invite: TeamInvite) => {
  return [
    {
      label: 'Resend Invite',
      onSelect: () => {
        console.log('Resend Invite')
        toast.add({
          title: 'Invite resent!',
          color: 'success',
        })
      },
    },
    {
      label: 'Cancel Invite',
      color: 'error' as const,
      onSelect: async () => {
        await cancelInvite(invite.id)
        emit('invite-cancelled', invite.id)
      },
    },
  ]
}
</script>
