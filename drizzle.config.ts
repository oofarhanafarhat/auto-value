// drizzle.config.ts
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/sanity/lib/schema.ts", // make sure this is correct
  out: "./drizzle/migrations",
  dialect: "postgresql",
dbCredentials: {
  host: "ep-rough-waterfall-a447ijly-pooler.us-east-1.aws.neon.tech",
  user: "neondb_owner",
  password: "npg_ItF4Q0yiDvsh",
  database: "neondb",
  ssl: "require",
},
} satisfies Config;