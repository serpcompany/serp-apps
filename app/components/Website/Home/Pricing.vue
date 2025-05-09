<template>
  <div class="py-20">
    <h2 class="text-center text-base/7 font-semibold text-primary-600">
      Pay as you go
    </h2>
    <p
      class="mx-auto mt-2 max-w-lg text-center text-2xl sm:text-4xl font-semibold  text-balancesm:text-5xl font-display"
    >
      Pricing Plan that grows with your business
    </p>
    <div class="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <WebsiteHomePricingCard
        v-for="plan in plans"
        :key="plan.title"
        :title="plan.title"
        :price="plan.price"
        :description="plan.description"
        :interval="plan.interval"
        :currency="plan.currency"
        :features="plan.features"
        :highlight="plan.title === 'Professional'"
      />
    </div>
    <div
      class="chunky-card bg-white dark:bg-neutral-950 p-4 md:p-6 rounded-3xl mt-6 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4"
    >
      <div class="space-y-2 md:space-y-0">
        <p class="text-lg font-bold">Have a unique business need?</p>
        <p class="text-neutral-500">
          We also offer higher limits, SSO, on-premise hosting and custom provisioning.
        </p>
      </div>
      <UButton
        color="primary"
        size="xl"
        class="rounded-xl w-full md:w-auto md:ml-auto"
        label="Talk to our team"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const plans = [
  {
    title: 'Starter',
    price: '10',
    description: 'For small businesses',
    interval: 'month',
    currency: '$',
    features: [
      {
        icon: 'i-lucide-box',
        label: '10 projects',
      },
      {
        icon: 'i-lucide-database',
        label: '512 MB Storage',
      },
      {
        icon: 'i-lucide-clock-4',
        label: '100 compute hours',
        info: '1 compute hour = 1 CPU core for 1 hour',
      },
      {
        icon: 'i-lucide-fast-forward',
        label: '256 MB Memory',
      },
    ],
  },
  {
    title: 'Professional',
    price: '49',
    description: 'For growing teams',
    interval: 'month',
    currency: '$',
    features: [
      {
        icon: 'i-lucide-box',
        label: '50 projects',
      },
      {
        icon: 'i-lucide-database',
        label: '5 GB Storage',
      },
      {
        icon: 'i-lucide-clock-4',
        label: '1000 compute hours',
        info: '1 compute hour = 1 CPU core for 1 hour',
      },
      {
        icon: 'i-lucide-fast-forward',
        label: '2 GB Memory',
      },
      {
        icon: 'i-lucide-database-backup',
        label: 'Daily backups',
      },
      {
        icon: 'i-lucide-users',
        label: 'Team collaboration',
      },
    ],
  },
  {
    title: 'Enterprise',
    price: '199',
    description: 'For large organizations',
    interval: 'month',
    currency: '$',
    features: [
      {
        icon: 'i-lucide-box',
        label: 'Unlimited projects',
      },
      {
        icon: 'i-lucide-database',
        label: '50 GB Storage',
      },
      {
        icon: 'i-lucide-clock-4',
        label: 'Unlimited compute hours',
        info: '1 compute hour = 1 CPU core for 1 hour',
      },
      {
        icon: 'i-lucide-fast-forward',
        label: '16 GB Memory',
      },
      {
        icon: 'i-lucide-database-backup',
        label: 'Hourly backups',
      },
      {
        icon: 'i-lucide-users',
        label: 'Advanced team management',
      },
      {
        icon: 'i-lucide-headphones',
        label: 'Priority support',
      },
      {
        icon: 'i-lucide-shield-check',
        label: 'Advanced security features',
      },
    ],
  },
]
</script>
