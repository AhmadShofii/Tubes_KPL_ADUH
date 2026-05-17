import { useState } from 'react'
import './Navbar.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <span className="navbar-logo">Foodora</span>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="#">Home</a></li>
          <li><a href="#">Promos</a></li>
          <li><a href="#">History</a></li>
        </ul>

        <div className="navbar-actions">
          <button className="icon-btn" aria-label="Keranjang">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </button>
          <div className="avatar" aria-label="Profil">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          </div>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span/><span/><span/>
        </button>
      </div>
    </nav>
  )
}
