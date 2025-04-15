'use client';

/* Import required packages and components */
import Link from 'next/link';
import { useUser, SignOutButton } from '@clerk/nextjs';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

/* Create a responsive Navbar component */
const Navbar = () => {
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  /* Toggle mobile menu visibility */
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* App Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          AutoValue
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li><Link href="/" className="hover:text-blue-500 font-medium">Home</Link></li>
          <li><Link href="/listing" className="hover:text-blue-500 font-medium">Listings</Link></li>
          <li><Link href="/valuation" className="hover:text-blue-500 font-medium">valuation</Link></li>

          {/* Show Sign In / Sign Out based on auth */}
          {user ? (
            <>
              <li><Link href="/dashboard" className="font-semibold">{user.firstName}</Link></li>
              <li><SignOutButton><button className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600">Sign Out</button></SignOutButton></li>
            </>
          ) : (
            <>
              <li><Link href="/sign-in" className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600">Sign In</Link></li>
              <li><Link href="/sign-up" className="text-blue-600 hover:underline">Register</Link></li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-2xl">
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Menu Content */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pt-4 pb-6 space-y-4 shadow-lg">
          <Link href="/" className="block font-medium hover:text-blue-500">Home</Link>
          <Link href="/listing" className="block font-medium hover:text-blue-500">Listings</Link>
          <Link href="/support" className="block font-medium hover:text-blue-500">Support</Link>

          {user ? (
            <>
              <Link href="/dashboard" className="block font-semibold">{user.firstName}</Link>
              <SignOutButton>
                <button className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 w-full text-left">Sign Out</button>
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