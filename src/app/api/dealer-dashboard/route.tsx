// File: /app/api/dealer-dashboard/route.ts

import { NextResponse } from "next/server";
import { db } from "@/sanity/lib/db/db";
import { auth } from "@clerk/nextjs/server";
import { auto, dealers } from "@/sanity/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get dealer info
  const dealer = await db.query.dealers.findFirst({
    where: eq(dealers.userId, userId),
  });

  if (!dealer) {
    return NextResponse.json({ error: "Dealer not found" }, { status: 403 });
  }

  const dealerCode = dealer.dealerCode;

  // Get all cars linked to this dealer
  const cars = await db.query.auto.findMany({
    where: eq(auto.dealerCode, dealerCode),
  });

  // Count visit entries
  const visitCount = await db.query.auto.findMany({
    where: and(
      eq(auto.dealerCode, dealerCode),
      eq(auto.source, "visit")
    ),
  });

  // Count purchase entries
  const purchaseCount = await db.query.auto.findMany({
    where: and(
      eq(auto.dealerCode, dealerCode),
      eq(auto.source, "purchase")
    ),
  });

  return NextResponse.json({
    dealerCode,
    totalListings: cars.length,
    totalVisits: visitCount.length,
    totalSales: purchaseCount.length,
    allCars: cars,
  });
}
