import {FiHome,FiKey,FiSettings,FiMap,FiTrendingUp,FiUsers,FiFileText,FiShield} from "react-icons/fi"
import Footer from "../components/footer"

export default function Services() {
  const services = [
    {
      title: "Property Sales",
      description:
        "Buy and sell verified residential and commercial properties with expert guidance.",
      icon: <FiHome size={28} />
    },
    {
      title: "Rentals & Leasing",
      description:
        "Access quality rental homes and commercial spaces in prime locations.",
      icon: <FiKey size={28} />
    },
    {
      title: "Property Management",
      description:
        "Comprehensive property management ensuring value preservation and tenant satisfaction.",
      icon: <FiSettings size={28} />
    },
    {
      title: "Land & Plots",
      description:
        "Secure land investments with verified documentation and growth potential.",
      icon: <FiMap size={28} />
    },
    {
      title: "Real Estate Consulting",
      description:
        "Professional advice for profitable and informed property decisions.",
      icon: <FiTrendingUp size={28} />
    },
    {
      title: "Tenant Placement",
      description:
        "We connect property owners with vetted and reliable tenants.",
      icon: <FiUsers size={28} />
    },
    {
      title: "Documentation & Legal",
      description:
        "Assistance with property documentation, contracts, and due diligence.",
      icon: <FiFileText size={28} />
    },
    {
      title: "Secure Transactions",
      description:
        "Safe, transparent, and fully documented property transactions.",
      icon: <FiShield size={28} />
    }
  ]

  return (
    <>
      <section
        className="relative min-h-screen py-28"
        style={{
          backgroundImage:
            'url("https://i.pinimg.com/736x/54/3c/48/543c4853e76ca4b53ee3691ae807ceec.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-white/80 blur" />

        <div className="relative max-w-7xl mx-auto px-6">
          <h1 className="text-center text-3xl lg:text-4xl font-semibold text-blue-900 mb-4">
            Our Services
          </h1>

          <p className="text-center text-slate-700 max-w-2xl mx-auto mb-10">
            End-to-end real estate solutions built on trust, transparency, and results.
          </p>

          <div className="grid gap-8 grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-md hover:bg-blue-900 hover:shadow-xl transition duration-300"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-100 text-blue-900 mb-6 group-hover:bg-white transition">
                  {service.icon}
                </div>

                <h3 className="text-lg font-semibold text-blue-900 mb-3 group-hover:text-white transition">
                  {service.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed group-hover:text-blue-100 transition">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
