'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { BiMobile } from 'react-icons/bi';
import { FiMenu, FiX } from 'react-icons/fi'; // Menu and Close icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-blue-950 text-gray-100">
      {/* Top Section */}
      <header className="flex flex-col lg:flex-row items-center justify-between p-6 border border-gray-100">
        {/* Left Section */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div className="flex items-center">
            <BiMobile className="text-red-900 mr-2" />
            <h3 className="text-gray-100">Download App Via SMS</h3>
          </div>
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-100 focus:outline-none"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex space-x-6">
          <h3 className="text-red-600">اُردو</h3>
          <button className="border-l-2 border-gray-500 pl-3">Sign In</button>
          <button className="border-l-2 border-gray-500 pl-3">Sign Up</button>
        </div>
      </header>

      {/* Navbar Links */}
      <nav className="lg:flex justify-center items-center p-4">
     
        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6 ">
          <li>UsedCars</li>
          <li>NewCars</li>
          <li>Bikes</li>
          <li>AutoStore</li>
          <li>Vedeos</li>
          <li>Forms</li>
          <li>Blogs</li>
          <li>More</li>
        </ul>
        <button className="hidden lg:block py-2 px-8 bg-red-800 text-white ml-44">
          Post an Ad
        </button>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-64 h-full bg-blue-950 text-gray-100 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col p-4 space-y-4">
          <Image
            src="/logo.png"
            width={150}
            height={150}
            alt="Logo"
            className="bg-gray-800 opacity-60"
          />
          <ul className="space-y-4">
            <li>UsedCars</li>
            <li>NewCars</li>
            <li>Bikes</li>
            <li>AutoStore</li>
            <li>Vedeos</li>
            <li>Forms</li>
            <li>Blogs</li>
            <li>More</li>
          </ul>
          <button className="py-2 px-8 bg-red-800 text-white mt-4">
            Post an Ad
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;