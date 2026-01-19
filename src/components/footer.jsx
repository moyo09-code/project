import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa"
import { SiX } from "react-icons/si"


export default function Footer() {
  return (
    <motion.footer initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }} className="text-gray-800 bg-slate-200 rounded-2xl shadow-sm" >
      <div className=" mt-2 max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4 text-blue-900">Micasa Crest</h2>
          <p className="text-gray-600">
            Helping you buy, sell, and rent properties with confidence.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-blue-900">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link></li>
            <li><Link to="/services" className="text-blue-600 hover:text-blue-800">Our Services</Link></li>
            <li><Link to="/properties" className="text-blue-600 hover:text-blue-800">Properties</Link></li>
            <li><Link to="/contact" className="text-blue-600 hover:text-blue-800">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-blue-900">Our Services</h3>
          <ul className="space-y-2">
            <li><Link to="/services" className="text-blue-600 hover:text-blue-800">Property Sales</Link></li>
            <li><Link to="/services" className="text-blue-600 hover:text-blue-800">Rentals & Leasing</Link></li>
            <li><Link to="/services" className="text-blue-600 hover:text-blue-800">Property Management</Link></li>
            <li><Link to="/services" className="text-blue-600 hover:text-blue-800">Land & Plots</Link></li>
            <li><Link to="/services" className="text-blue-600 hover:text-blue-800">Real Estate Consulting</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-blue-900">Contact Us</h3>
          <p className="text-gray-600 mb-2">📍 Lagos, Nigeria</p>
          <p className="text-gray-600 mb-2">📞 +234 800 123 4567</p>
          <p className="text-gray-600 mb-4">✉️ info@micasacrest.com</p>

          <div className="flex space-x-4 text-blue-600">
            <a href="#"><FaFacebookF /></a>
            <a href="https://instagram.com/moyo2k24" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="#"><SiX /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="https://github.com/moyo09-code" target="_blank" rel="noreferrer"><FaGithub /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 py-6 text-center text-gray-500 text-sm">
        © 2026 Micasa Crest. All Rights Reserved.
      </div>
    </motion.footer>
  )
}
