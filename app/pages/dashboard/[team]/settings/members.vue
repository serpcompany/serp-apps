<template>
  <AppContainer
    title="Members"
    description="Invite and manage your team members"
  >
    <template #actions>
      <UButton color="neutral" @click="newMemberModal = true">Invite</UButton>
    </template>
    <UModal
      size="xl"
      v-model:open="newMemberModal"
      :title="`Invite a new member to ${currentTeam?.name}`"
      description="We will email them a link to join your team. Invitations are valid for 7 days."
    >
      <template #body>
        <UForm
          class="space-y-4"
          :state="state"
          :schema="schema"
          @submit="onSubmit as any"
        >
          <UFormField required label="Member email" name="email">
            <UInput
              v-model="state.email"
              placeholder="john@doe.com"
              class="w-full"
              size="lg"
            />
          </UFormField>
          <UButton
            :loading="loading"
            color="neutral"
            type="submit"
            block
            size="lg"
            label="Send invitation"
          />
        </UForm>
      </template>
    </UModal>
    <UTabs
      color="neutral"
      variant="link"
      :content="false"
      :items="tabs"
      class="w-full"
      v-model="activeTab"
    />

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-zinc-200 dark:divide-white/10">
        <thead>
          <tr>
            <th
              class="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-zinc-900 dark:text-white"
            >
              Member
            </th>
            <th
              class="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900 dark:text-white"
            >
              Email
            </th>
            <th
              class="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900 dark:text-white"
            >
              Last Active
            </th>
            <th
              class="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900 dark:text-white"
            >
              Date Added
            </th>
            <th
              class="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900 dark:text-white"
            >
              Role
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-zinc-200 dark:divide-white/10">
          <!-- Active Members -->
          <template v-if="activeTab === '0'">
            <tr v-for="member in teamMembers" :key="member.id">
              <td class="py-4 pr-3 pl-4 whitespace-nowrap">
                <div class="flex items-center gap-3">
                  <UAvatar
                    :src="
                      getAvatarUrl({
                        path: member.avatarUrl,
                        identifier: member.email,
                        type: 'team',
                      })
                    "
                    size="md"
                    :alt="member.name"
                  />
                  <span class="font-medium text-zinc-900 dark:text-white">{{
                    member.name
                  }}</span>
                </div>
              </td>
              <td
                class="px-3 py-4 text-sm whitespace-nowrap text-zinc-500 dark:text-zinc-400"
              >
                {{ member.email }}
              </td>
              <td
                class="px-3 py-4 text-sm whitespace-nowrap text-zinc-500 dark:text-zinc-400"
              >
                {{
                  member.lastLoginAt
                    ? new Date(member.lastLoginAt).toLocaleDateString()
                    : 'Never'
                }}
              </td>
              <td
                class="px-3 py-4 text-sm whitespace-nowrap text-zinc-500 dark:text-zinc-400"
              >
                {{ new Date(member.createdAt).toLocaleDateString() }}
              </td>
              <td class="px-3 py-4 text-sm whitespace-nowrap">
                <UBadge
                  :color="member.role === 'owner' ? 'primary' : 'neutral'"
                  size="sm"
                  variant="subtle"
                  class="uppercase"
                >
                  {{ member.role }}
                </UBadge>
              </td>
            </tr>
          </template>

          <!-- Pending Invites -->
          <template v-else>
            <tr v-for="invite in teamInvites" :key="invite.id">
              <td class="py-4 pr-3 pl-4 whitespace-nowrap">
                <div class="flex items-center gap-3">
                  <UAvatar
                    :src="
                      getAvatarUrl({
                        identifier: invite.email,
                        type: 'team',
                      })
                    "
                    size="md"
                    :alt="invite.email"
                  />
                  <span class="font-medium text-zinc-900 dark:text-white">
                    {{ invite.email }}
                  </span>
                </div>
              </td>
              <td
                class="px-3 py-4 text-sm whitespace-nowrap text-zinc-500 dark:text-zinc-400"
              >
                {{ invite.email }}
              </td>
              <td
                class="px-3 py-4 text-sm whitespace-nowrap text-zinc-500 dark:text-zinc-400"
              >
                {{ invite.status }}
              </td>
              <td
                class="px-3 py-4 text-sm whitespace-nowrap text-zinc-500 dark:text-zinc-400"
              >
                {{ new Date(invite.createdAt).toLocaleDateString() }}
              </td>
              <td class="px-3 py-4 text-sm whitespace-nowrap">
                <UBadge
                  :color="invite.status === 'pending' ? 'warning' : 'neutral'"
                  size="sm"
                  variant="subtle"
                  class="uppercase"
                >
                  {{ invite.role }}
                </UBadge>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </AppContainer>
</template>

<script lang="ts" setup>
const tabs = ref([
  {
    label: 'Active Members',
  },
  {
    label: 'Pending Invites',
  },
])
const activeTab = ref('0')
import { getAvatarUrl } from '@/utils/avatar'
import type { FormSubmitEvent } from '#ui/types'
const { currentTeam, inviteMember, loading } = useTeam()
import { z } from 'zod'
const toast = useToast()
const { data: teamMembers } = await useFetch<
  {
    id: string
    teamId: string
    userId: string
    role: string
    email: string
    name: string
    avatarUrl: string | null
    lastLoginAt: Date | null
    createdAt: Date
  }[]
>(`/api/teams/${currentTeam.value?.id}/members`)
const { data: teamInvites } = await useFetch<
  {
    id: string
    teamId: string
    email: string
    role: string
    token: string
    status: string
    expiresAt: Date
    createdAt: Date
  }[]
>(`/api/teams/${currentTeam.value?.id}/invites`)
const { user } = useUserSession()
const newMemberModal = ref(false)
const state = reactive({
  email: '',
})
const schema = z.object({
  email: z
    .string()
    .email()
    .refine((email) => email !== user.value?.email, {
      message: 'You cannot invite yourself',
    }),
})

const onSubmit = async (event: FormSubmitEvent<typeof schema>) => {
  loading.value = true
  try {
    await inviteMember(event.data.email)
    toast.add({
      title: 'Member invited successfully',
      description: `We have sent an invitation to ${event.data.email}`,
      color: 'success',
    })
  } catch (error) {
    console.error(error)
    toast.add({
      title: 'Error inviting member',
      description: (error as any).data.message,
      color: 'error',
    })
  } finally {
    loading.value = false
  }
}
</script>
