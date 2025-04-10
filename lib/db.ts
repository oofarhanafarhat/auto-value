// lib/db.ts

import { drizzle } from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres'
import * as schema from '../lib/schema'



export const db = drizzle(sql, { schema,})