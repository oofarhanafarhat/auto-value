// components/FeaturedListings.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

// ✅ Dummy car listing data for now — replace with Sanity fetch
const allCars = [
  {
    id: "1",
    title: "Toyota Corolla 2022",
    image: "/car1.avif",
    price: "Rs. 4,200,000",
    location: "Lahore",
  },
  {
    id: "2",
    title: "Honda Civic 2021",
    image: "/blog3.jpeg",
    price: "Rs. 5,100,000",
    location: "Karachi",
  },
  {
    id: "3",
    title: "Kia Sportage 2023",
    image: "/car4.webp",
    price: "Rs. 7,300,000",
    location: "Islamabad",
  },
  {
    id: "4",
    title: "Suzuki Alto 2020",
    image: "/car5.jpg",
    price: "Rs. 2,050,000",
    location: "Faisalabad",
  },
  {
    id: "5",
    title: "Hyundai Tucson 2022",
    image: "/car6.jpeg",
    price: "Rs. 6,900,000",
    location: "Peshawar",
  },
];

export default function FeaturedListings() {
  // ✅ State for selected filter
  const [selectedFilter, setSelectedFilter] = useState<"All" | "New" | "Used">("All");

  // ✅ Limit to first 5 cars
  const featuredCars = allCars.slice(0, 5);

  return (
    <section className="bg-[#F9FAFB] py-16 shadow-xl">
      <div className="max-w-7xl mx-auto px-4  hover:translate-y-5 ">
        {/* ✅ Section header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-[#0C2340]">
            Featured Listings
          </h2>
          <Link
            href="/listings"
            className="text-[#0C2340] font-medium hover:underline"
          >
            View All
          </Link>
        </div>
                {/* ✅ Filter tabs below heading */}
                <div className="flex gap-6 mb-10 border-b border-gray-200">
          {["All", "New", "Used"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter as "All" | "New" | "Used")}
              className={`pb-2 text-sm font-medium ${
                selectedFilter === filter
                  ? "text-[#0C2340] border-b-2 border-[#0C2340]"
                  : "text-gray-500 hover:text-[#0C2340]"
              } transition`}
            >
              {filter === "All" ? "In Stock" : filter + " Cars"}
            </button>
          ))}
        </div>


        {/* ✅ Grid of car cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {featuredCars.map((car) => (
            <Link
              key={car.id}
              href={`/listing/${car.id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="relative w-full h-40 rounded-t-xl overflow-hidden">
                <Image
                  src={car.image}
                  alt={car.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[#0C2340] mb-1">
                  {car.title}
                </h3>
                <p className="text-gray-600 text-sm">{car.location}</p>
                <p className="text-[#0C2340] font-bold mt-2">{car.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}