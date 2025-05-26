import { sendEmail } from '@@/server/services/email';
import { updateFeedback, getFeedbackById } from '@@/server/database/queries/admin';
import { render } from '@vue-email/render';
import FeedbackReply from '@@/emails/feedback-reply.vue';
import { env } from '@@/env';
import { validateAdmin } from '@@/server/utils/validateAdmin';

export default defineEventHandler(async (event) => {
  await validateAdmin(event);
  const { id, message, email } = await readBody(event);
  const feedback = await getFeedbackById(id);
  if (!feedback) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Feedback not found'
    });
  }
  await updateFeedback(id, { reply: message, status: 'replied' });

  const htmlTemplate = await render(FeedbackReply, {
    userName: feedback.user.name,
    originalMessage: feedback.message,
    replyMessage: message
  });

  if (env.MOCK_EMAIL) {
    console.table({
      email,
      name: feedback.user.name,
      originalMessage: feedback.message,
      replyMessage: message
    });
  } else {
    await sendEmail({
      to: email,
      subject: 'Response to your feedback',
      html: htmlTemplate
    });
  }

  sendNoContent(event);
});
