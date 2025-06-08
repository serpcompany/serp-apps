<template>
  <UCard
    variant="soft"
  >
    <div class="mx-auto max-w-4xl text-center pt-4 sm:pt-6 lg:pt-8 mb-12 lg:mb-16">
      <h2 class="text-4xl font-bold tracking-tight text-highlighted sm:text-5xl">
        {{ title }}
      </h2>

      <p v-if="description" class="mt-2 text-lg leading-8 text-toned">
        {{ description }}
      </p>

      <div v-if="features && features.length" class="mt-10">
        <h3 class="text-sm font-semibold uppercase tracking-wider text-muted">
          What's Included
        </h3>

        <ul
          role="list"
          class="mt-4 flex flex-col items-center justify-center gap-4 leading-6 sm:flex-row sm:gap-6 lg:gap-8"
        >
          <li v-for="feature in features" :key="feature.name" class="flex items-center gap-x-2">
            <UIcon name="i-lucide-check-circle" class="h-5 w-5 text-primary-500 shrink-0" />
            {{ feature.name }}
          </li>
        </ul>
      </div>
    </div>

    <slot />
  </UCard>
</template>

<script setup lang="ts">
interface Feature {
  name?: string
}

defineProps<{
  title: string
  description?: string | null
  features: Feature[]
}>()
</script>
