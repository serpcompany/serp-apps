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
                    :src="user.avatarUrl"
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
                  <span class="text-xs text-rose-500"> Yes </span>
                  <UPopover mode="hover">
                    <UButton
                      variant="ghost"
                      size="xs"
                      color="error"
                      icon="i-lucide-info"
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
                          :loading="loadingUserId === user.id"
                          @click="liftBan(user)"
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
                <UPopover v-if="user.teamMembers?.length" mode="hover">
                  <div class="flex cursor-pointer items-center gap-1">
                    <span>{{ user.teamMembers.length }}</span>
                    <UIcon name="i-lucide-users" class="text-neutral-500" />
                  </div>
                  <template #content>
                    <div class="w-72 p-4">
                      <h3 class="mb-2 text-sm font-medium">
                        Team Affiliations
                      </h3>
                      <USeparator class="my-2" />
                      <div class="mt-2 space-y-4">
                        <div
                          v-for="teamMember in user.teamMembers"
                          :key="teamMember.id"
                          class="flex items-center gap-3"
                        >
                          <UAvatar
                            :src="teamMember.team.logo || undefined"
                            size="sm"
                            :alt="teamMember.team.name + ' logo'"
                          />
                          <div>
                            <p class="text-sm font-medium">
                              {{ teamMember.team.name }}
                            </p>
                            <p class="text-xs text-neutral-500">
                              <span class="capitalize">{{
                                teamMember.role
                              }}</span>
                              {{
                                teamMember.role === 'owner'
                                  ? ''
                                  : `(Owner: ${getTeamOwnerName(teamMember.team.ownerId)})`
                              }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </UPopover>
                <span v-else>-</span>
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
                    :loading="loadingUserId === user.id"
                    @click="selectedUser = user"
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
    <UModal
      v-model:open="banUserModal"
      title="Ban User"
      description="Ban a user from the platform"
    >
      <template #body>
        <SuperAdminBanUserForm
          v-if="selectedUser"
          :user="selectedUser"
          @user-banned="handleUserBanned"
        />
      </template>
    </UModal>
    <UModal
      v-model:open="showDeleteUserConfirmation"
      title="Delete User"
      description="This action is irreversible"
    >
      <template #body>
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <UAvatar :src="selectedUser?.avatarUrl" :alt="selectedUser?.name" size="lg" />
            <div>
              <p class="text-smfont-bold">{{ selectedUser?.name }}</p>
              <p class="text-sm text-gray-500">{{ selectedUser?.email }}</p>
            </div>
          </div>
          <div class="space-y-4 bg-neutral-100 dark:bg-neutral-950 p-4 rounded-md">
            <p class="text-sm text-neutral-500">
              This action will delete the user from the platform and all
              associated data. {{ selectedUser?.name }} is a part of the
              following teams:
            </p>
            <div
              v-for="teamMember in selectedUser?.teamMembers"
              :key="teamMember.id"
              class="flex items-center gap-3"
            >
              <UAvatar
                :src="teamMember.team.logo || undefined"
                size="sm"
                :alt="teamMember.team.name + ' logo'"
              />
              <div>
                <p class="text-sm font-medium">{{ teamMember.team.name }}</p>
                <p class="text-xs text-neutral-500">
                  <span class="capitalize">{{ teamMember.role }}</span>
                  {{
                    teamMember.role === 'owner'
                      ? ''
                      : `(Owner: ${getTeamOwnerName(teamMember.team.ownerId)})`
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex w-full justify-end gap-2">
          <UButton
            variant="soft"
            color="neutral"
            label="Cancel"
            @click="showDeleteUserConfirmation = false"
          />
          <UButton
            variant="soft"
            color="error"
            label="Delete User"
            @click="deleteUser(selectedUser)"
          />
        </div>
      </template>
    </UModal>
  </AppContainer>
</template>

<script lang="ts" setup>
import { useDateFormat } from '@vueuse/core'
import type { DropdownMenuItem } from '@nuxt/ui'
import type { User, OAuthAccounts } from '@@/types/database'

interface TeamMember {
  id: string
  teamId: string
  userId: string
  role: string
  createdAt: string
  updatedAt: string
  team: {
    id: string
    name: string
    ownerId: string
    logo: string
    slug: string
    createdAt: string
    updatedAt: string
  }
}

interface UserWithOAuthAccounts extends User {
  oauthAccounts: OAuthAccounts[]
  teamMembers?: TeamMember[]
}

const newUserModal = ref(false)
const loadingUserId = ref<string | null>(null)
const banUserModal = ref(false)
const { data: users, refresh } = await useFetch<UserWithOAuthAccounts[]>(
  '/api/super-admin/users',
)

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
  'Team Affiliations',
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

const getTeamOwnerName = (ownerId: string) => {
  if (!ownerId) return 'Unknown'
  const owner = users.value?.find((user) => user.id === ownerId)
  return owner?.name || 'Unknown'
}

const selectedUser = ref<UserWithOAuthAccounts | null>(null)

const actions = ref([
  {
    label: 'Send Password Reset Email',
    onSelect: () => {
      if (selectedUser.value) {
        sendForgotPasswordEmail(selectedUser.value)
      }
    },
  },
  {
    label: 'Impersonate User',
    onSelect: () => {
      if (selectedUser.value) {
        console.log('impersonate user', selectedUser.value)
      }
    },
  },
  {
    label: 'Ban User',
    onSelect: () => {
      if (selectedUser.value) {
        banUserModal.value = true
      }
    },
  },
  {
    label: 'Delete User',
    color: 'error' as const,
    onSelect: () => {
      if (selectedUser.value) {
        showDeleteUserConfirmation.value = true
      }
    },
  },
])

const getFormattedDate = (date: string | Date) => {
  if (!date) return 'NA'
  return useDateFormat(date, 'MMM D, YYYY').value
}
const toast = useToast()

const sendForgotPasswordEmail = async (user: User) => {
  try {
    loadingUserId.value = user.id
    await $fetch('/api/auth/password/forgot', {
      method: 'POST',
      body: { email: user.email },
    })
    toast.add({
      title: 'Password reset email sent',
      description: 'The password reset email has been sent to the user',
      color: 'success',
    })
    loadingUserId.value = null
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to send password reset email',
      color: 'error',
    })
    loadingUserId.value = null
  }
}

const handleUserBanned = () => {
  refresh()
  banUserModal.value = false
}

const liftBan = async (user: User) => {
  try {
    loadingUserId.value = user.id
    await $fetch('/api/super-admin/users/ban', {
      method: 'POST',
      body: { userId: user.id, banned: false },
    })
    toast.add({
      title: 'User unbanned successfully',
      description: 'The user has been unbanned',
      color: 'success',
    })
    loadingUserId.value = null
    refresh()
  } catch (error) {
    console.error(error)
    toast.add({
      title: 'Error',
      description: 'Failed to lift ban',
      color: 'error',
    })
    loadingUserId.value = null
  }
}
const showDeleteUserConfirmation = ref(false)

const deleteUser = async (user: User | null) => {
  if (!user) return

  try {
    loadingUserId.value = user.id
    await $fetch('/api/super-admin/users', {
      method: 'DELETE',
      body: { userId: user.id },
    })
    toast.add({
      title: 'User deleted successfully',
      description: 'The user has been deleted',
      color: 'success',
    })
    showDeleteUserConfirmation.value = false
    refresh()
  } catch (error) {
    console.error(error)
    toast.add({
      title: 'Error',
      description: 'Failed to delete user',
      color: 'error',
    })
  } finally {
    loadingUserId.value = null
  }
}
</script>
