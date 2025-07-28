import { z } from 'zod'
import archiver from 'archiver'
import { PassThrough, Readable } from 'node:stream'

const getFolderPath = (jobId: string) => `batch-image-jobs/${jobId}`

const querySchema = z.object({
  jobId: z.string().uuid('Invalid Job ID format.'),
})

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (q) => querySchema.safeParse(q))

  if (query.error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'A valid Job ID is required.',
      data: query.error.format(),
    })
  }

  const { jobId } = query.data
  const folderPath = getFolderPath(jobId)

  try {
    const { blobs } = await hubBlob().list({ prefix: folderPath })
    const imageObjects = blobs.filter((obj) => obj.contentType !== 'application/json' && obj.size > 0)

    if (imageObjects.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'No images found for this job.',
      })
    }

    const archive = archiver('zip', {
      zlib: { level: 9 },
    })

    const streamPassThrough = new PassThrough()
    archive.pipe(streamPassThrough)

    Promise.all(imageObjects.map(async (obj) => {
      const file = await hubBlob().get(obj.pathname)
      if (file) {
        const buffer = Buffer.from(await file.arrayBuffer())
        archive.append(buffer, { name: obj.pathname.split('/').pop()! })
      }
    })).then(async () => {
      await archive.finalize()
    }).catch((err: unknown) => {
      console.error(`Error adding files to archive for job ${jobId}:`, err)
      archive.destroy(err instanceof Error ? err : new Error(String(err)))
    })

    const zipName = `generated-images-${jobId}.zip`
    setHeader(event, 'Content-Type', 'application/zip')
    setHeader(event, 'Content-Disposition', `attachment; filename="${zipName}"`)
    setHeader(event, 'Cache-Control', 'no-cache')

    return Readable.toWeb(streamPassThrough)
  } catch (error: any) {
    console.error(`Failed to stream ZIP for job ${jobId}:`, error)
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create the zip archive.',
    })
  }
})
