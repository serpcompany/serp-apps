<template>
  <div class="py-20">
    <div class="mx-auto max-w-2xl lg:max-w-7xl">
      <h2 class="text-center text-base/7 font-semibold text-primary-600">
        Traditional meets modern
      </h2>
      <p
        class="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold  text-balancesm:text-5xl font-display"
      >
        A modern take on traditional databases
      </p>

      <div
        class="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2"
      >
        <LazyWebsiteHomeAnimatedList hydrate-on-visible />
        <LazyWebsiteHomeRealtimeCollab hydrate-on-visible />
        <LazyWebsiteHomeSecurity hydrate-on-visible />
        <LazyWebsiteHomeAutomation hydrate-on-visible />
      </div>
    </div>
  </div>
</template>
