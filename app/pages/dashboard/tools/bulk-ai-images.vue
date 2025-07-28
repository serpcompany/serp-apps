<template>
  <ToolsContainer
    :title="tool.title"
    :how-it-works="howItWorks"
  >
    <ToolsBulkImageForm />
  </ToolsContainer>
</template>

<script setup lang="ts">
const { tool } = useTool('bulk_ai_images')

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
