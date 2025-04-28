// src/landing/components/ListingsPage.tsx

"use client"; // Client-side component

import { useEffect, useState } from "react"; // React hooks
import { client } from "@/sanity/lib/client"; // Sanity client
import { groq } from "next-sanity"; // GROQ query builder
import Image from "next/image"; // Next.js optimized Image
import Link from "next/link"; // For linking to detail pages
import { useRouter } from "next/navigation"; // For redirecting
import { motion } from "framer-motion"; // Animation library
import { useAuth } from "@clerk/nextjs"; // Clerk authentication

// Define Car type
type Car = {
  _id: string;
  name: string;
  slug: string;
  imageUrl: string;
  price: number;
};

// Function to fetch all cars from Sanity
const fetchAllCars = async (): Promise<Car[]> => {
  const query = groq`
    *[_type == "car"]{
      _id,
      name,
      price,
      "slug": slug.current,
      "imageUrl": image.asset->url
    }
  `;
  return await client.fetch(query);
};

export default function ListingsPage() {
 const [cars, setCars] = useState<Car[]>([]); // State to store fetched cars
  const { userId } = useAuth(); // Get current user id
  const router = useRouter(); // Router instance

  // Fetch cars when component mounts
  useEffect(() => {
    fetchAllCars().then(setCars);
  }, []);

  // Handle add to cart
  const handleAddToCart = async (carId: string) => {
    if (!userId) {
      // Redirect to sign-in page if user not logged in
      return router.push("/sign-in");
    }

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({ carId }),
      });

      if (res.ok) {
        alert("Car added to cart successfully!");
      } else {
        console.error("Please sign in to your account to continue");
      }
    } catch (error) {
      console.error("Error while adding to cart:", error);
    }
  };

  return (
    <section className="p-6 max-w-7xl mx-auto">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold text-center text-[#0C2340] mb-12">
        Explore Available Cars
      </h1>

      {/* Car Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car, index) => (
          <motion.div
            key={car._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* Car Image */}
            <div className="relative w-full h-56 overflow-hidden">
              <Image
                src={car.imageUrl}
                alt={car.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Car Info */}
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-[#0C2340] mb-2">{car.name}</h2>
              <p className="text-gray-600 text-lg font-medium mb-4">${car.price.toLocaleString()}</p>

              {/* Buttons */}
              <div className="flex gap-4">
                <Link
                  href={`/listings/${car.slug}`}
                  className="flex-1 inline-block text-center px-4 py-2 rounded-full bg-gradient-to-r from-[#0C2340] to-[#1D4ED8] text-white text-sm font-semibold hover:opacity-90 transition"
                >
                  View Details
                </Link>

                <button
                  onClick={() => handleAddToCart(car._id)}
                  className="flex-1 px-4 py-2 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 text-white text-sm font-semibold hover:opacity-90 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}