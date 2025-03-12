<template>
  <AppContainer title="Users">
    <template #actions>
      <UButton label="Create a new user" @click="newUserModal = true" />
    </template>

    <div>
      <div class="overflow-x-auto">
        <table class="w-full table-auto text-left text-sm">
          <thead>
            <tr>
              <th
                v-for="column in columns"
                :key="column"
                class="p-2 text-nowrap whitespace-nowrap"
              >
                {{ column }}
              </th>
            </tr>
          </thead>
          <tbody class="">
            <tr
              v-for="user in users"
              :key="user.id"
              class="border-b border-neutral-100 text-sm text-neutral-500 hover:bg-neutral-50 dark:border-white/10 dark:text-neutral-400 dark:hover:bg-neutral-800/50 [&>td]:whitespace-nowrap"
            >
              <td class="p-2">
                <div class="flex items-center gap-2">
                  <UAvatar
                    :src="user.avatarUrl || undefined"
                    size="2xs"
                    :alt="user.name + ' avatar'"
                  />
                  {{ user.name }}
                </div>
              </td>
              <td class="p-2">{{ user.email }}</td>
              <td class="p-2">{{ user.emailVerified ? 'Yes' : 'No' }}</td>
              <td class="p-2">
                <div v-if="user.banned" class="flex items-center gap-0.5">
                  Yes
                  <UPopover mode="hover">
                    <UButton
                      variant="ghost"
                      size="xs"
                      color="neutral"
                      icon="i-lucide-info"
                      class="text-neutral-500"
                    />
                    <template #content>
                      <div class="w-64 p-4">
                        <p
                          class="text-xs font-bold text-neutral-500 dark:text-neutral-400"
                        >
                          Banned until
                        </p>
                        <p class="mt-1 text-sm">
                          {{ getFormattedDate(user.bannedUntil || '') }}
                        </p>
                        <p
                          class="mt-4 text-xs font-bold text-neutral-600 dark:text-neutral-400"
                        >
                          Reason
                        </p>
                        <p class="mt-1 text-sm">{{ user.bannedReason }}</p>
                        <UButton
                          label="Lift Ban"
                          block
                          variant="soft"
                          color="neutral"
                          class="mt-4"
                        />
                      </div>
                    </template>
                  </UPopover>
                </div>
                <div v-else>No</div>
              </td>
              <td class="p-2">
                <div class="flex items-center gap-2">
                  <UPopover
                    v-for="account in user.oauthAccounts"
                    :key="account.id"
                    mode="hover"
                  >
                    <div
                      class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md bg-neutral-100 dark:bg-white/10"
                    >
                      <UIcon :name="getProviderIcon(account.provider)" />
                    </div>

                    <template #content>
                      <div class="w-64 p-4">
                        <h3 class="mb-2 text-sm font-medium">
                          {{ getProviderName(account.provider) }} Account
                        </h3>
                        <USeparator class="my-2" />
                        <div class="mt-2 space-y-4">
                          <div>
                            <p
                              class="text-xs font-bold text-neutral-600 dark:text-neutral-400"
                            >
                              Provider User ID
                            </p>
                            <p
                              class="mt-1 text-xs text-neutral-600 dark:text-neutral-400"
                            >
                              {{ account.providerUserId }}
                            </p>
                          </div>
                          <div>
                            <p
                              class="text-xs font-bold text-neutral-600 dark:text-neutral-400"
                            >
                              Connected
                            </p>
                            <p
                              class="mt-1 text-xs text-neutral-600 dark:text-neutral-400"
                            >
                              {{
                                account.createdAt
                                  ? useDateFormat(
                                      account.createdAt,
                                      'MMM D, YYYY',
                                    ).value
                                  : 'Invalid'
                              }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </template>
                  </UPopover>
                </div>
              </td>
              <td class="p-2">
                {{ getFormattedDate(user.lastActive || '') }}
              </td>
              <td class="p-2">
                {{ getFormattedDate(user.createdAt || '') }}
              </td>
              <td class="p-2">
                <UDropdownMenu
                  :items="actions as DropdownMenuItem[]"
                  :content="{
                    align: 'end',
                    side: 'bottom',
                    sideOffset: 0,
                  }"
                >
                  <UButton
                    icon="i-lucide-ellipsis"
                    variant="ghost"
                    color="neutral"
                    class="text-neutral-500"
                  />
                </UDropdownMenu>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <UModal
      v-model:open="newUserModal"
      title="Create a new user"
      description="Invite a new user to the platform"
    >
      <template #body>
        <SuperAdminNewUserForm @user-created="handleUserCreated" />
      </template>
    </UModal>
  </AppContainer>
</template>

<script lang="ts" setup>
import { useDateFormat } from '@vueuse/core'
import type { DropdownMenuItem } from '@nuxt/ui'
import type { User, OAuthAccounts } from '@@/types/database'
interface UserWithOAuthAccounts extends User {
  oauthAccounts: OAuthAccounts[]
}

const newUserModal = ref(false)

const { data: users, refresh } = await useFetch<UserWithOAuthAccounts[]>(
  '/api/super-admin/users',
)

// Function to handle user creation event
function handleUserCreated() {
  refresh()
  newUserModal.value = false
}

const columns = [
  'Name',
  'Email',
  'Verified',
  'Banned',
  'Linked Accounts',
  'Last Active',
  'Created',
  '',
]

const availableProviders = [
  {
    id: 'google',
    name: 'Google',
    icon: 'i-logos-google-icon',
  },
  {
    id: 'github',
    name: 'Github',
    icon: 'i-octicon-mark-github-16',
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: 'i-logos-discord-icon',
  },
  {
    id: 'spotify',
    name: 'Spotify',
    icon: 'i-logos-spotify-icon',
  },
]

const getProviderIcon = (providerId: string) => {
  if (!providerId) return 'i-lucide-question-mark-circle'
  const provider = availableProviders.find((p) => p.id === providerId)
  return provider?.icon || 'i-lucide-question-mark-circle'
}

const getProviderName = (providerId: string) => {
  if (!providerId) return 'Unknown'
  const provider = availableProviders.find((p) => p.id === providerId)
  return provider?.name || 'Unknown'
}

const actions = ref([
  {
    label: 'Ban User',
  },
  {
    label: 'Delete User',
  },
  {
    label: 'Send Password Reset Email',
    onSelect: (user: User) => {
      sendForgotPasswordEmail(user.email)
    },
  },
  {
    label: 'Impersonate User',
    onSelect: () => {
      console.log('impersonate user')
    },
  },
])

const getFormattedDate = (date: string | Date) => {
  if (!date) return 'NA'
  return useDateFormat(date, 'MMM D, YYYY').value
}
const toast = useToast()

const sendForgotPasswordEmail = async (email: string) => {
  try {
    await $fetch('/api/auth/password/forgot', {
      method: 'POST',
      body: { email },
    })
    toast.add({
      title: 'Password reset email sent',
      description: 'The password reset email has been sent to the user',
      color: 'success',
    })
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to send password reset email',
      color: 'error',
    })
  }
}
</script>
