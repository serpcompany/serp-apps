import { getAllFeedback } from '@@/server/database/queries/admin';
import { validateAdmin } from '@@/server/utils/validateAdmin';

export default defineEventHandler(async (event) => {
  await validateAdmin(event);
  const feedback = await getAllFeedback();
  return feedback;
});
