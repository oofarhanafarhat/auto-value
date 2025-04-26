// src/landing/components/UsedCar.tsx

"use client";

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
          price,
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
    <motion.section className="px-6 md:px-20 py-16 text-center bg-[#0C2340]">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-50">Browse Used Cars</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {cars.map((car) => (
            <motion.div
              key={car.name}
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

                {/* Professional Contact Us Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-2 mt-2 bg-gradient-to-r from-[#0C2340] to-[#102c57] text-white rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300 font-semibold"
                >
                  Contact Us
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md text-center shadow-xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            <h3 className="text-2xl font-bold mb-6 text-[#0C2340]">Contact Us</h3>

            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C2340]"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C2340]"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C2340]"
              ></textarea>

              <button
                type="submit"
                className="py-3 bg-[#0C2340] text-white rounded-md font-semibold hover:bg-opacity-90 transition-all duration-300"
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