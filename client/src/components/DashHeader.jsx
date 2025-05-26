import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const DashHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-30 bg-gradient-to-r from-indigo-700 to-violet-500 transition-all">
      
      <Link to="/dash">
        <img
          className="h-9"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoWhite.svg"
          alt="Logo"
        />
      </Link>

      <ul className="text-white md:flex hidden items-center gap-10">
        <li><Link to="/dash/notes" className="hover:text-white/70 transition">View Notes</Link></li>
        <li><Link to="/dash/notes/new" className="hover:text-white/70 transition">New Notes</Link></li>
        <li><Link to="/dash/notes" className="hover:text-white/70 transition">View Notes</Link></li>
        <li><Link to="/dash/users/new" className="hover:text-white/70 transition">New Users</Link></li>
        
      </ul>

      <button
        type="button"
        className="bg-white text-gray-700 md:inline hidden text-sm hover:opacity-90 active:scale-95 transition-all w-40 h-11 rounded-full"
      >
        Get started
      </button>

      <button
        aria-label="menu-btn"
        type="button"
        className="menu-btn inline-block md:hidden active:scale-90 transition"
        onClick={() => setMenuOpen(prev => !prev)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="#fff">
          <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z"/>
        </svg>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu absolute top-[70px] left-0 w-full bg-gradient-to-r from-indigo-700 to-violet-500 p-6 md:hidden">
          <ul className="flex flex-col space-y-4 text-white text-lg">
            <li><Link to="/dash/notes" className="text-sm">View Notes</Link></li>
            <li><Link to="/dash/users" className="text-sm">View Users</Link></li>
          </ul>
          <button
            type="button"
            className="bg-white text-gray-700 mt-6 inline md:hidden text-sm hover:opacity-90 active:scale-95 transition-all w-40 h-11 rounded-full"
          >
            Get started
          </button>
        </div>
      )}
    </nav>
  )
}

export default DashHeader
