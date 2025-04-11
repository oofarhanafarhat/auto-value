// lib/valuation.ts

export type CarDetails = {
    mileage: number
    year: number
    condition: 'New' | 'Used' | 'Like New' | 'Old'
  }
  
  function calculateValuation({ mileage, year, condition }: CarDetails): number {
    let basePrice = 1000000; // Starting base price in PKR
  
    // Adjust price based on condition
    switch (condition) {
      case 'Used':
        basePrice -= 100000;
        break;
      case 'Old':
        basePrice -= 200000;
        break;
      case 'Like New':
        basePrice -= 50000;
        break;
      // 'New' case doesn't deduct anything
    }
  
    // Mileage impact
    basePrice -= (mileage / 1000) * 5000;
  
    // Year-based depreciation
    const age = new Date().getFullYear() - year;
    basePrice -= age * 20000;
  
    // Prevent negative pricing
    return Math.max(basePrice, 50000);
  }