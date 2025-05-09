<template>
  <div class="overflow-x-auto overflow-hidden">
    <div class="p-1 space-y-3 h-64 flex flex-col justify-between">
      <!-- User Message -->
      <div
        class="flex justify-end"
        :class="[
          isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        ]"
        :style="{
          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }"
      >
        <div
          class="max-w-[80%] bg-primary-500 text-white rounded-xl rounded-br-sm p-3 ring-1 ring-primary-600"
        >
          <div class="space-y-1.5">
            <div class="h-3 w-24 md:w-48 bg-white/20 rounded animate-pulse" />
            <div
              class="h-3 w-16 md:w-40 bg-white/20 rounded animate-pulse ml-auto"
            />
          </div>
        </div>
      </div>

      <!-- AI Response -->
      <div
        class="flex justify-start"
        :class="[
          isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        ]"
        :style="{
          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 100ms',
        }"
      >
        <div
          class="bg-neutral-100 dark:bg-neutral-800 rounded-xl rounded-bl-sm p-3 ring-1 ring-neutral-300 dark:ring-white/10"
        >
          <div class="space-y-1.5">
            <div
              class="h-3 w-32 md:w-48 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"
            />
            <div
              class="h-3 w-28 md:w-40 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"
            />
            <div
              class="h-3 w-32 md:w-40 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"
            />
          </div>
        </div>
      </div>

      <!-- Second User Message -->
      <div
        class="flex justify-end"
        :class="[
          isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        ]"
        :style="{
          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 200ms',
        }"
      >
        <div
          class="max-w-[80%] bg-primary-500 text-white rounded-xl rounded-br-sm p-3 ring-1 ring-primary-600"
        >
          <div class="h-3 w-20 md:w-32 bg-white/20 rounded animate-pulse" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isAnimated = ref(false)

onMounted(() => {
  setTimeout(() => {
    isAnimated.value = true
  }, 100)
})
</script>
