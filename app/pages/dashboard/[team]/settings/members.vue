<template>
  <AppContainer title="Workspace Members">
    <template #actions>
      <UButton
        color="neutral"
        label="Invite Member"
        @click="newMemberModal = true"
      />
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
    <div class="mx-auto max-w-5xl space-y-12">
      <AppTeamMembers />
      <AppTeamInvites />
    </div>
  </AppContainer>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'
const { currentTeam, inviteMember, loading } = useTeam()
const toast = useToast()

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
    newMemberModal.value = false
    await refreshNuxtData('team-invites')
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
