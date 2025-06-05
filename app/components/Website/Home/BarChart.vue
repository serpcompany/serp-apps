<template>
  <div class="overflow-x-auto">
    <div class="flex items-end h-64 gap-2 min-w-[600px] px-1">
      <div
        v-for="(item, index) in impressionsChartData"
        :key="item.date"
        class="flex flex-col items-center flex-1"
      >
        <UTooltip :delay-duration="0" :text="item.value.toString()">
          <div
            class="w-full min-w-10 bg-neutral-200 dark:bg-neutral-800 ring-1 ring-neutral-300 dark:ring-white/10 rounded transition-all duration-300 cursor-pointer hover:-translate-y-1"
            :style="{
              height: isAnimated
                ? `${Math.max((item.value / maxValue) * 200, 1)}px`
                : '1px',
              transition: `height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${
                index * 5
              }ms`,
            }"
          />
        </UTooltip>
        <div class="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
          {{ formatDate(item.date) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const impressionsChartData = [
  { date: '2024-01-01', value: 2100 },
  { date: '2024-01-02', value: 3400 },
  { date: '2024-01-03', value: 2800 },
  { date: '2024-01-04', value: 4200 },
  { date: '2024-01-05', value: 3800 },
  { date: '2024-01-06', value: 5100 },
  { date: '2024-01-07', value: 4600 },
  { date: '2024-01-08', value: 3200 },
  { date: '2024-01-09', value: 4800 },
  { date: '2024-01-10', value: 3900 },
  { date: '2024-01-11', value: 5300 },
  { date: '2024-01-12', value: 4400 },
  { date: '2024-01-13', value: 3700 },
  { date: '2024-01-14', value: 5000 },
  { date: '2024-01-15', value: 4100 },
]

// Calculate the maximum value for scaling the bars
const maxValue = Math.max(...impressionsChartData.map((item) => item.value))

// Format date to show only the day
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', { day: 'numeric' })
}

const isAnimated = ref(false)

onMounted(() => {
  // Small delay to ensure the initial state is rendered
  setTimeout(() => {
    isAnimated.value = true
  }, 100)
})
</script>
