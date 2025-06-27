"use client";

import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="bg-gradient-to-br from-[#f8f9fa] via-white to-[#f8f9fa] min-h-screen px-4 py-16 text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#0C2340]">Get In Touch</h1>
          <p className="text-gray-600 mt-4 text-lg">
            Have questions or want to work with us? Fill the form or reach us via social platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white shadow-xl rounded-2xl p-8 space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#0C2340]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#0C2340]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Message</label>
              <textarea
                placeholder="Write your message..."
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#0C2340]"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#0C2340] to-[#A2001D] text-white py-3 rounded-xl font-semibold transition"
            >
              Send Message
            </motion.button>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8 text-center md:text-left"
          >
            <div>
              <h2 className="text-2xl font-semibold text-[#0C2340]">Our Office</h2>
              <p className="text-gray-600 mt-2">123 Car Street, Auto City, Pakistan</p>
              <p className="text-gray-600">Email: support@cardealer.com</p>
              <p className="text-gray-600">Phone: +92 123 4567890</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#0C2340]">Follow Us</h2>
              <div className="flex justify-center md:justify-start gap-4 mt-4">
                {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map((Icon, i) => (
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    key={i}
                    href="#"
                    target="_blank"
                    className="bg-[#0C2340] text-white p-3 rounded-full hover:bg-[#A2001D] transition"
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <Image
                src="/about.jpeg"
                alt="Contact Image"
                width={500}
                height={300}
                className="rounded-xl object-cover mx-auto md:mx-0"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
