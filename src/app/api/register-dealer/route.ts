import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/sanity/lib/db/db";
import { dealers } from "@/sanity/lib/db/schema";
import { eq } from "drizzle-orm";

// Utility to generate unique code
const generateDealerCode = () => {
  return "dealer_" + Math.random().toString(36).substring(2, 8);
};

export async function POST() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if already exists
  const existing = await db.query.dealers.findFirst({
    where: eq(dealers.userId, userId),
  });

  if (existing) {
    return NextResponse.json({ message: "Dealer already registered", dealer: existing });
  }

  const newCode = generateDealerCode();

  const result = await db.insert(dealers).values({
    userId,
    dealerCode: newCode,
  });

  return NextResponse.json({ message: "Dealer registered", dealerCode: newCode });
}
