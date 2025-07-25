import Papa from 'papaparse'

export interface BulkImagePrompt {
  prompt: string
  count: number
}

export const MIN_IMAGE_COUNT = 1
export const MAX_IMAGE_COUNT = 50
export const MAX_IMAGE_PER_PROMPT = 10

/**
 * A composable for parsing and validating a CSV file for the Bulk AI Image Generator.
 * It ensures the CSV contains 'prompt' and 'count' columns with valid data.
 */
export const useCsvParser = () => {
  const data = ref<BulkImagePrompt[]>([])
  const validatedData = readonly(data)
  const error = ref<string | null>(null)
  const isLoading = ref(false)

  const reset = () => {
    data.value = []
    error.value = null
    isLoading.value = false
  }

  const parseImageCsv = (file: File) => {
    reset()
    isLoading.value = true

    if (!file.name.toLowerCase().endsWith('.csv') && file.type !== 'text/csv') {
      error.value = 'Invalid file type. Please upload a CSV file.'
      isLoading.value = false
      return
    }

    Papa.parse<any>(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      delimitersToGuess: [',', ';', '\t'],
      transformHeader: (header) => header.trim().toLowerCase(),
      transform: (value) => typeof value === 'string' ? value.trim() : value,
      complete: (results) => {
        if (results.errors.length > 0) {
          const criticalError = results.errors.find((e) => e.code !== 'TooManyFields' && e.code !== 'TooFewFields')
          if (criticalError) {
            error.value = `CSV parsing failed: ${criticalError.message}`
            isLoading.value = false
            return
          }
        }

        const requiredHeaders = ['prompt', 'count']

        const actualHeaders = results.meta.fields || []

        const missingHeaders = requiredHeaders.filter((h) => !actualHeaders.includes(h))

        if (missingHeaders.length > 0) {
          error.value = `Missing required columns: ${missingHeaders.join(', ')}. Found columns: ${actualHeaders.join(', ')}.`
          isLoading.value = false
          return
        }

        const processedData: BulkImagePrompt[] = []
        let totalImages = 0
        for (let i = 0; i < results.data.length; i++) {
          const row = results.data[i]
          const prompt = row.prompt?.trim()
          const count = Number(row.count)

          if (!prompt) {
            error.value = `Validation Error: 'prompt' cannot be empty on row ${i + 2}.`
            isLoading.value = false
            return
          }

          if (isNaN(count) || count <= 0 || !Number.isInteger(count) || count > MAX_IMAGE_PER_PROMPT) {
            error.value = `Validation Error: 'count' must be a whole number between 1 and ${MAX_IMAGE_PER_PROMPT} on row ${i + 2}.`
            isLoading.value = false
            return
          }

          processedData.push({ prompt, count })
          totalImages += count
        }

        if (processedData.length === 0) {
          error.value = 'The CSV file is empty or contains no valid data rows.'
          isLoading.value = false
          return
        }

        if (totalImages > MAX_IMAGE_COUNT) {
          error.value = `Total image count exceeds the maximum limit of ${MAX_IMAGE_COUNT}. Found: ${totalImages}.`
          isLoading.value = false
          return
        }

        data.value = processedData
        isLoading.value = false
      },
      error: (err) => {
        error.value = `Failed to parse CSV file: ${err.message}`
        isLoading.value = false
      },
    })
  }

  const totalImageCount = computed(() =>
    data.value.reduce((sum, row) => sum + row.count, 0),
  )

  return {
    validatedData,
    error,
    isLoading,
    totalImageCount,
    parseImageCsv,
    reset,
  }
}
