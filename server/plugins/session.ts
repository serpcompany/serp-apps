import { findUserById } from '@@/server/database/queries/users'

export default defineNitroPlugin(() => {
  sessionHooks.hook('fetch', async (session, _event) => {
    if (session.user) {
      try {
        const user = await findUserById(session.user.id)

        // Add any other property that can change mid-session
        session.user.credits = user.credits
        session.user.proAccount = user.proAccount
      } catch { /* No-op */ }
    }
  })
})
