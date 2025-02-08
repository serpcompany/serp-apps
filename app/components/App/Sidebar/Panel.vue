<template>
  <div
    v-if="!smallerThanLg"
    class="relative hidden w-0 overflow-hidden flex-col items-stretch border-r border-neutral-200 bg-neutral-100 p-2 md:flex md:w-64 dark:border-neutral-900 dark:bg-black"
  >
    <slot />
  </div>
  <USlideover
    v-else
    side="left"
    v-model:open="model"
    :ui="{ content: 'max-w-[85%]' }"
  >
    <template #content>
      <div class="flex h-full flex-col p-2">
        <slot />
      </div>
    </template>
  </USlideover>
</template>

<script lang="ts" setup>
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
const model = defineModel<boolean>({ required: true })
const breakpoints = useBreakpoints(breakpointsTailwind)
const smallerThanLg = breakpoints.smaller('lg')
</script>
