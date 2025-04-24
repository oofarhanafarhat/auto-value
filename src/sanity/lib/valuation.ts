// lib/valuation.ts

export type CarDetails = {
    mileage: number;
    year: number;
    condition: 'New' | 'Used' | 'Like New' | 'Old';
};

function calculateValuation({ mileage, year, condition }: CarDetails): number {
    let basePrice = 1000000; // Starting base price in PKR

    // Validate inputs
    if (mileage < 0 || year < 1900 || year > new Date().getFullYear()) {
        throw new Error("Invalid mileage or year provided.");
    }

    // Adjust price based on condition
    switch (condition) {
        case 'Used':
            basePrice -= 100000; // Deduct 100,000 for 'Used' condition
            break;
        case 'Old':
            basePrice -= 200000; // Deduct 200,000 for 'Old' condition
            break;
        case 'Like New':
            basePrice -= 50000; // Deduct 50,000 for 'Like New' condition
            break;
        // 'New' case doesn't deduct anything
    }

    // Mileage impact: Deduct 5,000 PKR for every 1,000 km
    basePrice -= (mileage / 1000) * 5000;

    // Year-based depreciation: Deduct 20,000 PKR for each year of age
    const age = new Date().getFullYear() - year;
    basePrice -= age * 20000;

    // Prevent negative pricing: Ensure the minimum price is 50,000 PKR
    return Math.max(basePrice, 50000);
}

async function fetchCarData(endpoint: string) {
    try {
        const res = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) {
            console.error("Error response:", await res.text());
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error("Failed to fetch car data:", error);
        return null; // Return null as a fallback
    }
}

// Example usage
fetchCarData('/api/car-details')
    .then((data) => console.log("Car data:", data))
    .catch((error) => console.error("Error fetching car data:", error));