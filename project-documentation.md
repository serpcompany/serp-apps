# Project name: essentials-v3

## Folder Structure

```
📄 README.md
📁 app/
  📄 app.config.ts
  📄 app.vue
  📁 assets/
    📁 css/
      📄 main.css
  📁 components/
    📁 App/
      📁 AccountSettings/
        📄 General.vue
        📄 Passkey.vue
        📄 Password.vue
      📄 AvatarUploader.vue
      📄 Container.vue
      📁 Demo/
        📄 Card.vue
        📄 Chart.vue
        📄 Kpi.vue
        📄 Table.vue
      📄 Invoices.vue
      📄 MobileMenu.vue
      📄 NewTeamForm.vue
      📄 PricingCard.vue
      📁 Sidebar/
        📄 Account.vue
        📄 Content.vue
        📄 Group.vue
        📄 Panel.vue
        📄 Sidebar.vue
        📄 SidebarLink.vue
        📄 Team.vue
      📄 SidebarNavigation.vue
      📄 TeamDelete.vue
      📄 TeamDropdown.vue
      📄 TeamInvites.vue
      📄 TeamMembers.vue
      📄 TeamSettings.vue
      📄 UserDropdown.vue
    📁 auth/
      📄 SocialLogin.vue
      📄 social-login-button.vue
  📁 composables/
    📄 useAuth.ts
    📄 usePasskeys.ts
    📄 usePosts.ts
    📄 useTeam.ts
    📄 useTeamPreferences.ts
    📄 useTeamRedirect.ts
    📄 useUserAccount.ts
  📁 layouts/
  📁 middleware/
    📄 auth.ts
    📄 team-owner.ts
  📁 pages/
    📁 auth/
      📄 all-auth-options.vue
      📄 forgot-password.vue
      📄 login-passkey.vue
      📄 login-phone.vue
      📄 login.vue
      📄 magic-link.vue
      📄 register.vue
      📄 reset-password.vue
      📄 social-login.vue
    📁 dashboard/
      📁 [team]/
        📄 ai-image-gen.vue
        📄 image-gallery.vue
        📄 index.vue
        📄 link-shortner.vue
        📄 notes.vue
        📁 settings/
          📄 billing.vue
          📄 index.vue
          📄 members.vue
        📄 settings.vue
        📄 tasks.vue
      📄 [team].vue
      📄 account-security.vue
      📄 account-settings.vue
      📄 index.vue
      📄 onboard.vue
    📄 dashboard.vue
    📄 index.vue
  📁 utils/
    📄 avatar.ts
📁 constants/
  📄 index.ts
📁 dist/ (contents excluded)
📄 drizzle.config.ts
📁 emails/
  📄 email-verification.vue
  📄 magic-link.vue
  📄 member-invite.vue
📄 env.ts
📁 layers/
  📁 demo/
📁 node_modules/ (contents excluded)
📄 nuxt.config.ts
📄 package.json
📁 public/
📁 server/
  📁 api/
    📁 admin/
      📄 sync-stripe-data.get.ts
    📁 auth/
      📁 magic-link/
        📄 login.post.ts
        📄 verify-otp.post.ts
      📁 oauth/
        📄 discord.ts
        📄 github.ts
        📄 google.ts
      📁 password/
        📄 forgot.post.ts
        📄 login.post.ts
        📄 register.post.ts
        📄 reset.post.ts
      📁 phone/
        📄 login.post.ts
        📄 verify.post.ts
      📄 verify-account.get.ts
      📁 webauthn/
        📄 authenticate.post.ts
        📄 link-passkey.post.ts
        📄 linked-passkeys.get.ts
    📁 me/
      📄 haspasskeys.get.ts
      📄 index.get.ts
      📄 index.patch.ts
      📄 memberships.get.ts
      📄 update-password.post.ts
    📁 stripe/
      📄 checkout.post.ts
      📄 plans.ts
      📄 subscription.get.ts
      📄 webhook.ts
    📁 teams/
      📁 [id]/
        📄 index.delete.ts
        📄 index.patch.ts
        📁 invites/
          📁 [inviteId]/
            📄 index.delete.ts
            📄 resend.post.ts
          📄 index.get.ts
        📁 members/
          📄 [memberId].delete.ts
          📄 [memberId].get.ts
          📄 index.get.ts
          📄 index.post.ts
        📁 posts/
          📄 [id].delete.ts
          📄 [id].get.ts
          📄 [id].patch.ts
          📄 index.get.ts
          📄 index.post.ts
      📄 index.get.ts
      📄 index.post.ts
      📄 verify-invite.get.ts
    📄 upload-image.post.ts
  📁 database/
    📁 migrations/
      📄 0000_thin_harpoon.sql
      📄 0001_round_leader.sql
      📁 meta/
        📄 0000_snapshot.json
        📄 0001_snapshot.json
        📄 _journal.json
    📁 queries/
      📄 auth.ts
      📄 customers.ts
      📄 passkeys.ts
      📄 posts.ts
      📄 stripe.ts
      📄 subscriptions.ts
      📄 teams.ts
      📄 users.ts
    📁 schema/
      📄 admin.ts
      📄 auth.ts
      📄 customers.ts
      📄 images.ts
      📄 index.ts
      📄 posts.ts
      📄 prices.ts
      📄 products.ts
      📄 subscriptions.ts
      📄 teams.ts
      📄 users.ts
  📁 routes/
    📁 images/
      📄 [pathname].get.ts
  📁 services/
    📄 email.ts
    📄 stripe.ts
  📄 tsconfig.json
  📁 utils/
    📄 auth.ts
    📄 bodyValidation.ts
    📄 database.ts
    📄 nanoid.ts
    📄 oauth.ts
    📄 syncStripeData.ts
    📄 teamValidation.ts.ts
📁 shared/
  📁 validations/
    📄 auth.ts
    📄 team.ts
    📄 user.ts
📄 tsconfig.json
📁 types/
  📄 auth.d.ts
  📄 database.ts
```

---
### filename: README.md
```md
# Supersaas V3

> [!WARNING]  
> Supersaas V3 is still in progress. The code is not production ready but quite usable.

There are two versions of the repo

1. `main` - The main branch with the new Supersaas V3 code, this uses (NuxtHub)[https://hub.nuxt.com/] for deployment, a cloudflare D1 database and a cloudflare R2 bucket.
2. `postgres` - This branch is a 1 to 1 copy of the `main` branch but uses a postgres database and a custom S3 compatible blob storage.

You can find a demo here - [https://v3.supersaas.dev](https://v3.supersaas.dev)

## What's new in V3?

- Typescript only - no more mix of JS and TS as it was in V2, so I had to rewrite it from scratch. Not just the utils, the whole codebase is now in TS, the apis, the vue components, the nuxt middleware, the nuxt server, etc.

- Teams/Workspaces - Supersaas now has teams and workspaces, you can create multiple teams and switch between them. Act as an admin and invite users to your team. Kick people out of the team. Cancel invites.

- Stripe integration - A much better and more robust Stripe integration.

- A lot of code cleanup and refactoring.

## Tech Stack

- [Nuxt 3](https://nuxt.com)
- [Nuxt UI v3](https://ui3.nuxt.dev/)
- [TailwindCSS V4](https://tailwindcss.com)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Cloudflare D1, R2, Workers, KV, Pages for the NuxtHub people](https://hub.nuxt.com)
- [Postgres for the postgres folks](https://www.postgresql.org)
- [VueUse](https://vueuse.org/)

## Env Variables

| NAME       | Key                             | Value                                         |
| ---------- | ------------------------------- | --------------------------------------------- |
| APP_CONFIG | APP_NAME                        | Supersaas                                     |
| APP_CONFIG | APP_DESCRIPTION                 | The complete Nuxt 3 SaaS starter kit.         |
| APP_CONFIG | LOGO_URL                        | https://supersaas.dev/logo.png                |
| APP_CONFIG | BASE_URL                        | http://localhost:3000                         |
| EMAIL      | RESEND_API_TOKEN                | (empty)                                       |
| EMAIL      | FROM_EMAIL                      | fayaz@mail.supersaas.dev                      |
| EMAIL      | EMAIL_PROVIDER                  | resend                                        |
| AUTH       | NUXT_OAUTH_GOOGLE_CLIENT_ID     | (empty)                                       |
| AUTH       | NUXT_OAUTH_GOOGLE_CLIENT_SECRET | (empty)                                       |
| SESSION    | NUXT_SESSION_PASSWORD           | (empty)                                       |
| STRIPE     | NUXT_STRIPE_SECRET_KEY          | (empty)                                       |
| STRIPE     | NUXT_STRIPE_WEBHOOK_SECRET      | (empty)                                       |
| DEV        | MOCK_EMAIL                      | true                                          |
| TWILIO     | TWILIO_ACCOUNT_SID              | (empty)                                       |
| TWILIO     | TWILIO_AUTH_TOKEN               | (empty)                                       |
| TWILIO     | TWILIO_PHONE_NUMBER             | (empty)                                       |
| S3         | S3_ACCESS_KEY_ID                | (empty)                                       |
| S3         | S3_SECRET_ACCESS_KEY            | (empty)                                       |
| S3         | S3_BUCKET                       | (empty)                                       |
| S3         | S3_REGION                       | (empty)                                       |
| S3         | S3_ENDPOINT                     | (empty)                                       |
| S3         | S3_PUBLIC_ENDPOINT              | (empty)                                       |
| POSTGRES   | POSTGRES_URL                    | postgresql://postgres@127.0.0.1:5432/postgres |

Make sure to install the dependencies with [pnpm](https://pnpm.io/installation#using-corepack)

Once you have the env variables, you can install the dependencies with:

```bash
#pnpm
pnpm install

#yarn
yarn install

#npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Running Migrations

> NuxtHub

If you are using **NuxtHub**, you don't need to apply the migrations manually. The migrations are applied automatically when the dev server starts.

> [!NOTE]  
> Always push the migrations to your repo if you are using NuxtHub, because the builds are triggered on Git push which looks for migrations folder in the repo.

> Postgres

1. Generating the migrations, run the following command to generate the migrations from the Drizzle schema.

```bash
pnpm db:generate
```

2. Apply the migrations, run the following command to apply the migrations to the database. This will gracefully apply the migrations to the database and prompts you to confirm any destructive changes.

```bash
pnpm db:migrate
```

  3. Push Migrations. - Push and Apply the migrations to the database directly

```bash
pnpm db:push
```

## Production

Build the application for production:

```bash
pnpm build
```

```
---
### filename: app/app.config.ts
```ts
export default defineAppConfig({
  ui: {
    icons: {
      loading: 'i-lucide-loader',
    },
    button: {
      slots: {
        base: ['cursor-pointer'],
      },
    },
    colors: {
      primary: 'sky',
      neutral: 'neutral',
    },
  },
  seo: {
    title: 'Supersaas',
    description: 'The fullstack Nuxt 3 SaaS starter kit',
  },
})

```
---
### filename: app/app.vue
```vue
<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator color="#000000"/>
  <UApp :toaster="{ position: 'top-center' }">
    <NuxtPage />
  </UApp>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: 'Supersaas',
  description: 'The fullstack Nuxt 3 SaaS starter kit',
})
</script>

```
---
### filename: app/assets/css/main.css
```css
@import 'tailwindcss';
@import '@nuxt/ui';
@plugin '@tailwindcss/typography';

:root {
  --ui-primary: black;
}

.dark {
  --ui-primary: white;
}

.breakwords {
  word-break: break-word;
}

```
---
### filename: app/components/App/AccountSettings/General.vue
```vue
<template>
  <UCard>
    <template #header>
      <h3 class="font-medium">Personal Information</h3>
      <p class="mt-1 text-sm text-neutral-500">
        Your personal information is not shared with anyone.
      </p>
    </template>
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit as any"
    >
      <UFormField label="Avatar" name="avatar">
        <AppAvatarUploader
          v-model="state.avatarUrl"
          @file-selected="handleFileSelected"
        />
      </UFormField>
      <UFormField label="Name" name="name">
        <UInput
          v-model="state.name"
          placeholder="Name"
          class="w-full"
          size="lg"
        />
      </UFormField>
      <UFormField label="Email">
        <UInput
          :value="user?.email"
          placeholder="Email"
          class="w-full"
          disabled
          variant="subtle"
          size="lg"
        />
      </UFormField>
      <UFormField label="Account ID">
        <UInput
          :value="user?.id"
          placeholder="Account ID"
          class="w-full"
          disabled
          variant="subtle"
          size="lg"
        />
      </UFormField>
      <UButton
        color="neutral"
        :loading="loading"
        :disabled="loading"
        type="submit"
        label="Save"
      />
    </UForm>
  </UCard>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'
const { user, fetch: refreshSession } = useUserSession()
const selectedFile = ref<File | null>(null)
const { updateUser, loading, schema } = useUserAccount()

const uploadAvatar = async () => {
  try {
    if (!selectedFile.value) return ''
    const formData = new FormData()
    formData.append('image', selectedFile.value)
    const filePath = await $fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
    })
    return `/images/${filePath}`
  } catch (error) {
    throw new Error('Failed to upload avatar')
  }
}

const handleFileSelected = (file: File | null) => {
  selectedFile.value = file
  if (!file) {
    state.avatarUrl = ''
  }
}

const state = reactive({
  name: user.value?.name || '',
  avatarUrl: user.value?.avatarUrl || '',
})

const onSubmit = async (event: FormSubmitEvent<any>) => {
  try {
    let filePath = ''

    if (selectedFile.value) {
      filePath = await uploadAvatar()
    } else if (state.avatarUrl) {
      filePath = user.value?.avatarUrl
    } else {
      filePath = `https://api.dicebear.com/9.x/glass/svg?seed=${event.data.name}`
    }

    const userData = {
      ...event.data,
      avatarUrl: filePath,
    }

    await updateUser(userData)
    await refreshSession()
  } catch (error) {
    console.error(error)
  }
}
</script>

```
---
### filename: app/components/App/AccountSettings/Passkey.vue
```vue
<template>
  <div>
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="font-medium">Passkey Manager</h2>
          <UButton
            size="lg"
            color="neutral"
            :loading="creating"
            @click="modal = true"
            :disabled="creating"
          >
            Add Passkey
          </UButton>
        </div>
        <p class="mt-1 text-sm text-neutral-500">
          Add and manage your passkeys here
        </p>
      </template>
      <div v-if="status === 'pending'" class="flex items-center justify-center">
        <UIcon name="i-lucide-loader" class="animate-spin" />
      </div>
      <div v-else-if="status === 'success'">
        <div
          v-if="passkeys && passkeys.length === 0"
          class="flex flex-col items-center justify-center gap-4 rounded bg-neutral-100 p-4 text-sm dark:bg-neutral-800"
        >
          <UIcon name="i-lucide-fingerprint" class="h-6 w-6" />
          <p>No fingerprints or face IDs linked to your account.</p>
        </div>
        <ul class="divide-y divide-neutral-100 dark:divide-neutral-800">
          <li
            v-for="passkey in passkeys"
            :key="passkey.id"
            class="flex items-center justify-between py-4"
          >
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-fingerprint" class="h-6 w-6" />
              {{ passkey.name }}
            </div>
            <UButton
              color="error"
              variant="soft"
              icon="i-ph-trash"
              :loading="deleting === passkey.id"
              :disabled="deleting === passkey.id"
              @click="deletePasskey(passkey.id)"
            >
              Delete
            </UButton>
          </li>
        </ul>
      </div>
    </UCard>
    <UDrawer
      title="Register a new passkey"
      v-model:open="modal"
      :ui="{ container: 'max-w-xl mx-auto' }"
    >
      <template #body>
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="handleCreatePasskey"
        >
          <UFormField label="Name" name="name" size="lg">
            <UInput
              v-model="state.name"
              placeholder="Example: My MacBook"
              class="w-full"
              size="lg"
            />
          </UFormField>
          <UButton
            type="submit"
            :loading="creating"
            :disabled="creating"
            label="Create Passkey"
            block
            size="lg"
            color="neutral"
          />
        </UForm>
      </template>
    </UDrawer>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const modal = ref(false)
const { passkeys, status, creating, deleting, createPasskey, deletePasskey } =
  usePasskeys()

const { user } = useUserSession()
const schema = z.object({
  name: z.string().min(1).max(255),
})
const state = reactive({
  name: undefined,
})
type Schema = z.output<typeof schema>

async function handleCreatePasskey(event: FormSubmitEvent<Schema>) {
  if (!user.value) return
  const success = await createPasskey(user.value.email, event.data.name)
  if (success) {
    modal.value = false
    state.name = undefined
  }
}
</script>

```
---
### filename: app/components/App/AccountSettings/Password.vue
```vue
<template>
  <UCard>
    <template #header>
      <h3 class="font-medium">Security</h3>
      <p class="mt-1 text-sm text-neutral-500">
        Your credentials are encrypted and stored securely.
      </p>
    </template>
    <UForm
      :schema="passwordSchema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormField label="New Password" name="password">
        <UInput
          v-model="state.password"
          type="password"
          placeholder="Enter new password"
          class="w-full"
          size="lg"
        />
      </UFormField>
      <UButton
        color="neutral"
        :loading="loading"
        :disabled="loading"
        type="submit"
        label="Update Password"
      />
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
const { loading, updatePassword, passwordSchema } = useUserAccount()
const state = ref({ password: '' })

const onSubmit = async () => {
  await updatePassword(state.value.password)
  state.value.password = ''
}
</script>

```
---
### filename: app/components/App/AvatarUploader.vue
```vue
<template>
  <div class="flex items-center gap-2">
    <UAvatar
      :src="model || undefined"
      icon="i-lucide-upload"
      size="3xl"
      :ui="{ icon: 'text-lg' }"
      class="ring-1 ring-neutral-200 dark:ring-neutral-800"
    />
    <UButton
      type="button"
      color="neutral"
      variant="soft"
      :label="model ? 'Change' : 'Upload'"
      size="xs"
      @click="() => open()"
    />
    <UButton
      v-if="model"
      type="button"
      color="error"
      variant="soft"
      label="Remove"
      size="xs"
      @click="removeImage"
    />
  </div>
</template>

<script setup lang="ts">
import { useFileDialog, useObjectUrl } from '@vueuse/core'

const model = defineModel<string | undefined>()

const { files, open, onChange } = useFileDialog({
  accept: 'image/*',
  multiple: false,
})

const emit = defineEmits<{
  'file-selected': [file: File | null]
}>()

onChange(() => {
  const file = files.value?.[0]
  if (file) {
    const objectUrl = useObjectUrl(file)
    model.value = objectUrl.value
    emit('file-selected', file)
  }
})

const removeImage = () => {
  model.value = ''
  emit('file-selected', null)
}
</script>

```
---
### filename: app/components/App/Container.vue
```vue
<template>
  <header class="sticky top-0 flex h-12 items-center gap-2 px-4 bg-white dark:bg-neutral-900 z-40">
    <UButton
      icon="i-lucide-panel-left"
      color="neutral"
      variant="ghost"
      class="flex lg:hidden"
      @click="mobileMenu = !mobileMenu"
    />
    <div class="min-w-0 flex-1">
      <h1 class="flex-1 truncate font-bold">{{ title }}</h1>
    </div>
    <slot name="actions" />
  </header>
  <div :class="{ 'p-4': padding }">
    <slot />
  </div>
</template>

<script lang="ts" setup>
const mobileMenu = useState('mobileMenu')
withDefaults(
  defineProps<{
    title: string
    description?: string
    padding?: boolean
  }>(),
  {
    padding: true,
  },
)
</script>

```
---
### filename: app/components/App/Demo/Card.vue
```vue
<template>
  <div class="rounded-xl bg-[#fbfaf9] p-1.5 dark:bg-neutral-950">
    <div class="card-shadow rounded-md bg-white dark:bg-neutral-900">
      <header class="border-b border-neutral-100 px-4 py-2 dark:border-white/10">
        <p class="text-sm text-neutral-500">{{ title }}</p>
      </header>
      <div class="p-4">
        <slot></slot>
        <p v-if="description" class="text-sm text-neutral-500">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<style scoped>
.card-shadow {
  box-shadow:
    0 1px 2px #5f4a2e14,
    0 4px 6px #5f4a2e0a,
    0 24px 40px -16px #684b2514;
}
</style>

```
---
### filename: app/components/App/Demo/Chart.vue
```vue
<template>
  <AppDemoCard :title="title" :description="description">
    <div class="overflow-x-auto">
      <div class="flex items-end h-64 gap-2 min-w-[600px] px-1">
        <div
          v-for="item in impressionsChartData"
          :key="item.date"
          class="flex flex-col items-center flex-1"
        >
          <UTooltip :delay-duration="0" :text="item.value.toString()">
            <div
              class="w-full min-w-6 bg-neutral-200 dark:bg-neutral-800 ring-1 ring-neutral-300 dark:ring-white/10 rounded transition-all duration-300 cursor-pointer hover:-translate-y-1"
              :style="{
                height: `${Math.max((item.value / maxValue) * 200, 1)}px`,
              }"
            ></div>
          </UTooltip>
          <div class="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
            {{ formatDate(item.date) }}
          </div>
        </div>
      </div>
    </div>
  </AppDemoCard>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  description?: string;
}>();

const impressionsChartData = [
  { date: '2024-01-01', value: 2100 },
  { date: '2024-01-02', value: 3400 },
  { date: '2024-01-03', value: 2800 },
  { date: '2024-01-04', value: 4200 },
  { date: '2024-01-05', value: 3800 },
  { date: '2024-01-06', value: 5100 },
  { date: '2024-01-07', value: 4600 },
  { date: '2024-01-08', value: 3200 },
  { date: '2024-01-09', value: 4800 },
  { date: '2024-01-10', value: 3900 },
  { date: '2024-01-11', value: 5300 },
  { date: '2024-01-12', value: 4400 },
  { date: '2024-01-13', value: 3700 },
  { date: '2024-01-14', value: 5000 },
  { date: '2024-01-15', value: 4100 },
  { date: '2024-01-16', value: 5600 },
  { date: '2024-01-17', value: 4900 },
  { date: '2024-01-18', value: 3500 },
  { date: '2024-01-19', value: 5200 },
  { date: '2024-01-20', value: 4300 },
  { date: '2024-01-21', value: 5800 },
  { date: '2024-01-22', value: 4700 },
  { date: '2024-01-23', value: 3300 },
  { date: '2024-01-24', value: 4900 },
  { date: '2024-01-25', value: 3600 },
  { date: '2024-01-26', value: 5400 },
  { date: '2024-01-27', value: 4500 },
  { date: '2024-01-28', value: 3100 },
  { date: '2024-01-29', value: 4700 },
  { date: '2024-01-30', value: 3800 },
];

// Calculate the maximum value for scaling the bars
const maxValue = Math.max(...impressionsChartData.map((item) => item.value));

// Format date to show only the day
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', { day: 'numeric' });
};
</script>

```
---
### filename: app/components/App/Demo/Kpi.vue
```vue
<template>
  <AppDemoCard :title="title" :description="description">
    <div class="flex items-end gap-3">
      <p class="text-2xl sm:text-4xl font-bold">{{ value }}</p>
      <span v-if="down" class="text-rose-500 flex items-center gap-1">
        <UIcon name="i-lucide-arrow-down" />
        <span>{{ down }}</span>
      </span>
      <span v-if="up" class="text-emerald-500 flex items-center gap-1">
        <UIcon name="i-lucide-arrow-up" />
        <span>{{ up }}</span>
      </span>
    </div>
  </AppDemoCard>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  value: string;
  down?: string;
  up?: string;
  description?: string;
}>();
</script>

```
---
### filename: app/components/App/Demo/Table.vue
```vue
<template>
  <AppDemoCard title="Contacts">
    <div class="overflow-x-auto">
      <table class="w-full">
        <tbody>
          <tr
            v-for="contact in contacts"
            :key="contact.id"
            class="border-b border-neutral-100 text-sm text-neutral-500 hover:bg-neutral-50 dark:border-white/10 dark:text-neutral-400 dark:hover:bg-neutral-800/50 [&>td]:whitespace-nowrap"
          >
            <td class="p-2">
              <div class="flex items-center gap-2">
                <UAvatar :src="contact.avatar" :alt="contact.name" size="2xs" />
                {{ contact.name }}
              </div>
            </td>
            <td class="p-2">
              <div class="flex items-center gap-2">
                <UAvatar
                  :src="contact.logo"
                  size="2xs"
                  :alt="contact.company + ' logo'"
                />
                {{ contact.company }}
              </div>
            </td>
            <td class="p-2">{{ contact.email }}</td>
            <td class="p-2">{{ contact.phone }}</td>
            <td class="p-2">
              <UBadge
                class="w-20"
                variant="subtle"
                :ui="{
                  leadingIcon: 'size-3',
                }"
                :color="
                  contact.status === 'Active'
                    ? 'success'
                    : contact.status === 'Inactive'
                      ? 'info'
                      : 'warning'
                "
                :icon="
                  contact.status === 'Active'
                    ? 'i-lucide-circle'
                    : contact.status === 'Inactive'
                      ? 'i-lucide-circle-dashed'
                      : 'i-lucide-circle-dot-dashed'
                "
              >
                {{ contact.status }}
              </UBadge>
            </td>
            <td class="p-2 text-right">{{ contact.ARR }}</td>
            <td class="p-2">{{ contact.country }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </AppDemoCard>
</template>

<script setup lang="ts">
const contacts = [
  {
    id: 1,
    name: 'Sarah Chen',
    avatar: 'https://i.pravatar.cc/150?img=1',
    email: 'sarah.chen@vercel.com',
    phone: '+1 415 555 0123',
    company: 'Vercel',
    logo: `https://logo.clearbit.com/${encodeURIComponent(
      'https://www.vercel.com',
    )}`,
    status: 'Active',
    ARR: '$110K',
    country: '🇺🇸 United States',
  },
  {
    id: 2,
    name: 'Tarun Talwar',
    avatar: 'https://i.pravatar.cc/150?img=2',
    email: 'tarun.talwar@jio.com',
    phone: '+1 206 555 0134',
    company: 'Jio',
    logo: `https://logo.clearbit.com/${encodeURIComponent(
      'https://www.jio.com',
    )}`,
    status: 'Active',
    ARR: '$460K',
    country: '🇮🇳 India',
  },
  {
    id: 3,
    name: 'Emma Thompson',
    avatar: 'https://i.pravatar.cc/150?img=3',
    email: 'emma.t@openai.com',
    phone: '+1 650 555 0145',
    company: 'Google',
    logo: `https://logo.clearbit.com/${encodeURIComponent(
      'https://www.openai.com',
    )}`,
    status: 'Inactive',
    ARR: '$1.9M',
    country: '🇺🇸 United States',
  },
  {
    id: 4,
    name: 'James Wilson',
    avatar: 'https://i.pravatar.cc/150?img=4',
    email: 'jwilson@campsite.com',
    phone: '+1 206 555 0156',
    company: 'Campsite',
    logo: `https://logo.clearbit.com/${encodeURIComponent(
      'https://www.campsite.com',
    )}`,
    status: 'Active',
    ARR: '$210M',
    country: '🇬🇧 United Kingdom',
  },
  {
    id: 5,
    name: 'Lisa Park',
    avatar: 'https://i.pravatar.cc/150?img=5',
    email: 'lisa.park@paypal.com',
    phone: '+1 408 555 0167',
    company: 'Paypal',
    logo: `https://logo.clearbit.com/${encodeURIComponent(
      'https://www.paypal.com',
    )}`,
    status: 'Active',
    ARR: '$908K',
    country: '🇺🇸 United States',
  },
  {
    id: 6,
    name: 'David Kumar',
    avatar: 'https://i.pravatar.cc/150?img=6',
    email: 'd.kumar@stripe.com',
    phone: '+1 650 555 0178',
    company: 'Stripe',
    logo: `https://logo.clearbit.com/${encodeURIComponent(
      'https://www.stripe.com',
    )}`,
    status: 'Pending',
    ARR: '$330M',
    country: '🇮🇪 Ireland',
  },
  {
    id: 7,
    name: 'Sophie Martin',
    avatar: 'https://i.pravatar.cc/150?img=7',
    email: 's.martin@adobe.com',
    phone: '+1 415 555 0189',
    company: 'Adobe',
    logo: `https://logo.clearbit.com/${encodeURIComponent(
      'https://www.adobe.com',
    )}`,
    status: 'Active',
    ARR: '$1.2M',
    country: '🇺🇸 United States',
  },
  {
    id: 8,
    name: 'Robert Zhang',
    avatar: 'https://i.pravatar.cc/150?img=8',
    email: 'r.zhang@shopify.com',
    phone: '+1 503 555 0190',
    company: 'Shopify',
    logo: `https://logo.clearbit.com/${encodeURIComponent(
      'https://www.shopify.com',
    )}`,
    status: 'Active',
    ARR: '$620M',
    country: '🇰🇷 South Korea',
  },
  {
    id: 9,
    name: 'Maria Garcia',
    avatar: 'https://i.pravatar.cc/150?img=9',
    email: 'm.garcia@notion.so',
    phone: '+1 415 555 0112',
    company: 'Notion',
    logo: `https://logo.clearbit.com/${encodeURIComponent(
      'https://www.notion.so',
    )}`,
    status: 'Inactive',
    ARR: '$2M',
    country: '🇯🇵 Japan',
  },
  {
    id: 10,
    name: 'Daniel Lee',
    avatar: 'https://i.pravatar.cc/150?img=10',
    email: 'd.lee@mintlify.com',
    phone: '+1 650 555 0123',
    company: 'Mintlify',
    logo: `https://logo.clearbit.com/${encodeURIComponent(
      'https://www.mintlify.com',
    )}`,
    status: 'Active',
    ARR: '$80K',
    country: '🇺🇸 United States',
  },
  {
    id: 11,
    name: 'Alexandra Brown',
    avatar: 'https://i.pravatar.cc/150?img=11',
    email: 'a.brown@twitter.com',
    phone: '+1 415 555 0134',
    company: 'Twitter',
    logo: `https://logo.clearbit.com/${encodeURIComponent(
      'https://www.twitter.com',
    )}`,
    status: 'Pending',
    ARR: '$108K',
    country: '🇺🇸 United States',
  },
  {
    id: 12,
    name: 'Enzo N',
    avatar: 'https://i.pravatar.cc/150?img=12',
    email: 'enzo.n@facebook.com',
    phone: '+1 650 555 0145',
    company: 'Facebook',
    logo: `https://logo.clearbit.com/${encodeURIComponent(
      'https://www.facebook.com',
    )}`,
    status: 'Active',
    ARR: '$890M',
    country: '🇫🇷 France',
  },
  {
    id: 13,
    name: 'Nina Patel',
    avatar: 'https://i.pravatar.cc/150?img=13',
    email: 'n.patel@apple.com',
    phone: '+1 408 555 0156',
    company: 'Apple',
    logo: `https://logo.clearbit.com/${encodeURIComponent(
      'https://www.apple.com',
    )}`,
    status: 'Active',
    ARR: '$1.2B',
    country: '🇨🇦 Canada',
  },
  {
    id: 14,
    name: "Kevin O'Brien",
    avatar: 'https://i.pravatar.cc/150?img=14',
    email: 'k.obrien@linkedin.com',
    phone: '+1 415 555 0167',
    company: 'LinkedIn',
    logo: `https://logo.clearbit.com/${encodeURIComponent(
      'https://www.linkedin.com',
    )}`,
    status: 'Active',
    ARR: '$450M',
    country: '🇺🇸 United States',
  },
  {
    id: 15,
    name: 'Julia Kim',
    avatar: 'https://i.pravatar.cc/150?img=15',
    email: 'j.kim@twenty.com',
    phone: '+1 408 555 0178',
    company: 'Twenty',
    logo: `https://logo.clearbit.com/${encodeURIComponent(
      'https://twenty.com/',
    )}`,
    status: 'Inactive',
    ARR: '$780M',
    country: '🇻🇳 Vietnam',
  },
  {
    id: 16,
    name: 'Carlos Mendoza',
    avatar: 'https://i.pravatar.cc/150?img=16',
    email: 'c.mendoza@uber.com',
    phone: '+1 415 555 0189',
    company: 'Uber',
    logo: `https://logo.clearbit.com/${encodeURIComponent(
      'https://www.uber.com',
    )}`,
    status: 'Active',
    ARR: '$320M',
    country: '🇧🇷 Brazil',
  },
  {
    id: 17,
    name: 'Rachel Wong',
    avatar: 'https://i.pravatar.cc/150?img=17',
    email: 'r.wong@airbnb.com',
    phone: '+1 415 555 0190',
    company: 'Airbnb',
    logo: `https://logo.clearbit.com/${encodeURIComponent(
      'https://www.airbnb.com',
    )}`,
    status: 'Active',
    ARR: '$560M',
    country: '🇺🇸 United States',
  },
  {
    id: 18,
    name: 'Ahmed Hassan',
    avatar: 'https://i.pravatar.cc/150?img=18',
    email: 'a.hassan@spotify.com',
    phone: '+1 212 555 0112',
    company: 'Spotify',
    logo: `https://logo.clearbit.com/${encodeURIComponent(
      'https://www.spotify.com',
    )}`,
    status: 'Pending',
    ARR: '$290M',
    country: '🇸🇪 Sweden',
  },
  {
    id: 19,
    name: 'Isabella Silva',
    avatar: 'https://i.pravatar.cc/150?img=19',
    email: 'i.silva@netflix.com',
    phone: '+1 650 555 0123',
    company: 'Netflix',
    logo: `https://logo.clearbit.com/${encodeURIComponent(
      'https://www.netflix.com',
    )}`,
    status: 'Active',
    ARR: '$980M',
    country: '🇪🇸 Spain',
  },
  {
    id: 20,
    name: 'William Taylor',
    avatar: 'https://i.pravatar.cc/150?img=20',
    email: 'w.taylor@slack.com',
    phone: '+1 415 555 0134',
    company: 'Slack',
    logo: `https://logo.clearbit.com/${encodeURIComponent(
      'https://www.slack.com',
    )}`,
    status: 'Active',
    ARR: '$850M',
    country: '🇺🇸 United States',
  },
]
</script>

```
---
### filename: app/components/App/Invoices.vue
```vue
<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const UBadge = resolveComponent('UBadge')

type Invoice = {
  id: string
  planName: string
  amount: number
  date: string
  status: 'paid' | 'pending' | 'failed'
  invoiceUrl: string
}

const data = ref<Invoice[]>([
  {
    id: 'INV-2024-001',
    planName: 'Business',
    amount: 99.99,
    date: '2024-03-11T15:30:00',
    status: 'pending',
    invoiceUrl: '/invoices/INV-2024-001.pdf',
  },
  {
    id: 'INV-2024-002',
    planName: 'Hobby',
    amount: 49.99,
    date: '2024-02-11T15:30:00',
    status: 'paid',
    invoiceUrl: '/invoices/INV-2024-002.pdf',
  },
  {
    id: 'INV-2024-003',
    planName: 'Hobby',
    amount: 49.99,
    date: '2024-01-11T15:30:00',
    status: 'paid',
    invoiceUrl: '/invoices/INV-2024-003.pdf',
  },
  {
    id: 'INV-2024-004',
    planName: 'Hobby',
    amount: 49.99,
    date: '2024-03-11T15:30:00',
    status: 'paid',
    invoiceUrl: '/invoices/INV-2024-004.pdf',
  },
  {
    id: 'INV-2024-005',
    planName: 'Hobby',
    amount: 49.99,
    date: '2024-03-10T15:30:00',
    status: 'failed',
    invoiceUrl: '/invoices/INV-2024-005.pdf',
  },
])

const columns: TableColumn<Invoice>[] = [
  {
    accessorKey: 'id',
    header: 'Invoice',
    cell: ({ row }) => row.getValue('id'),
  },
  {
    accessorKey: 'planName',
    header: 'Plan Name',
  },
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)
      return h('div', { class: 'text-right font-medium' }, formatted)
    },
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      return new Date(row.getValue('date')).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const color = {
        paid: 'success',
        pending: 'warning',
        failed: 'error',
      }[status] as 'success' | 'warning' | 'error'

      return h(
        UBadge,
        { class: 'capitalize', variant: 'subtle', color },
        () => status,
      )
    },
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      return h('div', { class: 'flex gap-2' }, [
        h(resolveComponent('UButton'), {
          color: 'neutral',
          variant: 'soft',
          icon: 'i-lucide-eye',
          size: 'sm',
          onClick: () => window.open(row.original.invoiceUrl, '_blank'),
        }),
        h(resolveComponent('UButton'), {
          color: 'neutral',
          variant: 'soft',
          icon: 'i-lucide-download',
          size: 'sm',
          onClick: () => window.open(row.original.invoiceUrl, '_blank'),
        }),
      ])
    },
  },
]
</script>

<template>
  <UTable
    :data="data"
    :columns="columns"
    class="flex-1 rounded-lg border border-neutral-200 mt-2 dark:border-white/10"
  />
</template>

```
---
### filename: app/components/App/MobileMenu.vue
```vue
<template>
  <div class="p-2">
    
  </div>
</template>

<script lang="ts" setup>

</script>
```
---
### filename: app/components/App/NewTeamForm.vue
```vue
<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit as any"
  >
    <UFormField
      label="Team logo (Recommended size: 1 MB, 1:1 aspect ratio)"
      name="logo"
    >
      <AppAvatarUploader
        v-model="imagePreview"
        @file-selected="handleFileSelected"
      />
    </UFormField>

    <UFormField required label="Team name" name="name">
      <UInput
        v-model="state.name"
        placeholder="Personal or Company Name"
        class="w-full"
        size="lg"
      />
    </UFormField>

    <UFormField
      label="Team URL"
      name="slug"
      required
      :help="`${host}/dashboard/${state.slug}`"
    >
      <UInput
        v-model="state.slug"
        placeholder="my-awesome-team"
        class="w-full"
        size="lg"
      />
    </UFormField>

    <UButton
      color="neutral"
      type="submit"
      size="lg"
      block
      :loading="loading"
      :disabled="loading"
    >
      Create team
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import type { Team } from '@@/types/database'

const toast = useToast()
const teams = useState<Team[]>('teams')
const loading = ref(false)
const imagePreview = ref<string | undefined>(undefined)
const selectedFile = ref<File | null>(null)
const { setLastUsedTeam } = useTeamPreferences()

const emit = defineEmits<{
  success: [team: Team]
}>()

const handleFileSelected = (file: File | null) => {
  selectedFile.value = file
}

const schema = z.object({
  name: z.string().min(1, 'Team name is required'),
  logo: z.string().optional(),
  slug: z
    .string()
    .min(1, 'Team slug is required')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Only lowercase letters, numbers, and single hyphens between characters allowed',
    ),
})

const state = reactive({
  name: '',
  slug: '',
  logo: '',
})

const onSubmit = async (event: FormSubmitEvent<typeof schema>) => {
  loading.value = true
  try {
    const filePath = selectedFile.value
      ? await uploadLogo()
      : `https://api.dicebear.com/9.x/glass/svg?seed=${event.data.name}`
    const teamData = { ...event.data, logo: filePath }
    const newTeam = await $fetch<Team>('/api/teams', {
      method: 'POST',
      body: teamData,
    })
    teams.value.push(newTeam)
    setLastUsedTeam(newTeam.slug)
    toast.add({
      title: 'Team created successfully',
      color: 'success',
    })
    emit('success', newTeam)
  } catch (error) {
    toast.add({
      title: `Failed to create team`,
      description: (error as any).statusMessage || 'Please try again',
      color: 'error',
    })
  } finally {
    loading.value = false
  }
}

const uploadLogo = async () => {
  try {
    if (!selectedFile.value) return ''
    const formData = new FormData()
    formData.append('image', selectedFile.value)
    const filePath = await $fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
    })
    return `/images/${filePath}`
  } catch (error) {
    throw new Error('Failed to upload logo')
  }
}

const host = useRuntimeConfig().public.host
</script>

```
---
### filename: app/components/App/PricingCard.vue
```vue
<template>
  <div
    class="flex h-full flex-col rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900"
    :class="{
      'border-neutral-300 bg-neutral-50 ring-4 ring-neutral-500/20': active,
    }"
  >
    <p class="font-semibold">{{ title }}</p>
    <p class="mt-1 text-sm text-neutral-500">{{ description }}</p>
    <div class="mt-auto mb-2 flex items-baseline pt-4">
      <span class="text-3xl font-bold">
        {{ formatPrice(unitAmount) }}
      </span>
      <span class="ml-1 text-neutral-500">/{{ interval }} </span>
    </div>
    <UButton
      color="neutral"
      block
      :variant="active ? 'solid' : 'outline'"
      :label="active ? 'Manage plan' : 'Subscribe'"
      :loading="loading"
      :disabled="loading"
      @click="$emit('subscribe', priceId)"
    />
    <ul class="mt-4 space-y-1">
      <li
        v-for="feature in features"
        :key="feature.name"
        class="flex items-center gap-3 text-[var(--ui-text-muted)]"
      >
        <UIcon name="i-lucide-circle-check" class="h-4 w-4 text-neutral-400" />
        <span class="text-sm">{{ feature.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
interface Feature {
  name: string
}

interface PricingCardProps {
  title: string
  description?: string
  unitAmount?: number
  interval?: string
  loading?: boolean
  disabled?: boolean
  priceId: string
  features?: Feature[]
  active?: boolean
}

defineProps<PricingCardProps>()

defineEmits<{
  subscribe: [id: string]
}>()

const formatPrice = (price?: number): string => {
  if (!price) return '$0'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price / 100)
}
</script>

```
---
### filename: app/components/App/Sidebar/Account.vue
```vue
<template>
  <div>
    <AppSidebarContent class="mt-2">
      <AppSidebarGroup>
        <AppSidebarLink
          to="/dashboard"
          icon="i-lucide-chevron-left"
          label="Dashboard"
        />
        <AppSidebarLink
          to="/dashboard/account-settings"
          icon="i-lucide-user"
          label="Account"
        />
        <AppSidebarLink
          to="/dashboard/account-security"
          icon="i-lucide-lock"
          label="Security"
        />
      </AppSidebarGroup>
    </AppSidebarContent>
  </div>
</template>

<script lang="ts" setup></script>

```
---
### filename: app/components/App/Sidebar/Content.vue
```vue
<template>
  <div class="flex-1 overflow-y-auto">
    <slot />
  </div>
</template>

```
---
### filename: app/components/App/Sidebar/Group.vue
```vue
<template>
  <div class="space-y-1">
    <slot />
  </div>
</template>

```
---
### filename: app/components/App/Sidebar/Panel.vue
```vue
<template>
  <div
    v-if="!smallerThanLg"
    class="relative hidden w-0 overflow-hidden flex-col items-stretch border-r border-neutral-200 bg-neutral-100 p-2 md:flex md:w-64 dark:border-neutral-900 dark:bg-black"
  >
    <slot />
  </div>
  <USlideover
    v-else
    side="left"
    v-model:open="model"
    :ui="{ content: 'max-w-[75%] sm:max-w-[50%]' }"
  >
    <template #content>
      <div class="flex h-full flex-col p-2">
        <slot />
      </div>
    </template>
  </USlideover>
</template>

<script lang="ts" setup>
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
const model = defineModel<boolean>({ required: true })
const breakpoints = useBreakpoints(breakpointsTailwind)
const smallerThanLg = breakpoints.smaller('lg')
</script>

```
---
### filename: app/components/App/Sidebar/Sidebar.vue
```vue
<template>
  <AppSidebarPanel v-model="mobileMenu">
    <div class="flex h-full flex-col">
      <Transition
        mode="out-in"
        enter-active-class="transition duration-100 ease-out"
        leave-active-class="transition duration-100 ease-in"
        enter-from-class="translate-x-1/2"
        enter-to-class="translate-x-0"
        leave-from-class="translate-x-0"
        leave-to-class="-translate-x-1/2"
      >
        <div v-if="isTeamRoute" key="team">
          <AppSidebarTeam />
        </div>
        <div v-else key="account">
          <AppSidebarAccount />
        </div>
      </Transition>
      <footer class="mt-auto">
        <AppUserDropdown />
      </footer>
    </div>
  </AppSidebarPanel>
</template>

<script lang="ts" setup>
const route = useRoute()

const mobileMenu = useState('mobileMenu', () => false)
const isTeamRoute = computed(() => {
  return (
    route.path.startsWith('/dashboard/') &&
    !route.path.startsWith('/dashboard/account')
  )
})
</script>

```
---
### filename: app/components/App/Sidebar/SidebarLink.vue
```vue
<template>
  <ULink
    :to="to"
    exact
    class="flex h-[30px] items-center gap-2 rounded-md p-2 font-medium hover:bg-neutral-200/80 dark:hover:bg-white/20"
    active-class="text-neutral-900 dark:text-white bg-neutral-200/70 dark:bg-white/10 hover:bg-neutral-200/80 dark:hover:bg-white/20"
    inactive-class="text-[var(--ui-text-muted)]"
    @click="mobileMenu = false"
  >
    <UIcon :name="icon" class="h-4 w-4" />
    <p class="text-sm">{{ label }}</p>
  </ULink>
</template>

<script lang="ts" setup>
const mobileMenu = useState('mobileMenu')
defineProps<{
  to: string
  icon: string
  label: string
}>()
</script>

```
---
### filename: app/components/App/Sidebar/Team.vue
```vue
<template>
  <header>
    <AppTeamDropdown />
  </header>
  <AppSidebarContent class="mt-2">
    <AppSidebarGroup>
      <AppSidebarLink v-for="link in links" :key="link.to" v-bind="link" />
      <template v-if="isTeamOwner">
        <USeparator class="my-4" />
        <AppSidebarLink v-for="link in settings" :key="link.to" v-bind="link" />
      </template>
    </AppSidebarGroup>
  </AppSidebarContent>
</template>

<script lang="ts" setup>
const { isTeamOwner } = useTeam()
const teamSlug = useRoute().params.team as string
const links = [
  {
    label: 'Home',
    icon: 'i-lucide-home',
    to: `/dashboard/${teamSlug}`,
  },
  {
    label: 'Notes',
    icon: 'i-lucide-file-text',
    to: `/dashboard/${teamSlug}/notes`,
  },
]

const settings = [
  {
    label: 'Workspace Settings',
    icon: 'i-lucide-settings',
    to: `/dashboard/${teamSlug}/settings`,
  },
  {
    label: 'Workspace Members',
    icon: 'i-lucide-users',
    to: `/dashboard/${teamSlug}/settings/members`,
  },
  {
    label: 'Billing',
    icon: 'i-lucide-credit-card',
    to: `/dashboard/${teamSlug}/settings/billing`,
  },
]
</script>

```
---
### filename: app/components/App/SidebarNavigation.vue
```vue
<template>
  <ul class="space-y-1">
    <template v-if="isAccountSettings">
      <li v-for="link in accountLinks" :key="link.to">
        <AppSidebarLink v-bind="link" />
      </li>
    </template>
    <template v-else>
      <li v-for="link in teamNavLinks" :key="link.to">
        <AppSidebarLink v-bind="link" />
      </li>
      <USeparator class="my-4" />
      <li v-for="link in teamSettingsLinks" :key="link.to">
        <AppSidebarLink v-bind="link" />
      </li>
    </template>
  </ul>
</template>

<script lang="ts" setup>
const props = defineProps<{
  isAccountSettings: boolean
  teamSlug?: string
}>()

const accountLinks = [
  {
    label: 'Account Settings',
    icon: 'i-lucide-settings',
    to: '/dashboard/account-settings',
  },
]

const teamNavLinks = computed(() => [
  {
    label: 'Home',
    icon: 'i-lucide-home',
    to: `/dashboard/${props.teamSlug}`,
  },
  {
    label: 'Notes',
    icon: 'i-lucide-file-text',
    to: `/dashboard/${props.teamSlug}/notes`,
  },
])

const teamSettingsLinks = computed(() => [
  {
    label: 'Workspace Settings',
    icon: 'i-lucide-settings',
    to: `/dashboard/${props.teamSlug}/settings`,
  },
  {
    label: 'Workspace Members',
    icon: 'i-lucide-users',
    to: `/dashboard/${props.teamSlug}/settings/members`,
  },
  {
    label: 'Billing',
    icon: 'i-lucide-credit-card',
    to: `/dashboard/${props.teamSlug}/settings/billing`,
  },
])
</script>

```
---
### filename: app/components/App/TeamDelete.vue
```vue
<template>
  <UCard>
    <template #header>
      <h3 class="text-sm font-medium">Danger Zone</h3>
    </template>
    <div class="flex items-start gap-2 md:items-center">
      <div
        class="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10"
      >
        <UIcon name="i-lucide-trash-2" class="h-5 w-5 text-red-500" />
      </div>
      <div class="flex-1">
        <h4 class="font-medium">Delete Team</h4>
        <p class="text-xs text-neutral-500 dark:text-neutral-400">
          Deleting a team is irreversible and will remove all data associated
          with it.
        </p>
      </div>
      <UModal
        :title="`Delete ${currentTeam?.name}`"
        description="This action is irreversible and will remove all data associated with it"
        close-icon="i-lucide-x"
      >
        <UButton color="error" size="lg"> Delete Permanently </UButton>

        <template #body>
          <UForm
            :schema="formSchema"
            :state="formState"
            @submit="handleSubmit"
            class="space-y-4"
          >
            <UFormField
              label="Team Name"
              name="teamName"
              :help="`Please type '${currentTeam?.name}' to confirm deletion`"
            >
              <UInput
                v-model="formState.teamName"
                placeholder="Enter team name"
                class="w-full"
              />
            </UFormField>
            <UButton
              color="error"
              size="lg"
              type="submit"
              block
              :loading="loading"
              :disabled="formState.teamName !== currentTeam?.name"
            >
              Delete Permanently
            </UButton>
          </UForm>
        </template>
      </UModal>
    </div>
  </UCard>
</template>

<script lang="ts" setup>
import { z } from 'zod'

const toast = useToast()
const { currentTeam, deleteTeam, loading } = useTeam()

const formSchema = z.object({
  teamName: z
    .string()
    .min(1, 'Team name is required')
    .refine((val) => val === currentTeam.value?.name, {
      message: 'Team name does not match',
    }),
})

type Schema = z.output<typeof formSchema>

const formState = reactive<Partial<Schema>>({
  teamName: '',
})

async function handleSubmit() {
  try {
    if (!currentTeam.value) return
    await deleteTeam(currentTeam.value.id)
    toast.add({
      title: 'Team deleted successfully',
      color: 'success',
    })
    window.location.href = '/dashboard'
  } catch (error: any) {
    toast.add({
      title: 'Failed to delete team',
      description:
        error?.data?.message || 'An error occurred while deleting the team',
      color: 'error',
    })
  }
}
</script>

```
---
### filename: app/components/App/TeamDropdown.vue
```vue
<template>
  <UDropdownMenu
    :items="items"
    :ui="{
      content: 'w-[240px]',
      item: 'cursor-pointer',
      itemTrailingIcon: 'size-4',
    }"
  >
    <UButton
      :label="activeTeam?.name"
      :avatar="getAvatarProps(activeTeam)"
      color="neutral"
      variant="ghost"
      class="w-full hover:bg-neutral-200/80 dark:hover:bg-white/10"
      block
      trailing-icon="i-lucide-chevrons-up-down"
      :ui="{ trailingIcon: 'size-4' }"
    />
  </UDropdownMenu>
  <UDrawer
    :ui="{ container: 'max-w-xl mx-auto' }"
    v-model:open="newTeamModal"
    title="Create a new team"
    description="A team is a workspace for your organization."
  >
    <template #body>
      <AppNewTeamForm @success="onTeamCreated" />
    </template>
  </UDrawer>
</template>

<script lang="ts" setup>
import type { Team } from '@@/types/database'

const newTeamModal = ref(false)
const teams = useState<Team[]>('teams')
const teamSlug = useRoute().params.team as string
const { setLastUsedTeam } = useTeamPreferences()
const activeTeam = computed(() =>
  teams.value?.find((team) => team.slug === teamSlug),
)

const getAvatarProps = (team?: Team) => ({
  src: team?.logo as string,
  size: 'xs' as const,
})

const onTeamCreated = (team: Team) => {
  newTeamModal.value = false
  navigateTo(`/dashboard/${team.slug}`)
}

const items = computed(() => {
  if (!teams.value) return []

  const allTeams = teams.value.map((team) => ({
    label: team.name,
    avatar: {
      src: team.logo as string,
      size: '2xs' as const,
    },
    type: 'checkbox' as const,
    checked: team.slug === teamSlug,
    onSelect: (e: Event) => {
      e.preventDefault()
      setLastUsedTeam(team.slug)
      return navigateTo(`/dashboard/${team.slug}`)
    },
  }))

  return [
    [...allTeams],
    [
      {
        label: 'Create a new team',
        icon: 'i-lucide-plus-circle',
        onSelect: () => {
          newTeamModal.value = true
        },
      },
    ],
  ]
})
</script>

```
---
### filename: app/components/App/TeamInvites.vue
```vue
<template>
  <div>
    <p class="text-sm font-semibold">Invitations</p>
    <div
      class="mt-2 overflow-x-auto rounded-lg border border-gray-200 dark:divide-white/10 dark:border-white/10"
    >
      <table
        v-if="teamInvites?.length"
        class="min-w-full divide-y divide-neutral-200 dark:divide-white/10"
      >
        <thead>
          <tr class="text-sm">
            <th
              v-for="column in columns"
              :key="column"
              class="px-4 py-3 text-left text-sm font-semibold"
            >
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-200 dark:divide-white/10">
          <tr
            v-for="invite in teamInvites"
            :key="invite.id"
            class="text-sm [&>td]:whitespace-nowrap"
          >
            <td class="px-4 py-3">{{ invite.email }}</td>
            <td class="px-4 py-3">
              <UBadge
                color="neutral"
                size="sm"
                variant="subtle"
                class="uppercase"
              >
                {{ invite.role }}
              </UBadge>
            </td>
            <td class="px-4 py-3">
              <UBadge
                :color="invite.status === 'pending' ? 'warning' : 'success'"
                size="sm"
                variant="subtle"
                class="uppercase"
              >
                {{ invite.status }}
              </UBadge>
            </td>
            <td class="px-4 py-3">
              {{ useDateFormat(invite.expiresAt, 'MMM D, YYYY').value }}
            </td>
            <td class="px-4 py-3">
              {{ useDateFormat(invite.createdAt, 'MMM D, YYYY').value }}
            </td>
            <td class="px-4 py-3">
              <UDropdownMenu
                :items="getRowItems(invite)"
                :content="{
                  align: 'end',
                  side: 'bottom',
                }"
              >
                <UButton
                  icon="i-lucide-ellipsis"
                  variant="ghost"
                  color="neutral"
                />
              </UDropdownMenu>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="flex h-64 flex-col items-center justify-center gap-3">
        <UIcon name="i-lucide-inbox" class="size-10" />
        <p class="text-sm text-neutral-500">No invitations found</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDateFormat } from '@vueuse/core'
const { currentTeam, cancelInvite } = useTeam()
const toast = useToast()

const { data: teamInvites, refresh: fetchTeamInvites } = await useFetch<
  {
    id: string
    teamId: string
    email: string
    role: string
    token: string
    status: string
    expiresAt: Date
    createdAt: Date
  }[]
>(`/api/teams/${currentTeam.value?.id}/invites`, {
  key: 'team-invites',
})

const columns = ['Email', 'Role', 'Status', 'Expires At', 'Created At', '']

const getRowItems = (invite: (typeof teamInvites.value)[0]) => {
  return [
    {
      label: 'Copy Email',
      onSelect: () => {
        navigator.clipboard.writeText(invite.email)
        toast.add({
          title: 'Email copied to clipboard!',
          color: 'success',
        })
      },
    },
    {
      label: 'Resend Invite',
      onSelect: async () => {
        try {
          await $fetch(
            `/api/teams/${currentTeam.value?.id}/invites/${invite.id}/resend`,
            {
              method: 'POST',
            },
          )
          toast.add({
            title: 'Invite resent successfully!',
            color: 'success',
          })
        } catch (error) {
          toast.add({
            title: 'Failed to resend invite',
            color: 'error',
          })
        }
      },
    },
    { type: 'separator' },
    {
      label: 'Cancel Invite',
      color: 'error' as const,
      onSelect: async () => {
        await cancelInvite(invite.id)
        await fetchTeamInvites()
      },
    },
  ]
}
</script>

```
---
### filename: app/components/App/TeamMembers.vue
```vue
<template>
  <div>
    <p class="text-sm font-semibold">Active Members</p>
    <div
      class="mt-2 overflow-x-auto rounded-lg border border-gray-200 dark:divide-white/10 dark:border-white/10"
    >
      <table
        class="min-w-full divide-y divide-neutral-200 dark:divide-white/10"
      >
        <thead>
          <tr class="text-sm">
            <th
              v-for="column in columns"
              :key="column"
              class="px-4 py-3 text-left text-sm font-semibold"
            >
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-200 dark:divide-white/10">
          <tr
            v-for="member in members"
            :key="member.id"
            class="text-sm [&>td]:whitespace-nowrap"
          >
            <td class="px-4 py-3">
              <div class="flex items-center gap-2">
                <UAvatar
                  :src="
                    getAvatarUrl({
                      path: member.avatarUrl,
                      identifier: member.email,
                      type: 'user',
                    })
                  "
                  size="xs"
                  :alt="member.name"
                />
                <span class="font-medium text-neutral-900 dark:text-white">{{
                  member.name
                }}</span>
              </div>
            </td>
            <td class="px-4 py-3">{{ member.email }}</td>
            <td class="px-4 py-3">
              <UBadge
                size="sm"
                variant="subtle"
                class="uppercase"
                :color="member.role === 'owner' ? 'success' : 'neutral'"
              >
                {{ member.role }}
              </UBadge>
            </td>
            <td class="px-4 py-3">
              {{
                member.lastLoginAt
                  ? useDateFormat(member.lastLoginAt, 'MMM D, YYYY hh:mm a')
                      .value
                  : 'Never'
              }}
            </td>
            <td class="px-4 py-3">
              {{ useDateFormat(member.createdAt, 'MMM D, YYYY').value }}
            </td>
            <td class="px-4 py-3">
              <UDropdownMenu
                :items="getRowItems(member)"
                :content="{
                  align: 'end',
                  side: 'bottom',
                }"
              >
                <UButton
                  icon="i-lucide-ellipsis"
                  variant="ghost"
                  color="neutral"
                />
              </UDropdownMenu>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { getAvatarUrl } from '@/utils/avatar'
const { currentTeam, removeTeamMember } = useTeam()
interface TeamMember {
  id: string
  teamId: string
  userId: string
  role: string
  email: string
  name: string
  avatarUrl: string | null
  lastLoginAt: Date | null
  createdAt: Date
}
const { data: members, refresh: refreshMembers } = await useFetch<TeamMember[]>(
  `/api/teams/${currentTeam.value?.id}/members`,
)
const columns = ['Name', 'Email', 'Role', 'Last Login', 'Created At']
const toast = useToast()
const getRowItems = (member: TeamMember) => {
  return [
    {
      label: 'Copy Email',
      onSelect: () => {
        navigator.clipboard.writeText(member.email)
        toast.add({
          title: 'Email copied to clipboard!',
          color: 'success',
        })
      },
    },
    {
      label: 'Copy User ID',
      onSelect: () => {
        navigator.clipboard.writeText(member.userId)
        toast.add({
          title: 'User ID copied to clipboard!',
          color: 'success',
        })
      },
    },
    { type: 'separator' },
    {
      label: 'Remove from team',
      color: 'error' as const,
      onSelect: async () => {
        try {
          await removeTeamMember(member.id)
          await refreshMembers()
        } catch (error) {
          toast.add({
            title: 'Failed to remove member',
            color: 'error',
          })
        }
      },
    },
  ]
}
</script>

```
---
### filename: app/components/App/TeamSettings.vue
```vue
<template>
  <UCard>
    <template #header>
      <h3 class="text-sm font-medium">General Settings</h3>
    </template>

    <UForm
      :schema="teamSchema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit as any"
    >
      <UFormField
        label="Team logo (Recommended size: 1 MB, 1:1 aspect ratio)"
        name="logo"
      >
        <AppAvatarUploader
          v-model="state.logo"
          @file-selected="handleFileSelected"
        />
      </UFormField>

      <UFormField required label="Team name" name="name">
        <UInput v-model="state.name" class="w-full" />
      </UFormField>

      <UFormField label="Team URL" :help="`${host}/dashboard/${state.slug}`">
        <UInput v-model="state.slug" variant="subtle" class="w-full" disabled />
      </UFormField>

      <UFormField label="Team ID">
        <UInput
          :value="currentTeam?.id || ''"
          variant="subtle"
          class="w-full"
          disabled
        />
      </UFormField>

      <UButton
        type="submit"
        color="neutral"
        :loading="loading"
        :disabled="loading"
      >
        Save Changes
      </UButton>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'

const { teamSchema, updateTeam, currentTeam, loading } = useTeam()
const selectedFile = ref<File | null>(null)

const state = reactive({
  name: currentTeam.value?.name || '',
  slug: currentTeam.value?.slug || '',
  logo: currentTeam.value?.logo || '',
})

const handleFileSelected = (file: File | null) => {
  selectedFile.value = file
  if (!file) {
    state.logo = ''
  }
}

const uploadLogo = async () => {
  try {
    if (!selectedFile.value) return ''
    const formData = new FormData()
    formData.append('image', selectedFile.value)
    const filePath = await $fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
    })
    return `/images/${filePath}`
  } catch (error) {
    throw new Error('Failed to upload logo')
  }
}

const onSubmit = async (event: FormSubmitEvent<typeof teamSchema>) => {
  if (!currentTeam.value?.id) return

  try {
    let filePath = ''

    if (selectedFile.value) {
      filePath = await uploadLogo()
    } else if (state.logo) {
      filePath = currentTeam.value.logo
    } else {
      filePath = `https://api.dicebear.com/9.x/glass/svg?seed=${event.data.name}`
    }

    const teamData = {
      ...event.data,
      logo: filePath,
    }

    await updateTeam(currentTeam.value.id, teamData)
  } catch (error) {
    console.error(error)
  }
}

const host = useRuntimeConfig().public.host
</script>

```
---
### filename: app/components/App/UserDropdown.vue
```vue
<template>
  <UDropdownMenu
    :items="items"
    :ui="{
      content: 'w-[240px]',
    }"
    :content="{
      align: 'start',
    }"
  >
    <UButton
      block
      color="neutral"
      variant="ghost"
      class="w-full justify-normal text-left hover:bg-zinc-200/80 dark:hover:bg-white/10"
    >
      <UAvatar
        :src="user?.avatarUrl || ''"
        :alt="user?.name"
        size="xs"
        class="ring-2 ring-gray-200 dark:ring-white/10"
      />
      <div class="flex flex-1 items-center gap-2">
        <p class="text-sm">{{ user?.name }}</p>
      </div>
      <UIcon name="i-lucide-chevron-up" />
    </UButton>
    <template #profile>
      <div class="flex items-center gap-2">
        <UAvatar
          :src="user?.avatarUrl || ''"
          :alt="user?.name"
          class="ring-2 ring-gray-200 dark:ring-white/10"
        />
        <div class="flex-1">
          <p :style="{ fontWeight: 500 }" class="text-sm">{{ user?.name }}</p>
          <p
            class="text-xs text-zinc-500 dark:text-zinc-400"
            :style="{ fontWeight: 400 }"
          >
            {{ user?.email }}
          </p>
        </div>
      </div>
    </template>
  </UDropdownMenu>
</template>

<script setup lang="ts">
const { user, clear } = useUserSession()
const mobileMenu = useState('mobileMenu')
async function signOut() {
  await clear()
  await navigateTo('/')
}
const items = ref([
  [
    {
      slot: 'profile',
      label: user?.value?.name,
      avatar: {
        src: user?.value?.avatarUrl || '',
        alt: user?.value?.name,
      },
      type: 'label',
      onSelect: () => {
        mobileMenu.value = false
      },
    },
  ],
  [
    {
      label: 'Account Settings',
      icon: 'i-lucide-user-cog',
      to: '/dashboard/account-settings',
      onSelect: () => {
        mobileMenu.value = false
      },
    },
  ],
  [
    {
      label: 'Theme',
      icon: 'i-lucide-moon',
      children: [
        [
          {
            label: 'Light',
            icon: 'i-lucide-sun',
            onSelect: () => {
              setColorMode('light')
              mobileMenu.value = false
            },
          },
          {
            label: 'Dark',
            icon: 'i-lucide-moon',
            onSelect: () => {
              setColorMode('dark')
              mobileMenu.value = false
            },
          },
        ],
        [
          {
            label: 'System',
            icon: 'i-lucide-monitor',
            onSelect: () => {
              setColorMode('system')
              mobileMenu.value = false
            },
          },
        ],
      ],
    },
  ],
  [
    {
      label: 'Support',
      icon: 'i-lucide-life-buoy',
    },
    {
      label: 'Docs',
      icon: 'i-lucide-cloud',
    },
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      onSelect: signOut,
      color: 'error' as const,
    },
  ],
])

const colorMode = useColorMode()

function setColorMode(mode: string) {
  colorMode.preference = mode
}
</script>

```
---
### filename: app/components/auth/SocialLogin.vue
```vue
<template>
  <div class="space-y-2">
    <AuthSocialLoginButton
      label="Google"
      icon="i-logos-google-icon"
      provider="google"
    />
    <AuthSocialLoginButton
      label="Github"
      icon="i-mdi-github"
      provider="github"
    />
    <AuthSocialLoginButton
      label="Discord"
      icon="i-logos-discord-icon"
      provider="discord"
    />
  </div>
</template>

```
---
### filename: app/components/auth/social-login-button.vue
```vue
<template>
  <UButton
    @click="open"
    :loading="loading"
    :disabled="loading"
    external
    block
    color="neutral"
    size="lg"
    :icon="icon"
    variant="subtle"
  >
    {{ label }}
  </UButton>
</template>

<script setup lang="ts">
const loading = ref(false)
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
})

function open() {
  loading.value = true
  window.location.href = `/api/auth/oauth/${props.provider}`
}
</script>

```
---
### filename: app/composables/useAuth.ts
```ts
interface AuthError {
  message: string
  statusCode?: number
}

interface AuthResponse {
  error?: AuthError
  success?: boolean
}

export const useAuth = () => {
  const toast = useToast()
  const { fetch: refreshSession } = useUserSession()

  const handleAuthError = (error: any) => {
    const errorMessage = error?.data?.message || 'An unexpected error occurred'
    toast.add({
      title: 'Error',
      description: errorMessage,
      color: 'error',
    })
    return { error: { message: errorMessage } as AuthError }
  }

  const login = async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
    try {
      await $fetch('/api/auth/password/login', {
        method: 'POST',
        body: credentials,
      })
      await refreshSession()
      toast.add({ title: 'Logged in successfully', color: 'success' })
      return { success: true }
    } catch (error) {
      return handleAuthError(error)
    }
  }

  const register = async (userData: {
    email: string
    password: string
    name: string
  }): Promise<AuthResponse> => {
    try {
      await $fetch('/api/auth/password/register', {
        method: 'POST',
        body: userData,
      })
      return { success: true }
    } catch (error) {
      return handleAuthError(error)
    }
  }

  const forgotPassword = async (email: string): Promise<AuthResponse> => {
    try {
      await $fetch('/api/auth/password/forgot', {
        method: 'POST',
        body: { email },
      })
      toast.add({
        title:
          'If the email is correct, you will receive a password reset link.',
        color: 'success',
      })
      return { success: true }
    } catch (error) {
      return handleAuthError(error)
    }
  }

  const resetPassword = async (password: string, token: string): Promise<AuthResponse> => {
    try {
      await $fetch('/api/auth/password/reset', {
        method: 'POST',
        body: { password, token },
      })
      toast.add({
        title: 'Password reset successfully',
        color: 'success',
      })
      return { success: true }
    } catch (error) {
      return handleAuthError(error)
    }
  }

  return {
    login,
    register,
    forgotPassword,
    resetPassword,
  }
}

```
---
### filename: app/composables/usePasskeys.ts
```ts
export const usePasskeys = () => {
  const toast = useToast()
  const creating = ref(false)
  const deleting = ref<string | null>(null)

  const { register, authenticate } = useWebAuthn({
    registerEndpoint: '/api/auth/webauthn/link-passkey',
    authenticateEndpoint: '/api/auth/webauthn/authenticate',
  })

  const {
    data: passkeys,
    status,
    refresh,
  } = useFetch('/api/auth/webauthn/linked-passkeys', {
    server: false,
    lazy: true,
  })

  const createPasskey = async (userName: string, displayName: string) => {
    try {
      creating.value = true
      await register({ userName, displayName })
      await refresh()
      toast.add({
        title: 'Passkey added successfully',
        color: 'success',
      })
      return true
    } catch (error: any) {
      toast.add({
        title: 'Failed to add passkey',
        description: error.data?.message || error.message,
        color: 'error',
      })
      return false
    } finally {
      creating.value = false
    }
  }

  const deletePasskey = async (id: string) => {
    try {
      deleting.value = id
      await $fetch('/api/auth/webauthn/delete-passkey', {
        method: 'DELETE',
        body: { id },
      })
      await refresh()
      toast.add({
        title: 'Passkey deleted successfully',
        color: 'success',
      })
      return true
    } catch (error: any) {
      toast.add({
        title: 'Failed to delete passkey',
        description: error.data?.statusMessage || 'Failed to delete passkey',
        color: 'error',
      })
      return false
    } finally {
      deleting.value = null
    }
  }

  const authenticateWithPasskey = async (email: string) => {
    try {
      await authenticate(email)
      return true
    } catch (error: any) {
      toast.add({
        title: 'Failed to authenticate with passkey',
        description: error.data?.message,
        color: 'error',
      })
      return false
    }
  }

  return {
    passkeys,
    status,
    creating,
    deleting,
    createPasskey,
    deletePasskey,
    authenticateWithPasskey,
  }
}

```
---
### filename: app/composables/usePosts.ts
```ts
import type { Post, InsertPost } from '@@/types/database'

export const usePosts = () => {
  const { currentTeam } = useTeam()
  const getAllPosts = async () => {
    return await useFetch<Post[]>(`/api/teams/${currentTeam.value?.id}/posts`)
  }

  const createPost = async (post: Partial<InsertPost>) => {
    const data = await $fetch<Post>(
      `/api/teams/${currentTeam.value?.id}/posts`,
      {
        method: 'POST',
        body: post,
      },
    )
    return data
  }

  const getPost = async (id: string) => {
    return await useFetch<Post>(`/api/teams/${currentTeam.value?.id}/posts/${id}`)
  }

  const updatePost = async (id: string, post: Partial<Post>) => {
    return await $fetch<Post>(`/api/teams/${currentTeam.value?.id}/posts/${id}`, {
      method: 'PATCH',
      body: post,
    })
  }

  const deletePost = async (id: string) => {
    return await $fetch<Post>(`/api/teams/${currentTeam.value?.id}/posts/${id}`, {
      method: 'DELETE',
    })
  }

  return {
    getAllPosts,
    createPost,
    getPost,
    updatePost,
    deletePost,
  }
}

```
---
### filename: app/composables/useTeam.ts
```ts
import { z } from 'zod'
import type { Team } from '@@/types/database'

export const useTeam = () => {
  const { user } = useUserSession()
  const toast = useToast()
  const teamSchema = z.object({
    name: z.string().min(1, 'Team name is required'),
    logo: z.string().optional(),
    slug: z
      .string()
      .min(1, 'Team slug is required')
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        'Only lowercase letters, numbers, and single hyphens between characters allowed',
      ),
  })
  const teamSlug = useRoute().params.team as string
  const loading = ref(false)
  const teams = useState<Team[]>('teams')

  const currentTeam = computed(() => {
    const team = teams.value.find((team) => team.slug === teamSlug)
    if (!team) {
      throw createError('Team not found')
    }
    return team
  })
  const isTeamOwner = computed(
    () => currentTeam.value?.ownerId === user.value?.id,
  )

  const createTeam = async (teamData: z.infer<typeof teamSchema>) => {
    loading.value = true
    try {
      const newTeam = await $fetch<Team>('/api/teams', {
        method: 'POST',
        body: teamData,
      })
      toast.add({
        title: 'Team created successfully',
        color: 'success',
      })
      return newTeam
    } catch (error) {
      toast.add({
        title: 'Failed to create team',
        description: (error as any).statusMessage,
        color: 'error',
      })
      throw error
    } finally {
      loading.value = false
    }
  }

  const updateTeam = async (
    teamId: string,
    teamData: Partial<z.infer<typeof teamSchema>>,
  ) => {
    loading.value = true
    try {
      const updatedTeam = await $fetch<Team>(`/api/teams/${teamId}`, {
        method: 'PATCH',
        body: teamData,
      })
      teams.value = teams.value.map((team) =>
        team.id === teamId ? updatedTeam : team,
      )
      toast.add({
        title: 'Team updated successfully',
        color: 'success',
      })
      return updatedTeam
    } catch (error) {
      toast.add({
        title: 'Failed to update team',
        description: (error as any).statusMessage,
        color: 'error',
      })
      throw error
    } finally {
      loading.value = false
    }
  }

  const deleteTeam = async (teamId: string) => {
    loading.value = true
    try {
      await $fetch(`/api/teams/${teamId}`, { method: 'DELETE' })
      teams.value = teams.value.filter((team) => team.id !== teamId)
      toast.add({
        title: 'Team deleted successfully',
        color: 'success',
      })
    } catch (error) {
      toast.add({
        title: 'Failed to delete team',
        description: (error as any).statusMessage,
        color: 'error',
      })
      throw error
    } finally {
      loading.value = false
    }
  }

  const inviteMember = async (email: string) => {
    loading.value = true
    try {
      await $fetch(`/api/teams/${currentTeam?.value?.id}/members`, {
        method: 'POST',
        body: { email },
      })
    } catch (error) {
      toast.add({
        title: 'Failed to invite member',
        description: (error as any).statusMessage,
        color: 'error',
      })
      throw error
    } finally {
      loading.value = false
    }
  }

  const cancelInvite = async (inviteId: string) => {
    loading.value = true
    try {
      await $fetch(`/api/teams/${currentTeam?.value?.id}/invites/${inviteId}`, {
        method: 'DELETE',
      })
      toast.add({
        title: 'Invite cancelled successfully',
        color: 'success',
      })
    } catch (error) {
      toast.add({
        title: 'Failed to cancel invite',
        description: (error as any).statusMessage,
        color: 'error',
      })
      throw error
    } finally {
      loading.value = false
    }
  }

  const resendInvite = async (inviteId: string) => {
    loading.value = true
    try {
      await $fetch(
        `/api/teams/${currentTeam?.value?.id}/invites/${inviteId}/resend`,
        {
          method: 'POST',
        },
      )
    } catch (error) {
      toast.add({
        title: 'Failed to resend invite',
        description: (error as any).statusMessage,
        color: 'error',
      })
    }
  }

  const removeTeamMember = async (memberId: string) => {
    loading.value = true
    try {
      if (!currentTeam.value?.id) return

      await $fetch(`/api/teams/${currentTeam.value.id}/members/${memberId}`, {
        method: 'DELETE',
      })
      toast.add({
        title: 'Team member removed successfully',
        color: 'success',
      })
    } catch (error) {
      toast.add({
        title: 'Failed to remove team member',
        description: (error as any).statusMessage,
        color: 'error',
      })
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    createTeam,
    updateTeam,
    deleteTeam,
    inviteMember,
    cancelInvite,
    resendInvite,
    isTeamOwner,
    teamSchema,
    currentTeam,
    teams,
    removeTeamMember,
  }
}

```
---
### filename: app/composables/useTeamPreferences.ts
```ts
export const useTeamPreferences = () => {
  const lastTeamSlug = useCookie('lastTeamSlug', {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/',
  })

  const setLastUsedTeam = (slug: string) => {
    lastTeamSlug.value = slug
  }

  const getLastUsedTeam = () => {
    return lastTeamSlug.value
  }

  return {
    setLastUsedTeam,
    getLastUsedTeam,
  }
}

```
---
### filename: app/composables/useTeamRedirect.ts
```ts
import type { Team } from '@@/types/database'

export function useTeamRedirect() {
  const teams = useState<Team[]>('teams')
  const { getLastUsedTeam, setLastUsedTeam } = useTeamPreferences()

  const handleTeamRedirect = async (checkInvite = true) => {
    // Check for invite token if requested
    if (checkInvite) {
      const inviteToken = useCookie('invite-token')
      if (inviteToken.value) {
        const url = `/api/teams/verify-invite?token=${inviteToken.value}`
        inviteToken.value = null
        return await navigateTo(url)
      }
    }

    // Redirect to onboarding if no teams
    if (!teams.value?.length) {
      return await navigateTo('/dashboard/onboard')
    }

    const lastTeamSlug = getLastUsedTeam()
    const targetTeam =
      teams.value.find((team) => team.slug === lastTeamSlug) ?? teams.value[0]

    if (!targetTeam) {
      throw createError('No team found despite having memberships')
    }

    // Update last used team and redirect
    setLastUsedTeam(targetTeam.slug)
    return await navigateTo(`/dashboard/${targetTeam.slug}`)
  }

  return {
    handleTeamRedirect,
  }
}

```
---
### filename: app/composables/useUserAccount.ts
```ts
import { z } from 'zod'
import type { User } from '@@/types/database'

export const useUserAccount = () => {
  const toast = useToast()
  const loading = ref(false)
  const schema = z.object({
    avatarUrl: z.string().optional(),
    name: z.string().min(1),
  })

  const passwordSchema = z.object({
    password: z.string().min(8),
  })

  const updateUser = async (userData: Partial<z.infer<typeof schema>>) => {
    loading.value = true
    try {
      await $fetch<User>('/api/me', {
        method: 'PATCH',
        body: userData,
      })
      toast.add({
        title: 'Your account has been updated successfully',
        color: 'success',
      })
    } catch (error) {
      console.error(error)
      toast.add({
        title: 'Failed to update your account',
        color: 'error',
      })
    } finally {
      loading.value = false
    }
  }

  const updatePassword = async (password: string) => {
    loading.value = true
    try {
      await $fetch('/api/me/update-password', {
        method: 'POST',
        body: { password },
      })
      toast.add({
        title: 'Your password has been updated successfully',
        color: 'success',
      })
    } catch (error) {
      console.error(error)
      toast.add({
        title: 'Failed to update your password',
        color: 'error',
      })
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    updateUser,
    updatePassword,
    schema,
    passwordSchema,
  }
}

```
---
### filename: app/middleware/auth.ts
```ts
export default defineNuxtRouteMiddleware((to, from) => {
  const toast = useToast()
  const { loggedIn } = useUserSession()
  if (!loggedIn.value) {
    toast.add({
      title: 'You must be logged in to access this page',
      color: 'error',
    })
    return navigateTo('/auth/login')
  }
})

```
---
### filename: app/middleware/team-owner.ts
```ts
import type { Team } from '@@/types/database'
export default defineNuxtRouteMiddleware(async (to, from) => {
  const toast = useToast()
  const { loggedIn } = useUserSession()
  const teams = useState<Team[]>('teams')

  // Is user logged in?
  if (!loggedIn.value) {
    return navigateTo('/auth/login')
  }

  // If teams aren't loaded yet, fetch them
  if (!teams.value) {
    const { data: memberships } = await useFetch<Team[]>('/api/me/memberships')
    teams.value = memberships.value || []
  }

  // Get team slug from route parameter
  const teamSlug = to.params.team as string
  const currentTeam = teams.value?.find((team) => team.slug === teamSlug)

  if (!currentTeam) {
    toast.add({
      title: 'Team not found',
      color: 'error',
    })
    return navigateTo('/dashboard')
  }

  const { isTeamOwner } = useTeam()
  if (!isTeamOwner.value) {
    toast.add({
      title: 'Unauthorized Access',
      color: 'error',
    })
    return navigateTo('/dashboard')
  }
})

```
---
### filename: app/pages/auth/all-auth-options.vue
```vue
<template>
  <main class="flex min-h-screen items-center justify-center">
    <div class="mx-auto w-full max-w-sm space-y-2">
      <UButton
        to="/auth/login"
        block
        color="neutral"
        size="lg"
        icon="i-lucide-lock"
        variant="subtle"
      >
        Email Password
      </UButton>
      <UButton
        to="/auth/magic-link"
        block
        color="neutral"
        size="lg"
        icon="i-lucide-link"
        variant="subtle"
      >
        Magic Link
      </UButton>
      <UButton
        to="/auth/login-passkey"
        block
        color="neutral"
        size="lg"
        icon="i-lucide-fingerprint"
        variant="subtle"
      >
        Passkey
      </UButton>
      <UButton
        to="/auth/login-phone"
        block
        color="neutral"
        size="lg"
        icon="i-lucide-phone"
        variant="subtle"
      >
        Phone
      </UButton>
      <AuthSocialLoginButton
        label="Google"
        icon="i-logos-google-icon"
        provider="google"
      />
      <AuthSocialLoginButton
        label="Github"
        icon="i-mdi-github"
        provider="github"
      />
      <AuthSocialLoginButton
        label="Discord"
        icon="i-logos-discord-icon"
        provider="discord"
      />
    </div>
  </main>
</template>

```
---
### filename: app/pages/auth/forgot-password.vue
```vue
<template>
  <main class="flex min-h-screen items-center justify-center">
    <div class="mx-auto w-full max-w-sm space-y-4">
      <img src="/logo.png" alt="logo" class="mx-auto h-10 w-10" />
      <div class="text-center">
        <p class="text-lg font-bold">Reset your password</p>
        <p class="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Enter your email below to reset your password.
        </p>
      </div>
      <UForm
        :schema="emailSchema"
        :state="state"
        class="mt-8 space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" class="w-full" size="lg" />
        </UFormField>

        <UButton
          type="submit"
          :loading="loading"
          block
          color="neutral"
          class="cursor-pointer"
          size="lg"
        >
          Send reset instructions
        </UButton>
      </UForm>
    </div>
  </main>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { emailSchema } from '@@/shared/validations/auth'

type PasswordResetSchema = z.output<typeof emailSchema>
const loading = ref(false)
const { forgotPassword } = useAuth()

const state = reactive<Partial<PasswordResetSchema>>({
  email: undefined,
})

const onSubmit = async (event: FormSubmitEvent<PasswordResetSchema>) => {
  loading.value = true
  await forgotPassword(event.data.email)
  loading.value = false
}
</script>

```
---
### filename: app/pages/auth/login-passkey.vue
```vue
<template>
  <main class="flex min-h-screen items-center justify-center">
    <div class="mx-auto w-full max-w-sm space-y-4">
      <img src="/logo.png" alt="logo" class="mx-auto h-10 w-10" />
      <div class="text-center">
        <p class="text-lg font-bold">Sign in to your account</p>
        <p class="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Welcome back! Please sign in to continue.
        </p>
      </div>
      <UForm
        :schema="emailSchema"
        :state="state"
        class="mt-8 space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" class="w-full" size="lg" />
        </UFormField>

        <UButton
          type="submit"
          :loading="loading"
          block
          color="neutral"
          class="cursor-pointer"
          size="lg"
          icon="i-lucide-fingerprint"
        >
          Sign in with Passkey
        </UButton>
      </UForm>
    </div>
  </main>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { emailSchema } from '@@/shared/validations/auth'

const toast = useToast()
const { fetch: refreshSession } = useUserSession()
const { authenticateWithPasskey } = usePasskeys()
const loading = ref(false)

type LoginSchema = z.output<typeof emailSchema>
const state = reactive<Partial<LoginSchema>>({
  email: undefined,
})

const onSubmit = async (event: FormSubmitEvent<LoginSchema>): Promise<void> => {
  loading.value = true
  const success = await authenticateWithPasskey(event.data.email)
  if (success) {
    await refreshSession()
    toast.add({
      title: 'Logged in successfully',
      color: 'success',
    })
    await navigateTo(`/dashboard`)
  }
  loading.value = false
}
</script>

```
---
### filename: app/pages/auth/login-phone.vue
```vue
<template>
  <main class="flex min-h-screen items-center justify-center">
    <div class="mx-auto w-full max-w-sm space-y-4">
      <img src="/logo.png" alt="logo" class="mx-auto h-10 w-10" />
      <template v-if="mode === 'phone'">
        <div class="text-center">
          <p class="text-lg font-bold">Sign in with phone number</p>
          <p class="text-sm text-neutral-500">
            Enter your phone number to receive a verification code
          </p>
        </div>
        <UForm
          :schema="phoneSchema"
          :state="phoneState"
          class="mt-8 space-y-4"
          @submit="onPhoneSubmit"
        >
          <UFormField label="Phone Number" name="phoneNumber">
            <UInput
              v-model="phoneState.phoneNumber"
              class="w-full"
              size="lg"
              type="tel"
              placeholder="+1234567890"
            />
          </UFormField>

          <UButton
            type="submit"
            :loading="loading"
            block
            color="neutral"
            class="cursor-pointer"
            size="lg"
          >
            Send Code
          </UButton>
        </UForm>
      </template>
      <div v-else>
        <div class="text-center">
          <p class="text-lg font-bold">Enter verification code</p>
          <p class="text-sm text-neutral-500">
            We've sent a 6-digit code to your phone
          </p>
        </div>
        <UForm
          :schema="otpSchema"
          :state="otpState"
          class="mx-auto mt-8 max-w-max space-y-4"
          @submit="onOtpSubmit"
        >
          <UFormField name="code">
            <UPinInput
              v-model="otpCode"
              :length="6"
              size="lg"
              otp
              type="number"
              placeholder="○"
              class="justify-center"
            />
          </UFormField>
          <UButton
            type="submit"
            :loading="loading"
            color="neutral"
            class="cursor-pointer"
            size="lg"
            block
          >
            Verify Code
          </UButton>
        </UForm>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

import { phoneSchema } from '@@/shared/validations/auth'

const toast = useToast()
const { fetch: refreshSession } = useUserSession()

const otpSchema = z.object({
  phoneNumber: z.string(),
  code: z.string().length(6),
})

type PhoneSchema = z.output<typeof phoneSchema>
type OtpSchema = z.output<typeof otpSchema>

const mode = ref<'phone' | 'otp'>('phone')
const loading = ref(false)

const phoneState = reactive<Partial<PhoneSchema>>({
  phoneNumber: undefined,
})

const otpState = reactive<Partial<OtpSchema>>({
  phoneNumber: undefined,
  code: undefined,
})

const otpCode = computed({
  get: () => otpState.code?.split('') || [],
  set: (value: string[]) => {
    otpState.code = value.join('')
  },
})

async function onPhoneSubmit(event: FormSubmitEvent<PhoneSchema>) {
  try {
    loading.value = true
    await $fetch('/api/auth/phone/login', {
      method: 'POST',
      body: event.data,
    })
    mode.value = 'otp'
    otpState.phoneNumber = event.data.phoneNumber
  } catch (error) {
    toast.add({
      title: 'Failed to send verification code',
      description: (error as any).data.message,
      color: 'error',
    })
  } finally {
    loading.value = false
  }
}

async function onOtpSubmit(event: FormSubmitEvent<OtpSchema>) {
  try {
    loading.value = true
    await $fetch('/api/auth/phone/verify', {
      method: 'POST',
      body: event.data,
    })
    await refreshSession()
    navigateTo('/dashboard')
  } catch (error) {
    toast.add({
      title: 'Failed to verify code',
      description: (error as any).data.message,
      color: 'error',
    })
  } finally {
    loading.value = false
  }
}
</script>

```
---
### filename: app/pages/auth/login.vue
```vue
<template>
  <main class="flex min-h-screen items-center justify-center">
    <div class="mx-auto w-full max-w-sm space-y-4">
      <img src="/logo.png" alt="logo" class="mx-auto h-10 w-auto" />
      <div class="text-center">
        <p class="text-lg font-bold">Sign in to Supersaas</p>
        <p class="text-sm text-neutral-500">
          Dont have an account?
          <UButton
            padding="none"
            trailing-icon="i-lucide-arrow-right"
            color="neutral"
            to="/auth/register"
            variant="link"
            label="Get Started"
            class="font-normal"
            :ui="{
              trailingIcon: 'size-4',
            }"
            square
          />
        </p>
      </div>
      <UForm
        :schema="loginUserSchema"
        :state="state"
        class="mt-8 space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" class="w-full" size="lg" />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput
            v-model="state.password"
            type="password"
            class="w-full"
            size="lg"
          />
          <template #hint>
            <UButton
              variant="link"
              to="/auth/forgot-password"
              label="Forgot password?"
              size="xs"
              color="neutral"
              class="text-neutral-500"
            />
          </template>
        </UFormField>

        <UButton
          type="submit"
          :loading="loading"
          block
          color="neutral"
          class="cursor-pointer"
          size="lg"
        >
          Submit
        </UButton>
      </UForm>
      <USeparator label="OR" />
      <div class="grid grid-cols-2 gap-2">
        <AuthSocialLoginButton
          label="Google"
          icon="i-logos-google-icon"
          provider="google"
        />
        <AuthSocialLoginButton
          label="Github"
          icon="i-mdi-github"
          provider="github"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { loginUserSchema } from '@@/shared/validations/auth'
type Schema = z.output<typeof loginUserSchema>

const loading = ref(false)
const { login } = useAuth()
const router = useRouter()

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  const { error } = await login(event.data)
  if (!error) {
    await router.push('/dashboard')
  }
  loading.value = false
}
</script>

```
---
### filename: app/pages/auth/magic-link.vue
```vue
<template>
  <main class="flex min-h-screen items-center justify-center">
    <div class="mx-auto w-full max-w-sm space-y-4">
      <img src="/logo.png" alt="logo" class="mx-auto h-10 w-10" />
      <template v-if="mode === 'login'">
        <div class="text-center">
          <p class="text-lg font-bold">Sign in to your account</p>
          <p class="text-sm text-neutral-500">
            Welcome back! Please sign in to continue.
          </p>
        </div>
        <UForm
          :schema="emailSchema"
          :state="loginState"
          class="mt-8 space-y-4"
          @submit="onLoginSubmit"
        >
          <UFormField label="Email" name="email">
            <UInput v-model="loginState.email" class="w-full" size="lg" />
          </UFormField>

          <UButton
            type="submit"
            :loading="loading"
            block
            color="neutral"
            class="cursor-pointer"
            size="lg"
          >
            Submit
          </UButton>
        </UForm>
      </template>
      <div v-else>
        <div class="text-center">
          <p class="text-lg font-bold">We've sent you a 6-digit code</p>
          <p class="text-sm text-neutral-500">
            Please check your email for the code and enter it below.
          </p>
        </div>
        <UForm
          :schema="otpLoginSchema"
          :state="otpState"
          class="mx-auto mt-8 max-w-max space-y-4"
          @submit="onOtpSubmit"
        >
          <UFormField name="code">
            <UPinInput
              v-model="otpCode"
              :length="6"
              size="lg"
              otp
              type="number"
              placeholder="○"
              class="justify-center"
            />
          </UFormField>
          <UButton
            type="submit"
            :loading="loading"
            color="neutral"
            class="cursor-pointer"
            size="lg"
            block
          >
            Verify Code
          </UButton>
        </UForm>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { emailSchema, otpLoginSchema } from '@@/shared/validations/auth'

type LoginSchema = z.output<typeof emailSchema>
type OtpSchema = z.output<typeof otpLoginSchema>

const toast = useToast()
const { fetch: refreshSession } = useUserSession()

const mode = ref<'login' | 'otp'>('login')
const loading = ref(false)

const loginState = reactive<Partial<LoginSchema>>({
  email: undefined,
})

const otpState = reactive<Partial<OtpSchema>>({
  email: undefined,
  code: undefined,
})

const otpCode = computed({
  get: () => otpState.code?.split('') || [],
  set: (value: string[]) => {
    otpState.code = value.join('')
  },
})

async function onLoginSubmit(event: FormSubmitEvent<LoginSchema>) {
  try {
    loading.value = true
    await $fetch('/api/auth/magic-link/login', {
      method: 'POST',
      body: event.data,
    })
    mode.value = 'otp'
    otpState.email = event.data.email
  } catch (error) {
    toast.add({
      title: 'Failed to send verification code',
      description: (error as any).data.message,
      color: 'error',
    })
  } finally {
    loading.value = false
  }
}

async function onOtpSubmit(event: FormSubmitEvent<OtpSchema>) {
  try {
    loading.value = true
    await $fetch('/api/auth/magic-link/verify-otp', {
      method: 'POST',
      body: event.data,
    })
    await refreshSession()
    navigateTo('/dashboard')
  } catch (error) {
    toast.add({
      title: 'Failed to verify code',
      description: (error as any).data.message,
      color: 'error',
    })
  } finally {
    loading.value = false
  }
}
</script>

```
---
### filename: app/pages/auth/register.vue
```vue
<template>
  <main class="relative flex min-h-screen items-center justify-center">
    <div class="mx-auto w-full max-w-sm space-y-4">
      <template v-if="!registered">
        <img src="/logo.png" alt="logo" class="mx-auto h-10 w-auto" />
        <div class="text-center">
          <p class="text-lg font-bold">Get Started with Supersaas</p>
          <p class="text-sm text-neutral-500">
            Already have an account?
            <UButton
              padding="none"
              trailing-icon="i-lucide-arrow-right"
              color="neutral"
              to="/auth/login"
              variant="link"
              label="Login"
              class="font-normal"
              :ui="{
                trailingIcon: 'size-4',
              }"
              square
            />
          </p>
        </div>
        <UForm
          :schema="registerUserSchema"
          :state="state"
          class="mt-8 space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="Name" name="name">
            <UInput
              v-model="state.name"
              class="w-full"
              size="lg"
              autocomplete="given-name"
            />
          </UFormField>
          <UFormField label="Email" name="email">
            <UInput
              v-model="state.email"
              class="w-full"
              size="lg"
              autocomplete="email"
            />
          </UFormField>

          <UFormField label="Password" name="password">
            <UInput
              v-model="state.password"
              type="password"
              class="w-full"
              size="lg"
              autocomplete="new-password"
            />
          </UFormField>

          <UButton
            type="submit"
            :loading="loading"
            block
            color="neutral"
            class="cursor-pointer"
            size="lg"
          >
            Submit
          </UButton>
        </UForm>
        <USeparator label="OR" />
        <div class="grid grid-cols-2 gap-2">
          <AuthSocialLoginButton
            label="Google"
            icon="i-logos-google-icon"
            provider="google"
          />
          <AuthSocialLoginButton
            label="Github"
            icon="i-mdi-github"
            provider="github"
          />
        </div>
      </template>
      <UCard v-else>
        <UIcon name="i-lucide-mail-check" class="h-5 w-5" />
        <p class="mt-4 text-lg font-bold">Check your email</p>
        <p class="mt-1 text-sm text-neutral-500">
          We've sent you an email to verify your account.
        </p>
      </UCard>
    </div>
    <div class="absolute bottom-2 left-1/2 -translate-x-1/2">
      <NuxtLink to="/auth/all-auth-options" class="text-sm text-neutral-500"
        >All auth options</NuxtLink
      >
    </div>
  </main>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { registerUserSchema } from '@@/shared/validations/auth'
type Schema = z.output<typeof registerUserSchema>

const registered = ref(false)
const loading = ref(false)
const { register } = useAuth()

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
  name: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  const { error } = await register(event.data)
  if (!error) {
    registered.value = true
  }
  loading.value = false
}
</script>

```
---
### filename: app/pages/auth/reset-password.vue
```vue
<template>
  <main class="flex min-h-screen items-center justify-center">
    <div class="mx-auto w-full max-w-sm space-y-4">
      <img src="/logo.png" alt="logo" class="mx-auto h-10 w-10" />
      <div class="text-center">
        <p class="text-lg font-bold">Reset your password</p>
        <p class="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Enter your new password below.
        </p>
      </div>
      <UForm
        :schema="resetPasswordSchema"
        :state="state"
        class="mt-8 space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="New Password" name="password">
          <UInput
            v-model="state.password"
            type="password"
            class="w-full"
            size="lg"
          />
        </UFormField>

        <UButton
          type="submit"
          :loading="loading"
          block
          color="neutral"
          class="cursor-pointer"
          size="lg"
        >
          Reset Password
        </UButton>
      </UForm>
    </div>
  </main>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const { resetPassword } = useAuth()

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type Schema = z.output<typeof resetPasswordSchema>

const state = reactive<Partial<Schema>>({
  password: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  const token = route.query.token as string
  const { error } = await resetPassword(event.data.password, token)
  if (!error) {
    await router.push('/auth/login')
  }
  loading.value = false
}
</script>

```
---
### filename: app/pages/auth/social-login.vue
```vue
<template>
  <main class="flex min-h-screen items-center justify-center">
    <div class="mx-auto w-full max-w-sm space-y-4">
      <img src="/logo.png" alt="logo" class="mx-auto h-10 w-10" />
      <div class="text-center">
        <p class="text-lg font-bold">Sign in to your account</p>
        <p class="text-sm text-neutral-500">
          Welcome back! Please sign in to continue.
        </p>
      </div>
      <div class="space-y-2">
        <AuthSocialLoginButton
          label="Google"
          icon="i-logos-google-icon"
          provider="google"
        />
        <AuthSocialLoginButton
          label="Github"
          icon="i-mdi-github"
          provider="github"
        />
        <AuthSocialLoginButton
          label="Discord"
          icon="i-logos-discord-icon"
          provider="discord"
        />
      </div>
    </div>
  </main>
</template>

```
---
### filename: app/pages/dashboard/[team]/ai-image-gen.vue
```vue
<template>
  <AppContainer title="AI Image Generation">
    <p>AI Image Generation</p>
  </AppContainer>
</template>

<script lang="ts" setup>

</script>
```
---
### filename: app/pages/dashboard/[team]/image-gallery.vue
```vue
<template>
  <AppContainer title="Image Gallery">
    <p>image gallery here</p>
  </AppContainer>
</template>

<script lang="ts" setup>

</script>
```
---
### filename: app/pages/dashboard/[team]/index.vue
```vue
<template>
  <AppContainer title="Home (Demo Page)">
    <div class="space-y-6">
      <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <AppDemoKpi title="Followers" value="8551" up="19%" />
        <AppDemoKpi title="Impressions" value="80.5k" up="16%" />
        <AppDemoKpi title="Profile Visits" value="930" down="8%" />
        <AppDemoKpi title="Likes" value="12.5k" up="32%" />
      </div>
      <AppDemoChart title="Impressions Overview" />
      <AppDemoTable />
    </div>
  </AppContainer>
</template>

```
---
### filename: app/pages/dashboard/[team]/link-shortner.vue
```vue
<template>
  <AppContainer title="Link Shortner">
    <p>link shortner here</p>
  </AppContainer>
</template>

<script lang="ts" setup>

</script>
```
---
### filename: app/pages/dashboard/[team]/notes.vue
```vue
<template>
  <AppContainer title="Notes">
    <template #actions>
      <UButton label="New Note" @click="postModal.show = true" />
    </template>
    <div v-if="!posts?.length">
      <p>No posts found</p>
    </div>
    <div v-else class="space-y-4">
      <div
        v-for="post in posts"
        :key="post.id"
        class="rounded-lg bg-gray-100 p-4 dark:bg-gray-800"
      >
        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-lg font-semibold">{{ post.title }}</h3>
            <p class="mt-2">{{ post.content }}</p>
          </div>
          <div class="flex space-x-2">
            <UButton
              icon="i-lucide-pencil"
              color="neutral"
              variant="ghost"
              @click="editPost(post)"
            />
            <UButton
              icon="i-lucide-trash"
              color="error"
              variant="ghost"
              @click="confirmDelete(post)"
            />
          </div>
        </div>
      </div>
    </div>

    <UModal
      v-model:open="postModal.show"
      :title="postModal.isEdit ? 'Edit Note' : 'New Note'"
    >
      <template #body>
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="Title" name="title">
            <UInput v-model="state.title" class="w-full" size="xl" />
          </UFormField>

          <UFormField label="Content" name="content">
            <UTextarea v-model="state.content" class="w-full" size="xl" />
          </UFormField>

          <UButton label="Submit" type="submit" :loading="loading" />
        </UForm>
      </template>
    </UModal>

    <UModal v-model:open="confirmModal.show" size="xs" title="Delete Note">
      <template #body>
        <p>
          Are you sure you want to delete this note? This action cannot be
          undone.
        </p>
      </template>
      <template #footer>
        <div class="flex justify-end space-x-2">
          <UButton
            color="neutral"
            variant="ghost"
            label="Cancel"
            @click="confirmModal.show = false"
          />
          <UButton
            color="error"
            label="Delete"
            :loading="loading"
            @click="handleDelete"
          />
        </div>
      </template>
    </UModal>
  </AppContainer>
</template>

<script lang="ts" setup>
import type { Post } from '@@/types/database'
const postModal = reactive({
  show: false,
  isEdit: false,
  currentPost: null as Post | null,
})

const confirmModal = reactive({
  show: false,
  post: null as Post | null,
})

const { getAllPosts, createPost, updatePost, deletePost } = usePosts()
const { data: posts } = await getAllPosts()

import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  content: z
    .string()
    .min(1, 'Content is required')
    .max(1000, 'Content must be less than 1000 characters'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  title: undefined,
  content: undefined,
})

const toast = useToast()
const loading = ref(false)

function editPost(post: Post) {
  postModal.isEdit = true
  postModal.currentPost = post
  state.title = post.title
  state.content = post.content
  postModal.show = true
}

function confirmDelete(post: Post) {
  confirmModal.post = post
  confirmModal.show = true
}

async function handleDelete() {
  if (!confirmModal.post) return

  loading.value = true
  try {
    await deletePost(confirmModal.post.id)
    posts.value = posts.value?.filter((p) => p.id !== confirmModal.post?.id)
    toast.add({
      title: 'Success',
      description: 'Note deleted',
      color: 'success',
    })
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to delete note',
      color: 'error',
    })
  } finally {
    loading.value = false
    confirmModal.show = false
    confirmModal.post = null
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    if (postModal.isEdit && postModal.currentPost) {
      const updatedPost = await updatePost(postModal.currentPost.id, event.data)
      const index =
        posts.value?.findIndex((p) => p.id === postModal.currentPost?.id) ?? -1
      if (index !== -1 && posts.value) {
        posts.value[index] = updatedPost
      }
      toast.add({
        title: 'Success',
        description: 'Note updated',
        color: 'success',
      })
    } else {
      const newPost = await createPost(event.data)
      if (posts.value) {
        posts.value.unshift(newPost)
      }
      toast.add({
        title: 'Success',
        description: 'Note created',
        color: 'success',
      })
    }
    postModal.show = false
    postModal.isEdit = false
    postModal.currentPost = null
    state.title = undefined
    state.content = undefined
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to save note',
      color: 'error',
    })
  } finally {
    loading.value = false
  }
}
</script>

```
---
### filename: app/pages/dashboard/[team]/settings/billing.vue
```vue
<template>
  <AppContainer
    title="Billing"
    description="Manage your billing information and subscription plans."
  >
    <div
      v-if="activeSubscription"
      class="flex h-full flex-col rounded-xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div class="flex flex-col space-y-4">
        <div
          class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="space-y-2">
            <h3 class="text-lg font-medium">
              You are on
              <span class="font-bold">{{ currentPlan.name }}</span> plan
            </h3>
            <div class="flex flex-wrap items-center gap-3">
              <div class="flex items-center gap-2">
                <span class="text-xl font-semibold">{{
                  formatPrice(currentPlan.amount)
                }}</span>
                <span class="text-neutral-500"
                  >every {{ currentPlan.interval }}</span
                >
              </div>
              <UBadge
                :label="currentPlan.status"
                color="success"
                variant="subtle"
                class="capitalize"
              />
              <span class="text-sm text-neutral-500">
                Renews on
                {{
                  useDateFormat(currentPlan.currentPeriodEnd, 'MMM DD, YYYY')
                }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
      <AppPricingCard
        v-for="plan in plans"
        :key="plan.id"
        :title="plan.product.name"
        :description="plan.product.description || ''"
        :unit-amount="plan.unitAmount"
        :interval="plan.interval"
        :price-id="plan.id"
        :features="plan.product.features"
        :active="currentPlan.id === plan.id"
        :loading="loadingPriceId === plan.id"
        :disabled="disabled"
        @subscribe="handleSubscribe"
      />
    </div>
  </AppContainer>
</template>

<script lang="ts" setup>
import type { Subscription, Price } from '@@/types/database'
const { data: plans } = await useFetch('/api/stripe/plans')
interface ExpandedSubscription extends Subscription {
  expand: {
    price_id: Price
  }
}
const { currentTeam } = useTeam()
const { data: activeSubscription } = await useFetch<ExpandedSubscription>(
  '/api/stripe/subscription',
  {
    query: {
      teamId: currentTeam.value?.id,
    },
  },
)

const toast = useToast()
const loadingPriceId = ref<string | null>(null)
const disabled = ref(false)
const route = useRoute()
const { fetch: refreshSession } = useUserSession()

interface BillingPlan {
  id: string
  name: string
  description: string
  status?: string
  currentPeriodEnd?: string
  currentPeriodStart?: string
  amount: number
  interval: string
  priceId: string
}

const currentPlan = computed<BillingPlan>(() => {
  if (!activeSubscription.value?.priceId || !plans.value) {
    return {
      id: '',
      name: 'No active plan',
      description: '',
      amount: 0,
      interval: '',
      priceId: '',
    }
  }

  const plan = plans.value.find(
    (p) => p.id === activeSubscription.value?.priceId,
  )

  if (!plan) {
    throw createError('Invalid plan configuration')
  }

  return {
    id: plan.id,
    name: plan.product.name || 'Unknown plan',
    description: plan.product.description || 'No description',
    status: activeSubscription.value.status,
    currentPeriodEnd: activeSubscription.value.currentPeriodEnd,
    currentPeriodStart: activeSubscription.value.currentPeriodStart,
    amount: plan.unitAmount,
    interval: plan.interval,
    priceId: plan.id,
  }
})

const handleSubscribe = async (priceId: string) => {
  try {
    loadingPriceId.value = priceId
    disabled.value = true

    if (!currentTeam.value?.id || !currentTeam.value?.slug) {
      throw new Error('Team information is missing')
    }

    const checkoutUrl = await $fetch('/api/stripe/checkout', {
      method: 'POST',
      body: {
        priceId,
        teamId: currentTeam.value.id,
        teamSlug: currentTeam.value.slug,
      },
    })

    if (!checkoutUrl) {
      throw new Error('No checkout URL returned from the server')
    }

    window.location.href = checkoutUrl
  } catch (error) {
    toast.add({
      title: 'Failed to create checkout session',
      description:
        error instanceof Error ? error.message : 'An unexpected error occurred',
      color: 'error',
    })
    console.error('Stripe checkout error:', error)
  } finally {
    loadingPriceId.value = null
    disabled.value = false
  }
}

const formatPrice = (price?: number): string => {
  if (!price) return '$0'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price / 100)
}

onMounted(async () => {
  if (route.query.success === 'true') {
    await refreshSession()
  }
})
</script>

```
---
### filename: app/pages/dashboard/[team]/settings/index.vue
```vue
<template>
  <AppContainer title="Team Settings">
    <div class="space-y-8">
      <AppTeamSettings />
      <AppTeamDelete />
    </div>
  </AppContainer>
</template>

<script lang="ts" setup></script>
```
---
### filename: app/pages/dashboard/[team]/settings/members.vue
```vue
<template>
  <AppContainer title="Workspace Members">
    <template #actions>
      <UButton
        color="neutral"
        label="Invite Member"
        @click="newMemberModal = true"
      />
    </template>
    <UModal
      size="xl"
      v-model:open="newMemberModal"
      :title="`Invite a new member to ${currentTeam?.name}`"
      description="We will email them a link to join your team. Invitations are valid for 7 days."
    >
      <template #body>
        <UForm
          class="space-y-4"
          :state="state"
          :schema="schema"
          @submit="onSubmit as any"
        >
          <UFormField required label="Member email" name="email">
            <UInput
              v-model="state.email"
              placeholder="john@doe.com"
              class="w-full"
              size="lg"
            />
          </UFormField>
          <UButton
            :loading="loading"
            color="neutral"
            type="submit"
            block
            size="lg"
            label="Send invitation"
          />
        </UForm>
      </template>
    </UModal>
    <div class="mx-auto max-w-5xl space-y-12">
      <AppTeamMembers />
      <AppTeamInvites />
    </div>
  </AppContainer>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'
const { currentTeam, inviteMember, loading } = useTeam()
const toast = useToast()

const { user } = useUserSession()
const newMemberModal = ref(false)
const state = reactive({
  email: '',
})
const schema = z.object({
  email: z
    .string()
    .email()
    .refine((email) => email !== user.value?.email, {
      message: 'You cannot invite yourself',
    }),
})

const onSubmit = async (event: FormSubmitEvent<typeof schema>) => {
  loading.value = true
  try {
    await inviteMember(event.data.email)
    toast.add({
      title: 'Member invited successfully',
      description: `We have sent an invitation to ${event.data.email}`,
      color: 'success',
    })
    newMemberModal.value = false
    await refreshNuxtData('team-invites')
  } catch (error) {
    console.error(error)
    toast.add({
      title: 'Error inviting member',
      description: (error as any).data.message,
      color: 'error',
    })
  } finally {
    loading.value = false
  }
}
</script>

```
---
### filename: app/pages/dashboard/[team]/settings.vue
```vue
<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['team-owner'],
})
</script>

```
---
### filename: app/pages/dashboard/[team]/tasks.vue
```vue
<template>
  <AppContainer title="Tasks Demo">
    <p>Demo Tasks App</p>
  </AppContainer>
</template>

<script lang="ts" setup>

</script>
```
---
### filename: app/pages/dashboard/[team].vue
```vue
<template>
  <div>
    <NuxtPage />
  </div>
</template>

```
---
### filename: app/pages/dashboard/account-security.vue
```vue
<template>
  <AppContainer title="Account Security">
    <div class="space-y-8">
      <AppAccountSettingsPassword />
      <AppAccountSettingsPasskey />
    </div>
  </AppContainer>
</template>

```
---
### filename: app/pages/dashboard/account-settings.vue
```vue
<template>
  <AppContainer title="Account Settings">
    <div class="space-y-8">
      <AppAccountSettingsGeneral />
    </div>
  </AppContainer>
</template>

```
---
### filename: app/pages/dashboard/index.vue
```vue
<template>
  <main class="flex h-screen items-center justify-center">
    <UIcon name="i-lucide-loader-circle" class="animate-spin text-3xl" />
  </main>
</template>


<script setup lang="ts">
import type { Team } from '@@/types/database'

// Ensure we have teams data available
const teams = useState<Team[]>('teams')
if (!teams.value) {
  const { data: memberships } = await useFetch<Team[]>('/api/me/memberships')
  teams.value = memberships.value || []
}

// Handle redirect
const { handleTeamRedirect } = useTeamRedirect()
await handleTeamRedirect()
</script>

```
---
### filename: app/pages/dashboard/onboard.vue
```vue
<template>
  <main class="flex min-h-screen items-center justify-center">
    <UContainer class="w-full py-20">
      <div class="text-center">
        <h1 class="text-2xl font-bold">Welcome {{ user?.name }}</h1>
        <p class="mt-2 text-neutral-500">
          Let's get you started by creating your first team.
        </p>
      </div>
      <div class="mx-auto mt-12 max-w-md">
        <AppNewTeamForm @success="onTeamCreated" />
      </div>
      <div class="mt-4 flex justify-center">
        <UButton
          variant="ghost"
          @click="signOut"
          color="neutral"
          size="lg"
          icon="i-lucide-arrow-left"
          label="Sign out"
        />
      </div>
    </UContainer>
  </main>
</template>

<script setup lang="ts">
const { user, clear } = useUserSession()
import type { Team } from '@@/types/database'

const onTeamCreated = (team: Team) => {
  navigateTo(`/dashboard/${team.slug}`)
}

async function signOut() {
  await clear()
  await navigateTo('/')
}
</script>

```
---
### filename: app/pages/dashboard.vue
```vue
<template>
  <main class="fixed inset-0 flex overflow-hidden">
    <AppSidebar v-if="!isOnboardRoute" />
    <div class="w-full min-w-0 flex-1 overflow-y-auto">
      <NuxtPage />
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
import type { Team } from '@@/types/database'
const { data: memberships } = await useFetch<Team[]>('/api/me/memberships')
useState('teams', () => memberships.value)

// Only run redirect logic for the dashboard root path
if (useRoute().path === '/dashboard' || useRoute().path === '/dashboard/') {
  const { handleTeamRedirect } = useTeamRedirect()
  await handleTeamRedirect()
}
const route = useRoute()

const isOnboardRoute = computed(() =>
  route.path.startsWith('/dashboard/onboard'),
)
</script>

```
---
### filename: app/pages/index.vue
```vue
<template>
  <UContainer class="space-y-4 py-12">
    <p class="text-7xl font-bold">Supersaas V3</p>
    <NuxtLink class="block hover:underline" to="/auth/login">
      Login (Email/Password)
    </NuxtLink>
    <NuxtLink class="block hover:underline" to="/auth/magic-link">
      Login (Magic Link)
    </NuxtLink>
    <NuxtLink class="block hover:underline" to="/auth/login-passkey">
      Login (Passkey)
    </NuxtLink>
    <NuxtLink class="block hover:underline" to="/auth/social-login">
      Social Login
    </NuxtLink>
    <NuxtLink class="block hover:underline" to="/auth/login-phone">
      Phone Number Login
    </NuxtLink>
    <NuxtLink class="block hover:underline" to="/auth/social-login">
      Social Login
    </NuxtLink>
    <NuxtLink class="block hover:underline" to="/auth/register">
      Register
    </NuxtLink>
    <NuxtLink class="block hover:underline" to="/dashboard">
      Dashboard
    </NuxtLink>
  </UContainer>
</template>

```
---
### filename: app/utils/avatar.ts
```ts
interface AvatarOptions {
  identifier?: string
  path?: string
  type?: AvatarType
}

type AvatarType = 'user' | 'team'

export function getAvatarUrl(options: AvatarOptions & { type: AvatarType }) {
  const { identifier, path, type } = options
  if (path) return path
  return `https://api.dicebear.com/9.x/${type === 'user' ? 'thumbs' : 'glass'}/svg${identifier ? `?seed=${encodeURIComponent(identifier)}` : ''}`
}

```
---
### filename: constants/index.ts
```ts
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum OneTimePasswordTypes {
  signup = 'SIGNUP',
  login = 'LOGIN',
  forgotPassword = 'FORGOT_PASSWORD',
}

```
---
### filename: drizzle.config.ts
```ts
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  schema: './server/database/schema',
  out: './server/database/migrations',
})

```
---
### filename: emails/email-verification.vue
```vue
<script setup lang="ts">
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from '@vue-email/components'
import { env } from '@@/env'

interface EmailVerificationProps {
  verificationCode?: string
}

withDefaults(defineProps<EmailVerificationProps>(), {
  verificationCode: '',
})

const main = {
  backgroundColor: '#ffffff',
}

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
}

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
}

const link = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline',
}

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
}

const footer = {
  color: '#898989',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '12px',
  marginBottom: '24px',
}

const code = {
  display: 'inline-block',
  padding: '16px 4.5%',
  width: '90.5%',
  backgroundColor: '#f4f4f4',
  borderRadius: '5px',
  border: '1px solid #eee',
  color: '#333',
}
</script>

<template>
  <Html>
    <Head />
    <Preview>Verify your email</Preview>
    <Body :style="main">
      <Container :style="container">
        <Heading :style="h1"> Verify your email </Heading>
        <Link
          :href="`${env.BASE_URL}/api/auth/verify-account?token=${verificationCode}`"
          target="_blank"
          :style="{ ...link, display: 'block', marginBottom: '16px' }"
        >
          Click here to verify your email
        </Link>
        <Text :style="{ ...text, marginBottom: '14px' }">
          Or, copy and paste this link into your browser:
        </Text>
        <code :style="code">{{
          `${env.BASE_URL}/api/auth/verify-account?token=${verificationCode}`
        }}</code>
        <Text
          :style="{
            ...text,
            color: '#ababab',
            marginTop: '14px',
            marginBottom: '16px',
          }"
        >
          If you didn't try to verify your email, you can safely ignore this
          email.
        </Text>
        <Text
          :style="{
            ...text,
            color: '#ababab',
            marginTop: '12px',
            marginBottom: '38px',
          }"
        />
        <Img :src="env.LOGO_URL" width="32" alt="Logo" />
        <Text :style="footer">
          <Link
            :href="env.BASE_URL"
            target="_blank"
            :style="{ ...link, color: '#898989' }"
          >
            {{ env.APP_NAME }} </Link
          >, {{ env.APP_DESCRIPTION }}
        </Text>
      </Container>
    </Body>
  </Html>
</template>

```
---
### filename: emails/magic-link.vue
```vue
<script setup lang="ts">
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from '@vue-email/components'
import { env } from '@@/env'

interface EmailVerificationProps {
  otp?: string
  verificationCode?: string
}

withDefaults(defineProps<EmailVerificationProps>(), {
  otp: '',
  verificationCode: '',
})

const main = {
  backgroundColor: '#ffffff',
}

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
}

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
}

const link = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline',
}

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
}

const footer = {
  color: '#898989',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '12px',
  marginBottom: '24px',
}

const code = {
  display: 'inline-block',
  padding: '16px 4.5%',
  width: '90.5%',
  backgroundColor: '#f4f4f4',
  borderRadius: '5px',
  border: '1px solid #eee',
  color: '#333',
}
</script>

<template>
  <Html>
    <Head />
    <Preview>Your login link</Preview>
    <Body :style="main">
      <Container :style="container">
        <Heading :style="h1"> Your login link </Heading>
        <Link
          :href="`${env.BASE_URL}/auth/verify/magic-link?code=${verificationCode}`"
          target="_blank"
          :style="{ ...link, display: 'block', marginBottom: '16px' }"
        >
          Click here to login to {{ env.APP_NAME }}
        </Link>
        <Text :style="{ ...text, marginBottom: '14px' }">
          Or, copy and paste this temporary login code:
        </Text>
        <code :style="code">{{ otp }}</code>
        <Text
          :style="{
            ...text,
            color: '#ababab',
            marginTop: '14px',
            marginBottom: '16px',
          }"
        >
          If you didn't try to login, you can safely ignore this email.
        </Text>
        <Text
          :style="{
            ...text,
            color: '#ababab',
            marginTop: '12px',
            marginBottom: '38px',
          }"
        />
        <Img :src="env.LOGO_URL" width="32" alt="Logo" />
        <Text :style="footer">
          <Link
            :href="env.BASE_URL"
            target="_blank"
            :style="{ ...link, color: '#898989' }"
          >
            {{ env.APP_NAME }} </Link
          >, {{ env.APP_DESCRIPTION }}
        </Text>
      </Container>
    </Body>
  </Html>
</template>

```
---
### filename: emails/member-invite.vue
```vue
<script setup lang="ts">
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from '@vue-email/components'
import { env } from '@@/env'

interface MemberInviteProps {
  inviterName: string
  organizationName: string
  inviteLink: string
}

withDefaults(defineProps<MemberInviteProps>(), {
  inviterName: '',
  organizationName: '',
  inviteLink: '',
})

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
}

const container = {
  padding: '40px 24px',
  margin: '0 auto',
  maxWidth: '600px',
}

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '24px',
  color: '#333',
}

const button = {
  display: 'inline-block',
  padding: '12px 24px',
  backgroundColor: '#000',
  color: '#fff',
  textDecoration: 'none',
  borderRadius: '6px',
  marginTop: '24px',
  marginBottom: '24px',
}

const text = {
  fontSize: '16px',
  color: '#666',
  marginBottom: '24px',
  lineHeight: '24px',
}

const footer = {
  fontSize: '14px',
  color: '#898989',
  marginTop: '32px',
}
</script>

<template>
  <Html>
    <Head />
    <Preview>Join {{ organizationName }} on {{ env.APP_NAME }}</Preview>
    <Body :style="main">
      <Container :style="container">
        <Img :src="env.LOGO_URL" width="40" alt="Logo" />

        <Heading :style="heading">
          {{ inviterName }} invited you to join {{ organizationName }}
        </Heading>

        <Text :style="text">
          {{ organizationName }} is using {{ env.APP_NAME }} to collaborate.
          Accept the invitation below to get started.
        </Text>

        <Link :href="inviteLink" target="_blank" :style="button">
          Accept invitation
        </Link>

        <Text :style="footer">
          If you weren't expecting this invitation, you can ignore this email.
          <br />
          <Link
            :href="env.BASE_URL"
            target="_blank"
            :style="{ color: '#898989', textDecoration: 'underline' }"
          >
            {{ env.APP_NAME }}
          </Link>
          - {{ env.APP_DESCRIPTION }}
        </Text>
      </Container>
    </Body>
  </Html>
</template>

```
---
### filename: env.ts
```ts
import { createEnv } from '@t3-oss/env-nuxt'
import { z } from 'zod'

export const env = createEnv({
  server: {
    MOCK_EMAIL: z
      .string()
      .transform((val) => val === 'true')
      .pipe(z.boolean())
      .optional(),
    BASE_URL: z.string().url(),
    APP_NAME: z.string(),
    APP_DESCRIPTION: z.string(),
    LOGO_URL: z.string().url(),
    RESEND_API_TOKEN: z.string().min(1),
    NUXT_OAUTH_GITHUB_CLIENT_ID: z.string().min(1),
    NUXT_OAUTH_GITHUB_CLIENT_SECRET: z.string().min(1),
    NUXT_OAUTH_GOOGLE_CLIENT_ID: z.string().min(1),
    NUXT_OAUTH_GOOGLE_CLIENT_SECRET: z.string().min(1),
    NUXT_SESSION_PASSWORD: z.string().min(32),
    NUXT_STRIPE_SECRET_KEY: z.string().min(1),
    NUXT_STRIPE_WEBHOOK_SECRET: z.string().min(1),
    FROM_EMAIL: z.string().email(),
    EMAIL_PROVIDER: z.enum([
      'resend',
      'mailgun',
      'sendgrid',
      'postmark',
      'plunk',
    ]),
    PAYMENT_PROVIDER: z.enum(['stripe', 'lemonsqueezy']),
    TWILIO_ACCOUNT_SID: z.string().min(1),
    TWILIO_AUTH_TOKEN: z.string().min(1),
    TWILIO_PHONE_NUMBER: z
      .string()
      .regex(
        /^\+[1-9]\d{1,14}$/,
        'Phone number must be in E.164 format (e.g. +12125551234)',
      ),
  },
})

```
---
### filename: nuxt.config.ts
```ts
import './env'
import vue from '@vitejs/plugin-vue'

export default defineNuxtConfig({
  modules: [
    '@nuxthub/core',
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-auth-utils',
    '@formkit/auto-animate/nuxt',
    '@nuxtjs/mdc',
  ],
  colorMode: {
    preference: 'system',
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY,
    fromEmail: process.env.FROM_EMAIL,
    emailProvider: process.env.EMAIL_PROVIDER,
    // @ts-expect-error - We're just extending the type
    session: {
      maxAge: 60 * 60 * 24 * 7, // Session expires after 7 days - change it accordingly
    },
    public: {
      host: process.env.BASE_URL,
    },
  },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-07-30',
  auth: {
    webAuthn: true,
  },
  mdc: {
    headings: {
      anchorLinks: false,
    },
    highlight: {
      langs: [
        'ts',
        'js',
        'html',
        'css',
        'json',
        'md',
        'yaml',
        'bash',
        'css',
        'py',
        'tsx',
        'jsx',
        'go',
        'rust',
        'java',
        'kotlin',
        'swift',
        'csharp',
      ],
    },
  },
  nitro: {
    rollupConfig: {
      // @ts-expect-error - Rollup plugin type definitions are incomplete for vue plugin
      plugins: [vue()],
    },
  },
  hub: {
    database: true,
    blob: true,
    kv: true,
  },
  vite: {
    server: {
      allowedHosts: ['local.supersaas.dev'],
    },
  },
})

```
---
### filename: package.json
```json
{
  "name": "nuxt-app",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "npx nuxthub preview",
    "deploy": "npx nuxthub deploy",
    "postinstall": "nuxt prepare",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "db:generate": "drizzle-kit generate",
    "setup-env": "node setup-env.js",
    "sync-stripe": "npx tsx scripts/sync-stripe-products-prices.ts"
  },
  "dependencies": {
    "@ai-sdk/openai": "^1.1.12",
    "@ai-sdk/vue": "^1.1.17",
    "@formkit/auto-animate": "^0.8.2",
    "@iconify-json/lucide": "^1.2.26",
    "@nuxt/eslint": "^1.0.1",
    "@nuxt/ui": "3.0.0-alpha.9",
    "@nuxthub/core": "^0.8.17",
    "@nuxtjs/mdc": "^0.13.5",
    "@simplewebauthn/browser": "^13.1.0",
    "@simplewebauthn/server": "^13.1.1",
    "@t3-oss/env-nuxt": "^0.12.0",
    "@vitejs/plugin-vue": "^5.2.1",
    "@vue-email/components": "^0.0.21",
    "@vue-email/render": "^0.0.9",
    "ai": "^4.1.41",
    "drizzle-orm": "0.39.3",
    "drizzle-zod": "^0.7.0",
    "nanoid": "5.1.0",
    "nuxt": "^3.15.4",
    "nuxt-auth-utils": "0.5.15",
    "pnpm": "^10.4.1",
    "resend": "4.1.2",
    "simple-git-hooks": "2.11.1",
    "stripe": "17.6.0",
    "use-email": "^0.0.8",
    "vue": "^3.5.13",
    "vue-router": "^4.5.0",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.16",
    "@vueuse/core": "^12.7.0",
    "@vueuse/nuxt": "12.7.0",
    "dotenv": "^16.4.7",
    "drizzle-kit": "0.30.4",
    "nitro-kutu": "^0.1.0",
    "nuxthub-ratelimit": "^1.0.4",
    "prettier": "^3.5.1",
    "prettier-plugin-tailwindcss": "^0.6.11",
    "typescript": "^5.7.3",
    "vue-tsc": "^2.2.2",
    "wrangler": "^3.109.1"
  },
  "packageManager": "pnpm@9.12.3",
  "simple-git-hooks": {
    "hooks": {
      "pre-commit": "pnpm run format"
    }
  }
}

```
---
### filename: server/api/admin/sync-stripe-data.get.ts
```ts
import Stripe from 'stripe'
import { env } from '@@/env'
import {
  createOrUpdateStripeProduct,
  createOrUpdateStripePrice,
} from '@@/server/database/queries/stripe'
import { consola } from 'consola'

export default defineEventHandler(async (event) => {
  const stripe = new Stripe(env.NUXT_STRIPE_SECRET_KEY as string)
  consola.start('Syncing Stripe products and prices...')
  try {
    const products = await stripe.products.list({ active: true })
    consola.info(`Found ${products.data.length} active products`)
    for (const product of products.data) {
      await createOrUpdateStripeProduct({
        id: product.id,
        name: product.name,
        description: product.description,
        active: product.active,
        metadata: product.metadata,
        features: product.marketing_features,
      })
    }
    // Fetch all active prices
    consola.info('💰 Fetching prices...')
    const prices = await stripe.prices.list({ active: true })
    consola.info(`Found ${prices.data.length} active prices`)
    for (const price of prices.data) {
      await createOrUpdateStripePrice({
        id: price.id,
        type: price.type,
        currency: price.currency,
        unitAmount: price.unit_amount ?? 0,
        interval: price.recurring?.interval ?? 'month',
        intervalCount: price.recurring?.interval_count ?? 1,
        productId:
          typeof price.product === 'string' ? price.product : price.product.id,
        description: price.nickname,
        active: price.active,
        metadata: price.metadata,
        trialPeriodDays: price.recurring?.trial_period_days,
      })
    }
  } catch (error) {
    consola.error('Error syncing products:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error syncing products',
    })
  }
  return 'Stripe data synced successfully'
})

```
---
### filename: server/api/auth/magic-link/login.post.ts
```ts
// flow
// 1. Validate body (email)
// 2. Find user by email (@method findUserByEmail)
// 3. Validate user status (email verified, not banned)
// 4. Generate verification codes:
//    - Email verification code (@method generateAlphaNumericCode)
//    - One-time password (@method generateNumericCode)
// 5. Save verification codes:
//    - Save email verification code (@method saveEmailVerificationCode)
//    - Save one-time password (@method saveOneTimePassword)
// 6. Render email template (@method render)
// 7. Send magic link email (@method sendEmail)
// 8. Return sanitized user data (@method sanitizeUser)

// Used in:
// - app/components/auth/MagicLinkLogin.vue

import { emailSchema } from '@@/shared/validations/auth'
import { validateBody } from '@@/server/utils/bodyValidation'
import { sendEmail } from '@@/server/services/email'
import {
  generateAlphaNumericCode,
  generateNumericCode,
} from '@@/server/utils/nanoid'
import { findUserByEmail } from '@@/server/database/queries/users'
import {
  saveEmailVerificationCode,
  saveOneTimePassword,
} from '@@/server/database/queries/auth'
import { OneTimePasswordTypes } from '@@/constants'
import EmailVerification from '@@/emails/magic-link.vue'
import { render } from '@vue-email/render'
import { env } from '@@/env'

export default defineEventHandler(async (event) => {
  const data = await validateBody(event, emailSchema)

  const user = await findUserByEmail(data.email)
  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User not found',
    })
  }
  if (!user.emailVerified) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User has not verified their email',
    })
  }

  if (user.banned) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You account has been banned',
    })
  }

  const emailVerificationCode = generateAlphaNumericCode(32)
  const oneTimePassword = await generateNumericCode(6)

  await saveEmailVerificationCode({
    userId: user.id,
    code: emailVerificationCode,
    expiresAt: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes
  })

  await saveOneTimePassword({
    userId: user.id,
    identifier: data.email,
    code: oneTimePassword,
    type: OneTimePasswordTypes.login,
    expiresAt: new Date(Date.now() + 1000 * 60 * 5), // 5 minutes
  })

  const emailHtml = await render(EmailVerification, {
    otp: oneTimePassword,
    verificationCode: emailVerificationCode,
  })

  if (env.MOCK_EMAIL) {
    console.table({
      email: data.email,
      verificationLink: `${env.BASE_URL}/api/auth/verify-account?token=${emailVerificationCode}`,
      oneTimePassword,
    })
  } else {
    await sendEmail({
      subject: `Your login link for ${env.APP_NAME}`,
      to: data.email,
      html: emailHtml,
    })
  }
  return sendNoContent(event)
})

```
---
### filename: server/api/auth/magic-link/verify-otp.post.ts
```ts
// flow
// 1. Validate body (code)
// 2. Check if user exists (@method findUserById)
// 3. Delete one-time password (@method deleteOneTimePassword)
// 4. Update last active timestamp (@method updateLastActiveTimestamp)
// 5. Set user session (@method setUserSession)
// 6. Sanitize user data (@method sanitizeUser)
// 7. Return user (email, name)

// Used in:
// - app/components/auth/MagicLinkLogin.vue

import { validateBody } from '@@/server/utils/bodyValidation'
import { otpLoginSchema } from '@@/shared/validations/auth'
import {
  findOneTimePassword,
  deleteOneTimePassword,
} from '@@/server/database/queries/auth'
import { isWithinExpiryDate } from '@@/server/utils/auth'
import {
  findUserById,
  updateLastActiveTimestamp,
} from '@@/server/database/queries/users'

export default defineEventHandler(async (event) => {
  const data = await validateBody(event, otpLoginSchema)

  const oneTimePassword = await findOneTimePassword(data.code)
  if (!oneTimePassword) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid code',
    })
  }
  if (!isWithinExpiryDate(oneTimePassword.expiresAt.getTime())) {
    throw createError({ statusCode: 400, statusMessage: 'OTP has expired' })
  }

  const user = await findUserById(oneTimePassword.userId)

  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  await deleteOneTimePassword(data.code)

  if (user.banned) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You account has been banned',
    })
  }

  await updateLastActiveTimestamp(user.id)
  await setUserSession(event, { user: sanitizeUser(user) })
  return sanitizeUser(user)
})

```
---
### filename: server/api/auth/oauth/discord.ts
```ts
import { handleOAuthSuccess } from '@@/server/utils/oauth'

interface DiscordOAuthUser {
  id: string
  avatar: string
  global_name: string
  email: string
}

const mapDiscordUser = (user: DiscordOAuthUser) => ({
  email: user.email,
  name: user.global_name,
  avatarUrl: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
  provider: 'discord' as const,
  providerUserId: user.id,
})

export default defineOAuthDiscordEventHandler({
  config: { emailRequired: true },
  async onSuccess(event, { user }) {
    try {
      await handleOAuthSuccess(event, mapDiscordUser(user))
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Authentication failed',
      })
    }
  },
})

```
---
### filename: server/api/auth/oauth/github.ts
```ts
import { handleOAuthSuccess } from '@@/server/utils/oauth'

interface GitHubOAuthUser {
  email: string
  name: string
  avatar_url: string
  id: string
}

const mapGitHubUser = (user: GitHubOAuthUser) => ({
  email: user.email,
  name: user.name,
  avatarUrl: user.avatar_url,
  provider: 'github' as const,
  providerUserId: user.id,
})

export default defineOAuthGitHubEventHandler({
  config: { emailRequired: true },
  async onSuccess(event, { user }) {
    try {
      await handleOAuthSuccess(event, mapGitHubUser(user))
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Authentication failed',
      })
    }
  },
})

```
---
### filename: server/api/auth/oauth/google.ts
```ts
import { handleOAuthSuccess } from '@@/server/utils/oauth'

interface GoogleOAuthUser {
  sub: string
  given_name: string
  family_name: string
  picture: string
  email: string
}

const mapGoogleUser = (user: GoogleOAuthUser) => ({
  email: user.email,
  name: `${user.given_name} ${user.family_name}`.trim(),
  avatarUrl: user.picture,
  provider: 'google' as const,
  providerUserId: user.sub,
})

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }) {
    try {
      await handleOAuthSuccess(event, mapGoogleUser(user))
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Authentication failed',
      })
    }
  },
})

```
---
### filename: server/api/auth/password/forgot.post.ts
```ts
// flow
// 1. Validate body (@method validateBody)
// 2. Find user (@method findUserByEmail)
// 3. Generate reset token (@method createPasswordResetToken)
// 4. Send email with reset link (@method sendEmail)

import { emailSchema } from '@@/shared/validations/auth'
import { validateBody } from '@@/server/utils/bodyValidation'
import { findUserByEmail } from '@@/server/database/queries/users'
import { createPasswordResetToken } from '@@/server/database/queries/auth'
import { sendEmail } from '@@/server/services/email'
import { env } from '@@/env'

export default defineEventHandler(async (event) => {
  // 1. Validate email
  const { email } = await validateBody(event, emailSchema)

  // 2. Find user
  const user = await findUserByEmail(email)
  if (!user) {
    // Return 200 even if user not found for security
    return sendNoContent(event)
  }

  // 3. Generate reset token
  const resetToken = await createPasswordResetToken(user.id)

  // 4. Send email with reset link
  const resetUrl = `${env.BASE_URL}/auth/reset-password?token=${resetToken.code}`

  if (env.MOCK_EMAIL) {
    console.table({
      email: user.email,
      resetLink: resetUrl,
    })
  } else {
    await sendEmail({
      subject: `Welcome to the ${env.APP_NAME}`,
      to: user.email,
      html: `Click <a href="${resetUrl}">here</a> to reset your password`,
    })
  }

  return sendNoContent(event)
})

```
---
### filename: server/api/auth/password/login.post.ts
```ts
// Used in:
// - /auth/login.vue

// flow
// 1. Validate body (email, name, password)
// 2. Check if user exists (@method findUserByEmail)
// 3. Hash the password (uses the hashPassword util provided by nuxt-auth-utils)
// 4. Create user (@method createUserWithPassword)
// 5. Create verification code (@method generateAndSaveVerificationCode)
// 6. Create One Time Password code (@method generateAndSaveOneTimePassword)
// 7. Render email template (@method render)
// 8. Send verification email (@method sendEmail)
// 9. Sanitize user data (@method sanitizeUser)
// 10. Return sanitized user object

import {
  findUserByEmail,
  findLinkedAccountsByUserId,
  updateLastActiveTimestamp,
} from '@@/server/database/queries/users'
import { loginUserSchema } from '@@/shared/validations/auth'
import { validateBody } from '@@/server/utils/bodyValidation'

export default defineEventHandler(async (event) => {
  // 1. Validate body
  const data = await validateBody(event, loginUserSchema)
  // 2. Find user by email
  const user = await findUserByEmail(data.email)
  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User not found',
    })
  }
  // 3. Check if user uses OAuth (should use OAuth login instead)
  if (!user.hashedPassword && user.emailVerified) {
    const linkedAccounts = await findLinkedAccountsByUserId(user.id)
    const providers = linkedAccounts.map((account) => account.provider)
    throw createError({
      statusCode: 400,
      statusMessage: `Looks like you had signed up with ${providers.join(
        ', ',
      )}. Please use ${providers.join(', ')} to login instead.`,
    })
  }
  // 4. Verify password
  if (!user.hashedPassword) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'This account was registered via a social login (e.g., Google, GitHub). Please use the same method to log in.',
    })
  }

  const isPasswordCorrect = await verifyPassword(
    user.hashedPassword,
    data.password,
  )


  if (!isPasswordCorrect) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid password',
    })
  }

  // 5. Check if email is verified
  if (!user.emailVerified) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email not verified',
    })
  }


  // 6. Check if user is banned
  if (user.banned) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You account has been banned',
    })
  }

  // 7. Update last active timestamp
  await updateLastActiveTimestamp(user.id)

  const sanitizedUser = sanitizeUser(user)


  if (!sanitizedUser) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to process user data',
    })
  }
  await setUserSession(event, { user: sanitizedUser })
  return sendNoContent(event)
})

```
---
### filename: server/api/auth/password/register.post.ts
```ts
// flow
// 1. Validate body (email, name, password)
// 2. Check if user exists (@method findUserByEmail)
// 3. Hash the password (uses the hashPassword util provided by nuxt-auth-utils)
// 4. Create user (@method createUserWithPassword)
// 5. Create verification code (@method generateAndSaveVerificationCode)
// 6. Render email template (@method render)
// 7. Send verification email (@method sendEmail)
// 8. Sanitize user data (@method sanitizeUser)
// 9. Return user (email, name)

// Used in:
// - app/pages/auth/register.vue

import { registerUserSchema } from '@@/shared/validations/auth'
import { sendEmail } from '@@/server/services/email'
import { env } from '@@/env'
import {
  findUserByEmail,
  createUserWithPassword,
} from '@@/server/database/queries/users'
import { saveEmailVerificationCode } from '@@/server/database/queries/auth'
import { generateAlphaNumericCode } from '@@/server/utils/nanoid'
import { render } from '@vue-email/render'
import EmailVerification from '@@/emails/email-verification.vue'
import { sanitizeUser } from '@@/server/utils/auth'
import { validateBody } from '@@/server/utils/bodyValidation'

export default defineEventHandler(async (event) => {
  // 1. Validate body
  const data = await validateBody(event, registerUserSchema)

  // 2. Check if user exists
  const existingUser = await findUserByEmail(data.email)
  if (existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: 'An account with this email already exists, please login.',
    })
  }

  // 3. Hash the password
  const hashedPassword = await hashPassword(data.password)

  // 4. Create user

  const user = await createUserWithPassword({
    email: data.email,
    name: data.name,
    hashedPassword,
  })
  const emailVerificationCode = generateAlphaNumericCode(32)

  await saveEmailVerificationCode({
    userId: user.id,
    code: emailVerificationCode,
    expiresAt: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes
  })

  const htmlTemplate = await render(EmailVerification, {
    verificationCode: emailVerificationCode,
  })

  if (env.MOCK_EMAIL) {
    console.table({
      email: data.email,
      name: data.name,
      verificationLink: `${env.BASE_URL}/api/auth/verify-account?token=${emailVerificationCode}`,
    })
  } else {
    await sendEmail({
      subject: `Welcome to the ${env.APP_NAME}`,
      to: data.email,
      html: htmlTemplate,
    })
  }
  setResponseStatus(event, 201)
  return sanitizeUser(user)
})

```
---
### filename: server/api/auth/password/reset.post.ts
```ts
// flow
// 1. Validate body (@method validateBody)
// 2. Find valid token (@method findPasswordResetToken)
// 3. Hash new password (@method hashPassword - provided by nuxt-auth-utils)
// 4. Update user password (@method updateUser)
// 5. Delete used token (@method deletePasswordResetToken)

import { z } from 'zod'
import { validateBody } from '@@/server/utils/bodyValidation'
import {
  findPasswordResetToken,
  deletePasswordResetToken,
} from '@@/server/database/queries/auth'
import { updateUser } from '@@/server/database/queries/users'

const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8),
})

export default defineEventHandler(async (event) => {
  // 1. Validate input
  const { token, password } = await validateBody(event, resetPasswordSchema)

  // 2. Find valid token
  const resetToken = await findPasswordResetToken(token)
  if (!resetToken || resetToken.expiresAt < new Date()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'This link has expired',
    })
  }

  // 3. Hash new password
  const hashedPassword = await hashPassword(password)

  // 4. Update user password
  await updateUser(resetToken.userId, { hashedPassword })

  // 5. Delete used token
  await deletePasswordResetToken(token)

  return sendNoContent(event)
})

```
---
### filename: server/api/auth/phone/login.post.ts
```ts
import { findUserByPhoneNumber } from '@@/server/database/queries/users'
import { validateBody } from '@@/server/utils/bodyValidation'
import { phoneSchema } from '@@/shared/validations/auth'
import { generateNumericCode } from '@@/server/utils/nanoid'
import { env } from '@@/env'
import { saveOneTimePassword } from '@@/server/database/queries/auth'
import { OneTimePasswordTypes } from '@@/constants'

export default defineEventHandler(async (event) => {
  const data = await validateBody(event, phoneSchema)

  const user = await findUserByPhoneNumber(data.phoneNumber)
  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User not found',
    })
  }
  if (!user.emailVerified) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User has not verified their account',
    })
  }

  if (user.banned) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You account has been banned',
    })
  }

  const oneTimePassword = await generateNumericCode(6)

  await saveOneTimePassword({
    userId: user.id,
    identifier: data.phoneNumber,
    code: oneTimePassword,
    type: OneTimePasswordTypes.login,
    expiresAt: new Date(Date.now() + 1000 * 60 * 5), // 5 minutes
  })

  await $fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        Body: `Your verification code for ${env.APP_NAME} is: ${oneTimePassword}`,
        To: data.phoneNumber,
        From: env.TWILIO_PHONE_NUMBER,
      }).toString(),
    },
  )

  return sendNoContent(event)
})

```
---
### filename: server/api/auth/phone/verify.post.ts
```ts
import {
  findOneTimePassword,
  deleteOneTimePassword,
} from '@@/server/database/queries/auth'
import { isWithinExpiryDate } from '@@/server/utils/auth'
import {
  findUserByPhoneNumber,
  updateLastActiveTimestamp,
} from '@@/server/database/queries/users'
import { phoneVerificationSchema } from '@@/shared/validations/auth'

export default defineEventHandler(async (event) => {
  const data = await validateBody(event, phoneVerificationSchema)

  const oneTimePassword = await findOneTimePassword(data.code)
  if (!oneTimePassword) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid code',
    })
  }

  if (!isWithinExpiryDate(oneTimePassword.expiresAt.getTime())) {
    throw createError({ statusCode: 400, statusMessage: 'Code has expired' })
  }

  const user = await findUserByPhoneNumber(data.phoneNumber)
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  await deleteOneTimePassword(data.code)

  if (user.banned) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Your account has been banned',
    })
  }

  await updateLastActiveTimestamp(user.id)
  await setUserSession(event, { user: sanitizeUser(user) })
  return sanitizeUser(user)
})

```
---
### filename: server/api/auth/verify-account.get.ts
```ts
// flow
// 1. Validate query parameter (token)
// 2. Find and delete verification code (@method findAndDeleteEmailVerificationCode)
// 3. Check if token is expired (@method isWithinExpiryDate)
// 4. Find user by ID (@method findUserById)
// 5. Verify user's email if not already verified (@method verifyUser)
// 6. Check if user is banned
// 7. Update user's last active timestamp (@method updateLastActiveTimestamp)
// 8. Sanitize user data (@method sanitizeUser)
// 9. Set user session
// 10. Redirect to dashboard

// Used in:
// - emails/email-verification.vue

import { isWithinExpiryDate, sanitizeUser } from '@@/server/utils/auth'
import {
  findUserById,
  verifyUser,
  updateLastActiveTimestamp,
} from '@@/server/database/queries/users'
import {
  findEmailVerificationCode,
  deleteEmailVerificationCode,
} from '@@/server/database/queries/auth'

export default defineEventHandler(async (event) => {
  const { token } = getQuery(event)
  if (!token) {
    throw createError({ statusCode: 400, statusMessage: 'Missing token' })
  }

  const storedToken = await findEmailVerificationCode(token as string)
  if (!storedToken) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid verification code',
    })
  }

  if (!isWithinExpiryDate(storedToken.expiresAt.getTime())) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Verification code has expired',
    })
  }

  const user = await findUserById(storedToken.userId)
  if (!user) {
    throw createError({ statusCode: 400, statusMessage: 'User not found' })
  }

  if (!user.emailVerified) {
    await verifyUser(user.id)
  }

  if (user.banned) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Your account has been banned',
    })
  }

  await updateLastActiveTimestamp(user.id)
  const transformedUser = sanitizeUser(user)
  await setUserSession(event, { user: transformedUser })
  await deleteEmailVerificationCode(token as string)
  return sendRedirect(event, '/dashboard')
})

```
---
### filename: server/api/auth/webauthn/authenticate.post.ts
```ts
// flow
// 1. Store challenge for authentication attempt (@method storeWebAuthnChallenge)
// 2. Retrieve and validate challenge (@method getAndDeleteChallenge)
// 3. Get allowed credentials for user (@method findUserByEmail, findCredentialByUserId)
// 4. Validate credential (@method findCredentialById)
// 5. On successful authentication:
//    - Find user (@method findUserById)
//    - Update last active timestamp (@method updateLastActiveTimestamp)
//    - Sanitize user data (@method sanitizeUser)
//    - Set user session

// Used in:
// - app/pages/auth/login-passkey.vue

import {
  storeWebAuthnChallenge,
  findCredentialByUserId,
  findCredentialById,
  getAndDeleteChallenge,
} from '@@/server/database/queries/passkeys'
import {
  findUserByEmail,
  findUserById,
  updateLastActiveTimestamp,
} from '@@/server/database/queries/users'
import { sanitizeUser } from '@@/server/utils/auth'

export default defineWebAuthnAuthenticateEventHandler({
  async storeChallenge(event, challenge, attemptId) {
    await storeWebAuthnChallenge(attemptId, challenge)
  },

  async getChallenge(event, attemptId) {
    const challenge = await getAndDeleteChallenge(attemptId)
    if (!challenge) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Challenge not found or expired',
      })
    }
    return challenge
  },

  async allowCredentials(event, email) {
    const user = await findUserByEmail(email)
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      })
    }
    const credentials = await findCredentialByUserId(user.id)
    return credentials || []
  },

  async getCredential(event, credentialId) {
    const credential = await findCredentialById(credentialId)
    if (!credential) {
      throw createError({
        statusCode: 404,
        statusMessage:
          'No passkeys registered. You can register one in your account settings.',
      })
    }
    return credential
  },

  async onSuccess(event, { credential }) {
    const user = await findUserById(credential.userId)
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      })
    }

    await updateLastActiveTimestamp(user.id)
    const transformedUser = sanitizeUser(user)
    await setUserSession(event, { user: transformedUser })
  },
})

```
---
### filename: server/api/auth/webauthn/link-passkey.post.ts
```ts
import {
  storeWebAuthnChallenge,
  getAndDeleteChallenge,
  createCredential,
} from '@@/server/database/queries/passkeys'
import type { InsertPasskey } from '@@/types/database'
import { linkPasskeySchema } from '@@/shared/validations/auth'

export default defineWebAuthnRegisterEventHandler({
  async validateUser(userBody, event) {
    const session = await getUserSession(event)
    if (session.user?.email && session.user.email !== userBody.userName) {
      throw createError({
        statusCode: 400,
        message: 'Email not matching curent session',
      })
    }
    return linkPasskeySchema.parse(userBody)
  },

  async storeChallenge(event, challenge, attemptId) {
    await storeWebAuthnChallenge(attemptId, challenge)
  },

  async getChallenge(event, attemptId) {
    const challenge = await getAndDeleteChallenge(attemptId)
    if (!challenge)
      throw createError({ statusCode: 404, message: 'Challenge not found' })
    return challenge
  },

  async onSuccess(event, { credential, user }) {
    const { user: sessionUser } = await requireUserSession(event)
    const passkey: InsertPasskey = {
      id: credential.id,
      name: user.displayName || 'Default Passkey',
      userId: sessionUser.id,
      publicKey: credential.publicKey,
      counter: credential.counter,
      backedUp: credential.backedUp,
      transports: credential.transports,
    }
    await createCredential(passkey)
  },
})

```
---
### filename: server/api/auth/webauthn/linked-passkeys.get.ts
```ts
import { findCredentialByUserId } from '@@/server/database/queries/passkeys'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const passkeys = await findCredentialByUserId(user.id)
  
  return passkeys.map(({ id, name, createdAt, updatedAt }) => ({
    id,
    name,
    createdAt,
    updatedAt
  }))
})

```
---
### filename: server/api/me/haspasskeys.get.ts
```ts
import { findCredentialByUserId } from '@@/server/database/queries/passkeys'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const passkeys = await findCredentialByUserId(user.id)
  return {
    hasPasskey: passkeys && passkeys.length > 0,
  }
})

```
---
### filename: server/api/me/index.get.ts
```ts
import { findUserTeams } from '@@/server/database/queries/teams'
import { getUserPreferences } from '@@/server/database/queries/users'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const [teams, preferences] = await Promise.all([
    findUserTeams(user.id),
    getUserPreferences(user.id)
  ])
  return { teams, preferences }
})

```
---
### filename: server/api/me/index.patch.ts
```ts
import { updateUser } from '@@/server/database/queries/users'
import { validateBody } from '@@/server/utils/bodyValidation'
import { updateUserSchema } from '@@/shared/validations/user'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const body = await validateBody(event, updateUserSchema)
  const updatedUser = await updateUser(user.id, {
    name: body.name,
    avatarUrl: body.avatarUrl,
  })
  const sanitizedUser = sanitizeUser(updatedUser)
  await setUserSession(event, { user: sanitizedUser })
  return sanitizedUser
})

```
---
### filename: server/api/me/memberships.get.ts
```ts
import { findUserTeams } from '@@/server/database/queries/teams'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const teams = await findUserTeams(user.id)
  return teams
})

```
---
### filename: server/api/me/update-password.post.ts
```ts
import { updateUserPassword } from '@@/server/database/queries/users'
import { updateUserPasswordSchema } from '@@/shared/validations/auth'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const { password } = await readValidatedBody(event, (body) =>
    updateUserPasswordSchema.parse(body),
  )
  const hashedPassword = await hashPassword(password)
  await updateUserPassword(user.id, hashedPassword)
  return { message: 'Password updated successfully' }
})

```
---
### filename: server/api/stripe/checkout.post.ts
```ts
import { stripeService } from '@@/server/services/stripe'
import { validateTeamOwnership } from '@@/server/utils/teamValidation.ts'
import {
  getCustomerByTeamId,
  createCustomer,
} from '@@/server/database/queries/customers'

interface CheckoutBody {
  priceId: string
  teamId: string
  teamSlug: string
}

async function getOrCreateCustomer(
  teamId: string,
  user: { id: string; email: string },
) {
  try {
    const customerRecord = await getCustomerByTeamId(teamId)
    if (customerRecord) {
      return customerRecord.id
    }

    const newCustomerId = await stripeService.createCustomer(teamId, user.email)
    await createCustomer({
      id: newCustomerId,
      teamId,
      userId: user.id,
    })
    return newCustomerId
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get or create customer',
    })
  }
}

export default defineEventHandler(async (event) => {
  try {
    const { user } = await requireUserSession(event)
    const body = await readBody<CheckoutBody>(event)

    if (!body.priceId || !body.teamId || !body.teamSlug) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Price ID, team ID and team slug are required',
      })
    }

    await validateTeamOwnership(event, body.teamId)

    const customerId = await getOrCreateCustomer(body.teamId, user)

    const session = await stripeService.createCheckoutSession({
      customerId,
      priceId: body.priceId,
      teamSlug: body.teamSlug,
    })

    return session.url
  } catch (error) {
    // If it's already a handled error, rethrow it
    if (error instanceof Error) throw error

    // Otherwise, create a generic error
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create checkout session',
    })
  }
})

```
---
### filename: server/api/stripe/plans.ts
```ts
import { getAllPlans } from '@@/server/database/queries/stripe'

export default defineEventHandler(async (event) => {
  const plans = await getAllPlans()
  return plans
})

```
---
### filename: server/api/stripe/subscription.get.ts
```ts
import { getSubscriptionByTeamId } from '@@/server/database/queries/subscriptions'

export default defineEventHandler(async (event) => {
  const { teamId } = getQuery(event)
  const subscription = await getSubscriptionByTeamId(teamId as string)
  return subscription
})

```
---
### filename: server/api/stripe/webhook.ts
```ts
import Stripe from 'stripe'
import { env } from '@@/env'
import type { InsertSubscription } from '@@/types/database'
import {
  createOrUpdateStripeProduct,
  createOrUpdateStripePrice,
} from '@@/server/database/queries/stripe'
import { getCustomerById } from '@@/server/database/queries/customers'
import { upsertSubscription } from '@@/server/database/queries/subscriptions'
import { updateUser } from '@@/server/database/queries/users'
import { stripeService } from '@@/server/services/stripe'
export default defineEventHandler(async (event) => {
  const webhookSecret = env.NUXT_STRIPE_WEBHOOK_SECRET
  const stripeSecretKey = env.NUXT_STRIPE_SECRET_KEY

  const stripe = new Stripe(stripeSecretKey)

  const body = await readRawBody(event)
  const stripeSignature = getHeader(event, 'stripe-signature')

  if (!stripeSignature) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Stripe signature is missing',
    })
  }
  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Request body is missing',
    })
  }
  let stripeEvent
  try {
    stripeEvent = await stripe.webhooks.constructEventAsync(
      body,
      stripeSignature,
      webhookSecret,
    )
  } catch (err) {
    console.log('err', err)
    throw createError({
      statusCode: 400,
      statusMessage: 'Webhook Error',
      message: err instanceof Error ? err.message : 'Unknown error',
    })
  }
  const type = stripeEvent.type

  const relevantEvents = [
    'checkout.session.completed',
    'checkout.session.async_payment_succeeded',
    'customer.subscription.created',
    'customer.subscription.deleted',
    'customer.subscription.paused',
    'customer.subscription.resumed',
    'price.created',
    'price.deleted',
    'price.updated',
    'product.created',
    'product.deleted',
    'product.updated',
  ]
  if (!relevantEvents.includes(type)) {
    console.log('Not a relevant event')
    return 'OK'
  }
  const data = stripeEvent.data.object
  if (!data) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid event data',
    })
  }
  console.log('Received event', type)
  try {
    switch (type) {
      case 'product.created':
      case 'product.updated':
        await handleProductEvent(data as Stripe.Product)
        break
      case 'price.created':
      case 'price.updated':
        await handlePriceEvent(data as Stripe.Price)
        break
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
      case 'customer.subscription.resumed':
      case 'customer.subscription.paused':
        await handleSubscriptionEvent(data as Stripe.Subscription)
        break
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded':
        await handleCheckoutSessionEvent(data as Stripe.Checkout.Session)
        break
      default:
        throw createError({
          statusCode: 400,
          statusMessage: 'Unhandled event type.',
        })
    }
  } catch (err) {
    console.log(err)
    return 'Error'
  }
  return 'OK'
})

const handleProductEvent = async (data: Stripe.Product) => {
  const product = await createOrUpdateStripeProduct({
    id: data.id,
    name: data.name,
    description: data.description,
    active: data.active,
    metadata: data.metadata,
    features: data.marketing_features,
  })
  return product
}

const handlePriceEvent = async (data: Stripe.Price) => {
  const record = {
    id: data.id,
    type: data.type,
    currency: data.currency,
    unitAmount: data.unit_amount ?? 0,
    interval: data.recurring?.interval ?? 'month',
    intervalCount: data.recurring?.interval_count ?? 1,
    productId:
      typeof data.product === 'string' ? data.product : data.product.id,
    description: data.nickname,
    active: data.active,
    metadata: data.metadata,
    trialPeriodDays: data.recurring?.trial_period_days,
  }
  const price = await createOrUpdateStripePrice(record)
  return price
}

const handleSubscriptionEvent = async (data: Stripe.Subscription) => {
  const customer = await getCustomerById(data.customer as string)
  if (!customer) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Customer not found',
    })
  }
  const teamId = customer.teamId
  const userId = customer.userId
  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User not found',
    })
  }

  const subscription = await upsertSubscription({
    id: data.id,
    customerId: data.customer as string,
    priceId: data.items.data[0].price.id,
    teamId: teamId,
    userId: userId,
    status: data.status,
    metadata: data.metadata,
    quantity: data.items.data[0].quantity ?? 1,
    cancelAtPeriodEnd: data.cancel_at_period_end,
    currentPeriodEnd: new Date(data.current_period_end * 1000),
    currentPeriodStart: new Date(data.current_period_start * 1000),
    endedAt: data.ended_at ? new Date(data.ended_at * 1000) : null,
    cancelAt: data.cancel_at ? new Date(data.cancel_at * 1000) : null,
    trialStart: data.trial_start ? new Date(data.trial_start * 1000) : null,
    trialEnd: data.trial_end ? new Date(data.trial_end * 1000) : null,
  })
  await updateUser(userId, {
    proAccount: data.status === 'active',
  })
  return subscription
}

const handleCheckoutSessionEvent = async (data: Stripe.Checkout.Session) => {
  console.log('handleCheckoutSessionEvent', data)
  if (data.mode !== 'subscription') {
    return // Only handle subscription checkouts
  }

  const existingCustomer = await getCustomerById(data.customer as string)
  if (!existingCustomer) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Customer not found',
    })
  }
  const customerId = existingCustomer.id
  const teamId = existingCustomer.teamId
  const userId = existingCustomer.userId

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User not found',
    })
  }

  const session = await stripeService.getCheckoutSession(data.id)

  if (session.status === 'complete') {
    // Get the subscription from the session
    const subscriptionId = session.subscription as string
    const subscription = await stripeService.getSubscription(subscriptionId)

    const subscriptionData: InsertSubscription = {
      id: subscription.id,
      customerId,
      teamId,
      userId,
      priceId: subscription.items.data[0].price.id,
      status: subscription.status,
      quantity: subscription.items.data[0].quantity ?? 1,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      cancelAt: subscription.cancel_at
        ? new Date(subscription.cancel_at * 1000)
        : null,
      endedAt: subscription.ended_at
        ? new Date(subscription.ended_at * 1000)
        : null,
      trialStart: subscription.trial_start
        ? new Date(subscription.trial_start * 1000)
        : null,
      trialEnd: subscription.trial_end
        ? new Date(subscription.trial_end * 1000)
        : null,
      metadata: subscription.metadata,
    }

    // Upsert the subscription to ensure we have the latest data
    await upsertSubscription(subscriptionData)

    // Update user's pro account status
    await updateUser(userId, {
      proAccount: subscription.status === 'active',
    })
  }
}

```
---
### filename: server/api/teams/[id]/index.delete.ts
```ts
import { deleteTeam, findUserTeams } from '@@/server/database/queries/teams'

export default defineEventHandler(async (event) => {
  // 1. Get authenticated user and team ID
  const { user } = await requireUserSession(event)
  const teamId = getRouterParam(event, 'id')

  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Team ID is required',
    })
  }

  // 2. Get user's teams to check ownership
  const userTeams = await findUserTeams(user.id)
  const team = userTeams.find((t) => t.id === teamId)

  if (!team) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Team not found',
    })
  }

  // 3. Check if user is the owner
  if (team.role !== 'owner') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Only team owners can delete teams',
    })
  }

  // 4. Delete the team
  await deleteTeam(teamId)

  return {
    message: 'Team deleted successfully',
  }
})

```
---
### filename: server/api/teams/[id]/index.patch.ts
```ts
import { updateTeam, findUserTeams } from '@@/server/database/queries/teams'
import { createTeamSchema } from '@@/shared/validations/team'
import { validateBody } from '@@/server/utils/bodyValidation'

export default defineEventHandler(async (event) => {
  // 1. Get authenticated user and team ID
  const { user } = await requireUserSession(event)
  const teamId = getRouterParam(event, 'id')

  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Team ID is required',
    })
  }

  // 2. Validate request body
  const body = await validateBody(event, createTeamSchema)

  // 3. Get user's teams to check ownership
  const userTeams = await findUserTeams(user.id)
  const team = userTeams.find((t) => t.id === teamId)

  if (!team) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Team not found',
    })
  }

  // 4. Check if user is the owner
  if (team.role !== 'owner') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Only team owners can update team details',
    })
  }

  // 5. Update team
  const updatedTeam = await updateTeam(teamId, {
    name: body.name,
    logo: body.logo,
  })

  return updatedTeam
})

```
---
### filename: server/api/teams/[id]/invites/[inviteId]/index.delete.ts
```ts
import { validateTeamOwnership } from '@@/server/utils/teamValidation.ts'
import { cancelInvite } from '@@/server/database/queries/teams'

export default defineEventHandler(async (event) => {
  const teamId = getRouterParam(event, 'id')
  const inviteId = getRouterParam(event, 'inviteId')
  if (!teamId || !inviteId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Team ID and invite ID are required',
    })
  }

  await validateTeamOwnership(event, teamId)
  await cancelInvite(inviteId)
  return 'Invite cancelled successfully'
})

```
---
### filename: server/api/teams/[id]/invites/[inviteId]/resend.post.ts
```ts
import { render } from '@vue-email/render'
import TeamInvitation from '@@/emails/member-invite.vue'
import { sendEmail } from '@@/server/services/email'
import { env } from '@@/env'
import { findTeamInvite, updateTeamInvite } from '@@/server/database/queries/teams'

export default defineEventHandler(async (event) => {
  const teamId = getRouterParam(event, 'id')
  const inviteId = getRouterParam(event, 'inviteId')
  if (!teamId || !inviteId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Team ID and invite ID are required',
    })
  }

  // Validate team ownership and get team and user details
  const { user, team } = await validateTeamOwnership(event, teamId)

  // Find the existing invitation
  const invitation = await findTeamInvite(inviteId)
  if (!invitation) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Invitation not found',
    })
  }

  // Update invitation expiry
  const updatedInvitation = await updateTeamInvite(inviteId, {
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
  })

  // Resend invitation email
  const htmlTemplate = await render(TeamInvitation, {
    organizationName: team.name,
    inviterName: user.name,
    inviteLink: `${env.BASE_URL}/api/teams/verify-invite?token=${invitation.token}`,
  })

  if (env.MOCK_EMAIL) {
    console.table({
      email: invitation.email,
      teamName: team.name,
      inviterName: user.name,
      inviteLink: `${env.BASE_URL}/api/teams/verify-invite?token=${invitation.token}`,
    })
  } else {
    await sendEmail({
      to: invitation.email,
      subject: `Invitation to join ${team.name} on ${env.APP_NAME}`,
      html: htmlTemplate,
    })
  }

  return updatedInvitation
})

```
---
### filename: server/api/teams/[id]/invites/index.get.ts
```ts
import { validateTeamOwnership } from '@@/server/utils/teamValidation.ts'
import { getTeamInvites } from '@@/server/database/queries/teams'

export default defineEventHandler(async (event) => {
  const teamId = getRouterParam(event, 'id')
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Team ID is required',
    })
  }

  await validateTeamOwnership(event, teamId)
  const teamInvites = await getTeamInvites(teamId)
  return teamInvites
})

```
---
### filename: server/api/teams/[id]/members/[memberId].delete.ts
```ts
import { validateTeamOwnership } from '@@/server/utils/teamValidation.ts'
import { deleteTeamMember } from '@@/server/database/queries/teams'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)
  const teamId = getRouterParam(event, 'id')
  const memberId = getRouterParam(event, 'memberId')

  if (!teamId || !memberId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Team ID and member ID are required',
    })
  }
  await validateTeamOwnership(event, teamId)
  await deleteTeamMember(teamId, memberId)
  return {
    message: 'Team member deleted successfully',
  }
})

```
---
### filename: server/api/teams/[id]/members/[memberId].get.ts
```ts
export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  return 'Hello Nitro'
})

```
---
### filename: server/api/teams/[id]/members/index.get.ts
```ts
import { validateTeamOwnership } from '@@/server/utils/teamValidation.ts'
import { getActiveTeamMembers } from '@@/server/database/queries/teams'

export default defineEventHandler(async (event) => {
  const teamId = getRouterParam(event, 'id')
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Team ID is required',
    })
  }

  await validateTeamOwnership(event, teamId)
  const teamMembers = await getActiveTeamMembers(teamId)
  return teamMembers
})

```
---
### filename: server/api/teams/[id]/members/index.post.ts
```ts
import { validateTeamOwnership } from '@@/server/utils/teamValidation.ts'
import { inviteTeamMemberSchema } from '@@/shared/validations/team'
import { validateBody } from '@@/server/utils/bodyValidation'
import { findUserByEmail } from '@@/server/database/queries/users'
import { inviteTeamMember } from '@@/server/database/queries/teams'
import { generateAlphaNumericCode } from '@@/server/utils/nanoid'
import { env } from '@@/env'
import { render } from '@vue-email/render'
import TeamInvitation from '@@/emails/member-invite.vue'
import { sendEmail } from '@@/server/services/email'

export default defineEventHandler(async (event) => {
  // 1. Validate team ownership and get team details
  const teamId = getRouterParam(event, 'id')
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Team ID is required',
    })
  }
  const { user, team } = await validateTeamOwnership(event, teamId)

  // 2. Validate request body
  const body = await validateBody(event, inviteTeamMemberSchema)

  // 3. Check if user already exists
  const existingUser = await findUserByEmail(body.email)

  // 4. Generate invitation token
  const inviteToken = generateAlphaNumericCode(32)

  // 5. Create team invitation
  const invitation = await inviteTeamMember({
    teamId: team.id,
    email: body.email,
    role: body.role || 'member',
    token: inviteToken,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
  })

  // 6. Send invitation email
  const htmlTemplate = await render(TeamInvitation, {
    organizationName: team.name,
    inviterName: user.name,
    inviteLink: `${env.BASE_URL}/api/teams/verify-invite?token=${inviteToken}`,
  })

  if (env.MOCK_EMAIL) {
    console.table({
      email: body.email,
      teamName: team.name,
      inviterName: user.name,
      inviteLink: `${env.BASE_URL}/api/teams/verify-invite?token=${inviteToken}`,
    })
  } else {
    await sendEmail({
      to: body.email,
      subject: `Invitation to join ${team.name} on ${env.APP_NAME}`,
      html: htmlTemplate,
    })
  }

  setResponseStatus(event, 201)
  return invitation
})

```
---
### filename: server/api/teams/[id]/posts/[id].delete.ts
```ts
import { deletePost } from '@@/server/database/queries/posts'

export default defineEventHandler(async (event) => {
  const { id: teamId, id: postId } = getRouterParams(event)
  const { user } = await requireUserSession(event)
  const post = await deletePost(postId, teamId, user.id)
  return post
})

```
---
### filename: server/api/teams/[id]/posts/[id].get.ts
```ts
import { getPostById } from '@@/server/database/queries/posts'

export default defineEventHandler(async (event) => {
  const { id: teamId, id: postId } = getRouterParams(event)
  const { user } = await requireUserSession(event)
  const post = await getPostById(postId, teamId, user.id)
  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Post not found',
    })
  }
  return post
})

```
---
### filename: server/api/teams/[id]/posts/[id].patch.ts
```ts
import { updatePost } from '@@/server/database/queries/posts'
import type { Post } from '@@/types/database'

export default defineEventHandler(async (event) => {
  const { id: teamId, id: postId } = getRouterParams(event)
  const { user } = await requireUserSession(event)
  const body = await readBody<Partial<Post>>(event)
  
  const post = await updatePost(postId, teamId, user.id, {
    title: body.title,
    content: body.content,
  })
  return post
})

```
---
### filename: server/api/teams/[id]/posts/index.get.ts
```ts
import { getAllPosts } from '@@/server/database/queries/posts'

export default defineEventHandler(async (event) => {
  const { id: teamId } = getRouterParams(event)
  const { user } = await requireUserSession(event)
  const posts = await getAllPosts(teamId, user.id)
  return posts
})

```
---
### filename: server/api/teams/[id]/posts/index.post.ts
```ts
import { createPost } from '@@/server/database/queries/posts'
import type { InsertPost } from '@@/types/database'
export default defineEventHandler(async (event) => {
  const { id: teamId } = getRouterParams(event)
  const { user } = await requireUserSession(event)
  const { title, content } = await readBody<InsertPost>(event)
  const payload = {
    title,
    content,
    teamId,
    userId: user.id,
  }
  const post = await createPost(payload)
  return post
})

```
---
### filename: server/api/teams/index.get.ts
```ts

```
---
### filename: server/api/teams/index.post.ts
```ts
import { createTeam } from '@@/server/database/queries/teams'
import { createTeamSchema } from '@@/shared/validations/team'
import { validateBody } from '@@/server/utils/bodyValidation'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const body = await validateBody(event, createTeamSchema)
  const team = await createTeam({
    name: body.name,
    ownerId: user.id,
    slug: body.slug,
    logo: body.logo,
  })
  return team
})

```
---
### filename: server/api/teams/verify-invite.get.ts
```ts
import {
  getInvite,
  updateInviteStatus,
  addUserToTeam,
  isUserAlreadyInTeam,
} from '@@/server/database/queries/teams'
import { z } from 'zod'
// Define invite status types for better type safety
type InviteStatus = (typeof INVALID_STATUSES)[number]
const INVALID_STATUSES = ['accepted', 'rejected', 'cancelled'] as const

const querySchema = z.object({
  token: z.string().length(32, 'Invalid token'),
})

export default defineEventHandler(async (event) => {
  // 1. Validate token with type checking
  const { token } = await getValidatedQuery(event, querySchema.parse)

  // 2. Get and validate invite
  const invite = await getInvite(token)
  if (!invite) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Invite not found or invalid',
    })
  }

  // 3. Check invite validity
  if (invite.expiresAt < new Date()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invite expired',
    })
  }

  if (INVALID_STATUSES.includes(invite.status as InviteStatus)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invite already ${invite.status}`,
    })
  }

  // 4. Validate user session and permissions
  const session = await getUserSession(event)
  if (!session?.user) {
    setCookie(event, 'invite-token', token, {
      maxAge: 60 * 60 * 24, // discard cookie after 1 day
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'lax',
    })
    return sendRedirect(event, '/auth/login', 302)
  }

  // 5. Check if user is already a team member
  const isAlreadyMember = await isUserAlreadyInTeam(
    invite.teamId,
    session.user.id,
  )
  if (isAlreadyMember) {
    throw createError({
      statusCode: 400,
      statusMessage: 'You are already a member of this team',
    })
  }

  // 6. Validate invite belongs to correct user
  if (invite.email !== session.user.email) {
    // Invite belongs to a different user
    throw createError({
      statusCode: 403,
      statusMessage: 'Invalid invite',
    })
  }

  // 7. Process invite acceptance
  await addUserToTeam(invite.teamId, session.user.id)
  await updateInviteStatus(invite.id, 'accepted')

  return sendRedirect(event, '/dashboard', 302)
})

```
---
### filename: server/api/upload-image.post.ts
```ts
export default defineEventHandler(async (event) => {
  await requireUserSession(event)
  const form = await readFormData(event)
  const image = form.get('image')
  if (!(image instanceof Blob)) {
    throw new Error('Image is not a Blob')
  }
  ensureBlob(image, {
    maxSize: '1MB',
    types: ['image/png', 'image/jpeg', 'image/webp'],
  })

  const file = await hubBlob().put(image.name, image, {
    addRandomSuffix: true,
  })
  return file.pathname
})

```
---
### filename: server/database/migrations/0000_thin_harpoon.sql
```sql
CREATE TABLE `feedback` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`feedback` text NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `waitlist` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`referrer` text,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `waitlist_email_unique` ON `waitlist` (`email`);--> statement-breakpoint
CREATE TABLE `chats` (
	`id` text PRIMARY KEY NOT NULL,
	`team_id` text NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` text PRIMARY KEY NOT NULL,
	`chat_id` text NOT NULL,
	`user_id` text NOT NULL,
	`role` text NOT NULL,
	`content` text NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`chat_id`) REFERENCES `chats`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `public_chats` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`author` text NOT NULL,
	`author_avatar` text NOT NULL,
	`messages` text DEFAULT '[]' NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `email_verification_codes` (
	`id` integer PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`code` text(32) NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `oauth_accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`provider` text NOT NULL,
	`providerUserId` text NOT NULL,
	`userId` text NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `one_time_passwords` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`identifier` text NOT NULL,
	`code` text(6) NOT NULL,
	`type` text DEFAULT 'SIGNUP' NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `password_reset_tokens` (
	`id` integer PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`code` text(32) NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `webauthn_challenges` (
	`id` text PRIMARY KEY NOT NULL,
	`challenge` text NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `webauthn_credentials` (
	`user_id` text NOT NULL,
	`id` text NOT NULL,
	`name` text NOT NULL,
	`public_key` text NOT NULL,
	`counter` integer NOT NULL,
	`backed_up` integer NOT NULL,
	`transports` text NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `webauthn_credentials_id_unique` ON `webauthn_credentials` (`id`);--> statement-breakpoint
CREATE TABLE `customers` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`team_id` text,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `images` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`contentType` text,
	`pathname` text NOT NULL,
	`size` integer,
	`uploaded_at` integer,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`teamId` text NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`teamId`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `team_invites` (
	`id` text PRIMARY KEY NOT NULL,
	`teamId` text NOT NULL,
	`email` text NOT NULL,
	`role` text DEFAULT 'member' NOT NULL,
	`token` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`teamId`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `team_members` (
	`id` text PRIMARY KEY NOT NULL,
	`teamId` text NOT NULL,
	`userId` text NOT NULL,
	`role` text DEFAULT 'member' NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`teamId`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `teams` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`ownerId` text NOT NULL,
	`logo` text,
	`slug` text NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`avatarUrl` text DEFAULT '',
	`hashedPassword` text,
	`banned` integer DEFAULT false NOT NULL,
	`bannedReason` text,
	`emailVerified` integer DEFAULT false NOT NULL,
	`phoneNumber` text,
	`bannedUntil` integer,
	`onboarded` integer DEFAULT false NOT NULL,
	`proAccount` integer DEFAULT false NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	`last_active` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_phoneNumber_unique` ON `users` (`phoneNumber`);--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`active` integer DEFAULT true NOT NULL,
	`image` text,
	`metadata` text,
	`product_orders` integer DEFAULT 0 NOT NULL,
	`features` text,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `prices` (
	`id` text PRIMARY KEY NOT NULL,
	`description` text,
	`currency` text NOT NULL,
	`unit_amount` integer NOT NULL,
	`type` text NOT NULL,
	`interval` text NOT NULL,
	`interval_count` integer NOT NULL,
	`trial_period_days` integer,
	`active` integer DEFAULT true NOT NULL,
	`metadata` text,
	`product_id` text NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` text PRIMARY KEY NOT NULL,
	`customer_id` text,
	`price_id` text,
	`team_id` text,
	`user_id` text,
	`status` text NOT NULL,
	`metadata` text,
	`quantity` integer NOT NULL,
	`cancel_at_period_end` integer NOT NULL,
	`current_period_end` integer,
	`current_period_start` integer,
	`ended_at` integer,
	`cancel_at` integer,
	`trial_start` integer,
	`trial_end` integer,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`price_id`) REFERENCES `prices`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);

```
---
### filename: server/database/migrations/0001_round_leader.sql
```sql
DROP TABLE `chats`;--> statement-breakpoint
DROP TABLE `messages`;--> statement-breakpoint
DROP TABLE `public_chats`;
```
---
### filename: server/database/migrations/meta/0000_snapshot.json
```json
{
  "version": "6",
  "dialect": "sqlite",
  "id": "4c73b0ea-5606-4418-878a-aa0f5f46610f",
  "prevId": "00000000-0000-0000-0000-000000000000",
  "tables": {
    "feedback": {
      "name": "feedback",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "userId": {
          "name": "userId",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "feedback": {
          "name": "feedback",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "feedback_userId_users_id_fk": {
          "name": "feedback_userId_users_id_fk",
          "tableFrom": "feedback",
          "tableTo": "users",
          "columnsFrom": [
            "userId"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "waitlist": {
      "name": "waitlist",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "email": {
          "name": "email",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "referrer": {
          "name": "referrer",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {
        "waitlist_email_unique": {
          "name": "waitlist_email_unique",
          "columns": [
            "email"
          ],
          "isUnique": true
        }
      },
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "chats": {
      "name": "chats",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "team_id": {
          "name": "team_id",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "user_id": {
          "name": "user_id",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "title": {
          "name": "title",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "chats_team_id_teams_id_fk": {
          "name": "chats_team_id_teams_id_fk",
          "tableFrom": "chats",
          "tableTo": "teams",
          "columnsFrom": [
            "team_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        },
        "chats_user_id_users_id_fk": {
          "name": "chats_user_id_users_id_fk",
          "tableFrom": "chats",
          "tableTo": "users",
          "columnsFrom": [
            "user_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "messages": {
      "name": "messages",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "chat_id": {
          "name": "chat_id",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "user_id": {
          "name": "user_id",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "content": {
          "name": "content",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "messages_chat_id_chats_id_fk": {
          "name": "messages_chat_id_chats_id_fk",
          "tableFrom": "messages",
          "tableTo": "chats",
          "columnsFrom": [
            "chat_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        },
        "messages_user_id_users_id_fk": {
          "name": "messages_user_id_users_id_fk",
          "tableFrom": "messages",
          "tableTo": "users",
          "columnsFrom": [
            "user_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "public_chats": {
      "name": "public_chats",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "title": {
          "name": "title",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "author": {
          "name": "author",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "author_avatar": {
          "name": "author_avatar",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "messages": {
          "name": "messages",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'[]'"
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "email_verification_codes": {
      "name": "email_verification_codes",
      "columns": {
        "id": {
          "name": "id",
          "type": "integer",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "userId": {
          "name": "userId",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "code": {
          "name": "code",
          "type": "text(32)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "expires_at": {
          "name": "expires_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "email_verification_codes_userId_users_id_fk": {
          "name": "email_verification_codes_userId_users_id_fk",
          "tableFrom": "email_verification_codes",
          "tableTo": "users",
          "columnsFrom": [
            "userId"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "oauth_accounts": {
      "name": "oauth_accounts",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "provider": {
          "name": "provider",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "providerUserId": {
          "name": "providerUserId",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "userId": {
          "name": "userId",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "oauth_accounts_userId_users_id_fk": {
          "name": "oauth_accounts_userId_users_id_fk",
          "tableFrom": "oauth_accounts",
          "tableTo": "users",
          "columnsFrom": [
            "userId"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "one_time_passwords": {
      "name": "one_time_passwords",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "userId": {
          "name": "userId",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "identifier": {
          "name": "identifier",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "code": {
          "name": "code",
          "type": "text(6)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "type": {
          "name": "type",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'SIGNUP'"
        },
        "expires_at": {
          "name": "expires_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "one_time_passwords_userId_users_id_fk": {
          "name": "one_time_passwords_userId_users_id_fk",
          "tableFrom": "one_time_passwords",
          "tableTo": "users",
          "columnsFrom": [
            "userId"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "password_reset_tokens": {
      "name": "password_reset_tokens",
      "columns": {
        "id": {
          "name": "id",
          "type": "integer",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "userId": {
          "name": "userId",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "code": {
          "name": "code",
          "type": "text(32)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "expires_at": {
          "name": "expires_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "password_reset_tokens_userId_users_id_fk": {
          "name": "password_reset_tokens_userId_users_id_fk",
          "tableFrom": "password_reset_tokens",
          "tableTo": "users",
          "columnsFrom": [
            "userId"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "webauthn_challenges": {
      "name": "webauthn_challenges",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "challenge": {
          "name": "challenge",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "expires_at": {
          "name": "expires_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "webauthn_credentials": {
      "name": "webauthn_credentials",
      "columns": {
        "user_id": {
          "name": "user_id",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "public_key": {
          "name": "public_key",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "counter": {
          "name": "counter",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "backed_up": {
          "name": "backed_up",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "transports": {
          "name": "transports",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {
        "webauthn_credentials_id_unique": {
          "name": "webauthn_credentials_id_unique",
          "columns": [
            "id"
          ],
          "isUnique": true
        }
      },
      "foreignKeys": {
        "webauthn_credentials_user_id_users_id_fk": {
          "name": "webauthn_credentials_user_id_users_id_fk",
          "tableFrom": "webauthn_credentials",
          "tableTo": "users",
          "columnsFrom": [
            "user_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "customers": {
      "name": "customers",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "user_id": {
          "name": "user_id",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "team_id": {
          "name": "team_id",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "customers_user_id_users_id_fk": {
          "name": "customers_user_id_users_id_fk",
          "tableFrom": "customers",
          "tableTo": "users",
          "columnsFrom": [
            "user_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "customers_team_id_teams_id_fk": {
          "name": "customers_team_id_teams_id_fk",
          "tableFrom": "customers",
          "tableTo": "teams",
          "columnsFrom": [
            "team_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "images": {
      "name": "images",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "userId": {
          "name": "userId",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "contentType": {
          "name": "contentType",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "pathname": {
          "name": "pathname",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "size": {
          "name": "size",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "uploaded_at": {
          "name": "uploaded_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "images_userId_users_id_fk": {
          "name": "images_userId_users_id_fk",
          "tableFrom": "images",
          "tableTo": "users",
          "columnsFrom": [
            "userId"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "posts": {
      "name": "posts",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "userId": {
          "name": "userId",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "teamId": {
          "name": "teamId",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "title": {
          "name": "title",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "content": {
          "name": "content",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "posts_userId_users_id_fk": {
          "name": "posts_userId_users_id_fk",
          "tableFrom": "posts",
          "tableTo": "users",
          "columnsFrom": [
            "userId"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        },
        "posts_teamId_teams_id_fk": {
          "name": "posts_teamId_teams_id_fk",
          "tableFrom": "posts",
          "tableTo": "teams",
          "columnsFrom": [
            "teamId"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "team_invites": {
      "name": "team_invites",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "teamId": {
          "name": "teamId",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "email": {
          "name": "email",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'member'"
        },
        "token": {
          "name": "token",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "status": {
          "name": "status",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'pending'"
        },
        "expires_at": {
          "name": "expires_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "team_invites_teamId_teams_id_fk": {
          "name": "team_invites_teamId_teams_id_fk",
          "tableFrom": "team_invites",
          "tableTo": "teams",
          "columnsFrom": [
            "teamId"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "team_members": {
      "name": "team_members",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "teamId": {
          "name": "teamId",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "userId": {
          "name": "userId",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'member'"
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "team_members_teamId_teams_id_fk": {
          "name": "team_members_teamId_teams_id_fk",
          "tableFrom": "team_members",
          "tableTo": "teams",
          "columnsFrom": [
            "teamId"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        },
        "team_members_userId_users_id_fk": {
          "name": "team_members_userId_users_id_fk",
          "tableFrom": "team_members",
          "tableTo": "users",
          "columnsFrom": [
            "userId"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "teams": {
      "name": "teams",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "ownerId": {
          "name": "ownerId",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "logo": {
          "name": "logo",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "slug": {
          "name": "slug",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "teams_ownerId_users_id_fk": {
          "name": "teams_ownerId_users_id_fk",
          "tableFrom": "teams",
          "tableTo": "users",
          "columnsFrom": [
            "ownerId"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "users": {
      "name": "users",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "email": {
          "name": "email",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "avatarUrl": {
          "name": "avatarUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false,
          "default": "''"
        },
        "hashedPassword": {
          "name": "hashedPassword",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "banned": {
          "name": "banned",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "bannedReason": {
          "name": "bannedReason",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "emailVerified": {
          "name": "emailVerified",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "phoneNumber": {
          "name": "phoneNumber",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "bannedUntil": {
          "name": "bannedUntil",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "onboarded": {
          "name": "onboarded",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "proAccount": {
          "name": "proAccount",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "last_active": {
          "name": "last_active",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {
        "users_email_unique": {
          "name": "users_email_unique",
          "columns": [
            "email"
          ],
          "isUnique": true
        },
        "users_phoneNumber_unique": {
          "name": "users_phoneNumber_unique",
          "columns": [
            "phoneNumber"
          ],
          "isUnique": true
        }
      },
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "products": {
      "name": "products",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "description": {
          "name": "description",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "active": {
          "name": "active",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": true
        },
        "image": {
          "name": "image",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "metadata": {
          "name": "metadata",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "product_orders": {
          "name": "product_orders",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "features": {
          "name": "features",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "prices": {
      "name": "prices",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "description": {
          "name": "description",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "currency": {
          "name": "currency",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "unit_amount": {
          "name": "unit_amount",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "type": {
          "name": "type",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "interval": {
          "name": "interval",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "interval_count": {
          "name": "interval_count",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "trial_period_days": {
          "name": "trial_period_days",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "active": {
          "name": "active",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": true
        },
        "metadata": {
          "name": "metadata",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "product_id": {
          "name": "product_id",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "prices_product_id_products_id_fk": {
          "name": "prices_product_id_products_id_fk",
          "tableFrom": "prices",
          "tableTo": "products",
          "columnsFrom": [
            "product_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "subscriptions": {
      "name": "subscriptions",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "customer_id": {
          "name": "customer_id",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "price_id": {
          "name": "price_id",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "team_id": {
          "name": "team_id",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "user_id": {
          "name": "user_id",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "status": {
          "name": "status",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "metadata": {
          "name": "metadata",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "quantity": {
          "name": "quantity",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "cancel_at_period_end": {
          "name": "cancel_at_period_end",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "current_period_end": {
          "name": "current_period_end",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "current_period_start": {
          "name": "current_period_start",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "ended_at": {
          "name": "ended_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "cancel_at": {
          "name": "cancel_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "trial_start": {
          "name": "trial_start",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "trial_end": {
          "name": "trial_end",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "subscriptions_customer_id_customers_id_fk": {
          "name": "subscriptions_customer_id_customers_id_fk",
          "tableFrom": "subscriptions",
          "tableTo": "customers",
          "columnsFrom": [
            "customer_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "subscriptions_price_id_prices_id_fk": {
          "name": "subscriptions_price_id_prices_id_fk",
          "tableFrom": "subscriptions",
          "tableTo": "prices",
          "columnsFrom": [
            "price_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "subscriptions_team_id_teams_id_fk": {
          "name": "subscriptions_team_id_teams_id_fk",
          "tableFrom": "subscriptions",
          "tableTo": "teams",
          "columnsFrom": [
            "team_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "subscriptions_user_id_users_id_fk": {
          "name": "subscriptions_user_id_users_id_fk",
          "tableFrom": "subscriptions",
          "tableTo": "users",
          "columnsFrom": [
            "user_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    }
  },
  "views": {},
  "enums": {},
  "_meta": {
    "schemas": {},
    "tables": {},
    "columns": {}
  },
  "internal": {
    "indexes": {}
  }
}
```
---
### filename: server/database/migrations/meta/0001_snapshot.json
```json
{
  "version": "6",
  "dialect": "sqlite",
  "id": "3409255b-9dba-45df-bc5e-498ace9aac06",
  "prevId": "4c73b0ea-5606-4418-878a-aa0f5f46610f",
  "tables": {
    "feedback": {
      "name": "feedback",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "userId": {
          "name": "userId",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "feedback": {
          "name": "feedback",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "feedback_userId_users_id_fk": {
          "name": "feedback_userId_users_id_fk",
          "tableFrom": "feedback",
          "tableTo": "users",
          "columnsFrom": [
            "userId"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "waitlist": {
      "name": "waitlist",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "email": {
          "name": "email",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "referrer": {
          "name": "referrer",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {
        "waitlist_email_unique": {
          "name": "waitlist_email_unique",
          "columns": [
            "email"
          ],
          "isUnique": true
        }
      },
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "email_verification_codes": {
      "name": "email_verification_codes",
      "columns": {
        "id": {
          "name": "id",
          "type": "integer",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "userId": {
          "name": "userId",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "code": {
          "name": "code",
          "type": "text(32)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "expires_at": {
          "name": "expires_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "email_verification_codes_userId_users_id_fk": {
          "name": "email_verification_codes_userId_users_id_fk",
          "tableFrom": "email_verification_codes",
          "tableTo": "users",
          "columnsFrom": [
            "userId"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "oauth_accounts": {
      "name": "oauth_accounts",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "provider": {
          "name": "provider",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "providerUserId": {
          "name": "providerUserId",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "userId": {
          "name": "userId",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "oauth_accounts_userId_users_id_fk": {
          "name": "oauth_accounts_userId_users_id_fk",
          "tableFrom": "oauth_accounts",
          "tableTo": "users",
          "columnsFrom": [
            "userId"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "one_time_passwords": {
      "name": "one_time_passwords",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "userId": {
          "name": "userId",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "identifier": {
          "name": "identifier",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "code": {
          "name": "code",
          "type": "text(6)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "type": {
          "name": "type",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'SIGNUP'"
        },
        "expires_at": {
          "name": "expires_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "one_time_passwords_userId_users_id_fk": {
          "name": "one_time_passwords_userId_users_id_fk",
          "tableFrom": "one_time_passwords",
          "tableTo": "users",
          "columnsFrom": [
            "userId"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "password_reset_tokens": {
      "name": "password_reset_tokens",
      "columns": {
        "id": {
          "name": "id",
          "type": "integer",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "userId": {
          "name": "userId",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "code": {
          "name": "code",
          "type": "text(32)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "expires_at": {
          "name": "expires_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "password_reset_tokens_userId_users_id_fk": {
          "name": "password_reset_tokens_userId_users_id_fk",
          "tableFrom": "password_reset_tokens",
          "tableTo": "users",
          "columnsFrom": [
            "userId"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "webauthn_challenges": {
      "name": "webauthn_challenges",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "challenge": {
          "name": "challenge",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "expires_at": {
          "name": "expires_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "webauthn_credentials": {
      "name": "webauthn_credentials",
      "columns": {
        "user_id": {
          "name": "user_id",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "public_key": {
          "name": "public_key",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "counter": {
          "name": "counter",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "backed_up": {
          "name": "backed_up",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "transports": {
          "name": "transports",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {
        "webauthn_credentials_id_unique": {
          "name": "webauthn_credentials_id_unique",
          "columns": [
            "id"
          ],
          "isUnique": true
        }
      },
      "foreignKeys": {
        "webauthn_credentials_user_id_users_id_fk": {
          "name": "webauthn_credentials_user_id_users_id_fk",
          "tableFrom": "webauthn_credentials",
          "tableTo": "users",
          "columnsFrom": [
            "user_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "customers": {
      "name": "customers",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "user_id": {
          "name": "user_id",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "team_id": {
          "name": "team_id",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "customers_user_id_users_id_fk": {
          "name": "customers_user_id_users_id_fk",
          "tableFrom": "customers",
          "tableTo": "users",
          "columnsFrom": [
            "user_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "customers_team_id_teams_id_fk": {
          "name": "customers_team_id_teams_id_fk",
          "tableFrom": "customers",
          "tableTo": "teams",
          "columnsFrom": [
            "team_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "images": {
      "name": "images",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "userId": {
          "name": "userId",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "contentType": {
          "name": "contentType",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "pathname": {
          "name": "pathname",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "size": {
          "name": "size",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "uploaded_at": {
          "name": "uploaded_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "images_userId_users_id_fk": {
          "name": "images_userId_users_id_fk",
          "tableFrom": "images",
          "tableTo": "users",
          "columnsFrom": [
            "userId"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "posts": {
      "name": "posts",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "userId": {
          "name": "userId",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "teamId": {
          "name": "teamId",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "title": {
          "name": "title",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "content": {
          "name": "content",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "posts_userId_users_id_fk": {
          "name": "posts_userId_users_id_fk",
          "tableFrom": "posts",
          "tableTo": "users",
          "columnsFrom": [
            "userId"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        },
        "posts_teamId_teams_id_fk": {
          "name": "posts_teamId_teams_id_fk",
          "tableFrom": "posts",
          "tableTo": "teams",
          "columnsFrom": [
            "teamId"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "team_invites": {
      "name": "team_invites",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "teamId": {
          "name": "teamId",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "email": {
          "name": "email",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'member'"
        },
        "token": {
          "name": "token",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "status": {
          "name": "status",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'pending'"
        },
        "expires_at": {
          "name": "expires_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "team_invites_teamId_teams_id_fk": {
          "name": "team_invites_teamId_teams_id_fk",
          "tableFrom": "team_invites",
          "tableTo": "teams",
          "columnsFrom": [
            "teamId"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "team_members": {
      "name": "team_members",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "teamId": {
          "name": "teamId",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "userId": {
          "name": "userId",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'member'"
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "team_members_teamId_teams_id_fk": {
          "name": "team_members_teamId_teams_id_fk",
          "tableFrom": "team_members",
          "tableTo": "teams",
          "columnsFrom": [
            "teamId"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        },
        "team_members_userId_users_id_fk": {
          "name": "team_members_userId_users_id_fk",
          "tableFrom": "team_members",
          "tableTo": "users",
          "columnsFrom": [
            "userId"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "teams": {
      "name": "teams",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "ownerId": {
          "name": "ownerId",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "logo": {
          "name": "logo",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "slug": {
          "name": "slug",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "teams_ownerId_users_id_fk": {
          "name": "teams_ownerId_users_id_fk",
          "tableFrom": "teams",
          "tableTo": "users",
          "columnsFrom": [
            "ownerId"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "users": {
      "name": "users",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "email": {
          "name": "email",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "avatarUrl": {
          "name": "avatarUrl",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false,
          "default": "''"
        },
        "hashedPassword": {
          "name": "hashedPassword",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "banned": {
          "name": "banned",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "bannedReason": {
          "name": "bannedReason",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "emailVerified": {
          "name": "emailVerified",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "phoneNumber": {
          "name": "phoneNumber",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "bannedUntil": {
          "name": "bannedUntil",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "onboarded": {
          "name": "onboarded",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "proAccount": {
          "name": "proAccount",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "last_active": {
          "name": "last_active",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {
        "users_email_unique": {
          "name": "users_email_unique",
          "columns": [
            "email"
          ],
          "isUnique": true
        },
        "users_phoneNumber_unique": {
          "name": "users_phoneNumber_unique",
          "columns": [
            "phoneNumber"
          ],
          "isUnique": true
        }
      },
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "products": {
      "name": "products",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "description": {
          "name": "description",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "active": {
          "name": "active",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": true
        },
        "image": {
          "name": "image",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "metadata": {
          "name": "metadata",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "product_orders": {
          "name": "product_orders",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": 0
        },
        "features": {
          "name": "features",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "prices": {
      "name": "prices",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "description": {
          "name": "description",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "currency": {
          "name": "currency",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "unit_amount": {
          "name": "unit_amount",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "type": {
          "name": "type",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "interval": {
          "name": "interval",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "interval_count": {
          "name": "interval_count",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "trial_period_days": {
          "name": "trial_period_days",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "active": {
          "name": "active",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": true
        },
        "metadata": {
          "name": "metadata",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "product_id": {
          "name": "product_id",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "prices_product_id_products_id_fk": {
          "name": "prices_product_id_products_id_fk",
          "tableFrom": "prices",
          "tableTo": "products",
          "columnsFrom": [
            "product_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    },
    "subscriptions": {
      "name": "subscriptions",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true,
          "autoincrement": false
        },
        "customer_id": {
          "name": "customer_id",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "price_id": {
          "name": "price_id",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "team_id": {
          "name": "team_id",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "user_id": {
          "name": "user_id",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "status": {
          "name": "status",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "metadata": {
          "name": "metadata",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "quantity": {
          "name": "quantity",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "cancel_at_period_end": {
          "name": "cancel_at_period_end",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "current_period_end": {
          "name": "current_period_end",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "current_period_start": {
          "name": "current_period_start",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "ended_at": {
          "name": "ended_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "cancel_at": {
          "name": "cancel_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "trial_start": {
          "name": "trial_start",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "trial_end": {
          "name": "trial_end",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "subscriptions_customer_id_customers_id_fk": {
          "name": "subscriptions_customer_id_customers_id_fk",
          "tableFrom": "subscriptions",
          "tableTo": "customers",
          "columnsFrom": [
            "customer_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "subscriptions_price_id_prices_id_fk": {
          "name": "subscriptions_price_id_prices_id_fk",
          "tableFrom": "subscriptions",
          "tableTo": "prices",
          "columnsFrom": [
            "price_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "subscriptions_team_id_teams_id_fk": {
          "name": "subscriptions_team_id_teams_id_fk",
          "tableFrom": "subscriptions",
          "tableTo": "teams",
          "columnsFrom": [
            "team_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "subscriptions_user_id_users_id_fk": {
          "name": "subscriptions_user_id_users_id_fk",
          "tableFrom": "subscriptions",
          "tableTo": "users",
          "columnsFrom": [
            "user_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "checkConstraints": {}
    }
  },
  "views": {},
  "enums": {},
  "_meta": {
    "schemas": {},
    "tables": {},
    "columns": {}
  },
  "internal": {
    "indexes": {}
  }
}
```
---
### filename: server/database/migrations/meta/_journal.json
```json
{
  "version": "7",
  "dialect": "sqlite",
  "entries": [
    {
      "idx": 0,
      "version": "6",
      "when": 1739102033602,
      "tag": "0000_thin_harpoon",
      "breakpoints": true
    },
    {
      "idx": 1,
      "version": "6",
      "when": 1739266313939,
      "tag": "0001_round_leader",
      "breakpoints": true
    }
  ]
}
```
---
### filename: server/database/queries/auth.ts
```ts
import { eq } from 'drizzle-orm'
import type { InsertEmailVerificationCodes, InsertOneTimePasswords } from '@@/types/database'
import { generateAlphaNumericCode } from '@@/server/utils/nanoid'

export const saveEmailVerificationCode = async (
  payload: InsertEmailVerificationCodes,
) => {
  try {
    const record = await useDB()
      .insert(tables.emailVerificationCodes)
      .values(payload)
      .returning()
      .get()
    return record
  } catch (error) {
    console.error(error)
    throw new Error('Failed to create verification code')
  }
}

export const saveOneTimePassword = async (payload: InsertOneTimePasswords) => {
  try {
    const record = await useDB()
      .insert(tables.oneTimePasswords)
      .values(payload)
      .returning()
      .get()
    return record
  } catch (error) {
    console.error(error)
    throw new Error('Failed to create one time password')
  }
}

export const findEmailVerificationCode = async (token: string) => {
  try {
    const [record] = await useDB()
      .select()
      .from(tables.emailVerificationCodes)
      .where(eq(tables.emailVerificationCodes.code, token))
    return record || null
  } catch (error) {
    console.error(error)
    throw new Error('Failed to find verification code')
  }
}

export const deleteEmailVerificationCode = async (token: string) => {
  try {
    await useDB()
      .delete(tables.emailVerificationCodes)
      .where(eq(tables.emailVerificationCodes.code, token))
  } catch (error) {
    console.error(error)
    throw new Error('Failed to delete verification code')
  }
}

export const findOneTimePassword = async (code: string) => {
  try {
    const [record] = await useDB()
      .select()
      .from(tables.oneTimePasswords)
      .where(eq(tables.oneTimePasswords.code, code))
    return record || null
  } catch (error) {
    console.error(error)
    throw new Error('Failed to find one time password')
  }
}

export const deleteOneTimePassword = async (code: string) => {
  try {
    await useDB()
      .delete(tables.oneTimePasswords)
      .where(eq(tables.oneTimePasswords.code, code))
  } catch (error) {
    console.error(error)
    throw new Error('Failed to delete one time password')
  }
}

export const createPasswordResetToken = async (userId: string) => {
  try {
    const token = generateAlphaNumericCode(32)
    const record = await useDB()
      .insert(tables.passwordResetTokens)
      .values({
        userId,
        code: token,
        expiresAt: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes
      })
      .returning()
      .get()
    return record
  } catch (error) {
    console.error(error)
    throw new Error('Failed to create password reset token')
  }
}

export const findPasswordResetToken = async (token: string) => {
  try {
    const [record] = await useDB()
      .select()
      .from(tables.passwordResetTokens)
      .where(eq(tables.passwordResetTokens.code, token))
    return record || null
  } catch (error) {
    console.error(error)
    throw new Error('Failed to find password reset token')
  }
}

export const deletePasswordResetToken = async (token: string) => {
  try {
    await useDB()
      .delete(tables.passwordResetTokens)
      .where(eq(tables.passwordResetTokens.code, token))
  } catch (error) {
    console.error(error)
    throw new Error('Failed to delete password reset token')
  }
}

```
---
### filename: server/database/queries/customers.ts
```ts
import { eq } from 'drizzle-orm'
import type { InsertCustomer, Customer } from '@@/types/database'
import { createError } from 'h3'

export const getCustomerByTeamId = async (teamId: string) => {
  try {
    const customer = await useDB().query.customers.findFirst({
      where: eq(tables.customers.teamId, teamId),
    })
    return customer
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to find customer by team ID',
    })
  }
}

export const createCustomer = async (
  payload: InsertCustomer,
): Promise<Customer> => {
  try {
    const customer = await useDB()
      .insert(tables.customers)
      .values(payload)
      .returning()
      .get()
    return customer
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create customer',
    })
  }
}

export const getCustomerById = async (id: string) => {
  try {
    const customer = await useDB().query.customers.findFirst({
      where: eq(tables.customers.id, id),
    })
    return customer
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to find customer by ID',
    })
  }
}

```
---
### filename: server/database/queries/passkeys.ts
```ts
import { eq, and, lt } from 'drizzle-orm'
import type {
  Passkey,
  InsertPasskey,
  InsertWebAuthnChallenge,
} from '@@/types/database'

export const findCredentialByUserId = async (
  userId: string,
): Promise<Passkey[]> => {
  try {
    const record = await useDB()
      .select()
      .from(tables.webAuthnCredentials)
      .where(eq(tables.webAuthnCredentials.userId, userId))
    return record
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to find credential by user id: ${error}`)
  }
}

export const createCredential = async (
  credential: InsertPasskey,
): Promise<Passkey> => {
  try {
    const record = await useDB()
      .insert(tables.webAuthnCredentials)
      .values(credential)
      .returning()
      .get()
    return record
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to create credential: ${error}`)
  }
}

export const storeWebAuthnChallenge = async (
  attemptId: string,
  challenge: string,
): Promise<void> => {
  try {
    const challengeData: InsertWebAuthnChallenge = {
      id: attemptId,
      challenge,
      expiresAt: new Date(Date.now() + 60000),
    }
    await useDB().insert(tables.webAuthnChallenges).values(challengeData)
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to store challenge: ${error}`)
  }
}

export const getAndDeleteChallenge = async (
  attemptId: string,
): Promise<string | undefined> => {
  try {
    // First, clean up expired challenges
    await useDB()
      .delete(tables.webAuthnChallenges)
      .where(lt(tables.webAuthnChallenges.expiresAt, new Date()))

    // Get the challenge
    const record = await useDB()
      .select()
      .from(tables.webAuthnChallenges)
      .where(eq(tables.webAuthnChallenges.id, attemptId))
      .get()

    if (record) {
      // Delete the challenge
      await useDB()
        .delete(tables.webAuthnChallenges)
        .where(eq(tables.webAuthnChallenges.id, attemptId))
    }

    return record?.challenge
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to get challenge: ${error}`)
  }
}

export const findCredentialById = async (
  credentialId: string,
): Promise<Passkey | null> => {
  try {
    const [record] = await useDB()
      .select()
      .from(tables.webAuthnCredentials)
      .where(eq(tables.webAuthnCredentials.id, credentialId))
    return record || null
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to find credential by id: ${error}`)
  }
}

export const deleteCredential = async (
  userId: string,
  credentialId: string,
): Promise<void> => {
  try {
    await useDB()
      .delete(tables.webAuthnCredentials)
      .where(
        and(
          eq(tables.webAuthnCredentials.userId, userId),
          eq(tables.webAuthnCredentials.id, credentialId),
        ),
      )
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to delete credential: ${error}`)
  }
}

```
---
### filename: server/database/queries/posts.ts
```ts
import { eq, and, desc } from 'drizzle-orm'
import type { InsertPost, Post } from '@@/types/database'
import { createError } from 'h3'

export const getAllPosts = async (teamId: string, userId: string) => {
  try {
    const posts = await useDB().query.posts.findMany({
      where: and(
        eq(tables.posts.teamId, teamId),
        eq(tables.posts.userId, userId),
      ),
      orderBy: [desc(tables.posts.createdAt)],
      with: {
        userId: {
          columns: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
      },
    })
    return posts
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get all posts',
    })
  }
}

export const createPost = async (post: InsertPost) => {
  try {
    const newPost = await useDB()
      .insert(tables.posts)
      .values(post)
      .returning()
      .get()
    return newPost
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create post',
    })
  }
}

export const getPostById = async (
  id: string,
  teamId: string,
  userId: string,
) => {
  try {
    const post = await useDB().query.posts.findFirst({
      where: and(
        eq(tables.posts.id, id),
        eq(tables.posts.teamId, teamId),
        eq(tables.posts.userId, userId),
      ),
    })
    return post
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get post by ID',
    })
  }
}

export const updatePost = async (
  id: string,
  teamId: string,
  userId: string,
  post: Partial<Post>,
) => {
  try {
    const updatedPost = await useDB()
      .update(tables.posts)
      .set(post)
      .where(
        and(
          eq(tables.posts.id, id),
          eq(tables.posts.teamId, teamId),
          eq(tables.posts.userId, userId),
        ),
      )
    return updatedPost
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update post',
    })
  }
}

export const deletePost = async (
  id: string,
  teamId: string,
  userId: string,
) => {
  try {
    const deletedPost = await useDB()
      .delete(tables.posts)
      .where(
        and(
          eq(tables.posts.id, id),
          eq(tables.posts.teamId, teamId),
          eq(tables.posts.userId, userId),
        ),
      )
    return deletedPost
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete post',
    })
  }
}

```
---
### filename: server/database/queries/stripe.ts
```ts
import { eq } from 'drizzle-orm'
import type { InsertProduct, InsertPrice } from '@@/types/database'

export const createOrUpdateStripeProduct = async (
  payload: InsertProduct,
) => {
  const product = await useDB()
    .insert(tables.products)
    .values(payload)
    .onConflictDoUpdate({
      target: [tables.products.id],
      set: payload,
    })
    .returning()
    .get()
  return product
}

export const createOrUpdateStripePrice = async (payload: InsertPrice) => {
  const price = await useDB()
    .insert(tables.prices)
    .values(payload)
    .onConflictDoUpdate({
      target: [tables.prices.id],
      set: payload,
    })
    .returning()
    .get()
  return price
}

export const getAllPlans = async () => {
  const plans = await useDB().query.prices.findMany({
    with: {
      product: true,
    },
    orderBy: (prices, { asc }) => [asc(prices.unitAmount)],
  })
  return plans
}

```
---
### filename: server/database/queries/subscriptions.ts
```ts
import { eq, and } from 'drizzle-orm'
import type { InsertSubscription, Subscription } from '@@/types/database'
import { createError } from 'h3'

export const upsertSubscription = async (
  subscription: InsertSubscription,
): Promise<Subscription> => {
  try {
    const upsertedSubscription = await useDB()
      .insert(tables.subscriptions)
      .values(subscription)
      .onConflictDoUpdate({
        target: [tables.subscriptions.id],
        set: subscription,
      })
      .returning()
      .get()

    return upsertedSubscription
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to upsert subscription',
    })
  }
}

export const getSubscriptionByTeamId = async (
  teamId: string,
): Promise<Subscription | null> => {
  try {
    const subscription = await useDB().query.subscriptions.findFirst({
      where: and(eq(tables.subscriptions.teamId, teamId)),
      with: {
        price: true,
      },
    })
    return subscription ?? null
  } catch (error) {
    console.log('getSubscriptionByTeamId', teamId)
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get subscription by team ID',
    })
  }
}

```
---
### filename: server/database/queries/teams.ts
```ts
import { eq, or, and } from 'drizzle-orm'
import type {
  Team,
  InsertTeam,
  InsertTeamInvite,
  TeamInvite,
} from '@@/types/database'

export const findUserTeams = async (userId: string) => {
  try {
    const teams = await useDB()
      .select({
        id: tables.teams.id,
        name: tables.teams.name,
        ownerId: tables.teams.ownerId,
        logo: tables.teams.logo,
        createdAt: tables.teams.createdAt,
        updatedAt: tables.teams.updatedAt,
        role: tables.teamMembers.role,
        slug: tables.teams.slug,
      })
      .from(tables.teams)
      .leftJoin(
        tables.teamMembers,
        and(
          eq(tables.teams.id, tables.teamMembers.teamId),
          eq(tables.teamMembers.userId, userId),
        ),
      )
      .where(
        or(
          eq(tables.teams.ownerId, userId),
          eq(tables.teamMembers.userId, userId),
        ),
      )
      .groupBy(tables.teams.id)
    return teams
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to find user teams',
    })
  }
}

export const getTeam = async (teamId: string) => {
  const team = await useDB()
    .select()
    .from(tables.teams)
    .where(eq(tables.teams.id, teamId))
    .get()
  return team
}

export const createTeam = async (payload: InsertTeam) => {
  try {
    const team = await useDB()
      .insert(tables.teams)
      .values(payload)
      .returning()
      .get()

    await useDB().insert(tables.teamMembers).values({
      teamId: team.id,
      userId: payload.ownerId,
      role: 'owner',
    })

    return team
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error('Failed to create team')
  }
}

export const updateTeam = async (teamId: string, payload: Partial<Team>) => {
  try {
    const record = await useDB()
      .update(tables.teams)
      .set(payload)
      .where(eq(tables.teams.id, teamId))
      .returning()
      .get()
    return record
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update team',
    })
  }
}

export const deleteTeam = async (teamId: string) => {
  try {
    await useDB().delete(tables.teams).where(eq(tables.teams.id, teamId))
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete team',
    })
  }
}

export const inviteTeamMember = async (payload: InsertTeamInvite) => {
  try {
    const invite = await useDB()
      .insert(tables.teamInvites)
      .values(payload)
      .returning()
      .get()
    return invite
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to invite team member',
    })
  }
}

export const getActiveTeamMembers = async (teamId: string) => {
  const members = await useDB()
    .select({
      id: tables.teamMembers.id,
      teamId: tables.teamMembers.teamId,
      userId: tables.teamMembers.userId,
      role: tables.teamMembers.role,
      email: tables.users.email,
      name: tables.users.name,
      avatarUrl: tables.users.avatarUrl,
      lastLoginAt: tables.users.lastActive,
      createdAt: tables.teamMembers.createdAt,
    })
    .from(tables.teamMembers)
    .leftJoin(tables.users, eq(tables.teamMembers.userId, tables.users.id))
    .where(eq(tables.teamMembers.teamId, teamId))
  return members
}

export const getTeamInvites = async (teamId: string) => {
  const invites = await useDB()
    .select()
    .from(tables.teamInvites)
    .where(eq(tables.teamInvites.teamId, teamId))
  return invites
}

export const cancelInvite = async (inviteId: string) => {
  await useDB()
    .delete(tables.teamInvites)
    .where(eq(tables.teamInvites.id, inviteId))
}

export const getInvite = async (
  token: string,
): Promise<TeamInvite | undefined> => {
  const invite = await useDB()
    .select()
    .from(tables.teamInvites)
    .where(eq(tables.teamInvites.token, token))
    .get()
  return invite
}

export const updateInviteStatus = async (inviteId: string, status: string) => {
  await useDB()
    .update(tables.teamInvites)
    .set({ status })
    .where(eq(tables.teamInvites.id, inviteId))
}

export const addUserToTeam = async (teamId: string, userId: string) => {
  try {
    await useDB()
      .insert(tables.teamMembers)
      .values({ teamId, userId, role: 'member' })
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to add user to team',
    })
  }
}

export const isUserAlreadyInTeam = async (teamId: string, userId: string) => {
  try {
    const member = await useDB()
      .select({ id: tables.teamMembers.id })
      .from(tables.teamMembers)
      .where(
        and(
          eq(tables.teamMembers.teamId, teamId),
          eq(tables.teamMembers.userId, userId),
        ),
      )
      .get()

    return !!member
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to check if user is already in team',
    })
  }
}

export const findTeamInvite = async (inviteId: string) => {
  const invite = await useDB()
    .select()
    .from(tables.teamInvites)
    .where(eq(tables.teamInvites.id, inviteId))
    .get()
  return invite
}

export const updateTeamInvite = async (
  inviteId: string,
  payload: Partial<TeamInvite>,
) => {
  await useDB()
    .update(tables.teamInvites)
    .set(payload)
    .where(eq(tables.teamInvites.id, inviteId))
}

export const deleteTeamMember = async (teamId: string, memberId: string) => {
  try {
    await useDB()
      .delete(tables.teamMembers)
      .where(
        and(
          eq(tables.teamMembers.teamId, teamId),
          eq(tables.teamMembers.id, memberId),
        ),
      )
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete team member',
    })
  }
}

```
---
### filename: server/database/queries/users.ts
```ts
import { eq } from 'drizzle-orm'
import type { User, InsertUser } from '@@/types/database'

export const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const [existingUser] = await useDB()
      .select()
      .from(tables.users)
      .where(eq(tables.users.email, email))
    return existingUser || null
  } catch (error) {
    console.error(error)
    return null
  }
}

export const createUserWithPassword = async (payload: InsertUser) => {
  try {
    const record = await useDB()
      .insert(tables.users)
      .values(payload)
      .onConflictDoUpdate({
        target: tables.users.email,
        set: {
          name: payload.name,
          hashedPassword: payload.hashedPassword,
        },
      })
      .returning()
      .get()
    return record
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to upsert user',
    })
  }
}

export const findLinkedAccountsByUserId = async (userId: string) => {
  try {
    const linkedAccounts = await useDB()
      .select()
      .from(tables.oauthAccounts)
      .where(eq(tables.oauthAccounts.userId, userId))
    return linkedAccounts
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to find linked accounts by user ID',
    })
  }
}

export const updateLastActiveTimestamp = async (
  userId: string,
): Promise<InsertUser> => {
  try {
    const record = await useDB()
      .update(tables.users)
      .set({ lastActive: new Date() })
      .where(eq(tables.users.id, userId))
      .returning()
      .get()
    return record
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update last active',
    })
  }
}

export const findUserById = async (id: string) => {
  try {
    const [user] = await useDB()
      .select()
      .from(tables.users)
      .where(eq(tables.users.id, id))
    return user || null
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to find user by ID',
    })
  }
}

export const verifyUser = async (userId: string) => {
  try {
    const record = await useDB()
      .update(tables.users)
      .set({ emailVerified: true })
      .where(eq(tables.users.id, userId))
      .returning()
      .get()
    return record
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to verify user',
    })
  }
}

export const createUserWithOAuth = async (payload: InsertUser) => {
  try {
    const record = await useDB()
      .insert(tables.users)
      .values(payload)
      .onConflictDoUpdate({
        target: tables.users.email,
        set: {
          name: payload.name,
          avatarUrl: payload.avatarUrl,
          emailVerified: true,
        },
      })
      .returning()
      .get()
    return record
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create user with OAuth',
    })
  }
}

export const updateUser = async (userId: string, payload: Partial<User>) => {
  try {
    const record = await useDB()
      .update(tables.users)
      .set(payload)
      .where(eq(tables.users.id, userId))
      .returning()
      .get()
    return record
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update user',
    })
  }
}

export const updateUserPassword = async (
  userId: string,
  hashedPassword: string,
) => {
  try {
    const record = await useDB()
      .update(tables.users)
      .set({ hashedPassword })
      .where(eq(tables.users.id, userId))
      .returning()
      .get()
    return record
  } catch (error) {
    console.error(error)
    throw new Error('Failed to update user password')
  }
}

export const linkOAuthAccount = async (
  userId: string,
  provider: string,
  providerUserId: string,
) => {
  try {
    const record = await useDB()
      .insert(tables.oauthAccounts)
      .values({
        userId,
        provider,
        providerUserId,
      })
      .onConflictDoNothing()
      .returning()
      .get()
    return record
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to link OAuth account',
    })
  }
}

export const findUserByPhoneNumber = async (phoneNumber: string) => {
  try {
    const [user] = await useDB()
      .select()
      .from(tables.users)
      .where(eq(tables.users.phoneNumber, phoneNumber))
    return user || null
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to find user by phone number',
    })
  }
}

export const getUserPreferences = async (userId: string) => {
  try {
    const preferences = await useDB()
      .select({
        theme: tables.users.theme,
        emailNotifications: tables.users.emailNotifications,
        pushNotifications: tables.users.pushNotifications,
        lastSelectedTeamId: tables.users.lastSelectedTeamId,
      })
      .from(tables.users)
      .where(eq(tables.users.id, userId))
    return preferences
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get user preferences',
    })
  }
}

```
---
### filename: server/database/schema/admin.ts
```ts
import { nanoid } from 'nanoid'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { users } from './users'

export const waitlist = sqliteTable('waitlist', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  email: text('email').notNull().unique(),
  referrer: text('referrer'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(
    () => new Date(),
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
})

export const feedback = sqliteTable('feedback', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  feedback: text('feedback').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(
    () => new Date(),
  ),
})

```
---
### filename: server/database/schema/auth.ts
```ts
import { nanoid } from 'nanoid'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { OneTimePasswordTypes } from '../../../constants'
import { users } from './users'
import type { WebAuthnCredential } from '#auth-utils'

export const oauthAccounts = sqliteTable('oauth_accounts', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  provider: text('provider').notNull(),
  providerUserId: text('providerUserId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(
    () => new Date(),
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
})

export const emailVerificationCodes = sqliteTable('email_verification_codes', {
  id: integer('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  code: text('code', { length: 32 }).notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
})

export const passwordResetTokens = sqliteTable('password_reset_tokens', {
  id: integer('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  code: text('code', { length: 32 }).notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
})

export const oneTimePasswords = sqliteTable('one_time_passwords', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  identifier: text('identifier').notNull(),
  code: text('code', { length: 6 }).notNull(),
  type: text('type').notNull().default(OneTimePasswordTypes.signup),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
})

export const webAuthnCredentials = sqliteTable('webauthn_credentials', {
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  id: text('id').notNull().unique(),
  name: text('name').notNull(),
  publicKey: text('public_key').notNull(),
  counter: integer('counter').notNull(),
  backedUp: integer('backed_up', { mode: 'boolean' }).notNull(),
  transports: text('transports', { mode: 'json' })
    .notNull()
    .$type<WebAuthnCredential['transports']>(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(
    () => new Date(),
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
})

export const webAuthnChallenges = sqliteTable('webauthn_challenges', {
  id: text('id').primaryKey(),
  challenge: text('challenge').notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
})

```
---
### filename: server/database/schema/customers.ts
```ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

import { users } from './users'
import { teams } from './teams'

export const customers = sqliteTable('customers', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  teamId: text('team_id').references(() => teams.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(
    () => new Date(),
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
})

```
---
### filename: server/database/schema/images.ts
```ts
import { nanoid } from 'nanoid'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { users } from './users'

export const images = sqliteTable('images', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  contentType: text('contentType'),
  pathname: text('pathname').notNull(),
  size: integer('size'),
  uploadedAt: integer('uploaded_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(
    () => new Date(),
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
})

```
---
### filename: server/database/schema/index.ts
```ts
export * from './auth'
export * from './admin'
export * from './posts'
export * from './teams'
export * from './users'
export * from './images'
export * from './products'
export * from './prices'
export * from './customers'
export * from './subscriptions'

```
---
### filename: server/database/schema/posts.ts
```ts
import { nanoid } from 'nanoid'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { users } from './users'
import { teams } from './teams'
import { relations } from 'drizzle-orm'
export const posts = sqliteTable('posts', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  teamId: text('teamId')
    .notNull()
    .references(() => teams.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(
    () => new Date(),
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
})

export const postsRelations = relations(posts, ({ one }) => ({
  userId: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  teamId: one(teams, {
    fields: [posts.teamId],
    references: [teams.id],
  }),
}))

```
---
### filename: server/database/schema/prices.ts
```ts
import { nanoid } from 'nanoid'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { products } from './products'
import { relations } from 'drizzle-orm'

export const prices = sqliteTable('prices', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  description: text('description'),
  currency: text('currency').notNull(),
  unitAmount: integer('unit_amount').notNull(),
  type: text('type').notNull(),
  interval: text('interval').notNull(),
  intervalCount: integer('interval_count').notNull(),
  trialPeriodDays: integer('trial_period_days'),
  active: integer('active', { mode: 'boolean' }).notNull().default(true),
  metadata: text('metadata', { mode: 'json' }),
  productId: text('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(
    () => new Date(),
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
})

export const pricesRelations = relations(prices, ({ one }) => ({
  product: one(products, {
    fields: [prices.productId],
    references: [products.id],
  }),
}))

```
---
### filename: server/database/schema/products.ts
```ts
import { nanoid } from 'nanoid'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const products = sqliteTable('products', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  name: text('name').notNull(),
  description: text('description'),
  active: integer('active', { mode: 'boolean' }).notNull().default(true),
  image: text('image'),
  metadata: text('metadata', { mode: 'json' }),
  product_orders: integer('product_orders', { mode: 'number' })
    .notNull()
    .default(0),
  features: text('features', { mode: 'json' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(
    () => new Date(),
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
})

```
---
### filename: server/database/schema/subscriptions.ts
```ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { customers } from './customers'
import { relations } from 'drizzle-orm'
import { prices } from './prices'
import { teams } from './teams'
import { users } from './users'

export const subscriptions = sqliteTable('subscriptions', {
  id: text('id').primaryKey(),
  customerId: text('customer_id').references(() => customers.id),
  priceId: text('price_id').references(() => prices.id),
  teamId: text('team_id').references(() => teams.id),
  userId: text('user_id').references(() => users.id),
  status: text('status').notNull(),
  metadata: text('metadata', { mode: 'json' }),
  quantity: integer('quantity').notNull(),
  cancelAtPeriodEnd: integer('cancel_at_period_end', {
    mode: 'boolean',
  }).notNull(),
  currentPeriodEnd: integer('current_period_end', { mode: 'timestamp' }),
  currentPeriodStart: integer('current_period_start', { mode: 'timestamp' }),
  endedAt: integer('ended_at', { mode: 'timestamp' }),
  cancelAt: integer('cancel_at', { mode: 'timestamp' }),
  trialStart: integer('trial_start', { mode: 'timestamp' }),
  trialEnd: integer('trial_end', { mode: 'timestamp' }),

  createdAt: integer('created_at', { mode: 'timestamp' }).$default(
    () => new Date(),
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
})

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  customer: one(customers, {
    fields: [subscriptions.customerId],
    references: [customers.id],
  }),
  price: one(prices, {
    fields: [subscriptions.priceId],
    references: [prices.id],
  }),
  team: one(teams, {
    fields: [subscriptions.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
}))

```
---
### filename: server/database/schema/teams.ts
```ts
import { nanoid } from 'nanoid'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { users } from './users'

export const teams = sqliteTable('teams', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  name: text('name').notNull(),
  ownerId: text('ownerId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  logo: text('logo'),
  slug: text('slug').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(
    () => new Date(),
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
})

export const teamMembers = sqliteTable('team_members', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  teamId: text('teamId')
    .notNull()
    .references(() => teams.id, { onDelete: 'cascade' }),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  role: text('role').notNull().default('member'), // 'owner', 'admin', 'member'
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(
    () => new Date(),
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
})

export const teamInvites = sqliteTable('team_invites', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  teamId: text('teamId')
    .notNull()
    .references(() => teams.id, { onDelete: 'cascade' }),
  email: text('email').notNull(),
  role: text('role').notNull().default('member'),
  token: text('token').notNull(),
  status: text('status').notNull().default('pending'),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(
    () => new Date(),
  ),
})

```
---
### filename: server/database/schema/users.ts
```ts
import { nanoid } from 'nanoid'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .notNull()
    .$default(() => nanoid()),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  avatarUrl: text('avatarUrl').default(''),
  hashedPassword: text('hashedPassword'),
  banned: integer('banned', { mode: 'boolean' }).notNull().default(false),
  bannedReason: text('bannedReason'),
  emailVerified: integer('emailVerified', { mode: 'boolean' })
    .notNull()
    .default(false),
  phoneNumber: text('phoneNumber').unique(),
  bannedUntil: integer('bannedUntil', { mode: 'timestamp' }),
  onboarded: integer('onboarded', { mode: 'boolean' }).notNull().default(false),
  proAccount: integer('proAccount', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(
    () => new Date(),
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
  lastActive: integer('last_active', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
})

```
---
### filename: server/routes/images/[pathname].get.ts
```ts
export default eventHandler(async event => {
  const { pathname } = event.context.params || {};
  return hubBlob().serve(event, pathname);
});

```
---
### filename: server/services/email.ts
```ts
import { useEmail } from 'use-email'
import { env } from '@@/env'

const EMAIL_PROVIDER = env.EMAIL_PROVIDER
const emailService = useEmail(EMAIL_PROVIDER)

export interface BaseEmailPayload {
  to: string | string[]
  subject: string
}

export interface TextEmailPayload extends BaseEmailPayload {
  text: string
  html?: string
}

export interface HtmlEmailPayload extends BaseEmailPayload {
  text?: string
  html: string
}

export type EmailPayload = TextEmailPayload | HtmlEmailPayload

export async function sendEmail({ to, subject, text, html }: EmailPayload) {
  try {
    await emailService.send({
      from: env.FROM_EMAIL,
      to,
      subject,
      text,
      html,
    })
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to send email: ${(error as Error).message}`,
    })
  }
}

```
---
### filename: server/services/stripe.ts
```ts
import { env } from '@@/env'
import Stripe from 'stripe'

export const stripe = new Stripe(env.NUXT_STRIPE_SECRET_KEY)

export interface CreateCheckoutSessionParams {
  customerId: string
  priceId: string
  teamSlug: string
}

export const stripeService = {
  async createCustomer(teamId: string, email: string) {
    try {
      const customer = await stripe.customers.create({
        email,
        metadata: { teamId },
      })
      return customer.id
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create Stripe customer',
      })
    }
  },

  async createCheckoutSession({
    customerId,
    priceId,
    teamSlug,
  }: CreateCheckoutSessionParams) {
    try {
      return await stripe.checkout.sessions.create({
        customer: customerId,
        billing_address_collection: 'required',
        customer_update: {
          address: 'auto',
        },
        allow_promotion_codes: true,
        success_url: `${env.BASE_URL}/dashboard/${teamSlug}/settings/billing?success=true`,
        cancel_url: `${env.BASE_URL}/dashboard/${teamSlug}/settings/billing?cancel=true`,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
      })
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create checkout session',
      })
    }
  },

  async getCheckoutSession(sessionId: string) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      return session
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to get checkout session',
      })
    }
  },

  async getSubscription(subscriptionId: string) {
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId)
      return subscription
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to get subscription',
      })
    }
  },
}

```
---
### filename: server/tsconfig.json
```json
{
  "extends": "../.nuxt/tsconfig.server.json"
}

```
---
### filename: server/utils/auth.ts
```ts
import { InsertUser } from '@@/types/database'

export const sanitizeUser = (
  user: InsertUser,
  showBannedData: boolean = false,
) => {
  if (!user) return null
  if (!showBannedData) {
    delete user.banned
    delete user.bannedReason
  }
  delete user.hashedPassword
  return user
}

/**
 * Checks if a date is within the expiry date.
 *
 * @param expiresAt - The date to check.
 * @returns True if the date has not expired, false otherwise.
 */
export function isWithinExpiryDate(expiresAt: number): boolean {
  const currentTime = Math.floor(Date.now() / 1000)
  return currentTime < expiresAt
}

```
---
### filename: server/utils/bodyValidation.ts
```ts
import { z } from 'zod'
import type { H3Event } from 'h3'

export async function validateBody<T extends z.ZodType>(
  event: H3Event,
  schema: T,
): Promise<z.infer<T>> {
  const result = await readValidatedBody(event, (body) =>
    schema.safeParse(body),
  )

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid input',
      data: result.error.issues,
    })
  }

  return result.data
}

```
---
### filename: server/utils/database.ts
```ts
import { drizzle } from 'drizzle-orm/d1'
import * as schema from '../database/schema'

export const tables = schema

export function useDB() {
  return drizzle(hubDatabase(), { schema })
}

```
---
### filename: server/utils/nanoid.ts
```ts
import { customAlphabet, nanoid } from 'nanoid'

export const generateNumericCode = (length: number = 6) => {
  return customAlphabet('0123456789', length)()
}

export const generateAlphaNumericCode = (length: number = 6) => {
  return customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', length)()
}

export const generateRandomId = (length: number = 16) => {
  return nanoid(length)
}

```
---
### filename: server/utils/oauth.ts
```ts
// OAuth Authentication Flow
// 1. Validate OAuth user data from provider (handled by Nuxt OAuth module)
// 2. Check if user exists (@method findUserByEmail)
// 3. If new user, create user with OAuth data (@method createUserWithOAuth)
// 4. Update avatar if not set (@method updateUser)
// 5. Link OAuth account to user (@method linkOAuthAccount)
// 6. Check if user is banned
// 7. Sanitize user data (@method sanitizeUser)
// 8. Set user session and redirect to dashboard

// Used in:
// - server/api/auth/oauth/discord.ts
// - server/api/auth/oauth/google.ts
// - server/api/auth/oauth/github.ts

import {
  findUserByEmail,
  createUserWithOAuth,
  updateUser,
  linkOAuthAccount,
} from '@@/server/database/queries/users'

export interface OAuthUserData {
  email: string
  name: string
  avatarUrl: string
  provider: 'discord' | 'google' | 'github'
  providerUserId: string
}

export const handleOAuthSuccess = async (
  event: any,
  oauthUser: OAuthUserData,
) => {
  // 2. Check if user exists
  let dbUser = await findUserByEmail(oauthUser.email)

  // 3. If new user, create user with OAuth data
  if (!dbUser) {
    dbUser = await createUserWithOAuth({
      email: oauthUser.email,
      name: oauthUser.name,
      avatarUrl: oauthUser.avatarUrl,
      emailVerified: true,
    })
  }

  // 4. Update avatar if not set
  if (!dbUser.avatarUrl && oauthUser.avatarUrl) {
    dbUser = await updateUser(dbUser.id, {
      avatarUrl: oauthUser.avatarUrl,
    })
  }

  // 5. Link OAuth account to user
  await linkOAuthAccount(
    dbUser.id,
    oauthUser.provider,
    oauthUser.providerUserId,
  )

  // 6. Check if user is banned
  if (dbUser.banned) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Your account has been banned',
    })
  }

  // 7. Sanitize user data
  const sanitizedUser = sanitizeUser(dbUser)

  // 8. Set user session and redirect to dashboard
  await setUserSession(event, { user: sanitizedUser })
  return sendRedirect(event, '/dashboard')
}

```
---
### filename: server/utils/syncStripeData.ts
```ts

```
---
### filename: server/utils/teamValidation.ts.ts
```ts
// server/utils/teamValidation.ts
import { H3Event } from 'h3'
import { findUserTeams } from '@@/server/database/queries/teams'

export async function validateTeamOwnership(event: H3Event, teamId: string) {
  // 1. Get authenticated user
  const { user } = await requireUserSession(event)

  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Team ID is required',
    })
  }

  // 2. Get user's teams to check ownership
  const userTeams = await findUserTeams(user.id)
  const team = userTeams.find((t) => t.id === teamId)

  if (!team) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Team not found',
    })
  }

  // 3. Check if user is the owner
  if (team.role !== 'owner') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Only team owners can perform this action',
    })
  }

  return { user, team }
}

```
---
### filename: shared/validations/auth.ts
```ts
import { z } from 'zod'

export const registerUserSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(8),
  name: z.string().min(1).max(100),
})

export const loginUserSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(8),
})

export const updateUserPasswordSchema = z.object({
  password: z.string().min(8),
})

export const emailSchema = z.object({
  email: z.string().email(),
})

export const linkPasskeySchema = z.object({
  userName: z.string().email(),
  displayName: z.string().trim().optional(),
})

export const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .regex(
      /^\+[1-9]\d{1,14}$/,
      'Phone number must be in E.164 format (e.g. +12125551234)',
    ),
})

export const phoneVerificationSchema = z.object({
  phoneNumber: z
    .string()
    .regex(
      /^\+[1-9]\d{1,14}$/,
      'Phone number must be in E.164 format (e.g. +12125551234)',
    ),
  code: z.string().length(6),
})

export const otpLoginSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
})

export const otpVerificationSchema = z.object({
  email: z.string().email(),
  code: z.number().min(6).max(6),
})

```
---
### filename: shared/validations/team.ts
```ts
import { z } from 'zod'
import { insertTeamSchema } from '@@/types/database'

export const createTeamSchema = insertTeamSchema.pick({
  name: true,
  logo: true,
  slug: true,
})

export const inviteTeamMemberSchema = z.object({
  email: z.string().email(),
  role: z.enum(['owner', 'admin', 'member']).default('member'),
})

```
---
### filename: shared/validations/user.ts
```ts
import { z } from 'zod'
import { insertUserSchema } from '@@/types/database'

export const updateUserSchema = insertUserSchema.pick({
  name: true,
  avatarUrl: true,
})

```
---
### filename: tsconfig.json
```json
{
  // https://nuxt.com/docs/guide/concepts/typescript
  "extends": "./.nuxt/tsconfig.json"
}

```
---
### filename: types/auth.d.ts
```ts
import type { User as DrizzleUser } from './database'

declare module '#auth-utils' {
  interface User
    extends Omit<
      DrizzleUser,
      | 'hashedPassword'
      | 'banned'
      | 'bannedReason'
      | 'bannedUntil'
      | 'createdAt'
      | 'updatedAt'
    > {}
}

export {}

```
---
### filename: types/database.ts
```ts
import { tables } from '@@/server/utils/database'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export type User = typeof tables.users.$inferSelect
export type InsertUser = typeof tables.users.$inferInsert

export type Waitlist = typeof tables.waitlist.$inferSelect
export type InsertWaitlist = typeof tables.waitlist.$inferInsert
export type OAuthAccounts = typeof tables.oauthAccounts.$inferSelect
export type InsertOAuthAccounts = typeof tables.oauthAccounts.$inferInsert
export type Post = typeof tables.posts.$inferSelect
export type InsertPost = typeof tables.posts.$inferInsert
export type Feedback = typeof tables.feedback.$inferSelect
export type InsertFeedback = typeof tables.feedback.$inferInsert
export type EmailVerificationCodes =
  typeof tables.emailVerificationCodes.$inferSelect
export type InsertEmailVerificationCodes =
  typeof tables.emailVerificationCodes.$inferInsert
export type PasswordResetTokens = typeof tables.passwordResetTokens.$inferSelect
export type InsertPasswordResetTokens =
  typeof tables.passwordResetTokens.$inferInsert
export type OneTimePasswords = typeof tables.oneTimePasswords.$inferSelect
export type InsertOneTimePasswords = typeof tables.oneTimePasswords.$inferInsert
export type Image = typeof tables.images.$inferSelect
export type InsertImage = typeof tables.images.$inferInsert
export type Team = typeof tables.teams.$inferSelect
export type InsertTeam = typeof tables.teams.$inferInsert
export type Passkey = typeof tables.webAuthnCredentials.$inferSelect
export type InsertPasskey = typeof tables.webAuthnCredentials.$inferInsert
export type WebAuthnChallenge = typeof tables.webAuthnChallenges.$inferSelect
export type InsertWebAuthnChallenge =
  typeof tables.webAuthnChallenges.$inferInsert
export type TeamInvite = typeof tables.teamInvites.$inferSelect
export type InsertTeamInvite = typeof tables.teamInvites.$inferInsert
export type Product = typeof tables.products.$inferSelect
export type InsertProduct = typeof tables.products.$inferInsert
export type Price = typeof tables.prices.$inferSelect
export type InsertPrice = typeof tables.prices.$inferInsert
export type Customer = typeof tables.customers.$inferSelect
export type InsertCustomer = typeof tables.customers.$inferInsert
export type Subscription = typeof tables.subscriptions.$inferSelect
export type InsertSubscription = typeof tables.subscriptions.$inferInsert

// Zod schemas
export const insertUserSchema = createInsertSchema(tables.users)
export const selectUserSchema = createSelectSchema(tables.users)

export const insertWaitlistSchema = createInsertSchema(tables.waitlist)
export const selectWaitlistSchema = createSelectSchema(tables.waitlist)

export const insertOAuthAccountsSchema = createInsertSchema(
  tables.oauthAccounts,
)
export const selectOAuthAccountsSchema = createSelectSchema(
  tables.oauthAccounts,
)

export const insertPostSchema = createInsertSchema(tables.posts)
export const selectPostSchema = createSelectSchema(tables.posts)

export const insertFeedbackSchema = createInsertSchema(tables.feedback)
export const selectFeedbackSchema = createSelectSchema(tables.feedback)

export const insertEmailVerificationCodesSchema = createInsertSchema(
  tables.emailVerificationCodes,
)
export const selectEmailVerificationCodesSchema = createSelectSchema(
  tables.emailVerificationCodes,
)

export const insertPasswordResetTokensSchema = createInsertSchema(
  tables.passwordResetTokens,
)
export const selectPasswordResetTokensSchema = createSelectSchema(
  tables.passwordResetTokens,
)

export const insertOneTimePasswordsSchema = createInsertSchema(
  tables.oneTimePasswords,
)
export const selectOneTimePasswordsSchema = createSelectSchema(
  tables.oneTimePasswords,
)

export const insertImageSchema = createInsertSchema(tables.images)
export const selectImageSchema = createSelectSchema(tables.images)

export const insertTeamSchema = createInsertSchema(tables.teams)
export const selectTeamSchema = createSelectSchema(tables.teams)

export const insertTeamInviteSchema = createInsertSchema(tables.teamInvites)
export const selectTeamInviteSchema = createSelectSchema(tables.teamInvites)

export const insertPasskeySchema = createInsertSchema(
  tables.webAuthnCredentials,
)
export const selectPasskeySchema = createSelectSchema(
  tables.webAuthnCredentials,
)

export const insertWebAuthnChallengeSchema = createInsertSchema(
  tables.webAuthnChallenges,
)
export const selectWebAuthnChallengeSchema = createSelectSchema(
  tables.webAuthnChallenges,
)

export const insertProductSchema = createInsertSchema(tables.products)
export const selectProductSchema = createSelectSchema(tables.products)

export const insertPriceSchema = createInsertSchema(tables.prices)
export const selectPriceSchema = createSelectSchema(tables.prices)

export const insertCustomerSchema = createInsertSchema(tables.customers)
export const selectCustomerSchema = createSelectSchema(tables.customers)

export const insertSubscriptionSchema = createInsertSchema(tables.subscriptions)
export const selectSubscriptionSchema = createSelectSchema(tables.subscriptions)

```
