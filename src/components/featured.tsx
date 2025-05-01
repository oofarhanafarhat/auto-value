"use client";

// Redesigned FeaturedCars section in blog style
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

// Type definition for car listing
type CarListing = {
  _id: string;
  name: string;
  model: string;
  price: number;
  image: {
    asset: {
      url: string;
    };
  };
};

// Main Component
const FeaturedCars = () => {
  const [cars, setCars] = useState<CarListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch featured cars on mount
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const query = `*[_type == "carListing" && addToCart == true]{
          _id,
          name,
          model,
          price,
          image { asset->{url} }
        }`;
        const data = await client.fetch(query);
        setCars(data);
      } catch (err) {
        setError("Failed to load featured cars.");
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  if (loading) return <p className="text-center py-10">Loading featured cars...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <section className="py-20 bg-[#f9f9f9]">
      <div className="container mx-auto px-6">
        {/* Section heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] text-start">Latest Blogs  Post</h2>
        
        </div>

        {/* Cars grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 ">
          {cars.map((car) => (
            <motion.div
              key={car._id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Car image */}
              <div className="relative h-52 w-full">
                <Image
                  src={car.image.asset.url}
                  alt={car.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Car details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-[#0C2340]">{car.name} november 22,2024</h3>
                  <p className="text-gray-500">{car.model}</p>
                  <p className="text-[#0C2340] font-bold mt-2">${car.price.toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;