<template>
  <section ref="containerRef" class="relative">
    <!-- Border line and the moving span -->
    <div
      class="border-t border-neutral-200 dark:border-white/10 w-full relative"
    >
      <span
        class="w-8 h-px absolute top-full -translate-y-full -translate-x-1/2 bg-primary-500 transition-all duration-300"
        :style="{ left: `${indicatorLeft}px` }"
      />
    </div>
    <!-- Tabs -->
    <div class="overflow-x-auto scrollbar-hide snap-x snap-mandatory">
      <div
        class="grid md:grid-cols-4 grid-cols-[repeat(4,100%)] md:gap-4 gap-2 w-full"
      >
        <div
          v-for="(tab, i) in tabs"
          :key="i"
          class="px-4 py-6 flex items-center flex-col justify-center gap-2 text-center tab-item cursor-pointer snap-center"
          @click="activeFeature = i"
        >
          <UButton
            :icon="tab.icon"
            variant="soft"
            :color="activeFeature === i ? 'primary' : 'neutral'"
          />
          <p class="text-sm font-semibold">{{ tab.title }}</p>
          <p class="text-sm text-neutral-500">{{ tab.description }}</p>
        </div>
      </div>
    </div>
    <div>
      <img
        v-show="activeFeature === 0"
        data-theme="light"
        src="/dashboard-light-1.jpg"
        class="rounded-sm md:rounded-lg dark:hidden"
      >
      <img
        v-show="activeFeature === 0"
        data-theme="dark"
        src="/dashboard-dark-1.jpg"
        class="rounded-sm md:rounded-lg hidden dark:block"
      >
      <img
        v-show="activeFeature === 1"
        data-theme="light"
        src="/dashboard-light-2.jpg"
        class="rounded-sm md:rounded-lg dark:hidden"
      >
      <img
        v-show="activeFeature === 1"
        data-theme="dark"
        src="/dashboard-dark-2.jpg"
        class="rounded-sm md:rounded-lg hidden dark:block"
      >
      <img
        v-show="activeFeature === 2"
        data-theme="light"
        src="/dashboard-light-3.jpg"
        class="rounded-sm md:rounded-lg dark:hidden"
      >
      <img
        v-show="activeFeature === 2"
        data-theme="dark"
        src="/dashboard-dark-3.jpg"
        class="rounded-sm md:rounded-lg hidden dark:block"
      >
      <img
        v-show="activeFeature === 3"
        data-theme="light"
        src="/dashboard-light-4.jpg"
        class="rounded-sm md:rounded-lg dark:hidden"
      >
      <img
        v-show="activeFeature === 3"
        data-theme="dark"
        src="/dashboard-dark-4.jpg"
        class="rounded-sm md:rounded-lg hidden dark:block"
      >
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'

const tabs = [
  {
    title: 'Serverless Scale',
    description: 'Auto-scaling infrastructure',
    icon: 'i-ph-diamond-duotone',
  },
  {
    title: 'Global Edge',
    description: 'Multi-region deployment',
    icon: 'i-ph-circle-duotone',
  },
  {
    title: 'Real-time Sync',
    description: 'Real-time data sync',
    icon: 'i-ph-hexagon-duotone',
  },
  {
    title: 'AI-Ready',
    description: 'Native vector storage',
    icon: 'i-ph-star-four-duotone',
  },
]

const activeFeature = ref(0)
const containerRef = ref<HTMLElement | null>(null)
const indicatorLeft = ref(0)

function setIndicatorPosition() {
  if (!containerRef.value) return

  const items = containerRef.value.querySelectorAll('.tab-item')
  const activeEl = items[activeFeature.value] as HTMLElement
  if (!activeEl) return

  // Get container and active card positions
  const containerRect = containerRef.value.getBoundingClientRect()
  const activeRect = activeEl.getBoundingClientRect()

  // Calculate center of active card relative to container
  const center = activeRect.left - containerRect.left + activeRect.width / 2
  indicatorLeft.value = center
}

const setInitialPosition = async () => {
  await nextTick()
  setIndicatorPosition()
}

onMounted(setInitialPosition)

watch(activeFeature, setInitialPosition)
</script>
