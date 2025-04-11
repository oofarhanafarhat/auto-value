import { NextRequest, NextResponse } from 'next/server' // ✅ Import Next.js API request/response utilities
import { db } from '@/../lib/db' // ✅ Import Drizzle database instance
import { auto } from '@/../lib/schema' // ✅ Import 'valuations' schema from valuation.
import { z } from 'zod' // ✅ Import Zod for data validation

// ✅ Define form validation schema using Zod
const valuationSchema = z.object({
  userId: z.string(), // Clerk user ID must be a string
  make: z.string(), // Car make (e.g., Honda, Toyota)
  model: z.string(), // Car model (e.g., Civic, Corolla)
  year: z.number(), // Manufacturing year must be a number
  mileage: z.number(), // Mileage must be a number
  condition: z.enum(['Excellent', 'Used', 'Old']), // Only allow specific condition values
})

// ✅ Estimate value calculator function
const calculateEstimate = (mileage:number, year: number, condition: string) => {
  let basePrice = 1000000 // Starting price of any car

  if (condition === 'Used') {
    basePrice -= 100000 // Subtract if condition is 'Used'
  } else if (condition === 'Old') {
    basePrice -= 200000 // Subtract more if condition is 'Old'
  }

  basePrice -= (mileage / 1000) * 5000 // Subtract based on mileage
  const ageFactor = new Date().getFullYear() - year // Calculate car age
  basePrice -= ageFactor * 20000 // Subtract based on age

  return Math.max(basePrice, 100000) // Ensure minimum value of 100000
}

// ✅ POST API endpoint for car valuation
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() // ✅ Parse incoming request body

    // ✅ Validate input using Zod
    const result = valuationSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { message: 'Validation failed', error: result.error.format() }, // ✅ Return error if validation fails
        { status: 400 }
      )
    }

    const { userId, make, model, year, mileage, condition } = result.data // ✅ Destructure validated data

    const estimatedPrice = calculateEstimate(mileage, year, condition) // ✅ Call estimate function

    await db.insert(auto).values({
      make: 'Toyota',
      model: 'Corolla',
      year: 2018,
      mileage: 50000,
      condition: 'Used',
      estimatedPrice: 1450000,
    });
    

    // ✅ Return success response with calculated estimate
    return NextResponse.json({
      message: 'Valuation saved successfully',
      estimatedPrice,
    })
  } catch (error: any) {
    console.error('Valuation API Error:', error) // ✅ Log error to server
    return NextResponse.json(
      { message: 'Server error', error: error.message }, // ✅ Return 500 server error response
      { status: 500 }
    )
  }
}