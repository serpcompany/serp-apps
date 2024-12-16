<template>
  <UCard>
    <template #header>
      <h3 class="text-sm font-medium">Danger Zone</h3>
    </template>
    <div class="flex items-start gap-2 md:items-center">
      <div
        class="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10"
      >
        <UIcon name="i-lucide-trash-2" class="h-5 w-5 text-red-500" />
      </div>
      <div class="flex-1">
        <h4 class="font-medium">Delete Team</h4>
        <p class="text-xs text-zinc-500 dark:text-zinc-400">
          Deleting a team is irreversible and will remove all data associated
          with it.
        </p>
      </div>
      <UModal
        :title="`Delete ${activeTeam?.name}`"
        description="This action is irreversible and will remove all data associated with it"
        close-icon="i-lucide-x"
      >
        <UButton color="error" size="lg"> Delete Permanently </UButton>

        <template #body>
          <UForm
            :schema="formSchema"
            :state="formState"
            @submit="handleSubmit"
            class="space-y-4"
          >
            <UFormField
              label="Team Name"
              name="teamName"
              :help="`Please type '${activeTeam?.name}' to confirm deletion`"
            >
              <UInput
                v-model="formState.teamName"
                placeholder="Enter team name"
                class="w-full"
              />
            </UFormField>
            <UButton
              color="error"
              size="lg"
              type="submit"
              block
              :loading="loading"
              :disabled="formState.teamName !== activeTeam?.name"
            >
              Delete Permanently
            </UButton>
          </UForm>
        </template>
      </UModal>
    </div>
  </UCard>
</template>

<script lang="ts" setup>
import { z } from 'zod'
import { toast } from 'vue-sonner'

const { activeTeam, deleteTeam, loading, isTeamOwner } = useTeams()

const formSchema = z.object({
  teamName: z
    .string()
    .min(1, 'Team name is required')
    .refine((val) => val === activeTeam.value?.name, {
      message: 'Team name does not match',
    }),
})

type Schema = z.output<typeof formSchema>

const formState = reactive<Partial<Schema>>({
  teamName: '',
})

async function handleSubmit() {
  try {
    if (!activeTeam.value) return
    await deleteTeam(activeTeam.value.id)
  } catch (error: any) {
    toast.error('Failed to delete team', {
      description:
        error?.data?.message || 'An error occurred while deleting the team',
    })
  }
}
</script>
