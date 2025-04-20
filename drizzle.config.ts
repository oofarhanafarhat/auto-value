// drizzle.config.js

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./src/sanity/lib/schema"; // Apni schema file ka path yahan den

export default {
  schema: "./src/sanity/lib/schema", // yahan apna schema file ka relative path dein
  out: "./drizzle/migrations", // migration files ka folder
  driver: "pg", // PostgreSQL use kar rahe hain
  dbCredentials: {
    connectionString: process.env.DATABASE_URL, // .env file mein define karein
  },
};
