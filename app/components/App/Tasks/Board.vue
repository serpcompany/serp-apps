<template>
  <div
    class="flex h-full w-full flex-shrink-0 snap-mandatory snap-center flex-col sm:w-72"
  >
    <div
      class="mb-2 flex items-center justify-between gap-2 border-b border-neutral-100 pb-2 dark:border-white/10"
    >
      <h2 class="flex-1 text-sm">{{ board.name }}</h2>
      <UButton color="neutral" variant="soft" class="flex-shrink-0" size="sm">
        {{ board.tasks.length }}
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
          icon="i-lucide-ellipsis"
        />
      </UDropdownMenu>
    </div>
    <div
      class="flex max-h-[calc(100%-37px)] flex-col gap-2  sm:max-h-[calc(100%-45px)]"
    >
      <ScrollAreaRoot class="relative flex min-w-0 flex-1 overflow-hidden">
        <ScrollAreaViewport class="h-full w-full">
          <ul class="space-y-2" v-auto-animate>
            <li v-for="n in 100" :key="n">hello</li>
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
      <AppTasksNewTask />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Task, Board } from '@@/types/database'
import {
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from 'reka-ui'

type BoardWithTasks = Board & {
  tasks: Task[]
}
const props = defineProps<{
  board: BoardWithTasks
}>()

const items = ref<DropdownMenuItem[]>([
  {
    label: 'Edit Board',
    icon: 'i-lucide-pencil',
  },
  {
    label: 'Delete',
    icon: 'i-lucide-trash',
    color: 'error',
  },
])
</script>
