import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../../styles/globals.css"

export default function RegisterPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agree: false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/onboarding/step1")
  }

  return (
    <div className="register-page">

      {/* LEFT SIDE */}
      <div className="register-left">

        <div className="register-left-content">
          <p className="register-tag">
            CREATE ACCOUNT
          </p>

          <h1 className="register-title">
            Start your <br />
            <span>journey.</span>
          </h1>

          <p className="register-description">
            Join thousands of Indonesian students finding
            <br />
            their perfect scholarship match.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="register-right">

        <div className="register-form-wrapper">

          <h2 className="register-heading">
            Create your account
          </h2>

          <p className="register-subtitle">
            Already have an account?{" "}
            <Link to="/login" className="register-link">
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="register-form">

            {/* NAME */}
            <div className="register-name-grid">

              <div>
                <label className="register-label">
                  First Name
                </label>

                <input
                  type="text"
                  placeholder="Input your first name"
                  className="register-input"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="register-label">
                  Last Name
                </label>

                <input
                  type="text"
                  placeholder="Input your last name"
                  className="register-input"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>

            </div>

            {/* EMAIL */}
            <div>
              <label className="register-label">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Input your email"
                className="register-input"
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
            <div>
              <label className="register-label">
                Password
              </label>

              <input
                type="password"
                placeholder="********"
                className="register-input"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
              />
            </div>

            {/* CHECKBOX */}
            <div className="register-checkbox-wrapper">

              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) =>
                  setForm({
                    ...form,
                    agree: e.target.checked,
                  })
                }
                className="register-checkbox"
              />

              <p className="register-checkbox-text">
                I agree to the{" "}
                <Link to="/" className="register-policy-link">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/" className="register-policy-link">
                  Privacy Policy
                </Link>
              </p>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="register-submit-btn"
            >
              Create Account
            </button>

            {/* DIVIDER */}
            <div className="register-divider">
              <div className="register-divider-line"></div>

              <span>Or</span>

              <div className="register-divider-line"></div>
            </div>

            {/* GOOGLE BUTTON */}
            <button
              type="button"
              className="register-google-btn"
            >
              Continue With Google
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}