// components/Hero.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const tabs = ["New", "Used"];

export default function Hero() {
  const [activeTab, setActiveTab] = useState("New");
  const [make, setMake] = useState("Audi");
  const [model, setModel] = useState("Q7");
  const [price, setPrice] = useState([250000]);

  return (
    <section className="relative bg-[#03030f]  bg-opacity-100 text-white">
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-10">
        
        {/* === Left Side: Heading + Form === */}
        <div className="flex-1 max-w-md w-full">
          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-white">
          Let&apos;s Find Your Perfect Car
          </h2>

          {/* Form Box */}
          <div className="bg-white rounded-xl p-6 text-black shadow-xl">
            
            {/* Tabs */}
            <div className="flex mb-2 mt-6 rounded-lg overflow-hidden border border-gray-300">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "w-1/2 py-2 text-sm font-semibold transition-colors duration-300",
                    activeTab === tab
                      ? "bg-[#0C2340] text-white"
                      : "bg-white text-[#0C2340]"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Dropdowns */}
            <div className="space-y-4 mb-6">
              <select
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3"
              >
                <option value="Audi">Audi</option>
                <option value="Toyota">Toyota</option>
                <option value="BMW">BMW</option>
              </select>

              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3"
              >
                <option value="Q7">Q7</option>
                <option value="Rav4">Rav4</option>
                <option value="X5">X5</option>
              </select>
            </div>

            {/* Price Slider */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#0C2340] mb-2">
                Select Price
              </label>
              <Slider
                value={price}
                onValueChange={setPrice}
                min={0}
                max={250000}
                step={1000}
                className="w-full"
              />
              <div className="flex justify-between text-sm mt-2">
                <span>$0</span>
                <span>${price[0].toLocaleString()}</span>
              </div>
            </div>

            {/* Search Button */}
            <button className="bg-[#0C2340] text-white w-full py-3 rounded-md font-semibold hover:bg-[#1a2f55] transition-all">
              Search
            </button>
          </div>
        </div>

        {/* === Right Side: Image === */}
        <div className="flex-1">
          <Image
            src="/bg2.jpg"
            alt="Electric Car"
            width={600}
            height={800}
            className="w-full h-auto object-contain transition-transform duration-700 hover:scale-105 "
            priority
          />
        </div>
      </div>
    </section>
  );
}