import { sendEmail } from '@@/server/services/email'
import { render } from '@vue-email/render'
import LoginNotification from '@@/emails/login-notification.vue'

export default defineEventHandler(async (event) => {
  const headers = getRequestHeaders(event)
  const body = await readBody(event)
  console.log('body', body)
  // Get user data from the request body
  const { user } = body

  if (!user?.name || !user?.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required user information',
    })
  }

  // Get location information from Cloudflare headers if available
  const city = headers['cf-ipcity']
  const country = headers['cf-ipcountry']

  // Only send email if we have location information
  try {
    const htmlTemplate = await render(LoginNotification, {
      userName: user.name,
      city,
      country,
    })

    await sendEmail({
      to: user.email,
      subject: 'Login from a new location',
      html: htmlTemplate,
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to send login notification email:', error)
    // Don't throw error as this is not critical
    return { success: false }
  }
})
