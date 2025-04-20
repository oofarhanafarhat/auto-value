import React from 'react'

export const Choosus = () => {
  const features = [
    {
      title: 'Accuracy & Trust',
      desc: 'We use verified data and AI to provide highly accurate valuations tailored to market trends.',
    },
    {
      title: 'Seamless Experience',
      desc: 'From listing to lead capture – enjoy a smooth and intuitive experience at every step.',
    },
    {
      title: 'Mobile First',
      desc: 'Fully responsive layout ensures flawless performance on phones, tablets, and desktops.',
    },
    {
      title: 'Secure & Scalable',
      desc: 'Built on modern tech for reliability, security, and the ability to grow as you do.',
    },
  ]

  return (
    <section className="py-20 px-6 md:px-16 lg:px-24 bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#0C2340] mb-14 leading-tight">
          Why Choose <span className="text-[#0C2340]">AutoValue</span>?
        </h2>

        <div className="grid gap-8 sm:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:translate-y-6 transition-transform duration-300 ease-in-out"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-base leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
