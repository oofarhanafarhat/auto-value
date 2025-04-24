"use client"; // Mark as client-side because we use useEffect and Clerk hook

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { urlFor } from "@/sanity/lib/image"; 
import { useRouter } from "next/navigation";// Redirect to sign-in if not logged in
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client"; // Sanity client for querying cars



// Type for a cart item returned from backend API (only contains carId)
interface CartItem {
  carId: string;
}

// Type for full car fetched from Sanity
interface Car {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  image: string;
  model: string;
  year: number;
}

export default function CartPage() {
  const { user } = useUser(); // Get current user from Clerk
  const [carData, setCarData] = useState<Car[]>([]); // Full cars to render
  const [loading, setLoading] = useState(true); // Show loading spinner
  const router = useRouter(); // For redirecting to sign-in page

  // ---------------------- Load Cart on Page Load ----------------------
  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    } // Skip if not logged in

    const fetchCart = async () => {
      try {
        // 1. Fetch cart items from API (only carIds)
        const res = await fetch("/api/cart", {
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Needed for Clerk cookies
        });

        const cartItems: CartItem[] = await res.json(); // [{ carId }]

        // 2. Extract car IDs
        const ids = cartItems.map(item => item.carId);

        // 3. If cart is empty, show empty UI
        if (ids.length === 0) {
          setCarData([]);
          setLoading(false);
          return;
        }

        // 4. Fetch car details from Sanity by ID
        const query = `*[_type == "car" && _id in $ids]{
          _id, title, slug, price, image, model, year
        }`;

        const cars: Car[] = await client.fetch(query, { ids }); // Run GROQ query

        // 5. Save cars in state
        setCarData(cars);
        setLoading(false);
      } catch (error) {
        console.error("Error loading cart:", error);
        setLoading(false);
      }
    };

    fetchCart(); // Call function
  }, [user]); // Rerun if user changes

  // ---------------------- Remove Item from Cart ----------------------
  const removeFromCart = async (carId: string) => {
    try {
      await fetch("/api/cart", {
        method: "DELETE",
        body: JSON.stringify({ carId }),
      });

      // Remove from UI immediately
      setCarData(prev => prev.filter(car => car._id !== carId));
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // ---------------------- UI States ----------------------
  if (loading) return <div className="p-6">Loading your cart...</div>;
  if (carData.length === 0) return <div className="p-6 text-lg">Your cart is empty.</div>;

  // ---------------------- Render Cart ----------------------
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

      {/* Grid layout for car cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {carData.map((car) => (
          <div key={car._id} className="border rounded-2xl shadow-md overflow-hidden">

            {/* Car Image */}
            <Image
              src={car.image ? urlFor(car.image).url() : "/fallback.jpg"} // Use fallback image if not found
              alt={car.title || "Car Image"} // Use default alt text
              width={400}
              height={250}
              className="object-cover w-full h-48"
            />

            {/* Car Info */}
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-bold">{car.title}</h2>
              <p>{car.model} - {car.year}</p>
              <p className="text-primary font-semibold">PKR {car.price.toLocaleString()}</p>

              {/* Buttons: View Details + Remove */}
              <div className="flex justify-between items-center mt-4">
                <Link
                  href={`/listings/${car.slug.current}`}
                  className="text-gray-800 font-bold hover:underline text-sm"
                >
                  veiw details
                </Link>

                <button
                  onClick={() => removeFromCart(car._id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
