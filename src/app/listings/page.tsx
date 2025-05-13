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

interface Car{
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
 <div className="grid grid-cols-1 md:grid-cols-3  lg:girds-cols-3 gap-10">
          {cars.map((car) => (
            <div
              key={car._id}
              className="flex flex-col md:flex-row items-start "
            >
              {/* Left - Car Image (no background, sharp corners) */}
              <div className="relative z-10 w-full md:w-[330px] h-[200px] -mr-6 md:-mr-16 md:-mb-1 mt-16 pl-28">
                 <Image
                  src={urlFor(car.image).url()}
              
                  alt={car.name}
                  fill
                  className="object-cover pt-8 "
                />
              </div>

              {/* Right - White Card with Details */}
              <div className="bg-white rounded-3xl shadow-lg p-6 w-full md:w-[700px] text-end flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-[#0C2340] text-start">
                    {car.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 text-start">Used</p>

                  <div className="space-y-2 text-sm text-gray-700">
                    <p>
                      <span className="font-semibold text-gray-600">
                        Model Year:
                      </span>{' '}
                      {car.year}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-600">
                        Model:
                      </span>{' '}
                      LC76
                    </p>
                    <p>
                      <span className="font-semibold text-gray-600">Fuel:</span>{' '}
                      {car.fuel}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-3xl font-bold text-[#0C2340] mb-4">
                    $ {car.price}
                  </p>

                
                  {/* // href={`/listing/${car.slug.current}`}
                  className="inline-flex items-center justify-center  bg-[#0C2340] text-white px-6 py-3 rounded-full hover:bg-blue-900 transition text-sm font-" */}
                {/* > */}
                  {/* Order Now
                  <ArrowRight className="ml-2 h-4 w-4" /> */}
                {/* </Link> */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
      </div>
    </section>
  );
}