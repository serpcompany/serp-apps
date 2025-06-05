interface AvatarOptions {
  identifier?: string
  path?: string
}

export function getAvatarUrl(options: AvatarOptions) {
  const { identifier, path } = options
  if (path) return path
  return `https://api.dicebear.com/9.x/thumbs/svg${identifier ? `?seed=${encodeURIComponent(identifier)}` : ''}`
}
