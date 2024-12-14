<template>
  <UContainer class="space-y-4 py-12">
    <div class="flex items-center justify-between gap-2">
      <p class="text-xl font-bold">Welcome {{ user?.name }}</p>
      <UButton @click="signOut" color="neutral"> Log out </UButton>
    </div>

    <!-- User Info Card -->
    <div class="space-y-4 rounded-lg bg-gray-100 p-4 dark:bg-zinc-800">
      <UAvatar
        :src="user?.avatarUrl ?? undefined"
        icon="i-lucide-user"
        size="lg"
      />
      <div class="space-y-1">
        <p>Name: {{ user?.name }}</p>
        <p>Email: {{ user?.email }}</p>
        <p>ID: {{ user?.id }}</p>
        <p>Phone: {{ user?.phoneNumber }}</p>
      </div>
    </div>

    <!-- Teams Section -->
    <div class="rounded-lg bg-gray-100 p-4 dark:bg-zinc-800">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold">Your Teams</h2>
        <UButton to="/dashboard/teams/new" color="primary" variant="soft">
          Create team
        </UButton>
      </div>
      <div class="space-y-4">
        <div
          v-for="teamData in userTeams"
          :key="teamData.teams.id"
          class="flex items-center justify-between rounded-lg bg-white p-4 dark:bg-zinc-900"
        >
          <div class="flex items-center gap-4">
            <UAvatar
              :src="`/images/${teamData.teams.logo}`"
              :alt="teamData.teams.name"
              icon="i-lucide-users"
              :ui="{
                icon: 'text-lg',
              }"
              size="md"
            />
            <div class="flex gap-2">
              <p class="font-medium">{{ teamData.teams.name }}</p>
              <UBadge :label="teamData.role ?? 'Member'" variant="subtle" />
            </div>
          </div>
          <UButton
            :to="`/dashboard/teams/${teamData.teams.slug}`"
            color="neutral"
            variant="soft"
            icon="i-lucide-chevron-right"
          />
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { user, clear } = useUserSession()
const { data: userTeams } = await useFetch('/api/teams/user-teams')
const teams = useState('teams', () => userTeams.value?.teams ?? [])
async function signOut() {
  await clear()
  await navigateTo('/')
}
</script>
