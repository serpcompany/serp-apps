import { customAlphabet, nanoid } from 'nanoid'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { users } from './users'
import { teams } from './teams'
import { relations } from 'drizzle-orm'

const generateAlphaNumericCode = (length: number = 6) => {
  return customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', length)()
}

export enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
}

export const conversations = sqliteTable('conversations', {
  id: text('id')
    .primaryKey()
    .$default(() => generateAlphaNumericCode(16)),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  teamId: text('teamId')
    .notNull()
    .references(() => teams.id, { onDelete: 'cascade' }),
  title: text('title').notNull().default('New Conversation'),
  model: text('model').notNull().default('openai'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(
    () => new Date(),
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
})

export const messages = sqliteTable('messages', {
  id: text('id')
    .primaryKey()
    .$default(() => generateAlphaNumericCode()),
  conversationId: text('conversationId')
    .notNull()
    .references(() => conversations.id, { onDelete: 'cascade' }),
  role: text('role').notNull().default(MessageRole.USER),
  content: text('content').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(
    () => new Date(),
  ),
})

export const conversationsRelations = relations(conversations, ({ one, many }) => ({
  userId: one(users, {
    fields: [conversations.userId],
    references: [users.id],
  }),
  teamId: one(teams, {
    fields: [conversations.teamId],
    references: [teams.id],
  }),
  messages: many(messages)
}))

export const messagesRelations = relations(messages, ({ one }) => ({
  conversationId: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
}))
