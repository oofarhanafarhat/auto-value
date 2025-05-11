'use client';

import { fetchCars } from '@/sanity/lib/fetchCars';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface Car {
  _id: string;
  name: string;
  slug: { current: string };
  price: string;
  image: any;
  year: string;
  fuel: string;
}

const ExploreSection = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const getCars = async () => {
      const data = await fetchCars();
      setCars(data);
    };
    getCars();
  }, []);

  return (
    <section className="bg-[#F7F7F9] py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-normal text-center text-[#666872] mb-10">
          Explore 
        </h2 >
   <div className="flex flex-wrap justify-center gap-4 mb-14">
          {['Cars & Minivan', 'Trucks', 'Crossovers & SUVs', 'Electrified'].map((category, i) => (
            <button
              key={i}
              className={`px-4 py-3 font-light rounded-full hover:translate-y-4  transition-all duration-300 ${
                i === 0
                  ? 'bg-[#A2001D] text-white hover:bg-gray-300 hover:text-gray-700 hover:translate-y-4'
                  : 'text-[#666872] hover:text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2  lg:girds-cols-3 gap-10">
          {cars.map((car) => (
            <div
              key={car._id}
              className="flex flex-col md:flex-row items-start "
            >
              {/* Left - Car Image (no background, sharp corners) */}
              <div className="relative z-10 w-full md:w-[330px] h-[200px] -mr-6 md:-mr-16 md:-mb-1 mt-16 pl-28">
                <Image
                  src={urlFor(car.image).url()}
                  alt={car.name}
                  fill
                  className="object-cover pt-8 "
                />
              </div>

              {/* Right - White Card with Details */}
              <div className="bg-white rounded-3xl shadow-lg p-6 w-full md:w-[700px] text-end flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-[#0C2340] text-start">
                    {car.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 text-start">Used</p>

                  <div className="space-y-2 text-sm text-gray-700">
                    <p>
                      <span className="font-semibold text-gray-600">
                        Model Year:
                      </span>{' '}
                      {car.year}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-600">
                        Model:
                      </span>{' '}
                      LC76
                    </p>
                    <p>
                      <span className="font-semibold text-gray-600">Fuel:</span>{' '}
                      {car.fuel}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-3xl font-bold text-[#0C2340] mb-4">
                    $ {car.price}
                  </p>

                  <Link
                    href={`/listing/${car.slug.current}`}
                    className="inline-flex items-center justify-center  bg-[#0C2340] text-white px-6 py-2 rounded-full hover:bg-blue-900 transition text-sm font-medium"
                  >
                    Order Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-end">
          <Link
            href="/listings"
            className="inline-block bg-[[#F7F7F9] text-[#0C2340] font-light px-6 py-2  hover:shadow-lg hover:border-gray-900 rounded-2xl  hover:bg-gray-300 transition text-sm "
          >
            View More Cars
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExploreSection