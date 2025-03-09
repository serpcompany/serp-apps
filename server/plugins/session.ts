export default defineNitroPlugin(() => {
    sessionHooks.hook('clear', async (session, event) => {
        console.log('Session hook cleared (logout) from Nitro plugin: ' + session.user?.id)
    })
})