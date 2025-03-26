<template>
  <div
    class="group rounded-xl border border-neutral-200 bg-white p-3 dark:border-white/10 dark:bg-neutral-900"
  >
    <div class="relative pl-6">
      <div class="flex items-start gap-2">
        <UIcon
          name="i-lucide-circle"
          class="absolute top-0 left-0 mt-1.5"
          :class="priorityOptions.find((p) => p.value === task.priority)?.color"
        />
        <span class="w-full text-sm leading-7 font-semibold">
          {{ task.title }}
        </span>
        <UDropdownMenu
          :items="items"
          :content="{
            align: 'end',
            side: 'bottom',
          }"
          :ui="{ itemLeadingIcon: 'size-4', content: 'w-40' }"
          size="sm"
          @update:open="isHovering = $event"
        >
          <UButton
            icon="i-lucide-ellipsis"
            color="neutral"
            variant="ghost"
            size="sm"
            :class="{
              'opacity-0 transition-opacity duration-100 group-hover:opacity-100':
                !isHovering,
            }"
          />
        </UDropdownMenu>
      </div>
      <div class="text-xs text-gray-600 dark:text-gray-400">
        {{ task.description }}
      </div>
      <div class="mt-3 flex items-center gap-4">
        <UTooltip :text="assignedTo?.user.name" :delay-duration="0">
          <UAvatar
            :src="assignedTo?.user.avatarUrl"
            size="3xs"
            :alt="assignedTo?.user.name"
          />
        </UTooltip>
        <div
          class="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400"
        >
          <UIcon name="i-lucide-clock" class="size-3" />
          {{ useDateFormat(task.dueDate, 'MMM D, YYYY') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Task } from '@@/types/database'
import { useDateFormat } from '@vueuse/core'

const isHovering = ref(false)
const props = defineProps<{
  task: Task
}>()

const { data: teamMembers } = useNuxtData('team-members')

const priorityOptions = [
  { label: 'Low', value: 'low' as const, color: 'text-neutral-500' },
  { label: 'Medium', value: 'medium' as const, color: 'text-yellow-500' },
  { label: 'High', value: 'high' as const, color: 'text-red-500' },
]

const assignedTo = computed(() => {
  return teamMembers.value?.find(
    (member) => member.userId === props.task.assignedToId,
  )
})
const emit = defineEmits<{
  (e: 'delete', taskId: string): void
  (e: 'duplicate', task: Task): void
}>()
const items = ref([
  [
    {
      label: 'Edit',
      icon: 'i-lucide-pencil',
    },
    {
      label: 'Duplicate',
      icon: 'i-lucide-copy',
      onSelect: () => {
        emit('duplicate', props.task)
      },
    },
  ],
  [
    {
      label: 'Delete',
      icon: 'i-lucide-trash-2',
      color: 'error',
      onSelect: () => {
        emit('delete', props.task.id)
      },
    },
  ],
])
</script>
