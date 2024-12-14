<template>
  <UDropdownMenu
    :items="items"
    :ui="{
      content: 'w-[240px]',
    }"
  >
    <UButton
      label="Linear"
      :avatar="{
        src: 'https://logo.clearbit.com/https://linear.app',
        size: 'xs',
      }"
      color="neutral"
      variant="ghost"
      class="w-full hover:bg-zinc-200/80 dark:hover:bg-white/10"
      block
      trailing-icon="i-lucide-chevron-down"
    />
  </UDropdownMenu>
</template>

<script lang="ts" setup>
const items = ref([
  [
    {
      label: 'Linear',
      avatar: {
        src: 'https://logo.clearbit.com/https://linear.app',
        size: '2xs',
      },
    },
    {
      label: 'Jio',
      avatar: {
        src: 'https://logo.clearbit.com/https://jio.com',
        size: '2xs',
      },
    },
    {
      label: 'Mintlify',
      avatar: {
        src: 'https://logo.clearbit.com/https://mintlify.com',
        size: '2xs',
      },
    },
  ],
  [
    {
      label: 'Create space',
      icon: 'i-lucide-plus-circle',
      to: '/dashboard/teams/new',
    },
  ],
])
</script>
