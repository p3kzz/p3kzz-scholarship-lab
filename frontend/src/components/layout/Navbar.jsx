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

  <button
    onClick={() => {
      document
        .getElementById("about")
        ?.scrollIntoView({ behavior: "smooth" })
    }}
    className="navbar-link"
  >
    About
  </button>

  <button
    onClick={() => {
      document
        .getElementById("scholarships")
        ?.scrollIntoView({ behavior: "smooth" })
    }}
    className="navbar-link"
  >
    Scholarships
  </button>

  <button
    onClick={() => {
      document
        .getElementById("how")
        ?.scrollIntoView({ behavior: "smooth" })
    }}
    className="navbar-link"
  >
    How To Apply
  </button>

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