<template>
  <AppContainer
    title="Members"
    description="Invite and manage your team members"
  >
    <template #actions>
      <UButton color="neutral" @click="newMemberModal = true">Invite</UButton>
      <UDrawer
        :ui="{ container: 'max-w-xl mx-auto' }"
        v-model:open="newMemberModal"
        title="Invite a new member"
        description="We will email them a link to join your team"
      >
        <template #body>
          <div class="mb-4 flex items-center gap-2">
            <UAvatar
              :src="currentTeam?.logo"
              size="xs"
              :alt="currentTeam?.name"
            />
            <span class="font-medium">{{ currentTeam?.name }}</span>
          </div>
          <UForm
            class="space-y-4"
            :state="state"
            :schema="schema"
            @submit="onSubmit as any"
          >
            <UFormField required label="Member email" name="email">
              <UInput
                v-model="state.email"
                label="Email"
                class="w-full"
                size="xl"
              />
            </UFormField>
            <UButton color="neutral" type="submit" block size="xl">
              Invite
            </UButton>
          </UForm>
        </template>
      </UDrawer>
    </template>
  </AppContainer>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'
import { toast } from 'vue-sonner'
const { currentTeam } = useTeam()
import { z } from 'zod'
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
  console.log(event.data)
}
</script>
