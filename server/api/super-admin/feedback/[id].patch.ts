import { updateFeedback } from '@@/server/database/queries/admin';
import { validateAdmin } from '@@/server/utils/validateAdmin';

export default defineEventHandler(async (event) => {
  await validateAdmin(event);
  const { id } = getRouterParams(event);
  const { status } = await readBody(event);
  const updatedFeedback = await updateFeedback(id, status);
  return updatedFeedback;
});
