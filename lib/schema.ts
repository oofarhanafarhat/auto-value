import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';
export const valuations = pgTable('valuations', {
  id: serial('id').primaryKey(),
  userId: text('user_id'), // This should match what you pass
  make: text('make'),
  model: text('model'),
  year: integer('year'),
  mileage: integer('mileage'),
  condition: text('condition'),
  estimatedPrice: integer('estimated_price'),
  createdAt: timestamp('created_at').defaultNow(),
});