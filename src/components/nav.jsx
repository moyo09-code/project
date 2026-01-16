import { NavLink, useLocation } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { useAuth } from "../contexts/authcontext"
import { HiMenu } from "react-icons/hi"
import { FiShoppingCart, FiHeart } from "react-icons/fi"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [underlineProps, setUnderlineProps] = useState({ width: 0, left: 0 })
  const location = useLocation()
  const navRefs = useRef({})
  const navListRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight - 80)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const activePath = location.pathname.startsWith("/property") ? "/" : location.pathname
    if (activePath === "/") {
      setUnderlineProps({ width: 0, left: 0 })
      return
    }
    const el = navRefs.current[activePath]
    const nav = navListRef.current
    if (el && nav) {
      const elRect = el.getBoundingClientRect()
      const navRect = nav.getBoundingClientRect()
      setUnderlineProps({ width: elRect.width, left: elRect.left - navRect.left })
    } else {
      setUnderlineProps({ width: 0, left: 0 })
    }
  }, [location.pathname])

  const navClass = ({ isActive }) =>
    `relative px-2 py-1 flex items-center gap-1 transition-colors duration-300 ${
      isActive ? "text-white font-semibold" : "text-white hover:text-green-300"
    }`

  return (
    <nav
      className={`w-full z-50 transition-all duration-300 ${
        scrolled ? "fixed top-0 bg-green-900 shadow-md" : "absolute top-0 bg-none"
      }`}
    >
      <div className="max-w-6xl mx-auto p-4 flex justify-between items-center relative">
        <NavLink to="/" className="logo text-xl text-white">
          Micasa Crest
        </NavLink>

        <div ref={navListRef} className="hidden md:flex items-center gap-6 relative">
          {user && (
            <>
              <NavLink to="/cart" ref={el => (navRefs.current["/cart"] = el)} className={navClass}>
                <FiShoppingCart size={20} />
                Cart
              </NavLink>
              <NavLink to="/like" ref={el => (navRefs.current["/like"] = el)} className={navClass}>
                <FiHeart size={15} />
                Likes
              </NavLink>
            </>
          )}

          {user ? (
            <>
              <NavLink to="/profile" ref={el => (navRefs.current["/profile"] = el)} className={navClass}>
                Welcome back, {user.fullName}
              </NavLink>
              <button
                onClick={() => confirm("Logout?") && logout()}
                className="bg-white text-green-900 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="bg-white text-green-900 px-3 py-1 rounded">
              Login
            </NavLink>
          )}

          <span
            className="absolute -bottom-1 h-1 bg-green-300 rounded-full transition-all duration-300"
            style={{
              width: `${underlineProps.width}px`,
              transform: `translateX(${underlineProps.left}px)`
            }}
          />
        </div>

        <div className="md:hidden relative">
          <button onClick={() => setIsOpen(v => !v)} className="text-white">
            <HiMenu size={28} />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 bg-white rounded-xl shadow-xl w-56 flex flex-col z-50"
              >
                {user && (
                  <>
                    <NavLink to="/cart" onClick={() => setIsOpen(false)} className="px-4 py-3 text-green-700">
                      Cart
                    </NavLink>
                    <NavLink to="/like" onClick={() => setIsOpen(false)} className="px-4 py-3 text-green-700">
                      Likes
                    </NavLink>
                    <NavLink to="/profile" onClick={() => setIsOpen(false)} className="px-4 py-3 text-green-700">
                      Profile
                    </NavLink>
                    <button onClick={() => logout()} className="px-4 py-3 text-left">
                      Logout
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  )
}
