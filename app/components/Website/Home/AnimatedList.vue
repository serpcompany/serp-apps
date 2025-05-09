<template>
  <div class="flex p-px lg:col-span-4 w-full">
    <div
      class="overflow-hidden rounded-lg bg-neutral-50 dark:bg-neutral-950 chunky-card  max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem] w-full"
    >
      <div class="h-64 bg-neutral-100 dark:bg-neutral-950 w-full p-8 overflow-hidden relative">
        <div
          class="transition-transform duration-1000"
          :style="{ transform: `translateY(${listPosition}px)` }"
        >
          <div
            v-for="item in doubledMockItems"
            :key="item.id + (item.isClone ? '-clone' : '')"
            class="chunky-card bg-white dark:bg-neutral-900 rounded-lg p-4 w-[120%] mb-4"
          >
            <div class="relative pl-8 flex gap-2">
              <UIcon :name="item.icon" class="absolute left-0 top-0 size-4 md:size-6" />
              <div class="flex-2">
                <p class="text-xs md:text-sm font-medium font-mono truncate">
                  {{ item.label }}
                </p>
                <div class="flex items-center gap-2 mt-2">
                  <UBadge
                    v-for="badge in item.badges"
                    :key="badge"
                    color="neutral"
                    :label="badge"
                    size="sm"
                    variant="subtle"
                  />
                </div>
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <div
                    class="flex-none rounded-full p-1"
                    :class="
                      item.status === 'success'
                        ? 'text-green-400 bg-green-400/10'
                        : 'text-red-400 bg-red-400/10'
                    "
                  >
                    <div class="size-2 rounded-full bg-current" />
                  </div>
                  <p
                    class="text-xs md:text-sm font-medium font-mono capitalize"
                  >
                    {{ item.status }}
                  </p>
                </div>
                <p class="text-neutral-500 text-xs ml-6 mt-2">{{ item.time }}</p>
              </div>
              <div class="flex-1 hidden md:block">
                <div class="flex items-center gap-2">
                  <UAvatar
                    :src="item.userAvatar"
                    :alt="item.userName"
                    size="3xs"
                  />
                  <p class="text-xs md:text-sm font-medium">
                    {{ item.userName }}
                  </p>
                </div>
                <p class="text-neutral-500 text-xs ml-6">{{ item.date }}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="absolute w-full bottom-0 left-0 h-20 bg-gradient-to-b from-transparent to-neutral-50 dark:to-neutral-950"
        />
      </div>
      <div class="p-10">
        <h3 class="text-sm/4 font-semibold text-neutral-500">Releases</h3>
        <p class="mt-2 text-lg font-bold font-display ">
          Push to deploy
        </p>
        <p class="mt-2 max-w-lg text-sm/6 text-neutral-500">
          A powerful database management system that allows you to create
          branches, deploy to staging, and promote to production with ease.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const mockItems = [
  {
    id: 1,
    icon: 'i-mdi-github',
    label: 'postgres/preview-rr3123hrew',
    badges: ['Preview', 'postgres'],
    status: 'success',
    time: '46s',
    userName: 'Fayaz Ahmed',
    userAvatar: 'https://github.com/fayazara.png',
    date: '1 hour ago',
  },
  {
    id: 2,
    icon: 'i-logos-supabase-icon',
    label: 'supabase/staging-ab789xyz',
    badges: ['Staging', 'mysql'],
    status: 'success',
    time: '1m 12s',
    userName: 'Sebastian Chopin',
    userAvatar: 'https://github.com/atinux.png',
    date: '2 days ago',
  },
  {
    id: 3,
    icon: 'i-skill-icons-planetscale-light',
    label: 'planetscale/test-xy987abc',
    badges: ['Test', 'MySQL'],
    status: 'error',
    time: '57s',
    userName: 'Fayaz Ahmed',
    userAvatar: 'https://github.com/fayazara.png',
    date: '2 weeks ago',
  },
  {
    id: 4,
    icon: 'i-lineicons-prisma',
    label: 'prisma/prod-mn456pqr',
    badges: ['Production', 'prisma'],
    status: 'success',
    time: '32s',
    userName: 'Johann Schopplich',
    userAvatar: 'https://github.com/johannschopplich.png',
    date: '1 months ago',
  },
  {
    id: 5,
    icon: 'i-logos-redis',
    label: 'redis/cache-rd789efg',
    badges: ['Cache', 'redis'],
    status: 'error',
    time: '4m 6s',
    userName: 'Muhsin K',
    userAvatar: 'https://github.com/muhsin-k.png',
    date: '1 months ago',
  },
  {
    id: 6,
    icon: 'i-devicon-denojs',
    label: 'deno-sqlite/dev-pg234hij',
    badges: ['Development', 'deno'],
    status: 'success',
    time: '1m',
    userName: 'Shadcn',
    userAvatar: 'https://github.com/shadcn.png',
    date: '1 months ago',
  },
  {
    id: 7,
    icon: 'i-devicon-azure',
    label: 'azure/backup-my567klm',
    badges: ['Backup', 'azure'],
    status: 'success',
    time: '2m 14s',
    userName: 'Anthony Fu',
    userAvatar: 'https://github.com/antfu.png',
    date: '1 months ago',
  },
  {
    id: 8,
    icon: 'i-skill-icons-planetscale-light',
    label: 'planetscale/prod-ps890nop',
    badges: ['Production', 'MySQL'],
    status: 'success',
    time: '21s',
    userName: 'Bereket Engida',
    userAvatar: 'https://github.com/Bekacru.png',
    date: '2 months ago',
  },
  {
    id: 9,
    icon: 'i-devicon-googlecloud',
    label: 'google-cloud/analytics-cs123qrs',
    badges: ['Analytics', 'google-cloud'],
    status: 'error',
    time: '1m 12s',
    userName: 'Shadcn',
    userAvatar: 'https://github.com/shadcn.png',
    date: '2 months ago',
  },
  {
    id: 10,
    icon: 'i-devicon-elasticsearch',
    label: 'elasticsearch/search-es456tuv',
    badges: ['Search', 'elasticsearch'],
    status: 'success',
    time: '1m 8s',
    userName: 'Addy Osmani',
    userAvatar: 'https://github.com/addyosmani.png',
    date: '2 months ago',
  },
]

const doubledMockItems = [...mockItems, ...mockItems]
const listPosition = ref(0)

onMounted(() => {
  setInterval(() => {
    listPosition.value -= 96

    if (Math.abs(listPosition.value) >= mockItems.length * 96) {
      listPosition.value = 0
    }
  }, 1500)
})
</script>
