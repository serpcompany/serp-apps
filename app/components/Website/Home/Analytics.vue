<template>
  <div class="py-20">
    <h2 class="text-center text-base/7 font-semibold text-primary-600">
      Powerful Insights
    </h2>
    <p
      class="mx-auto mt-2 max-w-lg text-center text-2xl sm:text-4xl font-semibold  text-balancesm:text-5xl font-display"
    >
      Customizable dashboards to make your database work for you
    </p>
    <div
      class="h-auto sm:h-150 mt-16 shrink-0 overflow-hidden [mask-image:radial-gradient(white_30%,transparent_90%)] perspective-[4000px] perspective-origin-center"
    >
      <div
        class="-translate-y-10 -translate-z-10 rotate-x-10 rotate-y-20 -rotate-z-10 transform-3d scale-150 sm:scale-100"
      >
        <img
          data-theme="dark"
          src="/chart-dashboard-dark.jpg"
          class="rounded-sm md:rounded-lg hidden dark:block border border-neutral-200 dark:border-white/10"
        >
        <img
          data-theme="light"
          src="/chart-dashboard-light.jpg"
          class="rounded-sm md:rounded-lg dark:hidden border border-neutral-200 dark:border-white/10"
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
