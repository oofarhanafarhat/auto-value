

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('./bg1.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      
      <motion.div
        className="relative z-10 max-w-3xl text-center text-white space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
          Welcome to AutoValue
        </h1>
        <p className="text-lg md:text-xl text-gray-200">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Discover your cars true worth with our smart valuation tools.
        </p>
        <Link href="/valuation">
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-300">
            Get Your Car Valued
          </button>
        </Link>
      </motion.div>
    </div>
  )
}