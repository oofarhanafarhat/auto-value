import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero2(){
  return (
    <section className="relative w-full bg-[#F8F8F8] py-16 px-4">
      {/* Main Hero Layout */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 relative">
        {/* Left Text */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900  px-2 leading-loose">
            BEST
               <span className="text-[#A2001D] text-3xl mr-10 font-bold ml-2 pl-4">DEALER</span >
               <span className="text-2xl md:text-3xl font-bold text-gray-900 leading-loose">
            FOR <br /> YOUR FOUR WHEELER
          </span>
          </h1>
       
          
          <Link
            href="/listings"
            className="mt-6 inline-block bg-blue-950 text-white font-semibold py-2 px-6 rounded-full hover:bg-red-700 transition duration-300"
          >
            Shop Now
          </Link>
        </div>

        {/* Right Side Image + Dots + Buttons */}
        <div className="relative w-full md:w-1/2 flex flex-col items-center">
          {/* 3 Vertical Dots in Top-Right Corner */}
          <div className="absolute top-0 right-0 flex flex-col items-center space-y-3 pr-2">
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
          </div>

          {/* Car Image */}
          <Image
            src="/hero2.png"
            width={690}
            height={375}
            alt="Car Hero"
            className="w-full h-auto drop-shadow-xl mx-auto hover:translate-x-6 hover:translate-y-10 hover:scale-100" 
          />

          {/* Buttons under Image */}
          <div className="mt-4 flex gap-4">
            <Link href={"/hero"}><button className="bg-white hover:bg-gray-400 text-gray-800 font-bold px-5 py-2 rounded-full transition duration-300">
            &lt;
            </button></Link>
           <Link href={"/"}> <button className="bg-white hover:bg-gray-400 text-gray-800 font-bold px-5 py-2 rounded-full transition duration-300">
              &gt;
            </button></Link>
          </div>
        </div>
      </div>
      </section>
  )
}
