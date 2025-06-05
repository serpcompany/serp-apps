<template>
  <div class="py-20">
    <div class="" />
    <div
      class="text-center mb-6 flex items-center justify-center gap-4 flex-col"
    >
      <h2 class="font-display text-4xl md:text-5xl font-bold">
        How would you like to query your data?
      </h2>
      <p class="text-neutral-500">
        Visualize Data, write SQL queries, or just chat with your data.
      </p>
      <UTabs
        v-model="active"
        :items="items"
        class="w-full md:w-1/2"
        :ui="{ indicator: 'rounded-full', list: 'rounded-full', leadingIcon: 'size-4' }"
      />
    </div>
    <WebsiteHomeFeatureCard class="max-w-4xl mx-auto">
      <div v-if="active === '0'">
        <WebsiteHomeSQLTable />
      </div>
      <div v-if="active === '1'">
        <WebsiteHomeBarChart />
      </div>
      <div v-if="active === '2'">
        <WebsiteHomeAIChat />
      </div>
    </WebsiteHomeFeatureCard>
  </div>
</template>

<script lang="ts" setup>
const active = ref('0')
const items = ref([
  {
    label: 'SQL',
    icon: 'i-lucide-database',
  },
  {
    label: 'Visualize Data',
    icon: 'i-lucide-chart-pie',
  },
  {
    label: 'AI Chat',
    icon: 'i-lucide-sparkles',
  },
])
</script>
