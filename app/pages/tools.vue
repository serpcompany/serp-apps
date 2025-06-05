<template>
  <UContainer class="py-12 sm:py-16 lg:py-32">
    <h1 class="text-3xl md:text-4xl font-bold mb-6">Tools</h1>
    <p class="text-muted mb-8">
      Explore our suite of tools designed to help you optimize your website and improve your search engine rankings.
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <ToolsInfoCard
        v-for="tool in SerpTools"
        :key="tool.title"
        :icon="tool.icon"
        :title="tool.title"
        :to="`/dashboard${tool.path || ''}`"
        :description="tool.description"
      />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { SerpTools } from '@@/constants'

definePageMeta({
  layout: 'website',
})
</script>
