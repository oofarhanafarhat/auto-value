'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#F8F8F8] shadow-md w-full z-50">
      {/* Desktop Layout */}
      <div className="max-w-7xl mx-auto px-4 py-4 hidden md:flex justify-between items-center">
        {/* Left Links */}
        <ul className="flex space-x-6 text-[#666872] font-medium">
          <li className="hover:text-[#A2001D] cursor-pointer">Mobile</li>
          <li className="hover:text-[#A2001D] cursor-pointer">Menu 1</li>
          <li className="hover:text-[#A2001D] cursor-pointer">Menu 1</li>
        </ul>

        {/* Center Logo */}
        <div className="flex items-center">
          <strong className="text-[#100E34] text-3xl font-bold pr-1">CAR</strong>
          <strong className="text-[#A2001D] text-2xl font-bold">DEALERSHIP</strong>
        </div>

        {/* Right Links */}
        <ul className="flex space-x-6 text-[#666872] font-medium">
          <li className="hover:text-[#A2001D] cursor-pointer">Menu 1</li>
          <li className="hover:text-[#A2001D] cursor-pointer">Menu 2</li>
          <Link href="/sign-in" className="hover:text-[#A2001D]">Sign In</Link>
          <Link href="/sign-up" className="hover:text-[#A2001D]">Register</Link>
        </ul>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden px-4 py-4 flex justify-between items-center">
        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Logo Centered */}
        <div className="flex items-center">
          <strong className="text-[#100E34] text-2xl font-bold pr-1">CAR</strong>
          <strong className="text-[#A2001D] text-xl font-bold">DEALERSHIP</strong>
        </div>

        {/* Empty placeholder for symmetry */}
        <div style={{ width: '24px' }}></div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#F8F8F8] px-4 pb-4 space-y-2 text-[#666872] font-medium border-t">
          <div className="flex flex-col space-y-1">
            <span className="hover:text-[#A2001D]">Mobile</span>
            <span className="hover:text-[#A2001D]">Menu 1</span>
            <span className="hover:text-[#A2001D]">Menu 1</span>
          </div>
          <hr className="my-2" />
          <div className="flex flex-col space-y-1">
            <span className="hover:text-[#A2001D]">Menu 1</span>
            <span className="hover:text-[#A2001D]">Menu 2</span>
            <Link href="/sign-in" className="hover:text-[#A2001D]">Sign In</Link>
            <Link href="/sign-up" className="hover:text-[#A2001D]">Register</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
