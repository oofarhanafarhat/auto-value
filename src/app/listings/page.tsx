
"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@clerk/nextjs";

// Define Car type
type Car = {
  _id: string;
  name: string;
  slug:string
  imageUrl: string;
  price: number;
};

// Fetch all cars using GROQ query
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
  const [cars, setCars] = useState<Car[]>([]);
  const { userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchAllCars().then(setCars);
  }, []);

  // Add to cart handler
  const handleAddToCart = async (carId: string) => {
    if (!userId) {
      // Redirect to sign-in if not authenticated
      return router.push("/sign-in");
    }

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({ carId }),
      });

      if (res.ok) {
        alert("Car added to cart");
      } else {
        console.error("Failed to add to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-[#0C2340] mb-8">
        Available Cars
      </h1>

      {/* Render each car as a card with motion animation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car, index) => (
          <motion.div
            key={car._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white shadow-md rounded-xl overflow-hidden"
          >
            <Image
              src={car.imageUrl}
              alt={car.name}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold text-[#0C2340]">{car.name}</h2>
              <p className="text-green-600 font-medium mt-1">${car.price}</p>

              {/* Buttons */}
              <div className="flex gap-3 mt-4">
                <Link
                  href={`/listings/${car.slug}`}
                  className="px-3 py-2 text-sm rounded bg-gray-800 text-white hover:bg-blue-700"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleAddToCart(car._id)}
                  className="px-3 py-2 text-sm rounded bg-gray-800 text-white hover:bg-gray-900"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}