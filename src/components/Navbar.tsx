'use client';

import Link from 'next/link';
import { useUser, SignOutButton } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaShoppingCart } from 'react-icons/fa';


const Navbar = () => {
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  
  useEffect(() => {
    const fetchCartCount = async () => {
      if (!user) return;
      try {
        const res = await fetch('/api/cart');
        const data = await res.json();
        setCartCount(data.length || 0);
      } catch (err) {
        console.error('Error fetching cart count:', err);
        setCartCount(0);
      }
    };
    fetchCartCount();
  }, [user]);
  

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-[#0C2340]">
          AutoValue
        </Link>

        <ul className="hidden md:flex space-x-6 items-center">
          <li><Link href="/" className="text-[#0C2340] font-medium">Home</Link></li>
          <li><Link href="/valuation" className="text-[#0C2340] font-medium">Valuation</Link></li>
          <li><Link href="/listings" className="font-medium hover:text-blue-500">Listings</Link></li>
          <li><Link href="/support" className="font-medium hover:text-blue-500">Support</Link></li>
          {user ? (
            <>
              <li><Link href="/dashboard" className="font-semibold">{user.firstName}</Link></li>
              <li>
                <Link href="/cart" className="relative font-medium hover:text-blue-500 flex items-center">
                  <FaShoppingCart className="text-xl" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-3 text-xs bg-red-500 text-white rounded-full px-2">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <SignOutButton>
                  <button className="bg-[#0C2340] text-white px-4 py-1 rounded-md hover:bg-red-600">
                    Sign Out
                  </button>
                </SignOutButton>
              </li>
            </>
          ) : (
            <>
              <li><Link href="/sign-in" className="bg-[#0C2340] text-white px-4 py-1 rounded-md hover:bg-blue-600">Sign In</Link></li>
              <li><Link href="/sign-up" className="text-[#0C2340] hover:underline">Register</Link></li>
            </>
          )}
        </ul>

        <button onClick={toggleMenu} className="md:hidden text-2xl">
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-white px-4 pt-4 pb-6 space-y-4 shadow-lg">
          <Link href="/" className="block font-medium hover:text-blue-500">Home</Link>
          <Link href="/valuation" className="block font-medium hover:text-blue-500">Valuation</Link>
          <Link href="/listings" className="block font-medium hover:text-blue-500">Listings</Link>
          <Link href="/support" className="block font-medium hover:text-blue-500">Support</Link>
          {user ? (
            <>
              <Link href="/dashboard" className="block font-semibold">{user.firstName}</Link>
              <Link href="/cart" className="relative block font-medium hover:text-blue-500">
                <div className="flex items-center">
                  <FaShoppingCart className="text-xl" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white rounded-full px-2">
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>
              <SignOutButton>
                <button className="bg-[#0C2340] text-white px-4 py-1 rounded-md hover:bg-red-600 w-full text-left">
                  Sign Out
                </button>
              </SignOutButton>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="block bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600">Sign In</Link>
              <Link href="/sign-up" className="block text-blue-600 hover:underline">Register</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
