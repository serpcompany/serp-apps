<template>
  <ul class="divide-y divide-neutral-100 dark:divide-white/10">
    <li v-for="message in starterMessages" :key="message.id">
      <UButton
        :label="message.title"
        class="my-1 w-full py-3 font-normal"
        color="neutral"
        variant="ghost"
        @click="handleSelect(message.title)"
      />
    </li>
  </ul>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'onSelect', message: string): void
}>()

const handleSelect = (message: string) => {
  emit('onSelect', message)
}

const starterMessages = [
  {
    id: 'prompt-1',
    title: 'Give me a list of 10 saas app ideas to build and make money',
  },
  {
    id: 'prompt-3',
    title: 'Create a 30-day learning plan for React and Typescript',
  },
  {
    id: 'prompt-4',
    title: 'Explain a complex technical concept in simple terms',
  },
  {
    id: 'prompt-5',
    title: 'Help me debug a performance issue in my application',
  },
  {
    id: 'prompt-6',
    title: 'Write a simple js function to convert SVG to PNG in browser',
  },
  {
    id: 'prompt-7',
    title: 'Compare different state management solutions for Vue',
  },
]
</script>
