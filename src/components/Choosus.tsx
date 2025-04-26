// src/landing/components/ChooseUs.tsx

"use client";

import React from "react";

export const ChooseUs = () => {
  const features = [
    {
      title: "Accuracy & Trust",
      desc: "We use verified data and AI to provide highly accurate valuations tailored to market trends.",
    },
    {
      title: "Seamless Experience",
      desc: "From listing to lead capture, enjoy a smooth and intuitive experience at every step.",
    },
    {
      title: "Mobile First",
      desc: "Fully responsive layout ensures flawless performance across all devices.",
    },
    {
      title: "Secure & Scalable",
      desc: "Built with modern technology for unmatched security and scalability.",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#0C2340] mb-16">
          Why Choose <span className="text-primary">AutoValue</span>?
        </h2>
        <div className="grid gap-10 sm:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 bg-gray-50 rounded-3xl border hover:shadow-lg transition-all"
            >
              <h3 className="text-2xl font-bold mb-4 text-[#0C2340]">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};