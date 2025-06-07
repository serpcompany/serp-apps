<template>
  <UCard
    variant="soft"
  >
    <template #header>
      <div class="space-y-4">
        <div class="space-y-2">
          <h3 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            {{ title }}
          </h3>

          <p v-if="description" class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {{ description }}
          </p>
        </div>

        <div v-if="features && features.length > 0" class="space-y-3">
          <h4 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
            What's Included
          </h4>
          <ul class="space-y-2">
            <li
              v-for="feature in features"
              :key="feature.name"
              class="flex items-start gap-3 text-gray-700 dark:text-gray-300"
            >
              <UIcon
                name="i-lucide-check-circle"
                class="text-green-500 h-4 w-4 mt-0.5 flex-shrink-0"
              />
              <span class="text-sm leading-relaxed">{{ feature.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </template>

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
