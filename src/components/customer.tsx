import Image from "next/image";

const test = [
  {
    name: "saira Khan",
    role: "First-time EV Owner",
    Title:"Great experience!",
    comment: "I was nervous about switching to an electric vehicle, but the guidance and listings were amazing!",
    image: "/cus4.jpeg",
  },
  {
    name: "Ali Raza",
    role: "Car Buyer",
    Title:"Great job",
    comment: "AutoValue made it so easy to find the perfect car. Great platform and very reliable service.",
    image: "/cus3.jpeg",
  },
  {
    name: "Sara Khan",
    role: "First time EV Owner",
    Title:"GOOD work",
    comment: "I was nervous about switching to an electric vehicle but the guidance and listings were amazing!",
    image: "/cus4.jpeg",
  },
  {
    name: "Bilal Ahmed",
    role: "Used Car Seller",
    Title:"Great experience!",
    comment: "I sold my used car within days. Their system is seamless and customer support was very helpful.",
    image: "/cus2.jpeg",
  },

  {
    name: "Kashif Raza",
    role: "Car Buyer",
    Title:"Great job",
    comment: "AutoValue made it so easy to find the perfect car. Great platform and very reliable service.",
    image: "/cus3.jpeg",
  },
  {
    name: "zara Khan",
    role: "First time EV Owner",
    Title:"marvelous",
    comment: "I was nervous about switching to an electric vehicle, but the guidance and listings were amazing!",
    image: "/cus1.jpeg",
  },

];

export default function Customer() {
  return (
    <section className="bg-[#0C2340] py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white  text-start mb-6">
          What Our Customers Say
        </h2>
     

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {test.map((t) => (
            <div
              key={t.name}
              className="bg-[#F8FAFC] p-6 rounded-xl shadow-sm hover:shadow-lg hover:translate-y-5 text-left"
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
                  <p className="text-sm text-gray-500">{t.role}</p>
                  <p className="text-lg font-bold text-gray-800 mt-4 text-start">{t.Title}</p>
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
