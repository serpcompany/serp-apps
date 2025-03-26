import { eq, and, desc } from 'drizzle-orm'
import { InsertUrl, Url } from '~~/types/database'

export const createUrl = async (url: InsertUrl) => {
  const newUrl = await useDB().insert(tables.urls).values(url).returning().get()
  return newUrl
}

export const getUrlById = async (
  id: string,
  userId: string,
  teamId: string,
) => {
  const url = await useDB().query.urls.findFirst({
    where: and(
      eq(tables.urls.id, id),
      eq(tables.urls.userId, userId),
      eq(tables.urls.teamId, teamId),
    ),
  })
  return url
}

export const getUrlsByUserId = async (userId: string, teamId: string) => {
  const urls = await useDB().query.urls.findMany({
    where: and(eq(tables.urls.userId, userId), eq(tables.urls.teamId, teamId)),
    orderBy: [desc(tables.urls.createdAt)],
  })
  return urls
}
export const deleteUrl = async (id: string, userId: string, teamId: string) => {
  await useDB()
    .delete(tables.urls)
    .where(
      and(
        eq(tables.urls.id, id),
        eq(tables.urls.userId, userId),
        eq(tables.urls.teamId, teamId),
      ),
    )
}

export const updateUrl = async (id: string, url: Partial<Url>) => {
  await useDB().update(tables.urls).set(url).where(eq(tables.urls.id, id))
}

export const getUrlByUrl = async (
  url: string,
  userId: string,
  teamId: string,
) => {
  const record = await useDB().query.urls.findFirst({
    where: and(
      eq(tables.urls.url, url),
      eq(tables.urls.userId, userId),
      eq(tables.urls.teamId, teamId),
    ),
  })
  return record
}

export const getUrlStats = async (urlId: string) => {
  const stats = await useDB().query.urlAnalytics.findMany({
    where: eq(tables.urlAnalytics.urlId, urlId),
  })
  return stats
}


export const getUrlByShortcode = async (shortcode: string) => {
  const url = await useDB().query.urls.findFirst({
    where: eq(tables.urls.shortcode, shortcode),
  })
  return url
}
