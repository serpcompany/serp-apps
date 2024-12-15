<template>
  <UCard>
    <template #header>
      <h3 class="text-sm font-medium">General Settings</h3>
    </template>

    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <TeamsAvatarUpload
        v-model="state.logo"
        :name="state.name || 'Team Name'"
        @update:file="selectedFile = $event"
      />

      <UFormField label="Team name" name="name">
        <UInput v-model="state.name" class="w-full" size="lg" />
      </UFormField>

      <div class="flex justify-end space-x-2">
        <UButton
          color="neutral"
          type="submit"
          size="lg"
          :loading="loading"
          :disabled="loading"
        >
          Save Changes
        </UButton>
      </div>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import type { TeamSchema } from '~/composables/useTeams'

const { schema, state, loading, selectedFile, activeTeam, updateTeam } =
  useTeams()

// Initialize form state with active team data
onMounted(() => {
  if (activeTeam.value) {
    state.name = activeTeam.value.name
    state.logo = `/images/${activeTeam.value.logo}` || ''
  }
})

const onSubmit = async (event: FormSubmitEvent<TeamSchema>) => {
  if (!activeTeam.value?.id) return

  await updateTeam(activeTeam.value.id, event.data)
}
</script>
