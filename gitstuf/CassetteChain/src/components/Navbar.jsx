"use client"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import {
  CassetteTapeIcon as Cassette,
  Menu,
  X,
  Home,
  Music,
  User,
  Search,
} from "lucide-react"
import LogoutButton from "./LogoutButton"

const Navbar = ({ token, setToken }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  const navLinks = [
    { name: "Home", path: "/dashboard", icon: <Home className="h-5 w-5" /> },
    { name: "Playlists", path: "/playlists", icon: <Music className="h-5 w-5" /> },
    { name: "Search", path: "/search", icon: <Search className="h-5 w-5" /> },
    { name: "About Us", path: "/aboutus", icon: <User className="h-5 w-5" /> },
  ]

  return (
    <nav className="bg-[#f55b93] text-black shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-7">
          {/* Logo and Brand */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Cassette className="h-10 w-10 text-plum" />
            <span className="press-start text-xl text-plum">CassetteChain</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {token && (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-1 press-start text-lg ${
                      isActive(link.path)
                        ? "text-gray-100 border-b-2 border-pink-400"
                        : "text-plum hover:text-white"
                    }`}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                ))}
                <LogoutButton setToken={setToken} />
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-pink-300" />
              ) : (
                <Menu className="h-6 w-6 text-pink-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-pink-700">
            <div className="flex flex-col space-y-4">
              {token && (
                <>
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center space-x-2 press-start text-sm py-2 ${
                        isActive(link.path)
                          ? "text-pink-300"
                          : "text-gray-200 hover:text-pink-300"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  ))}
                  <LogoutButton isMobile setToken={setToken} />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
