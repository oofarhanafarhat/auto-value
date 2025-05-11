// File: components/Footer.tsx

"use client";

import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaArrowRight } from "react-icons/fa";

// ✅ Fully styled footer with inline arrow in input
const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F8F8F8] text-gray-800 mt-10 border-t">
      {/* ✅ Top section: newsletter + 3 columns */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* ✅ Newsletter Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Subscribe To The Newsletter</h3>

          {/* ✅ Input with red circle arrow inside */}
          <div className="relative w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
              aria-label="Subscribe"
            >
              <FaArrowRight className="text-sm" />
            </button>
          </div>

          {/* ✅ Social Media Icons */}
          <div className="flex space-x-3 mt-4 text-xl text-gray-600">
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter className="hover:text-blue-400 cursor-pointer  bg-blue-500 rounded-full text-gray-100" />
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF className="hover:text-blue-600 cursor-pointer bg-blue-950 rounded-full text-gray-100" />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="hover:text-blue-700 cursor-pointer  bg-blue-950 rounded-full text-gray-100 " />
            </a>
          </div>
        </div>

        {/* ✅ Buying & Selling Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Buying & Selling</h3>
          <ul className="space-y-2 text-sm">
            <li>Find A Car</li>
            <li>Listings By City</li>
            <li>Sell Your Car</li>
            <li>Compare Side By Side</li>
          </ul>
        </div>

        {/* ✅ Resources Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Resource</h3>
          <ul className="space-y-2 text-sm">
            <li>Blog</li>
            <li>Guides</li>
            <li>FAQ</li>
            <li>Help Center</li>
          </ul>
        </div>

        {/* ✅ About Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">About</h3>
          <ul className="space-y-2 text-sm">
            <li>Company</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>

      {/* ✅ Footer Bottom Legal */}
      <div className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        <p>&copy; 2025 Car Leadership</p>
        <div className="flex justify-center flex-wrap gap-4 mt-2">
          <span>Terms Of Service</span>
          <span>Privacy Policy</span>
          <span>Trust & Safety</span>
          <span>Law Enforcement</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;