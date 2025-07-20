<template>
  <ToolsContainer
    title="Bulk AI Image Generator"
    :credits="user?.credits || 0"
    :how-it-works="howItWorks"
  >
    <UCard variant="subtle">
      <div class="mb-6">
        <h2 class="text-xl font-bold mb-1">Generate AI Images</h2>
        <p class="text-muted text-sm">
          Bulk Images generator is a powerful tool that allows you to create multiple images using AI with a single prompt, or multiple prompts from a csv file.
        </p>
      </div>
    </UCard>
  </ToolsContainer>
</template>

<script setup lang="ts">
const { user } = useUserSession()

const howItWorks = [
  {
    title: '1. Provide Your Prompts',
    description: 'Enter a single prompt for a quick creation, or upload a CSV file with a list of prompts to generate images at scale.',
    icon: 'i-lucide-file-spreadsheet',
  },
  {
    title: '2. Generate in Bulk',
    description: 'Specify the number of unique images for each prompt. Our AI will process your entire batch in a single job.',
    icon: 'i-lucide-bot',
  },
  {
    title: '3. Download Your Assets',
    description: 'Access your full collection in the dashboard. Preview, manage, and download individual images or the entire batch as a ZIP file.',
    icon: 'i-lucide-download-cloud',
  },
]
</script>
