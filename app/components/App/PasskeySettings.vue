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
        <p class="mt-1 text-sm text-zinc-500">
          Add and manage your passkeys here
        </p>
      </template>
      <div v-if="status === 'pending'" class="flex items-center justify-center">
        <UIcon name="i-lucide-loader" class="animate-spin" />
      </div>
      <div v-else-if="status === 'success'">
        <div
          v-if="passkeys && passkeys.length === 0"
          class="flex flex-col items-center justify-center gap-4 rounded bg-gray-100 p-4 text-sm dark:bg-gray-800"
        >
          <UIcon name="i-lucide-fingerprint" class="h-6 w-6" />
          <p>No fingerprints or face IDs linked to your account.</p>
        </div>
        <ul class="divide-y divide-gray-100 dark:divide-gray-800">
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
          @submit="createPasskey"
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

<script lang="ts" setup>
import { z } from 'zod'
import { toast } from 'vue-sonner'
const creating = ref(false)
const modal = ref(false)
const deleting = ref<string | null>(null)
const { register } = useWebAuthn({
  registerEndpoint: '/api/auth/webauthn/link-passkey',
})
const {
  data: passkeys,
  status,
  refresh,
} = await useFetch('/api/auth/webauthn/linked-passkeys', {
  server: false,
  lazy: true,
})

const { user } = useUserSession()
const schema = z.object({
  name: z.string().min(1).max(255),
})
const state = reactive({
  name: undefined,
})

async function createPasskey(event) {
  try {
    creating.value = true
    await register({
      userName: user.value.email,
      displayName: event.data.name,
    })

    await refresh()
    modal.value = false
    state.name = undefined
    toast.success('Passkey added successfully')
  } catch (error) {
    toast.error(error.data?.message || error.message)
  } finally {
    creating.value = false
  }
}

async function deletePasskey(id) {
  try {
    deleting.value = id
    await $fetch('/api/auth/webauthn/delete-passkey', {
      method: 'DELETE',
      body: { id },
    })
    await refresh()
    toast.success('Passkey deleted successfully')
  } catch (error) {
    toast.error(error.data?.statusMessage || 'Failed to delete passkey')
  } finally {
    deleting.value = null
  }
}
</script>
