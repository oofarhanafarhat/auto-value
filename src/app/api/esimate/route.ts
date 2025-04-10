import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/../lib/db'
import { valuations } from "@/../lib/schema"


// Car valuation estimate function (basic example)
const calculateEstimate = (mileage: number, year: number, condition: string) => {
  let basePrice = 1000000; // Starting price (example)

  // Modify price based on car condition
  if (condition === 'Used') {
    basePrice -= 100000;
  } else if (condition === 'Old') {
    basePrice -= 200000;
  }

  // Reduce price based on mileage
  basePrice -= (mileage / 1000) * 5000;

  // Further adjust based on car's year
  const ageFactor = new Date().getFullYear() - year;
  basePrice -= ageFactor * 20000;

  return basePrice;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { userId, make, model, year, mileage, condition } = body
        
    
        // Calculate estimate
        const estimatedPrice = calculateEstimate(mileage, year, condition)
    
        // Save the valuation to the database
        await db.insert(valuations).values({
          userId,
          make,
          model,
          year,
          mileage,
          condition,
          estimatedPrice
        })
    
        // Return response with estimated price
        return NextResponse.json({
          message: 'Valuation calculated and saved successfully!',
          estimatedPrice
        })
      } catch (error:any) {
        console.error('Error in valuation API:', error)
        return NextResponse.json({
            message: 'Error calculating valuation.',
            error: error.message
          }, { status: 500 })
        }
      }
      
