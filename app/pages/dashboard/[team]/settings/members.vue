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

    <div class="mt-6 space-y-4">
      <div
        v-for="member in teamMembers"
        :key="member.id"
        class="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-900"
      >
        <div class="space-y-1">
          <div class="font-medium">
            {{
              member.type === 'member'
                ? member.email
                : `${member.email} (Invited)`
            }}
          </div>
          <div
            class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
          >
            <UBadge
              :color="member.role === 'owner' ? 'primary' : 'neutral'"
              size="sm"
            >
              {{ member.role }}
            </UBadge>
            <UBadge v-if="member.type === 'invite'" color="warning" size="sm">
              Pending
            </UBadge>
          </div>
        </div>
      </div>
    </div>
  </AppContainer>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'
const { currentTeam, inviteMember, loading } = useTeam()
import { z } from 'zod'
const toast = useToast()
const { data: teamMembers } = await useFetch(
  `/api/teams/${currentTeam.value?.id}/members`,
)
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
