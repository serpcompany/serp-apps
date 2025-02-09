// flow
// 1. Store challenge for authentication attempt (@method storeWebAuthnChallenge)
// 2. Retrieve and validate challenge (@method getAndDeleteChallenge)
// 3. Get allowed credentials for user (@method findUserByEmail, findCredentialByUserId)
// 4. Validate credential (@method findCredentialById)
// 5. On successful authentication:
//    - Find user (@method findUserById)
//    - Update last active timestamp (@method updateLastActiveTimestamp)
//    - Sanitize user data (@method sanitizeUser)
//    - Set user session

// Used in:
// - app/pages/auth/login-passkey.vue

import {
  storeWebAuthnChallenge,
  findCredentialByUserId,
  findCredentialById,
  getAndDeleteChallenge,
} from '@@/server/database/queries/passkeys'
import {
  findUserByEmail,
  findUserById,
  updateLastActiveTimestamp,
} from '@@/server/database/queries/users'
import { sanitizeUser } from '@@/server/utils/auth'

export default defineWebAuthnAuthenticateEventHandler({
  async storeChallenge(event, challenge, attemptId) {
    await storeWebAuthnChallenge(attemptId, challenge)
  },

  async getChallenge(event, attemptId) {
    const challenge = await getAndDeleteChallenge(attemptId)
    if (!challenge) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Challenge not found or expired',
      })
    }
    return challenge
  },

  async allowCredentials(event, email) {
    const user = await findUserByEmail(email)
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      })
    }
    const credentials = await findCredentialByUserId(user.id)
    return credentials || []
  },

  async getCredential(event, credentialId) {
    const credential = await findCredentialById(credentialId)
    if (!credential) {
      throw createError({
        statusCode: 404,
        statusMessage:
          'No passkeys registered. You can register one in your account settings.',
      })
    }
    return credential
  },

  async onSuccess(event, { credential }) {
    const user = await findUserById(credential.userId)
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      })
    }

    await updateLastActiveTimestamp(user.id)
    const transformedUser = sanitizeUser(user)
    await setUserSession(event, { user: transformedUser })
  },
})
