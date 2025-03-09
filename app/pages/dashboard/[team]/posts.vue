<template>
  <AppContainer title="Posts">
    <template #actions>
      <UButton label="New Post" />
    </template>
    <div class="break-words whitespace-nowrap">
      <pre>{{ posts }}</pre>
    </div>
  </AppContainer>
</template>

<script setup lang="ts">
import type { Post } from '@@/types/database'
import { useDateFormat } from '@vueuse/core'
const { currentTeam } = useTeam()
const toast = useToast()
const loading = ref(false)
const { data: posts } = useFetch<Post[]>(
  `/api/teams/${currentTeam.value?.id}/posts`,
)
</script>
