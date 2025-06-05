<template>
  <header class="sticky w-full top-0 z-50 py-2 sm:py-4 px-2 sm:px-0">
    <nav class="relative">
      <UContainer
        :class="contentClass"
        class="relative transition-all duration-500"
      >
        <!-- Desktop header -->
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center gap-2">
            <img src="/logo.png" class="h-8 w-8">
            <p class="font-bold font-display text-xl">SERP</p>
          </NuxtLink>
          <div class="items-center justify-center gap-2 hidden md:flex">
            <UButton
              v-for="option in menuOptions"
              :key="option.label"
              variant="ghost"
              color="neutral"
              :to="option.to"
            >
              {{ option.label }}
            </UButton>
          </div>
          <div class="flex items-center gap-2">
            <AuthState v-slot="{ loggedIn: isAuthLoggedIn }">
              <UButton
                v-if="isAuthLoggedIn"
                color="neutral"
                variant="soft"
                label="Go to App"
                to="/dashboard"
                class="hidden md:flex"
              />
              <template v-else>
                <NuxtLink
                  class="h-8 items-center justify-center relative mr-2 group hidden md:flex"
                  to="/auth/login"
                >
                  <div class="flex gap-4 items-center relative z-20">
                    <span> Login </span>
                    <Icon name="lucide:arrow-right" class="h-4 w-4" />
                  </div>
                  <span
                    class="h-8 pointer-events-none z-10 w-8 group-hover:w-[130%] transition-all absolute top-0 -right-2 bg-neutral-200 dark:bg-white/10 rounded-full flex items-center justify-center"
                  />
                </NuxtLink>
              </template>
            </AuthState>
            <UButton
              variant="soft"
              :icon="openMobileMenu ? 'i-lucide-x' : 'i-lucide-menu'"
              class="md:hidden"
              @click="openMobileMenu = !openMobileMenu"
            />
          </div>
        </div>

        <!-- Mobile Menu with transitions -->
        <transition name="mobile-menu-transition">
          <div v-if="openMobileMenu" class="md:hidden mt-2 overflow-hidden">
            <transition-group
              name="menu-item"
              tag="div"
              class="flex flex-col gap-2"
            >
              <UButton
                v-for="(option, index) in menuOptions"
                :key="option.label"
                variant="ghost"
                :to="option.to"
                :style="{ transitionDelay: index * 100 + 'ms' }"
                @click="openMobileMenu = false"
              >
                {{ option.label }}
              </UButton>
              <USeparator key="separator" />
              <AuthState v-slot="{ loggedIn: isAuthLoggedIn }">
                <UButton
                  v-if="isAuthLoggedIn"
                  key="go-to-app"
                  to="/dashboard"
                  variant="soft"
                  label="Go to App"
                />
                <template v-else>
                  <UButton
                    key="sign-in"
                    to="/auth/login"
                    variant="ghost"
                    label="Sign In"
                  />
                  <UButton
                    key="create-account"
                    to="/auth/register"
                    variant="ghost"
                    label="Create Account"
                  />
                </template>
              </AuthState>
            </transition-group>
          </div>
        </transition>
      </UContainer>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const y = ref(0)
let scrollHandler = null
const openMobileMenu = ref(false)

const updateScroll = () => {
  y.value = window.scrollY
}

const menuOptions = [
  // { label: 'Blog', to: '/' },
  // { label: 'Features', to: '/#features' },
  // { label: 'Pricing', to: '/#pricing' },
  // { label: 'Docs', to: '/#docs' },
  // { label: 'Tools', to: '/tools' },
]

const initScrollHandler = () => {
  if (typeof window !== 'undefined') {
    scrollHandler = () => { updateScroll() }
    window.addEventListener('scroll', scrollHandler)
    updateScroll()
  }
}

const contentClass = computed(() => {
  return y.value > 10
    ? 'max-w-3xl bg-white/90 dark:bg-neutral-900/60 rounded-3xl shadow-xl backdrop-blur py-4 ring-1 ring-neutral-100 dark:ring-white/10 !px-4'
    : null
})

onMounted(() => {
  initScrollHandler()
})

onUnmounted(() => {
  if (typeof window !== 'undefined' && scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
})
</script>

<style scoped>
.mobile-menu-transition-enter-active,
.mobile-menu-transition-leave-active {
  transition: max-height 0.3s ease;
}
.mobile-menu-transition-enter-from,
.mobile-menu-transition-leave-to {
  max-height: 0;
}
.mobile-menu-transition-enter-to,
.mobile-menu-transition-leave-from {
  max-height: 300px;
}

.menu-item-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.menu-item-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.menu-item-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
