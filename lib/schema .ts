// lib/schema.ts
import { pgTable,  text,  timestamp } from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';
export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),         // Internal UUID
    clerkId: text('clerk_id').notNull().unique(),        // Clerk user ID
    email: text('email').notNull().unique(),             // User email
    name: text('name'),                                  // Optional name
    createdAt: timestamp('created_at').defaultNow().notNull(),
  })