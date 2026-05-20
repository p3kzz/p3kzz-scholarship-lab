import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", agree: false })

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/onboarding/step1")
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr" }}>

      {/* LEFT — hijau muda */}
      <div style={{
        background: "linear-gradient(160deg, #a8d5a2 0%, #c8e6c4 40%, #e0f0dc 100%)",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "60px 56px", position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "rgba(255,255,255,0.18)" }}/>
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "260px", height: "260px", borderRadius: "50%", background: "rgba(255,255,255,0.12)" }}/>

        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#2d5a27", marginBottom: "20px" }}>Create Account</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(48px, 5vw, 72px)", fontWeight: 700, color: "#1a3a16", lineHeight: 1.05, marginBottom: "24px" }}>
            Start your<br/><em style={{ fontStyle: "italic" }}>journey.</em>
          </h2>
          <p style={{ fontSize: "15px", color: "#3d6b38", lineHeight: 1.7, maxWidth: "340px" }}>Join thousands of Indonesian students finding their perfect scholarship match.</p>
        </div>
      </div>

      {/* RIGHT — form */}
      <div style={{
        background: "linear-gradient(160deg, #f5fbf4 0%, #edf7eb 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "60px 56px", overflowY: "auto"
      }}>
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", fontWeight: 700, color: "#1a3a16", marginBottom: "6px" }}>Create your account</h1>
          <p style={{ fontSize: "14px", color: "#555", marginBottom: "36px" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#1a3a16", fontWeight: 700, textDecoration: "underline" }}>Sign in</Link>
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label className="auth-label">First Name</label>
                <input className="auth-input" type="text" placeholder="Input your first name" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })}/>
              </div>
              <div>
                <label className="auth-label">Last Name</label>
                <input className="auth-input" type="text" placeholder="Input your last name" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })}/>
              </div>
            </div>

            <div>
              <label className="auth-label">Email Address</label>
              <input className="auth-input" type="email" placeholder="Input your email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}/>
            </div>

            <div>
              <label className="auth-label">Password</label>
              <input className="auth-input" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}/>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <input
                type="checkbox"
                checked={form.agree}
                onChange={e => setForm({ ...form, agree: e.target.checked })}
                style={{ marginTop: "2px", width: "18px", height: "18px", accentColor: "#08CB00", cursor: "pointer", flexShrink: 0 }}
              />
              <span style={{ fontSize: "13px", color: "#555", lineHeight: 1.55 }}>
                I agree to the{" "}
                <Link to="/" style={{ color: "#1a3a16", textDecoration: "underline" }}>Terms of Service</Link>
                {" "}and{" "}
                <Link to="/" style={{ color: "#1a3a16", textDecoration: "underline" }}>Privacy Policy</Link>
              </span>
            </div>

            <button type="submit" className="auth-btn-forest">Create Account</button>

            <div className="auth-divider">
              <div className="auth-divider-line"/>
              <span className="auth-divider-text">Or</span>
              <div className="auth-divider-line"/>
            </div>

            <button type="button" className="auth-btn-google">
              <svg viewBox="0 0 24 24" width="18" height="18" style={{ marginRight: "8px" }}>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue With Google
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}