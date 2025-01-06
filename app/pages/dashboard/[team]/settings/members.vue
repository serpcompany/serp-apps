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

    <AppTeamMembersTable
      v-if="activeTab === '0'"
      :members="teamMembers || []"
    />
    <AppTeamInvitesTable
      v-if="activeTab === '1'"
      :invites="teamInvites || []"
      @invite-cancelled="fetchTeamInvites"
    />
  </AppContainer>
</template>

<script lang="ts" setup>
const tabs = ref([
  {
    label: 'Active Members',
  },
  {
    label: 'Invitations',
  },
])
const activeTab = ref('0')

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
const { data: teamInvites, refresh: fetchTeamInvites } = await useFetch<
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
