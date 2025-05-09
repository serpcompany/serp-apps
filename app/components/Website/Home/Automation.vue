<template>
  <div class="flex p-px lg:col-span-4 w-full">
    <div
      class="overflow-hidden rounded-lg bg-neutral-50 dark:bg-neutral-950 chunky-card max-lg:rounded-b-[2rem] lg:rounded-br-[2rem] w-full"
    >
      <div
        class="h-48 lg:h-64 bg-[radial-gradient(var(--ui-color-neutral-300)_1px,transparent_1px)] dark:bg-[radial-gradient(var(--ui-color-neutral-800)_1px,transparent_1px)] [background-size:16px_16px] relative flex items-center overflow-hidden"
      >
        <div
          class="border-t-2 border-neutral-500/10 dark:border-neutral-800 w-full h-px relative z-0"
          :class="{ 'animate-shine-trail': triggerTrail }"
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 shine-overlay h-[3px] -top-[2.5px]"
          />
        </div>
        <div
          class="chunky-card flex items-center justify-center gap-1.5 lg:gap-2 h-12 lg:h-16 px-3 lg:px-4 w-full bg-white dark:bg-neutral-900 border border-transparent dark:border-white/10 rounded-xl transition-all duration-300 relative z-10"
          :class="{
            'scale-120': triggerStep === 1,
          }"
        >
          <UIcon
            v-if="triggerStep === 0"
            name="i-lucide-circle"
            class="text-warning-500"
          />
          <UIcon
            v-if="triggerStep === 1"
            name="i-lucide-loader"
            class="animate-spin"
          />
          <UIcon
            v-if="triggerStep === 2"
            name="i-lucide-circle-check"
            class="text-primary-500"
          />
          <p class="font-mono text-xs lg:text-sm">Trigger</p>
        </div>
        <div
          class="border-t-2 border-neutral-500/10 dark:border-neutral-800 w-full h-px relative z-0"
          :class="{ 'animate-shine-trail': conditionTrail }"
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 shine-overlay h-[3px] -top-[2.5px]"
          />
        </div>
        <div
          class="chunky-card flex items-center justify-center gap-1.5 lg:gap-2 h-12 lg:h-16 px-3 lg:px-4 w-full bg-white dark:bg-neutral-900 border border-transparent dark:border-white/10 rounded-xl transition-all duration-300 relative z-10"
          :class="{
            'scale-120': conditionStep === 1,
          }"
        >
          <UIcon
            v-if="conditionStep === 0"
            name="i-lucide-circle"
            class="text-warning-500"
          />
          <UIcon
            v-if="conditionStep === 1"
            name="i-lucide-loader"
            class="animate-spin"
          />
          <UIcon
            v-if="conditionStep === 2"
            name="i-lucide-circle-check"
            class="text-primary-500"
          />
          <p class="font-mono text-xs lg:text-sm">Condition</p>
        </div>
        <div
          class="border-t-2 border-neutral-500/10 dark:border-neutral-800 w-full h-px relative z-0"
          :class="{ 'animate-shine-trail': actionTrail }"
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 shine-overlay h-[3px] -top-[2.5px]"
          />
        </div>
        <div
          class="chunky-card flex items-center justify-center gap-1.5 lg:gap-2 h-12 lg:h-16 px-3 lg:px-4 w-full bg-white dark:bg-neutral-900 border border-transparent dark:border-white/10 rounded-xl transition-all duration-300 relative z-10"
          :class="{
            'scale-120': actionStep === 1,
          }"
        >
          <UIcon
            v-if="actionStep === 0"
            name="i-lucide-circle"
            class="text-warning-500"
          />
          <UIcon
            v-if="actionStep === 1"
            name="i-lucide-loader"
            class="animate-spin"
          />
          <UIcon
            v-if="actionStep === 2"
            name="i-lucide-circle-check"
            class="text-primary-500"
          />
          <p class="font-mono text-xs lg:text-sm">Action</p>
        </div>
        <div
          class="border-t-2 border-neutral-500/10 dark:border-neutral-800 w-full h-px relative z-0"
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 shine-overlay h-[3px] -top-[2.5px]"
          />
        </div>
      </div>
      <div class="p-6 lg:p-10">
        <h3 class="text-xs lg:text-sm/4 font-semibold text-neutral-500">Automation</h3>
        <p class="mt-2 text-base lg:text-lg font-bold font-display ">
          Automate Everything
        </p>
        <p class="mt-2 max-w-lg text-xs lg:text-sm/6 text-neutral-500">
          Automate even the most complex business processes with our powerful,
          intelligent automation engine
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const triggerStep = ref(0)
const conditionStep = ref(0)
const actionStep = ref(0)
const triggerTrail = ref(false)
const conditionTrail = ref(false)
const actionTrail = ref(false)

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const runAnimation = async () => {
  // Reset all steps
  triggerStep.value = 0
  conditionStep.value = 0
  actionStep.value = 0
  triggerTrail.value = false
  conditionTrail.value = false
  actionTrail.value = false

  await sleep(1000)

  // Trigger sequence
  triggerTrail.value = true
  await sleep(800) // Wait for trail animation
  triggerStep.value = 1
  await sleep(1000)
  triggerStep.value = 2
  conditionTrail.value = true // Start next trail immediately after loading
  await sleep(800) // Wait for trail animation

  // Condition sequence
  conditionStep.value = 1
  await sleep(1000)
  conditionStep.value = 2
  actionTrail.value = true // Start next trail immediately after loading
  await sleep(800) // Wait for trail animation

  // Action sequence
  actionStep.value = 1
  await sleep(1000)
  actionStep.value = 2
  await sleep(1000)

  // Reset trails
  triggerTrail.value = false
  conditionTrail.value = false
  actionTrail.value = false
}

const startAnimation = async () => {
  while (true) {
    await runAnimation()
  }
}

onMounted(() => {
  startAnimation()
})
</script>

<style scoped>
.animate-shine-trail .shine-overlay {
  animation: shineTrail 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes shineTrail {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateX(100%);
  }
}
</style>
