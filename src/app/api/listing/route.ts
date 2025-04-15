// File: src/app/api/listing/route.ts

import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { success: false, message: "Missing car ID" },
      { status: 400 }
    );
  }

  try {
    const car = await client.fetch(
      `*[_type == "carListing" && _id == $id && addToCart == true][0]{
        _id,
        name,
        model,
        price,
        "imageUrl": image.asset->url
      }`,
      { id }
    );
    console.log(car); 
    if (!car) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: car });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching car", error },
      { status: 500 }
    );
  }
}
