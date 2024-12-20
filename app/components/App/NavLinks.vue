<template>
  <ul class="space-y-1">
    <li v-for="link in links" :key="link.to">
      <ULink
        :to="link.to"
        exact
        class="flex h-[30px] items-center gap-2 rounded-md p-2 font-medium hover:bg-zinc-200/80 dark:hover:bg-white/20"
        active-class="text-zinc-900 dark:text-white bg-zinc-200/70 dark:bg-white/10 hover:bg-zinc-200/80 dark:hover:bg-white/20"
        inactive-class="text-[var(--ui-text-muted)]"
        @click="$emit('navigate')"
      >
        <UIcon :name="link.icon" class="h-4 w-4" />
        <p class="text-sm">{{ link.label }}</p>
      </ULink>
    </li>
  </ul>
</template>

<script lang="ts" setup>
interface NavLink {
  label: string
  icon: string
  to: string
}

defineProps<{
  links: NavLink[]
}>()

defineEmits<{
  navigate: []
}>()
</script>
