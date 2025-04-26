// src/landing/components/Autovalues.tsx

"use client"; // Enable client-side rendering for this component

import { useEffect, useState } from "react"; // Import hooks from React
import { motion } from "framer-motion"; // Import Framer Motion for animations
import Image from "next/image"; // Import Next.js Image component for optimized images
import { client } from "@/sanity/lib/client"; // Import Sanity client to fetch data

// Define a type for car data coming from Sanity
type autovalue1 = {
  name: string;
  model: string;
  price: number;
  image: {
    asset: {
      url: string;
    };
  };
};

const Autovalues = () => {
  // State to hold fetched car data
  const [cars, setCars] = useState<autovalue1[]>([]);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for error handling
  const [error, setError] = useState<string | null>(null);
  // State to control Contact Us modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch car data from Sanity on component mount
  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Query all "autovalue" type entries from Sanity
        const query = `*[_type == "autovalue"]{ name, model, price, image{asset->{url}} }`;
        const data = await client.fetch(query);
        setCars(data); // Save data into state
      } catch (err) {
        setError("Failed to load cars."); // Handle error
      } finally {
        setLoading(false); // Stop loading in any case
      }
    };

    fetchCars(); // Call fetch function
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }} // Section will start invisible
      whileInView={{ opacity: 1 }} // Fade in when in viewport
      transition={{ duration: 0.8 }} // Animation duration
      viewport={{ once: true }} // Animate only once
      className="px-6 md:px-24 py-20 text-center bg-gray-100"
    >
      {/* Section Title */}
      <h2 className="text-4xl font-extrabold mb-10 text-[#0C2340]">Managed by AutoValue</h2>

      {/* Show loading, error or car grid */}
      {loading ? (
        <p>Loading...</p> // Show when loading
      ) : error ? (
        <p className="text-red-500">{error}</p> // Show error message
      ) : (
        <div className="grid gap-10 md:grid-cols-3">
          {/* Loop over cars and render each */}
          {cars.map((car) => (
            <motion.div
              key={car.name}
              whileHover={{ scale: 1.05 }} // Scale up slightly on hover
              className="rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-2xl transition"
            >
              {/* Car Image */}
              <div className="relative w-full h-56">
                <Image
                  src={car.image?.asset?.url || "/fallback.jpg"} // Show fallback if no image
                  alt={car.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw" // Responsive sizes
                />
              </div>

              {/* Car Details */}
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                <p className="text-gray-700">${car.price.toLocaleString()}</p>

                {/* Professional Contact Us Button */}
                <button
                  onClick={() => setIsModalOpen(true)} // Open modal on click
                  className="mt-4 w-full flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-[#0C2340] to-[#102c57] text-white rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 font-semibold"
                >
                  Contact Us
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Contact Us Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          {/* Modal Content */}
          <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md text-center shadow-xl relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)} // Close modal on click
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            {/* Modal Title */}
            <h3 className="text-2xl font-bold mb-6 text-[#0C2340]">Contact Us</h3>

            {/* Contact Form */}
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

              {/* Send Button */}
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

export default Autovalues; // Export the component