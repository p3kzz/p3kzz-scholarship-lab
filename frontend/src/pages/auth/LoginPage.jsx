import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { loginUser, getMe } from "../../api/auth"
import { useAuth } from "../../context/AuthContext"

import { GoogleLogin } from "@react-oauth/google"

import { googleLogin } from "../../api/auth"

import "../../styles/globals.css"

export default function LoginPage() {
  const navigate = useNavigate()

  const { login } = useAuth()

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const response = await loginUser(form)

      if (response.token) {

        // simpan token ke context
        login(response.token)

        // ambil data user
        const me = await getMe(response.token)

        // cek profile lengkap atau belum
        if (
          !me.profile ||
          !me.profile.isCompleted
        ) {
          navigate("/onboarding")
        } else {
          navigate("/dashboard")
        }
      } else {
        setError(response.message || "Login gagal")
      }
    } catch (error) {

      console.error(error)

      setError("Terjadi kesalahan")

    }
  }

  return (
    <div className="login-page">

      {/* left side */}
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

            {/* email */}
            <div className="login-field">
              <label className="auth-label">
                Email Address
              </label>

              <input
                type="email"
                name="email"
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

            {/* pass */}
            <div className="login-field">
              <label className="auth-label">
                Password
              </label>

              <input
                type="password"
                name="password"
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

            {/* error message */}
            {error && (
              <p style={{ color: "red", marginBottom: "10px" }}>
                {error}
              </p>
            )}

            {/* button sign in */}
            <button
              type="submit"
              className="auth-btn-primary"
            >
              Sign In
            </button>

            <div className="auth-divider">
              <span>Or</span>
            </div>

            {/* button google */}
            <div className="google-login-wrapper">

              <GoogleLogin

                onSuccess={async (credentialResponse) => {

                  try {

                    // LOGIN GOOGLE KE BACKEND
                    const response = await googleLogin(
                      credentialResponse.credential
                    )

                    // SIMPAN TOKEN
                    login(response.token)

                    // AMBIL USER
                    const me = await getMe(response.token)

                    // CEK ONBOARDING
                    if (
                      !me.profile ||
                      !me.profile.isCompleted
                    ) {

                      navigate("/onboarding")

                    } else {

                      navigate("/dashboard")

                    }

                  } catch (error) {

                    console.error(error)

                    setError(error.message)

                  }
                }}

                onError={() => {

                  setError("Google login failed")

                }}

              />

            </div>

            {/* terms */}
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