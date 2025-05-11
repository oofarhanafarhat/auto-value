"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HeroWithEstimator() {
  const [condition, setCondition] = useState("New & Used");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [userPrice, setUserPrice] = useState<number | "">("");
  const [estimate, setEstimate] = useState<number | null>(null);

  const handleEstimate = () => {
    if (!userPrice || isNaN(Number(userPrice))) {
      alert("Please enter a valid price.");
      return;
    }

    const multiplier = condition === "Used" ? 0.75 : 1;
    const randomBoost = Math.random() * 5000;
    const final = Math.round(Number(userPrice) * multiplier + randomBoost);
    setEstimate(final);
  };

  return (
    <section className="relative w-full bg-[#F8F8F8] py-16 px-4">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Find Your Dreams
          </h1>
          <span className="text-[#A2001D] text-5xl sm:text-6xl font-bold">
            car
          </span>
          <div>
            <Link
              href="/listings"
              className="mt-6 inline-block bg-blue-950 text-white font-semibold py-2 px-6 rounded-full hover:bg-red-700 transition duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 flex flex-col items-center relative">
          {/* Decorative Dots */}
          <div className="absolute top-0 right-0 flex flex-col items-center space-y-3 pr-2">
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
          </div>

          {/* Car Image */}
          <Image
            src="/hero.png"
            width={690}
            height={375}
            alt="Car Hero"
            className="w-full h-auto max-w-[500px] drop-shadow-xl"
          />

          {/* Slide Navigation */}
          <div className="mt-4 flex gap-4">
            <Link href="/hero2">
              <button className="bg-white hover:bg-gray-400 text-gray-800 font-bold px-5 py-2 rounded-full transition duration-300">
                &lt;
              </button>
            </Link>
            <Link href="/">
              <button className="bg-white hover:bg-gray-400 text-gray-800 font-bold px-5 py-2 rounded-full transition duration-300">
                &gt;
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Estimator Section */}
      <div className="mt-16 max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-3xl shadow-xl">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none w-40"
          >
            <option>New & Used</option>
            <option>Used</option>
          </select>

          <input
            type="text"
            placeholder="Enter Make"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none w-40"
          />

          <input
            type="text"
            placeholder="Enter Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none w-40"
          />

          <input
            type="number"
            placeholder="Enter Price"
            value={userPrice}
            onChange={(e) =>
              setUserPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none w-40"
          />

          <button
            onClick={handleEstimate}
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-full transition duration-300 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Search
          </button>
        </div>

        {estimate && (
          <div className="text-center text-xl font-bold text-green-700">
            Estimated Price: ${estimate.toLocaleString()}
          </div>
        )}
      </div>
    </section>
  );
}
