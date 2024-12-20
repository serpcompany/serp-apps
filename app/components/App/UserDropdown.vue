<template>
  <UDropdownMenu
    :items="items"
    :ui="{
      content: 'w-[240px]',
    }"
    :content="{
      align: 'start',
    }"
  >
    <UButton
      :avatar="{
        src:
          user?.avatarUrl ||
          `https://api.dicebear.com/9.x/thumbs/svg?seed=${user?.name}`,
        alt: user?.name,
        size: 'xs',
      }"
      :label="user?.name"
      color="neutral"
      variant="ghost"
      trailing-icon="i-lucide-chevron-up"
      class="w-full hover:bg-zinc-200/80 dark:hover:bg-white/10"
      :ui="{ trailingIcon: 'size-4' }"
      block
    />
  </UDropdownMenu>
</template>

<script setup lang="ts">
const { user, clear } = useUserSession()
const mobileMenu = useState('mobileMenu')
async function signOut() {
  await clear()
  await navigateTo('/')
}
const items = ref([
  [
    {
      label: user.value?.name,
      avatar: {
        src: user.value?.avatarUrl,
      },
      type: 'label',
    },
  ],
  [
    {
      label: 'Account Settings',
      icon: 'i-lucide-user-cog',
      to: '/dashboard/account-settings',
    },
  ],
  [
    {
      label: 'Theme',
      icon: 'i-lucide-moon',
      children: [
        [
          {
            label: 'Light',
            icon: 'i-lucide-sun',
            onSelect: () => {
              setColorMode('light')
              mobileMenu.value = false
            },
          },
          {
            label: 'Dark',
            icon: 'i-lucide-moon',
            onSelect: () => {
              setColorMode('dark')
              mobileMenu.value = false
            },
          },
        ],
        [
          {
            label: 'System',
            icon: 'i-lucide-monitor',
            onSelect: () => {
              setColorMode('system')
              mobileMenu.value = false
            },
          },
        ],
      ],
    },
  ],
  [
    {
      label: 'Support',
      icon: 'i-lucide-life-buoy',
    },
    {
      label: 'Docs',
      icon: 'i-lucide-cloud',
    },
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      onSelect: signOut,
      color: 'error' as const,
    },
  ],
])

const colorMode = useColorMode()

function setColorMode(mode: string) {
  colorMode.preference = mode
}
</script>
