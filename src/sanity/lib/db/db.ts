import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { auto, cart, dealers } from "./schema"; // ✅ import dealers

export const db = drizzle(sql, {
  schema: {
    auto,
    cart,
    dealers, // ✅ register dealers
  },
});
