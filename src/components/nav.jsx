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
  const isHome = location.pathname === "/"

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
      isActive ? "text-white font-semibold" : "text-slate-200 hover:text-blue-300"
    }`

  return (
    <nav
      className={`w-full z-50 transition-all duration-300 ${
        isHome
          ? scrolled
            ? "fixed top-0 bg-blue-950 shadow-md"
            : "absolute top-0 bg-transparent"
          : "fixed top-0 bg-blue-950 shadow-md"
      }`}
    >
      <div className="max-w-6xl mx-auto p-4 flex justify-between items-center relative">
        <NavLink to="/" className="logo text-xl font-semibold text-white">
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
              <NavLink to="/properties" ref={el => (navRefs.current["/properties"] = el)} className={navClass}>
                Properties
              </NavLink>
              <NavLink to="/services" ref={el => (navRefs.current["/services"] = el)} className={navClass}>
               Services
              </NavLink>
               <NavLink to="/contact" ref={el => (navRefs.current["/contact"] = el)} className={navClass}>
               Contact
              </NavLink>
            </>
          )}

          {user ? (
            <>
              <NavLink to="/profile" ref={el => (navRefs.current["/profile"] = el)} className={navClass}>
                Welcome back, {user.fullName}
              </NavLink>
              <button
                onClick={() => logout()}
                className="bg-white text-blue-950 px-3 py-1 rounded hover:bg-slate-100"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="bg-white text-blue-950 px-3 py-1 rounded">
              Login
            </NavLink>
          )}

          <span
            className="absolute -bottom-1 h-1 bg-blue-300 rounded-full transition-all duration-300"
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
                    <NavLink to="/cart" onClick={() => setIsOpen(false)} className="px-4 py-3 text-blue-800 hover:bg-slate-100">
                      Cart
                    </NavLink>
                    <NavLink to="/like" onClick={() => setIsOpen(false)} className="px-4 py-3 text-blue-800 hover:bg-slate-100">
                      Likes
                    </NavLink>
                    <NavLink to="/properties" onClick={() => setIsOpen(false)} className="px-4 py-3 text-blue-800 hover:bg-slate-100">
                      Properties
                    </NavLink>
                    <NavLink to="/profile" onClick={() => setIsOpen(false)} className="px-4 py-3 text-blue-800 hover:bg-slate-100">
                      Profile
                    </NavLink>
                    <NavLink to="/Services" onClick={() => setIsOpen(false)} className="px-4 py-3 text-blue-800 hover:bg-slate-100">
                      Services
                    </NavLink>
                    <NavLink to="/contact" onClick={() => setIsOpen(false)} className="px-4 py-3 text-blue-800 hover:bg-slate-100">
                      Contact
                    </NavLink>
                    <button onClick={() => logout()} className="px-4 py-3 text-left text-blue-800 hover:bg-slate-100">
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
