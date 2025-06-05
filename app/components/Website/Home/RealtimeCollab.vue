<template>
  <div class="flex p-px lg:col-span-2">
    <div
      class="overflow-hidden rounded-lg bg-neutral-50 dark:bg-neutral-950 chunky-card lg:rounded-tr-[2rem] cursor-none"
      @mouseenter="handleMouseEnter"
      @mousemove="updateYouCursor"
      @mouseleave="hideYouCursor"
    >
      <div class="h-64 relative p-8">
        <div
          class="absolute transition-transform duration-75"
          :style="youCursorPosition"
          :class="{ 'opacity-0': !showYouCursor }"
        >
          <div class="relative">
            <WebsiteHomeYouCursor class="h-8 w-auto" />
            <UBadge
              label="You"
              variant="solid"
              color="neutral"
              :avatar="{
                size: '3xs',
                src: 'https://github.com/fayazara.png',
              }"
              class="absolute top-6 -right-12 shadow-xl"
            />
          </div>
        </div>
        <ClientOnly>
          <div
            class="absolute transition-all"
            :style="emmaPosition"
            :class="{
              'opacity-0': !showEmma,
              'duration-500': isDirectMoving,
              'duration-1000': !isDirectMoving,
            }"
          >
            <div class="relative">
              <WebsiteHomeRandomCursor
                class="h-8 w-auto transition-transform"
                :class="{ 'scale-95': isClicking }"
              />
              <UBadge
                label="Emma"
                :avatar="{
                  size: '3xs',
                  src: 'https://i.pravatar.cc/400?img=45',
                }"
                variant="solid"
                color="neutral"
                class="absolute top-6 -right-[64px] shadow-xl"
              />
            </div>
          </div>
        </ClientOnly>
        <div ref="gridRef" class="grid grid-cols-3 gap-2">
          <div
            class="h-8 bg-white dark:bg-neutral-900 rounded-md border border-neutral-200 dark:border-white/10"
          />
          <div
            class="h-8 bg-white dark:bg-neutral-900 rounded-md border border-neutral-200 dark:border-white/10 px-2 flex items-center font-mono text-neutral-500 text-xs transition-all"
            :class="{
              'ring-2 ring-primary-500/20 border-primary-500 dark:ring-primary-500/30 dark:border-primary-100':
                isFocused,
            }"
          >
            <span
              class="overflow-hidden whitespace-nowrap"
              :class="{ 'animate-typing': isTyping }"
            >
              {{ displayText }}
            </span>
          </div>
          <div
            v-for="i in 16"
            :key="i"
            class="h-8 bg-white dark:bg-neutral-900 rounded-md border border-neutral-200 dark:border-white/10"
          />
        </div>
      </div>
      <div class="p-10">
        <h3 class="text-sm/4 font-semibold text-neutral-500">Live Updates</h3>
        <p class="mt-2 text-lg font-bold font-display ">
          Real-time collaboration
        </p>
        <p class="mt-2 max-w-lg text-sm/6 text-neutral-500">
          Connect with your team in real-time, see changes as they happen, and
          collaborate on the same database.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const showEmma = ref(false)
const isClicking = ref(false)
const isFocused = ref(false)
const isTyping = ref(false)
const text = ref('')
const showYouCursor = ref(false)
const youCursorPosition = ref({ top: '0px', left: '0px' })
const isDirectMoving = ref(false)
const userHovered = ref(false)
const gridRef = ref(null)
const randomMovementInterval = ref(null)

// Cell positions for Emma's cursor to move to
const cellPositions = ref([])

const randomStartPosition = () => ({
  top: `${Math.random() * 100}%`,
  left: '-50px',
})

const emmaPosition = ref(randomStartPosition())

const displayText = computed(() => text.value)

// Calculate positions of all cells in the grid
const calculateCellPositions = () => {
  if (!gridRef.value) return

  const gridRect = gridRef.value.getBoundingClientRect()
  const cells = gridRef.value.querySelectorAll('div')
  cellPositions.value = []

  cells.forEach((cell, index) => {
    const cellRect = cell.getBoundingClientRect()
    // Position relative to the grid
    cellPositions.value.push({
      top: `${cellRect.top - gridRect.top + 16}px`, // Center the cursor
      left: `${cellRect.left - gridRect.left + 16}px`,
      index,
    })
  })
}

// Get a random cell position
const getRandomCellPosition = () => {
  if (cellPositions.value.length === 0) return null
  const randomIndex = Math.floor(Math.random() * cellPositions.value.length)
  return cellPositions.value[randomIndex]
}

// Move Emma's cursor to a random cell
const moveToRandomCell = async () => {
  if (userHovered.value) return // Don't move randomly if user is hovering

  const randomCell = getRandomCellPosition()
  if (!randomCell) return

  isDirectMoving.value = false
  emmaPosition.value = {
    top: randomCell.top,
    left: randomCell.left,
  }

  // Make a longer pause at the cell
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Randomly do a click animation
  if (Math.random() > 0.7 && !userHovered.value) {
    isClicking.value = true
    await new Promise((resolve) => setTimeout(resolve, 300))
    isClicking.value = false
  }
}

// Start random movement with longer interval
const startRandomMovement = () => {
  showEmma.value = true

  // Calculate initial cell positions
  calculateCellPositions()

  randomMovementInterval.value = setInterval(() => {
    if (!userHovered.value) {
      // Call the async function but don't return the promise
      void moveToRandomCell()
    }
  }, 2000)
}

const updateYouCursor = (event) => {
  const rect = event.currentTarget.getBoundingClientRect()
  const x = event.clientX - rect.left - 16 // 16 is half the cursor width
  const y = event.clientY - rect.top - 16 // 16 is half the cursor height

  youCursorPosition.value = {
    left: `${x}px`,
    top: `${y}px`,
  }
  showYouCursor.value = true
}

const hideYouCursor = () => {
  showYouCursor.value = false
  userHovered.value = false
}

const handleMouseEnter = () => {
  userHovered.value = true
  void startAnimation()
}

const startAnimation = async () => {
  // Only reset if coming from random movement
  isClicking.value = false
  isFocused.value = false
  isTyping.value = false
  text.value = ''

  // Direct movement to target position
  isDirectMoving.value = true
  emmaPosition.value = {
    top: '3.5rem',
    left: '12rem',
  }

  await new Promise((resolve) => setTimeout(resolve, 500))
  isClicking.value = true
  isFocused.value = true

  await new Promise((resolve) => setTimeout(resolve, 200))
  isTyping.value = true
  text.value = 'order_1128'

  await new Promise((resolve) => setTimeout(resolve, 200))
  isClicking.value = false
}

// Start random movement when component mounts
onMounted(() => {
  calculateCellPositions()
  showEmma.value = true
  startRandomMovement()

  // Recalculate positions on resize
  window.addEventListener('resize', calculateCellPositions)
})

// Clean up interval when component unmounts
onBeforeUnmount(() => {
  if (randomMovementInterval.value) {
    clearInterval(randomMovementInterval.value)
  }
  window.removeEventListener('resize', calculateCellPositions)
})
</script>

<style scoped>
.animate-typing {
  animation: typing 0.5s steps(9);
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>
