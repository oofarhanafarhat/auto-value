"use client";

import React from "react";
import Image from "next/image";

export const ChooseUs = () => {
  return (
    <section className="w-full bg-[#2563EB] text-white py-20 px-6 md:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Left Side Image */}
        <div className="flex justify-center">
          <Image
            src="/choose1.jpg" // 🔁 Replace this with actual image path from public folder
            alt="Mailbox Illustration"
            width={300}
            height={300}
            className="w-full max-w-[300px] md:max-w-[350px]"
          />
        </div>

        {/* Right Side Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Subscribe To Our Mailing <br />
            List And Stay Up To Date
          </h2>
          <p className="text-sm md:text-base text-white/80 mb-6">
            We ll keep you updated with the best new jobs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="px-5 py-3 rounded-xl text-gray-800 focus:outline-none flex-1"
            />
            <button className="bg-white text-[#2563EB] font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
