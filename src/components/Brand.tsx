

// ✅ Import Next.js Image component
import Image from "next/image";

// ✅ Dummy brand logos (these should be in your /public folder)
const brands = [
  { name: "Toyota", logo: "/pre1.png" },
  { name: "Honda", logo: "/pre2.png" },
  { name: "BMW", logo: "/pre3.png" },
  { name: "Mercedes", logo: "/pre4.png" },
  { name: "Ford", logo: "/pre5.png" },
  { name: "Audi", logo: "/pre7.png" },
  { name: "Hyundai", logo: "/pre8.png" },
  { name: "Bentlay", logo: "/pre6.png" },
  { name: "Nisan", logo: "/pre9.png" },
];

export default function BrandsSection() {
  return (
    // ✅ Section background and padding
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* ✅ Heading and button row */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          {/* ✅ Section heading */}
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0C2340]">
            Explore Our Premium Brands
          </h2>

        </div>

        {/* ✅ Brand logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-9 gap-6 items-center justify-items-center">
          {brands.map((brand) => (
            <div key={brand.name} className="flex flex-col items-center">
              <div className="relative w-24 h-12 grayscale hover:grayscale-0 transition">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} Logo`}
                  fill
                  className="object-contain"
                />
              </div>
              {/* Brand name below icon */}
              <p className="mt-2 text-sm font-medium text-gray-700">{brand.name}</p>
            </div>
   
          ))}
        </div>
      </div>
    </section>
  );
}