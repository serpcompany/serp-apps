import { drizzle } from 'drizzle-orm/d1'
import * as schema from '../database/schema'

// Export commonly used query builder functions
export { eq, and, or, ne, not, lt, lte, gt, gte, asc, desc, count, sql } from 'drizzle-orm'

export const tables = schema

export function useDB() {
  return drizzle(hubDatabase(), { schema })
}
