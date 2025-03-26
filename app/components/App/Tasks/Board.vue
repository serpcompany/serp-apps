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
      <ScrollAreaRoot
        class="relative flex min-w-0 flex-1 overflow-hidden"
        :scroll-hide-delay="200"
      >
        <ScrollAreaViewport class="h-full w-full">
          <ul class="space-y-2" v-auto-animate>
            <li v-for="task in tasks" :key="task.id">
              <AppTasksItem :task="task" />
            </li>
          </ul>
        </ScrollAreaViewport>

        <ScrollAreaScrollbar
          class="z-20 flex touch-none rounded-full p-0.5 select-none hover:bg-neutral-200 data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col data-[orientation=vertical]:w-2.5 dark:bg-neutral-800 dark:hover:bg-neutral-700"
          orientation="vertical"
        >
          <ScrollAreaThumb
            class="relative flex-1 rounded-[10px] bg-neutral-400 before:absolute before:top-1/2 before:left-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] dark:bg-neutral-600"
          />
        </ScrollAreaScrollbar>
      </ScrollAreaRoot>
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
import {
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from 'reka-ui'

const emit = defineEmits<{
  (e: 'delete', boardId: string): void
  (e: 'add-task', boardId: string, task: Task): void
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

const { createTask } = useTasks()

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
    const newTask = await createTask(
      {
        ...task,
        assignedToId: task.assignedTo,
        dueDate: new Date(task.dueDate),
      },
      props.board.id,
    )
    tasks.value.push(newTask)
    emit('add-task', props.board.id, newTask)
  } catch (error) {
    console.error(error)
  } finally {
    isAddingTask.value = false
  }
}
</script>
