// WhyElectricVehicles.jsx
import React from 'react';
import { ArrowRight, Rocket, Diamond, Tag, Truck } from 'lucide-react';

export default function WhyElectricVehicles() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 lg:flex lg:items-start lg:justify-between">
        {/* Left column */}
        <div className="lg:w-1/2 lg:pr-8">
          <h2 className="text-3xl font-bold text-gray-900">Why Electric Vehicles?</h2>
          <p className="mt-4 text-gray-700">
            We are committed to providing our customers with exceptional service, competitive pricing, and a wide range of EV solutions.
          </p>
          <button className="mt-6 inline-flex items-center bg-blue-600 text-white font-semibold py-3 px-5 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200">
            Get Started
            <ArrowRight className="ml-2" aria-hidden="true" />
          </button>
        </div>
        {/* Right column: feature cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:mt-0 lg:w-1/2">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl hover:transition-all hover:translate-y-4 ">
            <Rocket className="text-blue-600" size={32} aria-hidden="true" />
            <h3 className="mt-4 font-semibold text-gray-900">Special Financing Offers</h3>
            <p className="mt-2 text-gray-600 text-sm">
              Our stress-free finance department that can find financial solutions to save you money.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl hover:transition-all hover:translate-y-4">
            <Diamond className="text-blue-600" size={32} aria-hidden="true" />
            <h3 className="mt-4 font-semibold text-gray-900">Trusted Car Dealership</h3>
            <p className="mt-2 text-gray-600 text-sm">
              Our stress-free finance department that can find financial solutions to save you money.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl hover:transition-all hover:translate-y-4">
            <Tag className="text-blue-600" size={32} aria-hidden="true" />
            <h3 className="mt-4 font-semibold text-gray-900">Transparent Pricing</h3>
            <p className="mt-2 text-gray-600 text-sm">
              Our stress-free finance department that can find financial solutions to save you money.
            </p>
          </div>
          {/* Card 4 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl hover:transition-all hover:translate-y-4">
            <Truck className="text-blue-600" size={32} aria-hidden="true" />
            <h3 className="mt-4 font-semibold text-gray-900">Expert Car Service</h3>
            <p className="mt-2 text-gray-600 text-sm">
              Our stress-free finance department that can find financial solutions to save you money.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
