import { updateUserPassword } from '@@/server/database/queries/users';
import { updateUserPasswordSchema } from '@@/shared/zod-schema';
import { findUserById } from '@@/server/database/queries/users';
import { render } from '@vue-email/render';
import { sendEmail } from '@@/server/services/email';
import PasswordUpdatedTemplate from '@@/emails/password-updated.vue';
import { env } from '~~/env';

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const { password, currentPassword } = await readValidatedBody(event, (body) => updateUserPasswordSchema.parse(body));
  const userRecord = await findUserById(user.id);
  if (!userRecord) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    });
  }
  const existingPassword = userRecord.hashedPassword;
  if (!existingPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Looks like you signed up with a social provider. Please send a password reset request instead.'
    });
  }
  if (!(await verifyPassword(existingPassword, currentPassword))) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Current password is incorrect'
    });
  }
  const hashedPassword = await hashPassword(password);
  await updateUserPassword(user.id, hashedPassword);
  // Send login notification
  const templateProps = {
    userName: user.name,
    updatedAt: new Date().toLocaleString()
  };
  const htmlTemplate = await render(PasswordUpdatedTemplate, templateProps);

  if (env.MOCK_EMAIL) {
    console.table({
      message: 'Password updated email sent',
      email: user.email,
      name: user.name
    });
  } else {
    await sendEmail({
      to: user.email,
      subject: 'Your password has been updated',
      html: htmlTemplate
    });
  }
  return { message: 'Password updated successfully' };
});
