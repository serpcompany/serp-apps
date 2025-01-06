<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-zinc-200 dark:divide-white/10">
      <thead>
        <tr class="text-sm">
          <th
            v-for="column in columns"
            :key="column"
            class="px-4 py-3 text-left font-semibold text-sm"
          >
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
        <tr
          v-for="member in members"
          :key="member.id"
          class="text-sm [&>td]:whitespace-nowrap"
        >
          <td class="px-4 py-3">
            <div class="flex items-center gap-2">
              <UAvatar
                :src="
                  getAvatarUrl({
                    path: member.avatarUrl,
                    identifier: member.email,
                    type: 'team',
                  })
                "
                size="xs"
                :alt="member.name"
              />
              <span class="font-medium text-zinc-900 dark:text-white">{{
                member.name
              }}</span>
            </div>
          </td>
          <td class="px-4 py-3">{{ member.email }}</td>
          <td class="px-4 py-3">
            <UBadge
              :color="member.role === 'owner' ? 'primary' : 'neutral'"
              size="sm"
              variant="subtle"
              class="uppercase"
            >
              {{ member.role }}
            </UBadge>
          </td>
          <td class="px-4 py-3">
            {{
              member.lastLoginAt
                ? useDateFormat(member.lastLoginAt, 'MMM D, YYYY hh:mm a').value
                : 'Never'
            }}
          </td>
          <td class="px-4 py-3">
            {{ useDateFormat(member.createdAt, 'MMM D, YYYY').value }}
          </td>
          <td class="px-4 py-3">
            <UDropdownMenu
              :items="getRowItems(member)"
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

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { getAvatarUrl } from '@/utils/avatar'
type TeamMember = {
  id: string
  teamId: string
  userId: string
  role: string
  email: string
  name: string
  avatarUrl: string | null
  lastLoginAt: Date | null
  createdAt: Date
}

defineProps<{ members: TeamMember[] }>()
const columns = ['Name', 'Email', 'Role', 'Last Login', 'Created At']
const toast = useToast()
const getRowItems = (member: TeamMember) => {
  return [
    {
      label: 'Copy Email',
      onSelect: () => {
        navigator.clipboard.writeText(member.email)
        toast.add({
          title: 'Email copied to clipboard!',
          color: 'success',
        })
      },
    },
    {
      label: 'Copy User ID',
      onSelect: () => {
        navigator.clipboard.writeText(member.userId)
        toast.add({
          title: 'User ID copied to clipboard!',
          color: 'success',
        })
      },
    },
    { type: 'separator' },
    {
      label: 'Remove from team',
      color: 'error' as const,
      onSelect: () => {
        console.log('Remove user:', member.userId)
        toast.add({
          title: 'User removed from team!',
          color: 'error',
        })
      },
    },
  ]
}
</script>
