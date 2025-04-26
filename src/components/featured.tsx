
"use client";

// Importing necessary hooks and libraries
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { client } from "@/sanity/lib/client"; // Import Sanity client

// Defining the TypeScript type for a car listing
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

// Main FeaturedCars component
const FeaturedCars = () => {
  // State to hold fetched car listings
  const [cars, setCars] = useState<CarListing[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // useEffect hook to fetch featured cars from Sanity
  useEffect(() => {
    const fetchCars = async () => {
      try {
        // GROQ query to get cars where 'addToCart' is true (featured cars)
        const query = `*[_type == "carListing" && addToCart == true]{
          _id,
          name,
          model,
          price,
          image {
            asset -> {
              url
            }
          }
        }`;

        const data = await client.fetch(query); // Fetching data
        setCars(data); // Setting data to state
        setLoading(false); // Turn off loading once data is fetched
      } catch (err) {
        setError("Failed to load featured cars."); // Setting error message
        setLoading(false);
      }
    };

    fetchCars(); // Calling the fetch function
  }, []);

  // If still loading, show a loading text
  if (loading) {
    return <p className="text-center py-10">Loading featured cars...</p>;
  }

  // If error occurred, show error message
  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Featured Cars
        </motion.h2>

        {/* Cars Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <motion.div
              key={car._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition"
              whileHover={{ scale: 1.05 }}
            >
              {/* Car Image */}
              <div className="relative h-56 w-full">
                <Image
                  src={car.image.asset.url}
                  alt={car.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Car Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold">{car.name}</h3>
                <p className="text-gray-600">{car.model}</p>
                <p className="text-primary font-bold mt-2">${car.price.toLocaleString()}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;