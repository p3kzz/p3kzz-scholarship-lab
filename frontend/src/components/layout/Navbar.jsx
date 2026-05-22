import { Link, useNavigate } from "react-router-dom"
import logoLight from "../../assets/logo-light.png"

export default function Navbar({ variant = "light" }) {
  const navigate = useNavigate()

  return (
    <nav className={`navbar navbar--${variant}`}>

      {/* logo */}
      <Link to="/" className="navbar-logo">

        <img
          src={variant === "dark" ? logoDark : logoLight}
          alt="Scholarship Lab"
          className="navbar-logo-img"
        />

      </Link>

      {/* menu */}
      <div className="navbar-menu">

        <Link
          to="/#about"
          className="navbar-link"
        >
          About
        </Link>

        <Link
          to="/#scholarships"
          className="navbar-link"
        >
          Scholarships
        </Link>

        <Link
          to="/#how"
          className="navbar-link"
        >
          How To Apply
        </Link>

        <button
          className="navbar-apply-btn"
          onClick={() => navigate("/register")}
        >
          Apply Now
        </button>

      </div>

    </nav>
  )
}