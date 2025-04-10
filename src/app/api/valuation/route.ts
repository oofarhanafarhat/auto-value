// import { NextResponse } from 'next/server';
// // import { auth } from '@clerk/nextjs';
// import { db } from '@/../lib/db';
// import { cars } from 'drizzle-orm/vercel-postgres'; // your Drizzle car table schema
// import { eq } from 'drizzle-orm';

// export async function POST(req: Request) {
//   const { userId } = auth();

//   if (!userId) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   try {
//     const body = await req.json();
//     const {
//       title,
//       slug,
//       make,
//       model,
//       year,
//       condition,
//       mileage,
//       price,
//       description,
//       image,
//     } = body;

//     // Optional: Custom estimate logic could go here

//     const result = await db.insert(cars).values({
//       title,
//       slug,
//       make,
//       model,
//       year,
//       condition,
//       mileage,
//       price,
//       description,
//       image,
//       userId,
//     });

//     return NextResponse.json({ message: 'Valuation saved successfully', result }, { status: 201 });

//   } catch (error) {
//     console.error('[VALUATION_POST_ERROR]', error);
//     return NextResponse.json({ error: 'Failed to save valuation' }, { status: 500 });
//   }
// }