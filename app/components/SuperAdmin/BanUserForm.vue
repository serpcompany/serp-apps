<template>
  <div>
    <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
      <div class="flex items-center gap-2">
        <UAvatar :src="user.avatarUrl" size="lg" />
        <div>
          <p class="text-sm font-bold">{{ user.name }}</p>
          <p class="text-sm text-neutral-500">{{ user.email }}</p>
        </div>
      </div>
      <UFormField label="Reason" name="reason" required>
        <UTextarea v-model="state.reason" class="w-full" size="lg" />
      </UFormField>
      <UFormField label="Banned Until" name="bannedUntil" required>
        <UInput v-model="state.bannedUntil" class="w-full" size="lg">
          <template #trailing>
            <UPopover>
              <UButton
                color="neutral"
                variant="ghost"
                icon="i-lucide-calendar"
                size="sm"
              />
              <template #content>
                <UCalendar
                  v-model="state.bannedUntil"
                  size="sm"
                  color="neutral"
                />
              </template>
            </UPopover>
          </template>
        </UInput>
      </UFormField>
      <UButton
        type="submit"
        label="Ban User"
        color="neutral"
        :loading="loading"
      />
    </UForm>
  </div>
</template>

<script lang="ts" setup>
import { getLocalTimeZone, today } from '@internationalized/date'
import { z } from 'zod'
import type { User, OAuthAccounts } from '@@/types/database'
import { useDateFormat } from '@vueuse/core'

interface ExtendedUser extends User {
  oauthAccounts?: OAuthAccounts[]
}

const props = defineProps<{
  user: ExtendedUser
}>()

const emit = defineEmits(['user-banned'])
const loading = ref(false)
const toast = useToast()

const schema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  reason: z.string().min(1, 'Reason is required'),
  bannedUntil: z.any().refine((value) => {
    if (!value) return false
    const currentDate = today(getLocalTimeZone())
    return value.compare(currentDate) > 0
  }, 'Banned until Date must be in the future'),
})

const state = reactive({
  userId: props.user.id,
  reason: '',
  bannedUntil: today(getLocalTimeZone()),
})

const onSubmit = async () => {
  loading.value = true
  try {
    const formData = {
      ...state,
      banned: true,
      bannedUntil: state.bannedUntil.toDate(getLocalTimeZone()).toISOString(),
    }

    await $fetch('/api/super-admin/users/ban', {
      method: 'POST',
      body: formData,
    })

    toast.add({
      title: 'User Banned Successfully',
      description: `${props.user.name} has been banned until ${useDateFormat(formData.bannedUntil, 'MMM D, YYYY').value}.`,
      color: 'success',
      duration: 5000,
    })

    emit('user-banned', props.user)
  } catch (error: any) {
    const errorMessage = error?.data?.message || 'Failed to ban user'
    toast.add({
      title: 'Error',
      description: errorMessage,
      color: 'error',
      duration: 5000,
    })
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>
