<template>
  <div
    v-if="showAddTask"
    class="max-h-64 min-h-20 rounded-xl border border-gray-200 px-2 pt-1 pb-2 dark:border-white/10"
  >
    <UForm>
      <UTextarea
        variant="none"
        placeholder="Call Emily"
        :rows="1"
        :maxrows="3"
        autoresize
        class="hide-scrollbar -mx-1 w-full flex-1 resize-none font-semibold"
      />
      <UTextarea
        placeholder="Description"
        autoresize
        :maxrows="5"
        variant="none"
        class="hide-scrollbar -mx-1 w-full flex-1 resize-none"
      />
      <div class="flex w-full justify-between gap-1">
        <div class="flex items-center gap-1">
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
              :color="
                selectedPriority === 'low'
                  ? 'neutral'
                  : selectedPriority === 'medium'
                    ? 'warning'
                    : 'error'
              "
              :class="
                selectedPriority === 'low'
                  ? 'text-neutral-500'
                  : selectedPriority === 'medium'
                    ? 'text-yellow-500'
                    : 'text-red-500'
              "
            />
            <template #content>
              <ul class="isolate w-40 space-y-px p-1 text-sm">
                <li
                  v-for="priority in priorityOptions"
                  :key="priority.value"
                  class="flex scroll-py-1 items-center justify-between gap-1 rounded-md p-1.5 focus-within:bg-neutral-100 hover:bg-neutral-100"
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
          <USelect
            v-model="value"
            :items="items"
            value-key="value"
            :avatar="avatar"
            color="neutral"
            variant="soft"
            class="max-w-30"
          />
        </div>
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
            icon="i-lucide-arrow-right"
            color="primary"
            square
            size="sm"
          />
        </div>
      </div>
    </UForm>
  </div>
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

<script lang="ts" setup>
import type { SelectItem } from '@nuxt/ui'
const { data: teamMembers } = useNuxtData('team-members')

const showAddTask = ref(false)
const state = reactive({
  title: '',
})
const selectedPriority = ref('low')
const priorityOptions = [
  { label: 'Low', value: 'low', color: 'text-neutral-500' },
  { label: 'Medium', value: 'medium', color: 'text-yellow-500' },
  { label: 'High', value: 'high', color: 'text-red-500' },
]

const items = computed(() => 
  teamMembers.value?.map(member => ({
    label: member.user.name.split(' ')[0],
    value: member.userId,
    avatar: {
      src: member.user.avatarUrl,
      alt: member.user.name
    }
  })) ?? []
)

const value = ref(items.value[0]?.value)

const avatar = computed(
  () => items.value.find((item) => item.value === value.value)?.avatar,
)
</script>

<style scoped>
:deep(.button-select-menu) ul {
  @apply min-w-max;
}

.hide-scrollbar textarea::-webkit-scrollbar {
  display: none;
}

:deep(textarea) {
  resize: none;
}
</style>
