import { deleteStripeProduct } from '@@/server/database/queries/stripe';
import { validateAdmin } from '@@/server/utils/validateAdmin';

export default defineEventHandler(async (event) => {
  await validateAdmin(event);
  const productId = getRouterParam(event, 'id');
  if (!productId) {
    throw createError({
      statusCode: 400,
      message: 'Product ID is required'
    });
  }

  try {
    await useDB().delete(tables.prices).where(eq(tables.prices.productId, productId)).run();

    await deleteStripeProduct(productId);

    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to delete product'
    });
  }
});
