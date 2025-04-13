"use client";

import Link from "next/link";
import { useUser, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handlePostAd = () => {
    if (!isSignedIn) {
      alert("Please sign in to post an ad.");
    } else {
      router.push("/post-ad");
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">
          <Link href="/">PakWheels</Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-4">
          <Link href="/cars" className="text-gray-700 hover:text-blue-600">Cars</Link>
          <Link href="/bikes" className="text-gray-700 hover:text-blue-600">Bikes</Link>
          <Link href="/parts" className="text-gray-700 hover:text-blue-600">Parts</Link>

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              More
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                <Link href="/about-us" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">About Us</Link>
                <Link href="/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Contact</Link>
                <Link href="/terms" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Terms & Conditions</Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Auth / Post Ad */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePostAd}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Post Ad
          </button>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-gray-700 hover:text-blue-600 py-2 px-2 border-gray-800 bg-gray-600">Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Sign Up</button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;