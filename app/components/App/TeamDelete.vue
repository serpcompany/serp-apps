<template>
  <UCard>
    <template #header>
      <h3 class="text-sm font-medium">Danger Zone</h3>
    </template>
    <div class="flex items-start md:items-center gap-2">
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
      <UButton color="error" size="lg">Delete Team</UButton>
    </div>
  </UCard>
</template>

<script lang="ts" setup></script>
