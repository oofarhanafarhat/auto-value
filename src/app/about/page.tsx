"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-br from-[#F8F8F8] via-white to-[#F8F8F8] text-gray-800 min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0C2340] mb-4">
            About Our Dealership
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover who we are, our mission, and how our trusted dealers bring you the best in automotive services.
          </p>
        </div>

        {/* Dealership Section */}
        <div className="flex flex-col md:flex-row items-center gap-10 bg-white rounded-3xl shadow-lg p-8 transition-transform duration-300 hover:shadow-xl hover:scale-[1.01]">
          {/* Image */}
          <div className="relative w-full md:w-1/2 h-72 rounded-xl overflow-hidden">
            <Image
              src="/about.jpeg"
              alt="Main Dealership"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Text */}
          <div className="md:w-1/2 space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-[#0C2340]">Leading the Auto World</h2>
            <p className="text-gray-600">
              Our dealership has been serving customers with integrity and dedication for over a decade. We offer a wide range of premium vehicles,
              after-sales service, and expert guidance tailored to every driver’s needs.
            </p>
            <p className="text-gray-600">
              Customer satisfaction is our top priority, and we are committed to delivering a seamless and trusted car buying experience.
            </p>
          </div>
        </div>

        {/* Sub Dealers */}
        <div className="space-y-12">
          <h2 className="text-3xl font-bold text-center text-[#0C2340]">
            Our Sub-Dealers
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Alpha Motors", Image: "/alpha.avif", location: "Lahore", desc: "Renowned for high-end SUVs and quality support." },
              { name: "Speedster Wheels", Image: "/motors.webp", location: "Karachi", desc: "Experts in used cars and fast delivery." },
              { name: "DrivePro Autos", Image: "/motors2.webp", location: "Islamabad", desc: "Known for luxury sedans and warranty services." },
            ].map((dealer, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 group hover:scale-[1.01]"
              >
                <div className="relative h-40 w-full mb-4 rounded-xl overflow-hidden">
                  <Image
                    src={dealer.Image}
                    alt={dealer.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#0C2340]">
                  {dealer.name}
                </h3>
                <p className="text-sm text-gray-500">{dealer.location}</p>
                <p className="mt-2 text-gray-600 text-sm">{dealer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
