export function generateFilename(url: string, contentType: string): string {
  const extensionMap: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'image/svg+xml': '.svg',
    'video/mp4': '.mp4',
    'video/webm': '.webm',
    'video/quicktime': '.mov',
    'video/x-msvideo': '.avi',
  }

  const extension = extensionMap[contentType] || ''
  return `screenshot-${new URL(url).hostname.replace(/\./g, '_')}-${Date.now()}${extension}`
}
