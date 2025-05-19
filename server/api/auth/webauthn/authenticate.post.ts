import type { H3Event } from 'h3';
import {
  storeWebAuthnChallenge,
  findCredentialByUserId,
  findCredentialById,
  getAndDeleteChallenge
} from '@@/server/database/queries/passkeys';
import { findUserByEmail, findUserById, updateLastActiveTimestamp } from '@@/server/database/queries/users';
export default defineWebAuthnAuthenticateEventHandler({
  async storeChallenge(event: H3Event, challenge: string, attemptId: string) {
    await storeWebAuthnChallenge(attemptId, challenge);
  },

  async getChallenge(event: H3Event, attemptId: string) {
    const challenge = await getAndDeleteChallenge(attemptId);
    if (!challenge) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Challenge not found or expired'
      });
    }
    return challenge;
  },

  async allowCredentials(event: H3Event, email: string) {
    const user = await findUserByEmail(email);
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      });
    }
    const credentials = await findCredentialByUserId(user.id);
    return credentials || [];
  },

  async getCredential(event: H3Event, credentialId: string) {
    const credential = await findCredentialById(credentialId);
    if (!credential) {
      throw createError({
        statusCode: 404,
        statusMessage: 'No passkeys registered. You can register one in your account settings.'
      });
    }
    return credential;
  },

  async onSuccess(event: H3Event, { credential }: { credential: { userId: string } }) {
    const user = await findUserById(credential.userId);
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      });
    }

    if (user.banned && user.bannedUntil && user.bannedUntil > new Date()) {
      throw createError({
        statusCode: 403,
        statusMessage: 'You account has been banned'
      });
    }

    await updateLastActiveTimestamp(user.id);
    const transformedUser = sanitizeUser(user);
    await setUserSession(event, { user: transformedUser });
  }
});
