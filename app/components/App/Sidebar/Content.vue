<template>
  <div class="flex-1 overflow-y-auto">
    <Transition
      mode="out-in"
      enter-active-class="transition duration-100 ease-out"
      leave-active-class="transition duration-100 ease-in"
      enter-from-class="translate-x-1/2"
      enter-to-class="translate-x-0"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-1/2"
    >
      <div v-if="isSuperAdminRoute">
        <AppSidebarLink
          v-for="item in superAdminItems"
          :key="item.label"
          :to="item.to"
          :icon="item.icon"
          :label="item.label"
        />
      </div>
      <div v-else>
        <AppSidebarLink
          v-for="item in items"
          :key="item.label"
          :to="item.to"
          :icon="item.icon"
          :label="item.label"
        />
      </div>
    </Transition>
  </div>
  <footer>
    <AppUserDropdown />
  </footer>
</template>

<script lang="ts" setup>
const items = [
  {
    icon: 'i-custom-home',
    label: 'Dashboard',
    to: '/dashboard'
  },
  {
    icon: 'i-lucide-file-text',
    label: 'Posts',
    to: '/dashboard/posts'
  },
  {
    icon: 'i-lucide-credit-card',
    label: 'Billing',
    to: '/dashboard/billing'
  }
];

const superAdminItems = [
  {
    label: 'Back to Dashboard',
    icon: 'i-lucide-chevron-left',
    to: '/dashboard'
  },
  {
    label: 'Users',
    icon: 'i-lucide-users',
    to: '/dashboard/super-admin'
  },
  {
    label: 'Stripe Plans',
    icon: 'i-lucide-credit-card',
    to: '/dashboard/super-admin/stripe-plans'
  },
  {
    label: 'Feedback Submissions',
    icon: 'i-lucide-message-circle',
    to: '/dashboard/super-admin/feedback-submissions'
  },
  {
    label: 'Newsletter Subscribers',
    icon: 'i-lucide-mail',
    to: '/dashboard/super-admin/newsletter-subscribers'
  }
];

const route = useRoute();

const isSuperAdminRoute = computed(() => {
  return route.path.startsWith('/dashboard/super-admin');
});
</script>
