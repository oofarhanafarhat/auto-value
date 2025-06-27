// src/landing/components/ListingsPage.tsx

"use client"; // Client-side component

import { useEffect, useState } from "react"; // React hooks
import { client } from "@/sanity/lib/client"; // Sanity client
import { urlFor } from "@/sanity/lib/image"; // Sanity image URL builder
import { groq } from "next-sanity"; // GROQ query builder
import Image from "next/image"; // Next.js optimized Image
import Link from "next/link"; // For linking to detail pages
import { useRouter } from "next/navigation"; // For redirecting
import { useAuth } from "@clerk/nextjs"; // Clerk authentication
import { ArrowRight } from 'lucide-react';

interface Car {
  _id: string;
  name: string;
  slug: { current: string };
  price: string;
  image: any;
  year: string;
  fuel: string;
}
// Function to fetch all cars from Sanity
const fetchAllCars = async (): Promise<Car[]> => {
  const query = groq`
    *[_type == "car"] | order(_createdAt desc){
      _id,
      name,
      slug,
      price,
      image,
      year,
      fuel
    }`

  return await client.fetch(query);
};

// Removed duplicate or unnecessary PageProps interface/type definition if present

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
    <section className="p-6 max-w-6xl mx-auto bg-gradient-to-br from-[#f8f9fa] via-white to-[#f8f9fa]">
  <h1 className="text-4xl font-bold text-center text-[#0C2340] mb-12">
    Explore Available Cars
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
    {cars.map((car) => (
      <div
        key={car._id}
        className="rounded-2xl overflow-hidden flex flex-col transition-transform hover:-translate-y-2 hover:shadow-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 duration-300"
      >
        {/* Image */}
        <div className="relative w-full h-48">
          <Image
            src={urlFor(car.image).url()}
            alt={car.name}
            fill
            className="object-cover transition-opacity duration-300 hover:opacity-90"
          />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{car.name}</h3>
            <p className="text-gray-500 text-sm mb-4">Used</p>

            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Model Year:</strong> {car.year}</p>
              <p><strong>Model:</strong> LC76</p>
              <p><strong>Fuel:</strong> {car.fuel}</p>
            </div>
          </div>

          {/* Price & Buttons */}
          <div className="mt-6">
            <p className="text-2xl font-semibold text-[#0C2340] mb-4">${car.price}</p>

            <div className="flex gap-2">
              <Link
                href={`/listings/${car.slug.current}`}
                className="flex-1 text-center py-2 px-4 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 transition duration-300"
              >
                View Details
              </Link>
              <button
                onClick={() => handleAddToCart(car._id)}
                className="flex-1 text-center py-2 px-4 rounded-lg text-sm font-semibold bg-gradient-to-r from-green-500 to-green-700 text-white hover:from-green-600 hover:to-green-800 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

  );
}