import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function Back() {
  return (
    <section className="relative h-125 w-120 ml-0.5 lg:ml-95 rounded-3xl overflow-hidden flex items-center justify-center">
      
      <div
        className="absolute inset-0 bg-center bg-cover scale-110 filter blur-sm"
        style={{
          backgroundImage:
            'url("https://i.pinimg.com/1200x/c9/cc/2a/c9cc2af08276ba66a5850d0a3848d78e.jpg")'
        }}
      />

      <div className="absolute inset-0 bg-blue-950/60" />

      <motion.div
        className="relative z-10 max-w-5xl px-6 py-16 text-blue-100 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
          Start Your Property Journey Today
        </h2>

        <p className="mb-8 text-blue-200">
          Discover verified listings in prime locations.
        </p>

        <Link
          to="/properties"
          className="inline-block bg-white text-blue-900 px-8 py-3 rounded-xl font-medium hover:bg-blue-500 hover:text-blue-100 transition"
        >
          Browse Properties
        </Link>
      </motion.div>
    </section>
  )
}
