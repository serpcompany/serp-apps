import { stripeService } from '@@/server/services/stripe';
import { getCustomerByUserId, createCustomer } from '@@/server/database/queries/stripe-customers';
import { checkoutSchema } from '@@/shared/zod-schema';
import { validateBody } from '@@/server/utils/validateBody';

async function getOrCreateCustomer(userId: string, userEmail: string) {
  try {
    const customerRecord = await getCustomerByUserId(userId);
    if (customerRecord) {
      return customerRecord.id;
    }
    const newCustomerId = await stripeService.createCustomer(userId, userEmail);
    await createCustomer({
      id: newCustomerId,
      userId
    });
    return newCustomerId;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get or create customer'
    });
  }
}

export default defineEventHandler(async (event) => {
  try {
    const { user } = await requireUserSession(event);
    const body = await validateBody(event, checkoutSchema);
    const customerId = await getOrCreateCustomer(user.id, user.email);
    const session = await stripeService.createCheckoutSession({ customerId, priceId: body.priceId });
    return session.url;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create checkout session'
    });
  }
});
