import { nanoid } from 'nanoid';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import { relations } from 'drizzle-orm';

export const posts = sqliteTable('posts', {
  id: text('id')
    .primaryKey()
    .notNull()
    .$default(() => nanoid()),
  title: text('title').notNull(),
  content: text('content').notNull(),
  image: text('image'),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$default(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$onUpdate(() => new Date())
});

export const postsRelations = relations(posts, ({ many }) => ({
  users: many(users)
}));
