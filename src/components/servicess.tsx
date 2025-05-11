import Image from 'next/image';

export default function OurServicesSection() {
  return (
    <section className="bg-[#F7F7F9] py-16 px-4 md:px-10 lg:px-20">
      {/* Services Header */}
      <div className="text-center mb-12 bg-[#F7F7F9]">
        <h2 className="text-xl md:text-2xl font-semibold text-[#666872]">Our Services</h2>
        <p className="text-sm md:text-base text-[#666872] mt-2">
          We Provide Many Of The Best Services For You And You Will Get The Best Benefits Here
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            icon: '/car.png',
            title: 'Top Buy & Sell Car',
            desc: 'We Provide Many Of The Best Services For You And You Will Get The Best Benefits Here',
          },
          {
            icon: '/wallet.png',
            title: 'Easy Payment',
            desc: 'We Provide Many Of The Best Services For You And You Will Get The Best Benefits Here',
          },
          {
            icon: '/bus.png',
            title: 'Easy To Use',
            desc: 'We Provide Many Of The Best Services For You And You Will Get The Best Benefits Here',
          },
        ].map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 items-start hover:shadow-lg transition-shadow hover:translate-y-6"
          >
            <Image
              src={service.icon}
              alt={service.title}
              width={40}
              height={40}
              className=" mb-4 "
            />
            <h3 className="text-lg font-bold text-gray-800 mb-2">{service.title}</h3>
            <p className="text-sm text-gray-500">{service.desc}</p>
          </div>
        ))}
      </div>

      {/* EVs For Everyone Section */}
      <div className=" bg-[#F7F7F9] rounded-xl shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2 ">
        {/* Image Section */}
        <div>
          <Image
            src="/serv1.png"
            width={300} 
            height={250}// Replace with your actual image path
            alt="EV car"
            
            className="object-cover relative z-10 w-full md:w-[600px] h-[250px] md:-mb-1 mt-16 ml-20   "
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col justify-center items-start bg-[#FFFFFE] mt-10 px-6 h-80  w-[500px] text-start">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 ml-20">EVs For Everyone</h3>
          <p className="text-sm text-gray-600 mb-10 px-20">
            We Provide Many Of The Best Services For You And You Will Get The Best Benefits Here
          </p>
          <button className="bg-[#0f172a] text-white px-5 py-2 rounded-full w-fit hover:bg-[#1e293b] transition ml-20">
            Read More →
          </button>
        </div>
      </div>
    </section>
  );
}
