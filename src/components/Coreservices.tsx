// src/landing/components/CoreServices.tsx

"use client";

import React from "react";

export const CoreServices = () => {
  return (
    <section className="py-20 px-6 md:px-24 bg-gray-100 text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-16 text-[#0C2340]">Our Core Services</h2>
      <div className="grid md:grid-cols-3 gap-10">
        {[
          {
            title: "Smart Car Valuation",
            desc: "AI-powered pricing model that delivers fair market value instantly.",
          },
          {
            title: "Real-Time Listings",
            desc: "Post, browse, and update listings with live data syncing.",
          },
          {
            title: "Verified Dealership Access",
            desc: "Secure dealer portals for professional inventory and lead management.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-transform hover:translate-y-4"
          >
            <h3 className="text-2xl font-bold mb-4 text-[#0C2340]">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};