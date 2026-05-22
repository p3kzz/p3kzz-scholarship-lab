import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../../styles/globals.css"

export default function LoginPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/dashboard")
  }

  return (
    <div className="login-page">

      {/* LEFT SIDE */}
      <div className="login-left">

        <div className="login-left-content">
          <p className="login-welcome">
            WELCOME BACK
          </p>

          <h1 className="login-heading">
            Your path
            <br />
            is <span>waiting.</span>
          </h1>

          <p className="login-desc">
            Sign in and continue discovering
            <br />
            scholarships tailored to you.
          </p>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">

        <div className="login-form-wrapper">

          <h2 className="login-title">
            Sign In
          </h2>

          <p className="login-subtitle">
            Don't have an account?{" "}
            <Link to="/register" className="login-link">
              Register free
            </Link>
          </p>

          <form
            onSubmit={handleSubmit}
            className="login-form"
          >

            {/* EMAIL */}
            <div className="login-field">
              <label className="auth-label">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Input your email"
                className="auth-input"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />
            </div>

            {/* PASSWORD */}
            <div className="login-field">
              <label className="auth-label">
                Password
              </label>

              <input
                type="password"
                placeholder="********"
                className="auth-input"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
              />

              <div className="forgot-wrapper">
                <Link to="/" className="forgot-link">
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* SIGN IN BUTTON */}
            <button
              type="submit"
              className="auth-btn-primary"
            >
              Sign In
            </button>

            {/* DIVIDER */}
            <div className="auth-divider">
              <span>Or</span>
            </div>

            {/* GOOGLE BUTTON */}
            <button
              type="button"
              className="auth-btn-google"
            >
              Continue With Google
            </button>

            {/* TERMS */}
            <p className="login-terms">
              By signing in you agree to our{" "}
              <Link to="/" className="terms-link">
                Terms
              </Link>{" "}
              &{" "}
              <Link to="/" className="terms-link">
                Privacy Policy
              </Link>
            </p>

          </form>
        </div>

      </div>

    </div>
  )
}