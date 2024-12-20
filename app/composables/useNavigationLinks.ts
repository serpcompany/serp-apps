export function useNavigationLinks() {
  const route = useRoute()
  const teamSlug = computed(() => route.params.team as string)

  const accountLinks = [
    {
      label: 'General Settings',
      icon: 'i-lucide-settings',
      to: '/dashboard/account-settings',
    },
    {
      label: 'Security',
      icon: 'i-lucide-shield',
      to: '/dashboard/account-security',
    },
  ]

  const teamNavLinks = computed(() => [
    {
      label: 'Home',
      icon: 'i-lucide-home',
      to: `/dashboard/${teamSlug}`,
    },
    {
      label: 'Notes',
      icon: 'i-lucide-file-text',
      to: `/dashboard/${teamSlug}/notes`,
    },
    {
      label: 'Tasks',
      icon: 'i-lucide-check-circle',
      to: `/dashboard/${teamSlug}/tasks`,
    },
    {
      label: 'Link Shortner',
      icon: 'i-lucide-link',
      to: `/dashboard/${teamSlug}/link-shortner`,
    },
    {
      label: 'Image gallery',
      icon: 'i-lucide-images',
      to: `/dashboard/${teamSlug}/image-gallery`,
    },
    {
      label: 'AI Chat',
      icon: 'i-lucide-message-circle',
      to: `/dashboard/${teamSlug}/ai-chat`,
    },
    {
      label: 'AI Image Gen',
      icon: 'i-lucide-sparkles',
      to: `/dashboard/${teamSlug}/ai-image-gen`,
    },
  ])

  const teamSettingsLinks = computed(() => [
    {
      label: 'Workspace Settings',
      icon: 'i-lucide-settings',
      to: `/dashboard/${teamSlug}/settings`,
    },
    {
      label: 'Team Members',
      icon: 'i-lucide-users',
      to: `/dashboard/${teamSlug}/settings/members`,
    },
    {
      label: 'Billing',
      icon: 'i-lucide-credit-card',
      to: `/dashboard/${teamSlug}/settings/billing`,
    },
  ])

  return {
    accountLinks,
    teamNavLinks,
    teamSettingsLinks,
  }
}
