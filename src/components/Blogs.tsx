// src/landing/components/UsedCar.tsx

"use client";

// Redesigned Used Car section for a modern "Add Car" style layout
// Includes a responsive grid, enhanced hover effects, and a cleaner contact modal

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

type UsedCar = {
  name: string;
  model: string;
  price: number;
  image: {
    asset: {
      url: string;
    };
  };
};

const UsedCar = () => {
  const [cars, setCars] = useState<UsedCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const query = `*[_type == "usedCar"]{
          name,
          model,
          image{asset->{url}},
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
    <motion.section
      className="px-4 md:px-20 py-16 bg-[#EAEBF0] text-[#666872] "
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl md:text-2xl font-normal mb-12 text-center">
      Blogs
      </h2>

      {loading ? (
        <p className="text-center text-lg">Loading used cars...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {cars.map((car, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full h-56">
                <Image
                  src={car.image?.asset?.url || "/fallback.jpg"}
                  alt={car.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-sm font-semibold">{car.name}</h3>
                <p className="text-sm font-semibold  text-gray-500">{car.model}</p>
                {/* <p className="text-lg font-bold">${car.price.toLocaleString()}</p> */}

              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              ×
            </button>

            <h3 className="text-2xl font-bold mb-6 text-[#0C2340] text-center">
              Contact Seller
            </h3>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0C2340]"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0C2340]"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0C2340]"
              ></textarea>

              <button
                type="submit"
                className="w-full py-3 bg-[#0C2340] text-white font-semibold rounded-md hover:bg-opacity-90 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default UsedCar;