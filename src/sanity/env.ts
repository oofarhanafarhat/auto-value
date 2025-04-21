import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" }); // 👈 load your environment variables

export default defineConfig({
  schema: "./src/sanity/lib/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.DB_HOST!,
    database: process.env.DB_NAME!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
  },
});
