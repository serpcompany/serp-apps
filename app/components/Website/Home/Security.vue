<template>
  <div class="flex p-px lg:col-span-2">
    <div
      class="overflow-hidden rounded-lg bg-neutral-50 dark:bg-neutral-950 chunky-card  lg:rounded-bl-[2rem] w-full"
    >
      <div
        class="relative flex h-64 w-full flex-col items-center justify-center overflow-hidden rounded-lg lg:w-full md:w-full"
      >
        <div
          class="h-20 w-20 rounded-full z-10 flex items-center justify-center relative"
        >
          <UIcon
            name="i-lucide-lock-keyhole"
            class="text-3xl text-neutral-500"
          />
        </div>
        <WebsiteHomeRipple
          class="bg-white/5 [mask-image:linear-gradient(to_bottom,white,transparent)]"
          circle-class="border-[hsl(var(--primary))] bg-neutral-300 dark:bg-[#fff]/25 rounded-full"
          :base-circle-size="50"
        />
      </div>
      <div class="p-10">
        <h3 class="text-sm/4 font-semibold text-neutral-500">Security</h3>
        <p class="mt-2 text-lg font-bold font-display ">
          Advanced access control
        </p>
        <p class="mt-2 max-w-lg text-sm/6 text-neutral-500">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia.
        </p>
      </div>
    </div>
  </div>
</template>
