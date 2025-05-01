// components/Footer.tsx

// Importing necessary libraries
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import React from 'react';

// Fully modern, responsive, professional footer component
const Footer = () => {
  return (
    <footer className="bg-gray-100 text-[#0C2340] px-6 md:px-20 pt-14 pb-10">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo + Tagline */}
        <div>
          <h3 className="text-2xl font-bold mb-3">AutoValue</h3>
          <p className="text-sm leading-relaxed">
            Smart car valuations, seamless listings, and trusted dealership access all in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/valuation" className="hover:underline">Car Valuation</Link></li>
            <li><Link href="/listings" className="hover:underline">Listings</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Account</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/sign-in" className="hover:underline">Sign In</Link></li>
            <li><Link href="/sign-up" className="hover:underline">Register</Link></li>
            <li><Link href="/forgot-password" className="hover:underline">Forgot Password</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/support" className="hover:underline">Help Center</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      {/* Divider + Bottom Bar */}
      <div className="mt-10 border-t border-gray-600 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs">
        <p className="mb-4 sm:mb-0">&copy; {new Date().getFullYear()} AutoValue. All rights reserved.</p>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <Link href="#" className="hover:text-gray-300">
            <FaFacebookF size={14} />
          </Link>
          <Link href="#" className="hover:text-gray-300">
            <FaInstagram size={14} />
          </Link>
          <Link href="#" className="hover:text-gray-300">
            <FaTwitter size={14} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;