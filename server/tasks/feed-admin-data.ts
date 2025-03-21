export default defineTask({
  meta: {
    name: 'feed-admin-data',
    description: 'Feed admin data to the database',
  },
  async run() {
    console.log('Running DB seed task...')
    // delete all existing subscribers
    await useDB().delete(tables.subscribers)
    const subscribers = [
      {
        email: 'john@example.com',
        referrer: 'https://google.com',
      },
      {
        email: 'sarah.smith@example.com',
        referrer: 'https://twitter.com',
      },
      {
        email: 'mike.jones@example.com',
        referrer: 'https://supersaas.dev',
      },
      {
        email: 'emily.brown@example.com',
        referrer: 'https://facebook.com',
      },
      {
        email: 'david.wilson@example.com',
        referrer: 'https://reddit.com',
      },
      {
        email: 'lisa.taylor@example.com',
        referrer: 'https://youtube.com',
      },
      {
        email: 'james.anderson@example.com',
        referrer: 'https://instagram.com',
      },
      {
        email: 'amy.martinez@example.com',
        referrer: null,
      },
      {
        email: 'robert.thomas@example.com',
        referrer: 'https://medium.com',
      },
      {
        email: 'jennifer.white@example.com',
        referrer: 'https://github.com',
      },
    ]
    await useDB().insert(tables.subscribers).values(subscribers)
    return { result: 'success' }
  },
})
