import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

// Load environment variables
dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is missing from .env.local");
}

export default defineConfig({
  schema: "./src/sanity/lib/schema.ts",
  out: "./db.ts",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.DB_HOST!,
    database: process.env.DB_NAME!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
  },
});
