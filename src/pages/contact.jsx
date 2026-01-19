import { motion } from "framer-motion"
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"

export default function Contact() {
  return (
    <section className="bg-white">
      <div className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
  <div
    className="absolute inset-0 bg-cover bg-center scale-110"
    style={{
      backgroundImage:
        'url("https://i.pinimg.com/736x/a0/93/9e/a0939e468791db6e1d83581ec1c1fba7.jpg")'
    }}
  />

  <div className="absolute inset-0 backdrop-blur-sm bg-blue-900/60" />

  <div className="relative z-10 px-6 max-w-3xl text-white">
    <h1 className="text-4xl lg:text-5xl font-semibold mb-4">
      Contact Us
    </h1>
    <p className="text-blue-100 text-lg">
      We’re here to help you find, buy, rent, or manage the perfect property.
    </p>
  </div>
</div>


      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
        
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-blue-900 mb-6">
            Get In Touch
          </h2>

          <p className="text-gray-600 mb-10">
            Have questions or need assistance? Reach out to us and our team will
            respond as quickly as possible.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-blue-600 text-xl" />
              <span className="text-gray-700">
                Lagos, Nigeria
              </span>
            </div>

            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-blue-600 text-xl" />
              <span className="text-gray-700">
                +234 800 123 4567
              </span>
            </div>

            <div className="flex items-center gap-4">
              <FaEnvelope className="text-blue-600 text-xl" />
              <span className="text-gray-700">
                info@micasacrest.com
              </span>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-slate-50 p-10 rounded-3xl shadow-lg"
        >
          <div className="grid gap-6">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            <button
              type="submit"
              className="bg-blue-900 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
