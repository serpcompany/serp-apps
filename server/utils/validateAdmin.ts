import type { H3Event } from 'h3';
import { User } from '~~/types/database';

export async function validateAdmin(event: H3Event): Promise<User> {
  const { user } = await requireUserSession(event);

  if (!user.superAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden'
    });
  }

  return user;
}
