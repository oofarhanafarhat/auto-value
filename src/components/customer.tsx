import Image from "next/image";

const test = [
  {
    name: "saira Khan",
    Title:"Bought Tesla Model 3  ",
    comment: "I was nervous about switching to an electric vehicle, but the guidance and listings were amazing!",
    image: "/cus4.jpeg",
  },
  {
    name: "Ali Raza",
    Title:"Bought Tesla Model 3  for $85,000",
    comment: "AutoValue made it so easy to find the perfect car. Great platform and very reliable service.",
    image: "/cus3.jpeg",
  },
  {
    name: "Sara Khan",
    Title:"Bought Tesla Model 3  for $85,000",
    comment: "I was nervous about switching to an electric vehicle but the guidance and listings were amazing!",
    image: "/cus4.jpeg",
  },
 

];

export default function Customer() {
  return (
    <section className="bg-gradient-to-br from-[#f8f9fa] via-white to-[#f8f9fa] pt-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-2xl font-normal text-[#100E34]  text-center mb-10">
          Our Coustomer feedback
        </h2>
     

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {test.map((t) => (
            <div
              key={t.name}
              className="bg-[#FFFFFE] p-6 rounded-xl shadow-sm hover:shadow-lg hover:translate-y-5 text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold text-[#0C2340]">{t.name}</h4>
                  <p className="text-sm font-medium text-[#100E34]  text-start">{t.Title}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{t.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
