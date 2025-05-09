<template>
  <div class="overflow-x-auto">
    <div class="min-w-[600px] p-1 h-64">
      <!-- Header -->
      <div class="flex gap-2 mb-3">
        <div
          v-for="column in columns"
          :key="column"
          class="flex-1 p-2 bg-neutral-200 dark:bg-neutral-800 rounded font-medium text-neutral-600 dark:text-neutral-400 font-mono text-xs"
          :class="[
            isAnimated
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4',
          ]"
          :style="{
            transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${
              column.index * 25
            }ms`,
          }"
        >
          {{ column.name }}
        </div>
      </div>
      <!-- Rows -->
      <div class="space-y-2">
        <div v-for="(row, rowIndex) in 5" :key="rowIndex" class="flex gap-2">
          <div
            v-for="(col, colIndex) in columns"
            :key="colIndex"
            class="flex-1 h-8 bg-neutral-100 dark:bg-neutral-900 rounded ring-1 ring-neutral-300 dark:ring-white/10"
            :class="[
              isAnimated
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-4',
            ]"
            :style="{
              transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${
                rowIndex * 25 + colIndex * 5
              }ms`,
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const columns = [
  { name: 'product_id', index: 0 },
  { name: 'name', index: 1 },
  { name: 'category', index: 2 },
  { name: 'price', index: 3 },
  { name: 'stock', index: 4 },
  { name: 'created_at', index: 5 },
]

const isAnimated = ref(false)

onMounted(() => {
  setTimeout(() => {
    isAnimated.value = true
  }, 100)
})
</script>
