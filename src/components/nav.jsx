import { NavLink, useLocation } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { useAuth } from "../contexts/authcontext"
import { HiMenu, HiX } from "react-icons/hi"
import { FiShoppingCart, FiHeart } from "react-icons/fi"

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
      isActive ? "text-green-300 font-semibold" : "text-white hover:text-green-300"
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
              <NavLink to="/profile" ref={el => (navRefs.current["/profile"] = el)} className={navClass}>
                Profile
              </NavLink>
            </>
          )}
          {user ? (
            <>
              <span className="text-white font-medium px-2 py-1">
                Welcome back, {user.fullName}
              </span>
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to logout?")) logout()
                }}
                className="bg-white text-green-900 px-3 py-1 rounded hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="bg-white text-green-900 px-3 py-1 rounded hover:bg-gray-100 transition">
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
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden mt-2 flex flex-col gap-2">
            {user && (
              <>
                <NavLink to="/cart" onClick={() => setIsOpen(false)} className={navClass}>
                  <FiShoppingCart size={20} /> Cart
                </NavLink>
                <NavLink to="/like" onClick={() => setIsOpen(false)} className={navClass}>
                  <FiHeart size={15} /> Likes
                </NavLink>
                <NavLink to="/profile" onClick={() => setIsOpen(false)} className={navClass}>
                  Profile
                </NavLink>
                <span className="text-white font-medium px-2 py-1">{user.fullName}</span>
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to logout?")) {
                      logout()
                      setIsOpen(false)
                    }
                  }}
                  className="bg-white text-green-900 px-3 py-1 rounded hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </>
            )}
            {!user && (
              <NavLink to="/login" onClick={() => setIsOpen(false)} className="bg-white text-green-900 px-3 py-1 rounded hover:bg-gray-100 transition">
                Login
              </NavLink>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
