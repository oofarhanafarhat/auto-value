

"use client"; // ✅ Enables interactivity on the client side
import Image from "next/image"; // ✅ Importing Image component from Next.js for optimized images

// ✅ Car categories for browsing different types of vehicles
const categories = [
  { name: "Sedan", icon: "/sedan.svg" },
  { name: "SUV", icon: "/cat2.svg" },
  { name: "Hatchback", icon: "/cat3.svg" },
  { name: "Convertible", icon: "/cat4.svg" },
  { name: "Electric", icon: "/cat5.svg" },
  { name: "Luxury", icon: "/cat6.svg" },
  { name: "Hybird", icon: "/cat4.svg" },
  { name: "Hetchback", icon: "/cat5.svg" },
  { name: "coupe", icon: "/cat6.svg" },
];

// ✅ Main functional component for the Car Categories section
export default function CarCategories() {
  return (
    // ✅ Section wrapper with padding and background color
    <section className="bg-gradient-to-br from-[#f8f9fa] via-white to-[#f8f9fa] py-20">
      {/* ✅ Container to center content */}
      <div className="max-w-7xl mx-auto px-4">
        
        {/* ✅ Section heading and subtitle */}
        <div className="text-center mb-12">
          <h2 className=" text-start text-3xl  lg:text-4xl font-bold text-[#0C2340]">
            Browse by Type
          </h2>
        
        </div>

        {/* ✅ Grid to display categories with responsive layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-9 gap-6">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 transition-all rounded-xl p-4 shadow-sm cursor-pointer"
          >
            {/* ✅ Category icon */}
            <Image
              src={category.icon}
              width={48}
              height={48}
              alt={category.name}
              className="w-12 h-12 mb-3"
            />
            {/* ✅ Category label */}
            <span className="text-sm font-medium text-[#0C2340]">
              {category.name}
            </span>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}