<template>
  <AppContainer :title="`Welcome back, ${user?.name}`">
    <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        :to="`/dashboard/${team.slug}`"
        v-for="team in teams"
        :key="team.id"
      >
        <UCard>
          {{ team.name }}
        </UCard>
      </NuxtLink>
    </div>
  </AppContainer>
</template>

<script setup lang="ts">
import type { Team } from '@@/types/database'
const { user } = useUserSession()
const teams = useState<Team[]>('teams')
</script>
