import { OpenAI } from 'openai'

export type StreamPayload
  = | { type: 'info', message: string, jobId: string, totalImages: number }
    | { type: 'progress', imageNumber: number, filename: string, path: string, prompt: string }
    | { type: 'error', imageNumber: number, prompt: string, error: string }
    | { type: 'complete', metadata: object }
    | { type: 'fatal', error: string }
    | { type: 'heartbeat', timestamp: number }

export interface ImageGenerationTask {
  prompt: string
  count: number
}

type ImageResultCallback = (payload: StreamPayload) => void

interface ImageResult {
  status: 'fulfilled' | 'rejected'
  value?: {
    filename: string
    path: string
    size: number
    prompt: string
  }
  reason?: {
    prompt: string
    error: string
  }
}

const getFolderPath = (jobId: string) => `batch-images-jobs/${jobId}`
let openai: OpenAI

async function runWithConcurrency<T>(
  taskFns: (() => Promise<T>)[],
  limit: number,
): Promise<T[]> {
  const results: T[] = []
  let index = 0

  const worker = async () => {
    while (index < taskFns.length) {
      const currentIndex = index++
      if (currentIndex < taskFns.length) {
        await taskFns[currentIndex]().then((res) => results.push(res))
      }
    }
  }

  const workers = Array(Math.min(limit, taskFns.length)).fill(null).map(worker)
  await Promise.all(workers)

  return results
}

const generateAndUpload = async (task: ImageGenerationTask, imageNumber: number, jobId: string, totalImages: number, callback: ImageResultCallback) => {
  try {
    console.log(`Job ${jobId}: Generating image ${imageNumber}/${totalImages}...`)
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: task.prompt,
      n: 1,
      size: '1792x1024',
      quality: 'hd',
      response_format: 'url',
    })

    if (!response.data || !response.data[0]?.url) {
      throw new Error('No image URL returned from OpenAI.')
    }
    const imageUrl = response.data[0].url

    const imageResponse = await fetch(imageUrl)
    if (!imageResponse.ok) throw new Error(`Failed to download image: ${imageResponse.statusText}`)
    const imageBuffer = await imageResponse.arrayBuffer()

    const safePrompt = task.prompt.replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 30).trim().replace(/\s+/g, '_') || 'image'
    const filename = `${safePrompt}_${String(imageNumber).padStart(3, '0')}.png`
    const r2Key = `${getFolderPath(jobId)}/${filename}`

    await hubBlob().put(r2Key, imageBuffer, { contentType: 'image/png' })

    const successResult = { filename, path: r2Key, size: imageBuffer.byteLength, prompt: task.prompt }
    callback({ type: 'progress', imageNumber, ...successResult })
    return {
      status: 'fulfilled' as const,
      value: successResult,
    }
  } catch (error: any) {
    const errorMessage = error.message || 'An unknown error occurred during generation.'
    console.error(`Job ${jobId}: Failed to generate image ${imageNumber} for prompt "${task.prompt.substring(0, 50)}...":`, errorMessage)
    const failureResult = { prompt: task.prompt, error: errorMessage }
    callback({ type: 'error', imageNumber, ...failureResult })
    return {
      status: 'rejected' as const,
      reason: failureResult,
    }
  }
}

export const generateImages = async (jobId: string, tasks: ImageGenerationTask[], totalImages: number, resultCallback: ImageResultCallback) => {
  console.log(`Job ${jobId}: Starting generation of ${totalImages} images.`)
  resultCallback({ type: 'info', message: 'Job started.', jobId, totalImages })

  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  let imageCounter = 0

  const allImagePromises: (() => Promise<ImageResult>)[] = []
  for (const task of tasks) {
    for (let i = 0; i < task.count; i++) {
      allImagePromises.push(() => generateAndUpload(task, ++imageCounter, jobId, totalImages, resultCallback))
    }
  }

  const CONCURRENCY_LIMIT = 5
  const results = await runWithConcurrency(allImagePromises, CONCURRENCY_LIMIT)

  const successfulImages = results.filter((r) => r.status === 'fulfilled').map((r) => r.value!)
  const failedImages = results.filter((r) => r.status === 'rejected').map((r) => r.reason!)

  console.log(`Job ${jobId}: Successfully generated ${successfulImages.length} images. Failed: ${failedImages.length}.`)

  const totalSize = successfulImages.reduce((sum, img) => sum + img.size, 0)
  const metadata = {
    jobId,
    generatedAt: new Date().toISOString(),
    totalRequested: totalImages,
    totalSucceeded: successfulImages.length,
    totalFailed: failedImages.length,
    totalSize,
    prompts: tasks,
    images: successfulImages,
    failures: failedImages,
  }

  const folderPath = getFolderPath(jobId)
  await hubBlob().put(`${folderPath}/metadata.json`, JSON.stringify(metadata, null, 2), {
    contentType: 'application/json',
  })

  resultCallback({ type: 'complete', metadata })
  return {
    success: true,
    folderPath,
    ...metadata,
  }
}
