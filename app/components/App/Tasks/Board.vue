<template>
  <div
    class="flex h-full w-full flex-shrink-0 snap-mandatory snap-center flex-col sm:w-72"
  >
    <div
      class="mb-2 flex items-center justify-between gap-2 border-b border-neutral-100 pb-2 dark:border-white/10"
    >
      <h2 class="flex-1 text-sm font-bold">{{ board.name }}</h2>
      <UButton color="neutral" variant="soft" class="flex-shrink-0" size="sm">
        {{ tasks.length }}
      </UButton>
      <UDropdownMenu
        :items="items"
        :content="{
          align: 'end',
          side: 'bottom',
          sideOffset: 8,
        }"
        :ui="{
          itemLeadingIcon: 'size-4',
        }"
      >
        <UButton
          color="neutral"
          variant="soft"
          class="flex-shrink-0"
          size="sm"
          :loading="props.isDeleting"
          icon="i-lucide-ellipsis"
        />
      </UDropdownMenu>
    </div>
    <div class="flex max-h-[calc(100%-45px)] flex-col gap-2">
      <div class="relative flex min-w-0 flex-1 overflow-y-auto">
        <ul class="w-full space-y-2" v-auto-animate>
          <li v-for="task in tasks" :key="task.id">
            <AppTasksItem
              :task="task"
              @delete="handleDeleteTask"
              @duplicate="handleDuplicateTask"
              @toggle-completion="handleToggleCompletion"
            />
          </li>
        </ul>
      </div>
      <AppTasksNewTask @task-created="handleTaskCreated" />
    </div>
  </div>
  <UModal
    v-model:open="showDeleteConfirmationModal"
    title="Delete Board"
    description="Are you sure you want to delete this board? This action cannot be undone."
  >
    <template #body>
      <div class="flex items-center justify-end gap-2">
        <UButton color="neutral" @click="showDeleteConfirmationModal = false"
          >Cancel</UButton
        >
        <UButton color="error" @click="handleDeleteBoard">Delete</UButton>
      </div>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'
import type { Board, Task } from '~/types/tasks'

const emit = defineEmits<{
  (e: 'delete', boardId: string): void
}>()

const props = defineProps<{
  board: Board
  isDeleting: boolean
}>()

const tasks = ref<Task[]>(props.board.tasks)

function handleDeleteBoard() {
  emit('delete', props.board.id)
}

const showDeleteConfirmationModal = ref(false)

const items = ref<DropdownMenuItem[]>([
  {
    label: 'Edit Board',
    icon: 'i-lucide-pencil',
  },
  {
    label: 'Delete',
    icon: 'i-lucide-trash',
    color: 'error',
    onSelect: () => {
      showDeleteConfirmationModal.value = true
    },
  },
])

const { createTask, deleteTask, duplicateTask, toggleTaskCompletion } =
  useTasks()

const isAddingTask = ref(false)
const handleTaskCreated = async (task: {
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  assignedTo: string
  dueDate: string
}) => {
  try {
    isAddingTask.value = true
    const optimisticTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      assignedToId: task.assignedTo,
      dueDate: new Date(task.dueDate),
      boardId: props.board.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdById: props.board.userId,
      teamId: props.board.teamId,
      completed: false,
      description: task.description || null,
    }
    tasks.value.push(optimisticTask)
    await createTask(
      {
        ...task,
        assignedToId: task.assignedTo,
        dueDate: new Date(task.dueDate),
      },
      props.board.id,
    )
  } catch (error) {
    console.error(error)
  } finally {
    isAddingTask.value = false
  }
}

function handleDeleteTask(taskId: string) {
  try {
    tasks.value = tasks.value.filter((task) => task.id !== taskId)
    deleteTask(props.board.id, taskId)
  } catch (error) {
    console.error(error)
  }
}

async function handleDuplicateTask(task: Task) {
  try {
    tasks.value.push(task)
    await duplicateTask(props.board.id, task.id)
  } catch (error) {
    console.error(error)
  }
}

function handleToggleCompletion(taskId: string, completed: boolean) {
  tasks.value = tasks.value.map((task) =>
    task.id === taskId ? { ...task, completed } : task,
  )
  toggleTaskCompletion(props.board.id, taskId, completed)
}
</script>
