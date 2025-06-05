<template>
  <div
    class="relative flex flex-col items-center justify-center pb-40 pt-8 md:pb-60 overflow-hidden"
  >
    <div class="text-center">
      <p class="text-base md:text-xl text-neutral-500">
        New software, tools & resources added weekly.
      </p>
      <p
        class="text-5xl mt-4 md:text-8xl pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-neutral-300/80 bg-clip-text text-center font-black leading-none text-transparent dark:from-white dark:to-slate-900/10"
      >
        SERP App
      </p>
    </div>
    <ClientOnly>
      <LazyWebsiteHomeGlobe hydrate-on-visible class="top-40 sm:top-32" />
    </ClientOnly>
  </div>
</template>
