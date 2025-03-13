<template>
  <div
    class="sticky top-0 z-40 flex h-8 w-full animate-pulse items-center justify-between bg-black px-4 text-sm text-white"
  >
    <div class="flex items-center gap-2">
      You are currently impersonating
      <div class="flex items-center gap-2">
        <UAvatar :src="user?.avatarUrl" size="3xs" :alt="user?.name" />
        <span class="font-bold"> {{ user?.email }} </span>
      </div>
      as a super admin. Please proceed with caution.
    </div>
    <UButton
      @click="stopImpersonation()"
      size="xs"
      color="neutral"
      label="Stop session"
    />
  </div>
</template>

<script lang="ts" setup>
import type { User } from '@@/types/database'
const props = defineProps<{
  user: User
}>()
const { fetch: refreshUserSession } = useUserSession()
const stopImpersonation = async () => {
  await $fetch('/api/super-admin/users/stop-impersonation', {
    method: 'POST',
    body: {
      userId: props.user.id,
    },
  })
  await refreshUserSession()
  window.location.href = '/dashboard/super-admin'
}
</script>
