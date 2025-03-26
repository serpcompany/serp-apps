<template>
  <div
    v-if="showAddTask"
    class="max-h-64 min-h-20 rounded-xl border border-gray-200 px-2 pt-1 pb-2 dark:border-white/10"
  >
    <UForm :schema="taskSchema" :state="state" @submit="onSubmit">
      <!-- Task Title -->
      <UFormField name="title">
        <UTextarea
          v-model="state.title"
          variant="none"
          :placeholder="getRandomPlaceholder()"
          :rows="1"
          :maxrows="3"
          autoresize
          :size="largerThanSm ? 'lg' : 'xl'"
          class="hide-scrollbar -mx-1 w-full flex-1 resize-none font-semibold"
        />
      </UFormField>

      <!-- Task Description -->
      <UFormField name="description">
        <UTextarea
          v-model="state.description"
          placeholder="Description"
          autoresize
          :maxrows="5"
          variant="none"
          :size="largerThanSm ? 'lg' : 'xl'"
          class="hide-scrollbar -mx-1 w-full flex-1 resize-none"
        />
      </UFormField>

      <!-- Task Controls -->
      <div class="flex w-full justify-between gap-1">
        <!-- Left Controls -->
        <div class="flex items-center gap-1">
          <!-- Priority Selector -->
          <UPopover
            :content="{
              align: 'start',
              side: 'bottom',
              sideOffset: 8,
            }"
          >
            <UButton
              icon="i-ph-circle-duotone"
              size="sm"
              variant="soft"
              square
              :color="getPriorityColor(selectedPriority)"
              :class="getPriorityTextClass(selectedPriority)"
            />
            <template #content>
              <ul class="isolate w-40 space-y-px p-1 text-sm">
                <li
                  v-for="priority in priorityOptions"
                  :key="priority.value"
                  class="flex scroll-py-1 items-center justify-between gap-1 rounded-md p-1.5 focus-within:bg-neutral-100 hover:bg-neutral-100 dark:focus-within:bg-white/10 dark:hover:bg-white/10"
                >
                  <button
                    class="flex flex-1 cursor-pointer items-center gap-1 focus:outline-none"
                    @click="selectedPriority = priority.value"
                  >
                    <UIcon name="i-ph-circle-duotone" :class="priority.color" />
                    <span>{{ priority.label }}</span>
                  </button>
                  <UIcon
                    v-if="selectedPriority === priority.value"
                    name="i-lucide-check"
                    class="text-primary"
                  />
                </li>
              </ul>
            </template>
          </UPopover>

          <!-- Assignee Selector -->
          <UPopover
            :content="{
              align: 'start',
              side: 'bottom',
              sideOffset: 8,
            }"
          >
            <UButton
              :avatar="selectedAvatar"
              square
              size="sm"
              color="neutral"
              variant="soft"
            />
            <template #content>
              <ul class="isolate w-40 space-y-px p-1 text-sm">
                <li
                  v-for="item in items"
                  :key="item.value"
                  class="flex scroll-py-1 items-center justify-between gap-1 rounded-md px-1.5 py-1 focus-within:bg-neutral-100 hover:bg-neutral-100 dark:focus-within:bg-white/10 dark:hover:bg-white/10"
                >
                  <button
                    class="flex flex-1 cursor-pointer items-center gap-1 focus:outline-none"
                    @click="selectedUserId = item.value"
                  >
                    <UAvatar
                      v-if="item.avatar"
                      :src="item.avatar.src"
                      :alt="item.avatar.alt"
                      size="3xs"
                    />
                    <span>{{ item.label }}</span>
                  </button>
                  <UIcon
                    v-if="selectedUserId === item.value"
                    name="i-lucide-check"
                    class="text-primary"
                  />
                </li>
              </ul>
            </template>
          </UPopover>

          <!-- Date Selector -->
          <UPopover>
            <UButton
              color="neutral"
              variant="soft"
              square
              icon="i-lucide-calendar"
              class="text-neutral-500"
              size="sm"
            />
            <template #content>
              <UCalendar v-model="state.dueDate" size="sm" color="neutral" />
            </template>
          </UPopover>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-1">
          <UButton
            @click="showAddTask = false"
            icon="i-lucide-x"
            color="neutral"
            variant="soft"
            square
            size="sm"
          />
          <UButton
            type="submit"
            icon="i-lucide-arrow-right"
            color="neutral"
            variant="soft"
            square
            size="sm"
          />
        </div>
      </div>
    </UForm>
  </div>

  <!-- Add Task Button -->
  <UButton
    v-else
    icon="i-lucide-plus"
    color="neutral"
    variant="soft"
    label="New Task"
    block
    @click="showAddTask = true"
  />
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

import { getLocalTimeZone, today } from '@internationalized/date'
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Priority } from '~/types/tasks'

const breakpoints = useBreakpoints(breakpointsTailwind)

const largerThanSm = breakpoints.greater('sm')
// Task Schema
const taskSchema = z.object({
  title: z.string().min(1, 'Task title is required'),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  assignedTo: z.string(),
  dueDate: z.any().optional(),
})

type TaskSchema = z.output<typeof taskSchema>

// Props & Emits
const emit = defineEmits<{
  (e: 'task-created', task: {
    title: string
    description: string
    priority: Priority
    assignedTo: string
    dueDate: string
  }): void
}>()

// State
const showAddTask = ref(false)
const state = reactive<TaskSchema>({
  title: '',
  description: '',
  priority: 'low',
  assignedTo: '',
  dueDate: today(getLocalTimeZone()),
})

// Team Members
const { data: teamMembers } = useNuxtData('team-members')
const items = computed(
  () =>
    teamMembers.value?.map((member: { user: { name: string, avatarUrl?: string }, userId: string }) => ({
      label: member.user.name.split(' ')[0],
      value: member.userId,
      avatar: {
        src: member.user.avatarUrl,
        alt: member.user.name,
      },
    })) ?? [],
)

// Computed properties
const selectedPriority = computed({
  get: () => state.priority,
  set: (value: Priority) => {
    state.priority = value
  },
})

const selectedUserId = computed({
  get: () => state.assignedTo,
  set: (value: string) => {
    state.assignedTo = value
  },
})

const selectedAvatar = computed(
  () =>
    items.value.find(
      (item: { value: string }) => item.value === state.assignedTo,
    )?.avatar,
)

// Priority options
const priorityOptions = [
  { label: 'Low', value: 'low' as const, color: 'text-neutral-500' },
  { label: 'Medium', value: 'medium' as const, color: 'text-yellow-500' },
  { label: 'High', value: 'high' as const, color: 'text-red-500' },
]

// Set initial selection to first team member if available
watchEffect(() => {
  if (items.value.length && !state.assignedTo) {
    state.assignedTo = items.value[0]?.value
  }
})

// Methods
function getPriorityColor(priority: Priority) {
  if (priority === 'low') return 'neutral'
  if (priority === 'medium') return 'warning'
  return 'error'
}

function getPriorityTextClass(priority: Priority) {
  if (priority === 'low') return 'text-neutral-500'
  if (priority === 'medium') return 'text-yellow-500'
  return 'text-red-500'
}

function resetForm() {
  state.title = ''
  state.description = ''
  state.priority = 'low'
  state.dueDate = today(getLocalTimeZone())
}

async function onSubmit(event: FormSubmitEvent<TaskSchema>) {
  const formattedDueDate = state.dueDate
    .toDate(getLocalTimeZone())
    .toISOString()

  emit('task-created', {
    title: event.data.title,
    description: event.data.description || '',
    priority: event.data.priority,
    assignedTo: event.data.assignedTo,
    dueDate: formattedDueDate,
  })

  resetForm()
  showAddTask.value = false
}

function getRandomPlaceholder() {
  const placeholders = [
    'Call Emily',
    'Buy groceries',
    'Record the next video',
    'Finish writing the new docs',
    'Fix the bug with the login',
    'Go over the PR one more time',
  ]
  return placeholders[Math.floor(Math.random() * placeholders.length)]
}
</script>

<style scoped>
.hide-scrollbar textarea::-webkit-scrollbar {
  display: none;
}

:deep(textarea) {
  resize: none;
}
</style>
