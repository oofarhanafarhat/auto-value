// lib/db.ts

import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema'; // Import your Drizzle schema

// Get connection string from environment variable
const sql = neon(process.env.DATABASE_URL!);

// Initialize Drizzle with the Neon SQL client and your schema
export const db = drizzle(sql, { schema });