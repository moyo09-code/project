import { NavLink, useLocation } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { useAuth } from "../contexts/authcontext"
import { HiMenu} from "react-icons/hi"
import { FiShoppingCart, FiHeart } from "react-icons/fi"
import { motion, AnimatePresence } from "framer-motion";


export default function Navbar() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [underlineProps, setUnderlineProps] = useState({ width: 0, left: 0 })
  const location = useLocation()
  const navRefs = useRef({})
  const navListRef = useRef(null)


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
    <nav className="bg-green-900 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center relative">
        <NavLink to="/" ref={el => (navRefs.current["/"] = el)} className="logo text-xl">
          Micasa Crest
        </NavLink>
        <div ref={navListRef} className="hidden md:flex items-center gap-6 relative">
          {user && (
            <>
              <NavLink to="/cart" ref={el => (navRefs.current["/cart"] = el)} className={navClass}>
                <FiShoppingCart size={20} />
                Cart
                {user?.cart?.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {user.cart.length}
                  </span>
                )}
              </NavLink>
              <NavLink to="/like" ref={el => (navRefs.current["/like"] = el)} className={navClass}>
                <FiHeart size={15} />
                Likes
              </NavLink>
            </>
          )}
          {user ? (
            <>
              <NavLink
               to="/profile"
                 ref={el => (navRefs.current["/profile"] = el)}
                 className={({ isActive }) =>
                 `relative px-2 py-1 font-medium transition-colors duration-300 ${
                  isActive ? "text-white font-semibold" : "text-white hover:text-green-300"
                 }`
                 }
                 >
                  Welcome back, {user.fullName}
                   </NavLink>

              <button
                onClick={() => {
                  if (confirm("Are you sure you want to logout?")) logout()
                }}
                className="bg-white text-green-900 px-3 py-1 rounded hover:bg-green-700 hover:text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="bg-white text-green-900 px-3 py-1 rounded hover:bg-green-700 hover:text-white transition">
              Login
            </NavLink>
          )}
          <span
            className="absolute -bottom-1 h-1 bg-green-300 rounded-full transition-all duration-300"
            style={{
              width: `${underlineProps.width}px`,
              transform: `translateX(${underlineProps.left}px)`,
            }}
          />
        </div>
<div className="md:hidden relative">
  <button onClick={() => setIsOpen(v => !v)} className="text-white px-2 py-1">
    {isOpen ? <HiMenu size={28} /> : <HiMenu size={28} />}
  </button>

  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="absolute right-0 mt-2 bg-white rounded-xl shadow-xl w-56 overflow-hidden flex flex-col z-50"
      >
        {user && (
          <>
            <NavLink
              to="/cart"
              onClick={() => setIsOpen(false)}
              className="flex items-center text-green-400 gap-2 px-4 py-3 hover:bg-green-50 transition"
            >
              <FiShoppingCart size={20} /> Cart
              {user?.cart?.length > 0 && (
                  <span className="absolute top-2 right-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {user.cart.length}
                  </span>
                )}
            </NavLink>

            <NavLink
              to="/like"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-green-400 hover:bg-green-50 transition"
            >
              <FiHeart size={18} /> Likes
            </NavLink>

            <NavLink
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-3 hover:bg-green-50 text-green-400 transition"
            >
              <span className="bg-green-300 text-white font-bold w-6 h-6 flex items-center justify-center rounded-full text-sm">
                {user.fullName[0].toUpperCase()}
              </span>
              Welcome back, {user.fullName}
            </NavLink>

            <button
              onClick={() => { if(confirm("Are you sure you want to logout?")) { logout(); setIsOpen(false); } }}
              className="px-4 py-3 hover:bg-green-50 transition text-green-900"
            >
              Logout
            </button>
          </>
        )}

        {!user && (
          <NavLink
            to="/login"
            onClick={() => setIsOpen(false)}
            className="px-4 py-3 hover:bg-green-50 transition text-green-900"
          >
            Login
          </NavLink>
        )}
      </motion.div>
    )}
  </AnimatePresence>
</div>
      </div>
    </nav>
  )
}
