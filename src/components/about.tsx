// src/app/(site)/landing/components/About.tsx
"use client";
import { motion } from "framer-motion";

const About = () => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="py-16 px-6 md:px-20 text-center"
  >
    <h2 className="text-3xl md:text-4xl font-bold mb-4">About AutoValue</h2>
    <p className="max-w-3xl mx-auto text-lg">
      AutoValue is your trusted partner for accurate car valuations, seamless listings,
      and professional dealership experiences.
    </p>
  </motion.section>
);

export default About;