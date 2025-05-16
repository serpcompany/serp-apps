import { findUserByEmail, createUserWithOAuth, updateUser, linkOAuthAccount } from '@@/server/database/queries/users';
import { sendLoginNotification } from '@@/server/utils/authHelpers';
import { sanitizeUser } from '@@/server/utils';
import type { H3Event } from 'h3';

export interface OAuthUserData {
  email: string;
  name: string;
  avatarUrl: string;
  provider: 'discord' | 'google' | 'github';
  providerUserId: string;
}

export const handleOAuthSuccess = async (event: H3Event, oauthUser: OAuthUserData) => {
  let dbUser = await findUserByEmail(oauthUser.email);
  if (!dbUser) {
    dbUser = await createUserWithOAuth({
      email: oauthUser.email,
      name: oauthUser.name,
      avatarUrl: oauthUser.avatarUrl,
      emailVerified: true
    });
  }
  if (!dbUser.avatarUrl && oauthUser.avatarUrl) {
    dbUser = await updateUser(dbUser.id, {
      avatarUrl: oauthUser.avatarUrl
    });
  }
  await linkOAuthAccount(dbUser.id, oauthUser.provider, oauthUser.providerUserId);
  if (dbUser.banned) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Your account has been banned'
    });
  }
  const sanitizedUser = sanitizeUser(dbUser);
  await setUserSession(event, { user: sanitizedUser });
  await sendLoginNotification(event, sanitizedUser);
  return sendRedirect(event, '/dashboard');
};
