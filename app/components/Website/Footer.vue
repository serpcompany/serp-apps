<template>
  <div class="p-4 pt-0">
    <footer class="bg-neutral-950 rounded-3xl overflow-hidden">
      <div class="mx-auto max-w-6xl px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
        <div class="xl:grid xl:grid-cols-3 xl:gap-8">
          <div class="space-y-8">
            <NuxtLink to="/" class="flex items-center gap-2">
              <img src="/logo.png" class="h-8 w-8 text-white">
              <p class="font-bold font-display text-xl text-white">CoreDB</p>
            </NuxtLink>
            <p class="text-sm/6 text-balance text-neutral-300">
              The modern way to manage your databases. Deploy, scale, and manage
              your databases with ease.
            </p>
            <div class="flex gap-x-6">
              <a
                v-for="item in navigation.social"
                :key="item.name"
                :href="item.href"
                target="_blank"
                class="text-neutral-400 hover:text-neutral-300"
              >
                <span class="sr-only">{{ item.name }}</span>
                <Icon :name="item.icon" class="size-6" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div class="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 class="text-sm/6 font-semibold text-white">Solutions</h3>
                <ul role="list" class="mt-6 space-y-4">
                  <li v-for="item in navigation.solutions" :key="item.name">
                    <a
                      :href="item.href"
                      class="text-sm/6 text-neutral-400 hover:text-white"
                    >{{ item.name }}</a>
                  </li>
                </ul>
              </div>
              <div class="mt-10 md:mt-0">
                <h3 class="text-sm/6 font-semibold text-white">Support</h3>
                <ul role="list" class="mt-6 space-y-4">
                  <li v-for="item in navigation.support" :key="item.name">
                    <a
                      :href="item.href"
                      class="text-sm/6 text-neutral-400 hover:text-white"
                    >{{ item.name }}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 class="text-sm/6 font-semibold text-white">Company</h3>
                <ul role="list" class="mt-6 space-y-4">
                  <li v-for="item in navigation.company" :key="item.name">
                    <a
                      :href="item.href"
                      class="text-sm/6 text-neutral-400 hover:text-white"
                    >{{ item.name }}</a>
                  </li>
                </ul>
              </div>
              <div class="mt-10 md:mt-0">
                <h3 class="text-sm/6 font-semibold text-white">Legal</h3>
                <ul role="list" class="mt-6 space-y-4">
                  <li v-for="item in navigation.legal" :key="item.name">
                    <a
                      :href="item.href"
                      class="text-sm/6 text-neutral-400 hover:text-white"
                    >{{ item.name }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          class="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 flex justify-between items-center"
        >
          <p class="text-sm/6 text-neutral-400">
            &copy; 2025 CoreDB. All rights are not reserved.
          </p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const navigation = {
  solutions: [
    { name: 'Marketing', href: '#' },
    { name: 'Analytics', href: '#' },
    { name: 'Automation', href: '#' },
    { name: 'Commerce', href: '#' },
    { name: 'Insights', href: '#' },
  ],
  support: [
    { name: 'Submit ticket', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Guides', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Press', href: '#' },
  ],
  legal: [
    { name: 'Terms of service', href: '#' },
    { name: 'Privacy policy', href: '#' },
    { name: 'License', href: '#' },
  ],
  social: [
    {
      name: 'Twitter',
      href: 'https://twitter.com/fayazara',
      icon: 'i-hugeicons-new-twitter',
    },
    {
      name: 'Github',
      href: 'https://github.com/fayazara',
      icon: 'i-mdi-github',
    },
  ],
}
</script>
