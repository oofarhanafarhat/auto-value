import 'dotenv/config';  // Make sure dotenv loads the .env.local file

import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in environment");
}

const sql = neon(connectionString);
export const db = drizzle(sql, { schema });
