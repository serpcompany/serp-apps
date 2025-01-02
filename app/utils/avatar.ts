interface AvatarOptions {
  identifier?: string
  path?: string
  type?: AvatarType
}

interface AvatarType {
  type: 'user' | 'team'
}
export function getAvatarUrl(options: AvatarOptions & AvatarType) {
  const { identifier, path, type } = options
  if (path) return path
  return `https://api.dicebear.com/9.x/${type === 'user' ? 'thumbs' : 'glass'}/svg${identifier ? `?seed=${encodeURIComponent(identifier)}` : ''}`
}
