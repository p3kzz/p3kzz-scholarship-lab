import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import { LayoutGrid, User, LogOut } from "lucide-react"
import logoLight from "../../assets/logo-light.png"

function LogoutModal({ onClose, onLogout }) {
  return (
    <div className="logout-overlay">
      <div className="logout-card">
        <h2 className="logout-title">Sign Out?</h2>
        <p className="logout-desc">
          You'll need to sign back in to access your
          scholarship matches and profile progress.
        </p>
        <button className="logout-confirm-btn" onClick={onLogout}>
          Yes, sign me out
        </button>
        <button className="logout-cancel-btn" onClick={onClose}>
          Stay signed in
        </button>
      </div>
    </div>
  )
}

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const isActive = (path) => location.pathname.startsWith(path)

  return (
    <>
      <aside className={`sidebar ${isOpen ? "mobile-open" : ""}`}>

        <div>
          {/* logo */}
          <div className="sidebar-logo">
            <img src={logoLight} alt="Scholarship Lab" className="sidebar-logo-img" />
          </div>

          {/* menu */}
          <nav className="sidebar-menu">
            <Link
              to="/dashboard"
              className={`sidebar-link${isActive("/dashboard") ? " sidebar-link-active" : ""}`}
              onClick={onClose}
            >
              <LayoutGrid size={20} />
              <span>Home</span>
            </Link>
            <Link
              to="/profile"
              className={`sidebar-link${isActive("/profile") ? " sidebar-link-active" : ""}`}
              onClick={onClose}
            >
              <User size={20} />
              <span>Profile</span>
            </Link>
          </nav>
        </div>

        {/* sign out */}
        <button className="sidebar-logout" onClick={() => setShowLogoutModal(true)}>
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </aside>

      {showLogoutModal && (
        <LogoutModal
          onClose={() => setShowLogoutModal(false)}
          onLogout={() => {
            localStorage.removeItem("token")
            navigate("/login")
          }}
        />
      )}
    </>
  )
}