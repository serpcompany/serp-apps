<!-- Everything in a single page on purpose. So you can just delete it if you don't need it. -->
<template>
  <main class="px-4">
    <AppHeader />
    <div>
      <WebsiteSection>
        <div class="px-4 py-12 sm:py-16">
          <div>
            <div class="mx-auto max-w-2xl space-y-6 text-center">
              <p
                class="text-4xl font-bold tracking-tight text-balance sm:text-6xl"
              >
                Ship 🏴‍☠️ a fullstack SaaS app faster than ever.
              </p>
              <p class="text-base text-balance text-neutral-500 sm:text-xl">
                Teams, Typescript, Drizzle ORM, NuxtHub, Postgres, Turso,
                TailwindCSS V4, Nuxt UI V3. All in one package. This is a mock
                title.
              </p>

              <div class="flex items-center justify-center gap-3">
                <UButton
                  label="Get Started"
                  color="primary"
                  size="xl"
                  class="rounded-2xl"
                  trailing-icon="i-lucide-arrow-right"
                  :ui="{
                    trailingIcon: 'size-5',
                  }"
                  :to="loggedIn ? '/dashboard' : '/auth/register'"
                />
                <UButton
                  label="Get a demo"
                  color="neutral"
                  variant="ghost"
                  size="xl"
                  class="rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </WebsiteSection>
      <WebsiteSection class="!p-2 md:!p-4">
        <div
          class="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 p-1 md:rounded-3xl md:p-2 dark:border-white/10 dark:bg-neutral-950"
        >
          <img
            src="/mock-image-light.jpg"
            alt="Dashboard"
            class="aspect-video w-full rounded-md border border-neutral-200 md:rounded-2xl dark:hidden dark:border-white/10"
          >
          <img
            src="/mock-image-dark.jpg"
            alt="Dashboard"
            class="hidden aspect-video w-full rounded-2xl border border-neutral-200 dark:block dark:border-white/10"
          >
        </div>
      </WebsiteSection>
    </div>
    <WebsiteSection class="!p-0">
      <div
        class="grid grid-cols-2 divide-x divide-neutral-100 md:grid-cols-5 dark:divide-white/10"
      >
        <div
          class="col-span-full border-b border-neutral-100 px-8 py-8 md:col-span-1 md:border-b-0 md:py-24 dark:border-white/10"
        >
          <p class="text-center text-sm md:text-left">
            Trusted by fast-growing companies around the world
          </p>
        </div>
        <div
          class="flex items-center justify-center border-b border-neutral-100 px-8 py-8 md:border-b-0 md:py-24 dark:border-white/10"
        >
          <UIcon name="i-logos-eventbrite" class="text-4xl" />
        </div>
        <div
          class="flex items-center justify-center border-b border-neutral-100 px-8 py-8 md:py-24 not-first:md:border-b-0 dark:border-white/10"
        >
          <UIcon name="i-logos-flickr" class="text-4xl" />
        </div>
        <div class="flex items-center justify-center px-8 py-8 md:py-24">
          <UIcon name="i-logos-angular" class="text-4xl" />
        </div>
        <div class="flex items-center justify-center px-8 py-8 md:py-24">
          <UIcon name="i-logos-datocms" class="text-4xl" />
        </div>
      </div>
    </WebsiteSection>
    <WebsiteSection class="py-12">
      <div class="mx-auto max-w-2xl">
        <h2
          class="mx-auto max-w-3xl text-center text-4xl font-bold tracking-tight sm:text-5xl"
        >
          Get Notified When We Launch
        </h2>
        <p class="mx-auto mt-6 max-w-xl text-center text-base text-neutral-500">
          Effortlessly build a fullstack SaaS app with Nuxt, Drizzle and
          TailwindCSS.
        </p>
      </div>
      <UForm
        :schema="schema"
        :state="state"
        class="mx-auto mt-6 flex max-w-md gap-x-4"
        @submit="onSubmit"
      >
        <UInput
          v-model="state.email"
          placeholder="Enter your email"
          size="xl"
          class="w-full"
          variant="subtle"
        />
        <UButton
          type="submit"
          :loading="isSubmitting"
          label="Subscribe"
          color="neutral"
          size="xl"
        />
      </UForm>
    </WebsiteSection>
  </main>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const { loggedIn } = useUserSession()

const schema = z.object({
  email: z.string().email('Invalid email'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
})
const isSubmitting = ref(false)
const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    isSubmitting.value = true
    await $fetch('/api/subscribe', {
      method: 'POST',
      body: {
        email: event.data.email,
      },
    })
    toast.add({
      title: 'Success',
      description: 'The form has been submitted.',
      color: 'success',
    })
  } catch (error) {
    const msg = (error as { data: { message: string } }).data.message.includes(
      'D1_ERROR: UNIQUE constraint failed: subscribers.email: SQLITE_CONSTRAINT',
    )
      ? 'You are already subscribed to our newsletter.'
      : 'An unexpected error occurred'
    toast.add({
      title: 'Error',
      description: msg,
      color: 'error',
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>
