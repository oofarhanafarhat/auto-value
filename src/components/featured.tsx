"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { client } from "@/sanity/lib/client";


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
  addToCart: boolean;
};

const FeaturedCars = () => {
  const [cars, setCars] = useState<CarListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const query = `*[_type == "carListing" && addToCart == true]{
          _id,
          name,
          model,
          price,
          image{asset->{url}},
          addToCart
        }`;
        const data = await client.fetch(query);
        setCars(data);
      } catch (err) {
        setError("Failed to load cars.");
        console.error("Sanity fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <motion.section className="px-6 md:px-20 py-16 text-center bg-[#0C2340]">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-50">Featured Cars</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {cars.map((car) => (
            <motion.div
              key={car._id}
              whileHover={{ scale: 1.03 }}
              className="rounded-2xl overflow-hidden shadow-lg bg-white text-[#0C2340] border"
            >
              <div className="relative w-full h-52">
                <Image
                  src={car.image?.asset?.url || "/fallback.jpg"}
                  alt={car.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5 text-left">
                <h3 className="text-xl font-semibold">{car.name}</h3>
                <p className="text-md mb-3">${car.price.toLocaleString()}</p>
                <button className="mt-2 px-4 py-2 bg-[#0C2340] text-white rounded hover:bg-opacity-90">
                  add to cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default FeaturedCars;
