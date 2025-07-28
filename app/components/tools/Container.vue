<template>
  <AppContainer :title :padding="false">
    <template #actions>
      <UBadge color="neutral" variant="subtle" size="lg">
        Credits: <span class="font-bold">{{ user?.credits || 0 }}</span>
      </UBadge>
    </template>
    <UContainer class="py-4 sm:py-6 lg:py-8">
      <div class="flex flex-col gap-6 md:gap-8">
        <slot />

        <h3 class="text-2xl font-semibold ">How It Works</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ToolsHowItWorksCard
            v-for="howItWorksInfo in howItWorks"
            :key="howItWorksInfo.title"
            :icon="howItWorksInfo.icon"
            :title="howItWorksInfo.title"
            :description="howItWorksInfo.description"
          />
        </div>
      </div>
    </UContainer>
  </AppContainer>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  howItWorks: {
    icon: string
    title: string
    description: string
  }[]
}>()

const { user } = useUserSession()
</script>
