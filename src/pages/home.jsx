import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import Hero from "../components/hero"
import Footer from "../components/footer"
import Back from "../components/back"

const testimonials = [
  { name: "Adebayo K.", role: "Home Buyer", text: "Micasa Crest made buying my home stress-free and transparent." },
  { name: "Fatima S.", role: "Investor", text: "Excellent market insight and fast returns on investment." },
  { name: "Daniel O.", role: "Tenant", text: "Verified listings and smooth rental process." },
  { name: "Zainab M.", role: "Landlord", text: "Serious clients and professional handling." },
  { name: "Michael T.", role: "First-time Buyer", text: "Clear process with no hidden charges." },
]
export default function Home() {
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % testimonials.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="w-14 h-14 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const prev = (index - 1 + testimonials.length) % testimonials.length
  const next = (index + 1) % testimonials.length

  return (
    <>
      <div className="bg-slate-50 min-h-screen">
        <Hero
          title="Find Homes You’ll Love"
          subtitle="Verified properties, trusted experts, secure investments"
        />

        <section className="max-w-7xl mx-auto px-6 pt-20">
          <h2 className="text-center text-3xl lg:text-4xl font-semibold text-blue-900 mb-4">
            Why Micasa Crest
          </h2>
         
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-16">
            Built on trust, transparency, and premium real estate opportunities.
          </p>
           
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              ["850+", "Verified Properties"],
              ["1,400+", "Happy Clients"],
              ["120+", "Trusted Agents"],
              ["15+", "Prime Cities"]
            ].map(([value, label]) => (
              <div key={label} className="bg-white rounded-2xl p-6 shadow-md text-center">
                <h3 className="text-3xl font-bold text-blue-900">{value}</h3>
                <p className="text-slate-600 mt-1">{label}</p>
              </div>
            ))}
          </div>
        <section className="max-w-7xl mx-auto px-6 pt-16 mb-20">
          <h1 className="text-center text-3xl lg:text-4xl font-semibold text-blue-900 mb-4">
            How We Help You Find the Right Property
          </h1>

          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
            We simplify buying, renting, and investing by offering verified listings,
            expert guidance, and secure transactions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-md hover:bg-blue-200 hover:-translate-y-3 transition">
              <h3 className="text-center text-lg font-semibold text-blue-900 mb-3">
                Stress-Free Home Search
              </h3>
              <p className="text-slate-700 mb-4 text-sm">
                Discover verified homes in prime locations without unnecessary stress.
              </p>
              <ul className="list-disc list-inside text-slate-800 text-sm space-y-1">
                <li>Verified listings</li>
                <li>Prime locations</li>
                <li>Transparent pricing</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:bg-blue-200 hover:-translate-y-3 transition">
              <h3 className="text-center text-lg font-semibold text-blue-900 mb-3">
                Smart Investments
              </h3>
              <p className="text-slate-700 mb-4 text-sm">
                Make informed property investments backed by accurate market insights.
              </p>
              <ul className="list-disc list-inside text-slate-800 text-sm space-y-1">
                <li>Market analysis</li>
                <li>High ROI options</li>
                <li>Expert advice</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:bg-blue-200 hover:-translate-y-3 transition">
              <h3 className="text-center text-lg font-semibold text-blue-900 mb-3">
                Secure Transactions
              </h3>
              <p className="text-slate-700 mb-4 text-sm">
                Every transaction is handled with professionalism and security.
              </p>
              <ul className="list-disc list-inside text-slate-800 text-sm space-y-1">
                <li>Legal support</li>
                <li>Verified documents</li>
                <li>Trusted process</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 hover:bg-blue-200 shadow-md hover:-translate-y-3 transition">
              <h3 className="text-center text-lg font-semibold text-blue-900 mb-3">
                End-to-End Support
              </h3>
              <p className="text-slate-700 mb-4 text-sm">
                From search to closing, our team stays with you every step.
              </p>
              <ul className="list-disc list-inside text-slate-800 text-sm space-y-1">
                <li>Dedicated agents</li>
                <li>Fast responses</li>
                <li>After-sale support</li>
              </ul>
            </div>
          </div>
        </section>

        </section>
        <h2 className="text-center text-3xl lg:text-4xl font-semibold text-blue-900 mb-10">
            What Our Clients Say
          </h2>
        <section className="p-28 mt-10 mb-30  bg-white overflow-hidden">
          

          <div className="relative flex justify-center items-center h-{420px}">
            {[prev, index, next].map((i, position) => {
              const isCenter = position === 1

              return (
                <motion.div
                  key={i}
                  drag={isCenter ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, info) => {
                    if (info.offset.x < -80) setIndex(next)
                    if (info.offset.x > 80) setIndex(prev)
                  }}
                  animate={{
                    scale: isCenter ? 1 : 0.85,
                    opacity: isCenter ? 1 : 0.45,
                    x: position === 0 ? -200 : position === 2 ? 200 : 0,
                    zIndex: isCenter ? 10 : 1
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute w-72 h-72 bg-slate-50  rounded-2xl shadow-xl flex flex-col justify-center items-center text-center px-6 cursor-grab active:cursor-grabbing"
                >
                  <p className="text-slate-700 mb-4 text-sm">
                    “{testimonials[i].text}”
                  </p>
                  <h4 className="font-semibold text-blue-900">
                    {testimonials[i].name}
                  </h4>
                  <span className="text-xs text-slate-500">
                    {testimonials[i].role}
                  </span>
                </motion.div>
              )
            })}
          </div>

          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition ${
                  i === index ? "bg-blue-900 scale-125" : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        </section>

          <Back/>
      </div>

      <Footer />
    </>
  )
}
