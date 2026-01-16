

import { motion } from "framer-motion"

export default function Hero({ title, subtitle }) {
  return (
    <section
      className="h-screen bg-cover bg-center relative flex items-center justify-center text-white"
      style={{
        backgroundImage:
          'url("https://i.pinimg.com/1200x/0f/b1/a7/0fb1a786bc80327b8c90789ee35b6930.jpg")'
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <motion.div
        className="relative z-10 max-w-3xl text-center px-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
      >
        <motion.h1
          className="hero font-dancing text-3xl sm:text-4xl md:text-6xl font-bold leading-tight"
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="hero mt-4 text-base sm:text-lg md:text-3xl"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </section>
  )
}


// export default function Hero({ title, subtitle }) {
//   return (
// <section
//   className="
//     max-h-screen
//     h-screen
//     w-full
//     flex
//     items-center
//     justify-center
//     text-center
//     text-white
//     bg-cover
//     bg-center
//     relative
   
//   "
//   style={{
//     backgroundImage: `url("https://i.pinimg.com/1200x/0f/b1/a7/0fb1a786bc80327b8c90789ee35b6930.jpg")`
//   }}
// >
//   <div className="absolute inset-0 bg-black/40"></div>

//   <div className="relative z-10 max-w-3xl">
//     <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight font-family: 'Dancing Script' cursive">
//       {title}
//     </h1>

//     <p className="mt-4 text-base sm:text-lg md:text-2xl">
//       {subtitle}
//     </p>
//   </div>
// </section>
//   )
// }