import { Link, useNavigate } from "react-router-dom"

export default function Navbar({ variant = "dark" }) {
  const navigate = useNavigate()

  return (
    <nav className={`navbar navbar--${variant}`}>
      <Link to="/" className="navbar-logo">
        <div className="navbar-logo-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9 12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
          </svg>
        </div>
        <span className="navbar-brand">Scholarship.Lab</span>
      </Link>

      <div className="navbar-menu">
        <Link to="/#about" className="navbar-link">About</Link>
        <Link to="/#scholarships" className="navbar-link">Scholarships</Link>
        <Link to="/#how" className="navbar-link">How To Apply</Link>
        <Link to="/register" className="navbar-pill">Apply Now</Link>
      </div>
    </nav>
  )
}