import React from 'react'
import { motion } from 'framer-motion'

export const Coreservices = () => {
  return (
    <main>
      <div className="px-6 md:px-20 py-16 text-center bg-[#0C2340]">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">Our Core Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
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
              className="bg-white text-[#0C2340] p-6 rounded-xl shadow-lg  hover:translate-y-4 transition-transform duration-300 ease-in-out"
            >
              <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
        </div>
      
    </main>
    )}

