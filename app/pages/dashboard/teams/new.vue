<template>
  <main>
    <UContainer class="py-20">
      <div class="text-center">
        <h1 class="text-2xl font-bold">Create a new team</h1>
        <p class="mt-2 text-gray-500">
          A team is a workspace for your organization.
        </p>
      </div>
      <UForm
        :schema="schema"
        :state="state"
        class="mx-auto mt-12 max-w-md space-y-4"
        @submit="onSubmit"
      >
        <TeamsAvatarUpload
          v-model="state.logo"
          :name="state.name"
          @update:file="selectedFile = $event"
        />

        <UFormField label="Team name" name="name">
          <UInput v-model="state.name" class="w-full" size="lg" />
        </UFormField>

        <UButton
          color="neutral"
          type="submit"
          size="lg"
          block
          :loading="loading"
          :disabled="loading"
        >
          Submit
        </UButton>
      </UForm>
    </UContainer>
  </main>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import type { TeamSchema } from '~/composables/useTeams'

const { schema, state, loading, selectedFile, createTeam } = useTeams()

const onSubmit = async (event: FormSubmitEvent<TeamSchema>) => {
  await createTeam(event.data)
}
</script>
