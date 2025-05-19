import { deleteCredential } from '@@/server/database/queries/passkeys';
import { validateBody } from '@@/server/utils/validateBody';
import { deletePasskeySchema } from '@@/shared/zod-schema';

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const { credentialId } = await validateBody(event, deletePasskeySchema);
  await deleteCredential(user.id, credentialId);
  return { message: 'Passkey deleted successfully' };
});
