'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiShoppingCart, FiX, } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // TODO: Replace 0 with actual cart count from context or props if available
  const { cartCount } = useCart(); // 🛒 Get cart from context
  const cartItems = cartCount;


  return (
    <header className="bg-gradient-to-br from-[#f8f9fa] via-white to-[#f8f9fa] shadow-md w-full z-50">
      {/* Desktop Layout */}
      <div className="max-w-7xl mx-auto px-4 py-4 hidden md:flex justify-between items-center">
        {/* Left Links */}
        <ul className="flex space-x-6 text-[#666872] font-medium">
        <Link href={"/"}> <li className="hover:text-[#A2001D] cursor-pointer">Home</li></Link> 
           <Link href={"/about"}> <li className="hover:text-[#A2001D] cursor-pointer">About</li></Link> 
           <Link href={"/contect"}> <li className="hover:text-[#A2001D] cursor-pointer">Contect</li></Link> 

        </ul>

        {/* Center Logo */}
        <div className="flex items-center">
          <strong className="text-[#100E34] text-3xl font-bold pr-1">CAR</strong>
          <strong className="text-[#A2001D] text-2xl font-bold">DEALERSHIP</strong>
        </div>

        {/* Right Links */}
        <ul className="flex space-x-6 text-[#666872] font-medium">
        <Link href={"/dealer-dashboard"}>  <li className="hover:text-[#A2001D] cursor-pointer">D-Dashborad</li></Link>
        <Link href={"/user-dashboard"}> <li className="hover:text-[#A2001D] cursor-pointer">U-Dashboard</li></Link> 
          <Link href="/sign-in" className="hover:text-[#A2001D]">Sign In</Link>
          <Link href="/cart" className="relative">
            <FiShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>


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
          <Link href={"/"}><span className="hover:text-[#A2001D]">Home</span></Link>  
            <Link href={"/about"}>  <span className="hover:text-[#A2001D]">About</span></Link>  
             <Link href={"/contect"}> <span className="hover:text-[#A2001D]">Contect</span></Link>  
          </div>
          <hr className="my-2" />
          <div className="flex flex-col space-y-1">
          <Link href={"/dealer-dashboard"}> <span className="hover:text-[#A2001D]">D-Dashborad</span></Link> 
           <Link href={"/user-dashboard"}> <span className="hover:text-[#A2001D]">U-Dashboard</span></Link>
            <Link href="/sign-in" className="hover:text-[#A2001D]">Sign In</Link>
            <Link href="/cart" className="relative">
              <FiShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>


          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
