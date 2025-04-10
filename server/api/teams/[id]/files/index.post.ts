import { createFile } from '@@/server/database/queries/files'
import type { InsertFile } from '@@/types/database'
import { isTeamMember } from '@@/server/database/queries/teams'

export default defineEventHandler(async (event) => {
  const { id: teamId } = getRouterParams(event)
  const { user } = await requireUserSession(event)
  const hasAccess = await isTeamMember(teamId, user.id)
  if (!hasAccess) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Unauthorized Access',
    })
  }
  const form = await readFormData(event)
  const file = form.get('file')
  const fileType = form.get('type')
  const fileSize = form.get('size')
  if (!(file instanceof Blob)) {
    throw new Error('File is not a Blob')
  }
  try {
    ensureBlob(file, {
      maxSize: '16MB',
    })
  } catch (error: unknown) {
    throw createError({
      statusCode: 400,
      statusMessage: (error as Error).message || (error as string),
    })
  }

  const uploadedFile = await hubBlob().put(file.name, file, {
    addRandomSuffix: true,
  })
  const fileRecord = await createFile({
    teamId,
    userId: user.id,
    fileName: file.name,
    pathname: uploadedFile.pathname,
    type: fileType as string,
    size: parseInt(fileSize as string),
  })
  return fileRecord
})
