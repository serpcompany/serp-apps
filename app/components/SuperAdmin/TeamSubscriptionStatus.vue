<template>
  <div>
    <UPopover v-if="subscription?.status" mode="hover">
      <div class="flex cursor-pointer items-center gap-1">
        <UBadge
          :label="subscription.status"
          color="neutral"
          variant="subtle"
          class="capitalize"
        />
        <UIcon name="i-lucide-info" class="text-neutral-500 text-xl" />
      </div>
      <template #content>
        <div class="w-64 p-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">Plan</span>
              <span class="text-sm text-neutral-500">{{
                subscription.price?.product?.name || "No name"
              }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">Amount</span>
              <span class="text-sm text-neutral-500">
                {{ formatPrice(subscription.price?.unitAmount) }}/{{
                  subscription.price?.interval
                }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">Status</span>
              <UBadge
                :label="subscription.status"
                :color="getStatusColor(subscription.status)"
                variant="subtle"
                class="capitalize"
              />
            </div>
            <div
              v-if="subscription.currentPeriodEnd"
              class="flex items-center justify-between"
            >
              <span class="text-sm font-medium">Renews on</span>
              <span class="text-sm text-neutral-500">
                {{
                  useDateFormat(subscription.currentPeriodEnd, "MMM DD, YYYY")
                }}
              </span>
            </div>
          </div>
        </div>
      </template>
    </UPopover>
    <span v-else class="text-neutral-500">--</span>
  </div>
</template>

<script lang="ts" setup>
import type { Subscription } from "@@/types/database";
// How data comes
// "subscription": {
//             "id": "sub_1RImWnRwvHLaOt8mNwbuSMpq",
//             "status": "active",
//             "price": {
//                 "id": "price_1QpDFeRwvHLaOt8muT5d40JI",
//                 "description": null,
//                 "currency": "usd",
//                 "unitAmount": 1999,
//                 "type": "recurring",
//                 "interval": "month",
//                 "intervalCount": 1,
//                 "trialPeriodDays": null,
//                 "active": true,
//                 "metadata": {},
//                 "productId": "prod_RieYHRjHmYF0Iq",
//                 "createdAt": "2025-04-28T07:53:55.000Z",
//                 "updatedAt": "2025-04-28T07:53:55.000Z"
//             }
//         },
defineProps<{
  subscription: Subscription;
}>();

const formatPrice = (price?: number): string => {
  if (!price) return "$0";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price / 100);
};

const getStatusColor = (status?: string) => {
  switch (status) {
    case "active":
      return "success";
    case "trialing":
      return "primary";
    case "canceled":
    case "incomplete_expired":
    case "unpaid":
      return "error";
    case "past_due":
    case "incomplete":
      return "warning";
    default:
      return "neutral";
  }
};
</script>
