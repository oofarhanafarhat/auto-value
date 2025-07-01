import { NextResponse } from "next/server";
import { db } from "@/sanity/lib/db/db"; // make sure path is correct
import { dealers } from "@/sanity/lib/db/schema";

export async function GET() {
  try {
    const allDealers = await db.select().from(dealers);
    return NextResponse.json(allDealers);
  } catch (err) {
    console.error("Dealer fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch dealers" }, { status: 500 });
  }
}
