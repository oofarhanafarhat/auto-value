// src/landing/components/About.tsx

"use client";

import { motion } from "framer-motion";

const About = () => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="py-20 px-6 md:px-24 bg-white text-center"
  >
    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#0C2340]">
      About <span className="text-primary">AutoValue</span>
    </h2>
    <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
      AutoValue is your trusted partner for accurate car valuations, seamless listings,
      and professional dealership experiences. We empower your journey with reliability and innovation.
    </p>
  </motion.section>
);

export default About;