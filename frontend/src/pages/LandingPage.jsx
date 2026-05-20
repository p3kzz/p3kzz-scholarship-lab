import { Link } from "react-router-dom"
import Footer from "../components/layout/Footer"
import "../styles/landing.css"

// ── NAVBAR ──────────────────────────────────────────────
function LPNavbar() {
  return (
    <nav className="lp-nav">
      <Link to="/" className="lp-nav-logo">
        <div className="lp-nav-logo-icon">
          <svg viewBox="0 0 24 24" fill="white">
            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9 12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
          </svg>
        </div>
        <span className="lp-nav-brand">Scholarship.Lab</span>
      </Link>
      <div className="lp-nav-links">
        <a href="#about" className="lp-nav-link">About</a>
        <a href="#scholarships" className="lp-nav-link">Scholarships</a>
        <a href="#how" className="lp-nav-link">How To Apply</a>
        <Link to="/register" className="lp-nav-cta">Apply Now</Link>
      </div>
    </nav>
  )
}

// ── HERO ────────────────────────────────────────────────
function LPHero() {
  return (
    <section className="lp-hero">
      <div className="lp-hero-overlay" />

      <div className="lp-hero-badge">
        <span className="lp-hero-badge-dot" />
        AI-Powered Scholarship Matching
      </div>

      <h1 className="lp-hero-h1">
        Unlock your future<br />
        with the right <em>scholarship.</em>
      </h1>

      <p className="lp-hero-sub">
        Find and match with curated scholarships for high school and university
        students in Indonesia, all in one place.
      </p>

      <div className="lp-hero-bottom">
        <div>
          <p className="lp-hero-desc">
            Scholarship Lab uses AI to analyze your profile and guide you
            toward the right opportunities with confidence.
            No more guessing. No more confusion.
          </p>
          <div className="lp-hero-btns">
            <Link to="/register" className="lp-btn-primary">Browse Scholarships</Link>
            <a href="#how" className="lp-btn-secondary">How It Works</a>
          </div>
        </div>

        <div className="lp-hero-cards">
          <div className="lp-hero-card">
            <div className="lp-hero-card-title">Always growing</div>
            <div className="lp-hero-card-desc">New scholarships added regularly</div>
          </div>
          <div className="lp-hero-card">
            <div className="lp-hero-card-title">Made for you</div>
            <div className="lp-hero-card-desc">Matched to your unique profile</div>
          </div>
          <div className="lp-hero-card wide">
            <div className="lp-hero-card-title">Zero barriers</div>
            <div className="lp-hero-card-desc">Open doors for every Indonesian student, no matter where you're starting from</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── ABOUT ───────────────────────────────────────────────
function LPAbout() {
  const cards = [
    {
      num: "01",
      title: "No More Scholarship Maze",
      desc: "Thousands of scholarships exist, but finding the right one feels impossible. We cut through the noise, curate what matters, and present it in a way you can actually act on."
    },
    {
      num: "02",
      title: "Smart Recommendations, Not Just a List",
      desc: "Scholarship Lab's AI goes beyond search. It reads your profile, understands your strengths, and points you toward the opportunities you have the best shot at winning."
    },
    {
      num: "03",
      title: "A Foundation Built for the Next Generation",
      desc: "We've been in your shoes. Scholarship Lab is our answer, a strategic home base for every Indonesian student chasing their future."
    }
  ]

  return (
    <section id="about" className="lp-about">
      {/* wave bg inline SVG */}
      <svg className="lp-about-bg" viewBox="0 0 1440 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="abg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e8f2e8"/>
            <stop offset="50%" stopColor="#eef5ee"/>
            <stop offset="100%" stopColor="#e4f0e4"/>
          </linearGradient>
        </defs>
        <rect width="1440" height="600" fill="url(#abg)"/>
        <ellipse cx="200" cy="150" rx="400" ry="240" fill="#c8e8c0" opacity="0.2"/>
        <ellipse cx="1200" cy="450" rx="360" ry="200" fill="#b8e0b0" opacity="0.15"/>
        <path d="M-40 80 Q360 40 720 80 Q1080 120 1480 80" fill="none" stroke="#b8d8b0" strokeWidth="1.5" opacity="0.55"/>
        <path d="M-40 130 Q360 90 720 130 Q1080 170 1480 130" fill="none" stroke="#b8d8b0" strokeWidth="1.2" opacity="0.48"/>
        <path d="M-40 180 Q360 140 720 180 Q1080 220 1480 180" fill="none" stroke="#aacca0" strokeWidth="1.2" opacity="0.45"/>
        <path d="M-40 230 Q360 190 720 230 Q1080 270 1480 230" fill="none" stroke="#b8d8b0" strokeWidth="1" opacity="0.42"/>
        <path d="M-40 280 Q360 240 720 280 Q1080 320 1480 280" fill="none" stroke="#aacca0" strokeWidth="1.2" opacity="0.40"/>
        <path d="M-40 330 Q360 290 720 330 Q1080 370 1480 330" fill="none" stroke="#b8d8b0" strokeWidth="1" opacity="0.38"/>
        <path d="M-40 380 Q360 340 720 380 Q1080 420 1480 380" fill="none" stroke="#aacca0" strokeWidth="1" opacity="0.35"/>
        <path d="M-40 430 Q360 390 720 430 Q1080 470 1480 430" fill="none" stroke="#b8d8b0" strokeWidth="1.2" opacity="0.32"/>
        <path d="M-40 480 Q360 440 720 480 Q1080 520 1480 480" fill="none" stroke="#aacca0" strokeWidth="0.8" opacity="0.28"/>
        <path d="M-40 530 Q360 490 720 530 Q1080 570 1480 530" fill="none" stroke="#b8d8b0" strokeWidth="0.8" opacity="0.25"/>
        <path d="M-40 105 Q360 65 720 105 Q1080 145 1480 105" fill="none" stroke="#08CB00" strokeWidth="0.6" opacity="0.09"/>
        <path d="M-40 255 Q360 215 720 255 Q1080 295 1480 255" fill="none" stroke="#08CB00" strokeWidth="0.5" opacity="0.08"/>
        <path d="M-40 405 Q360 365 720 405 Q1080 445 1480 405" fill="none" stroke="#08CB00" strokeWidth="0.5" opacity="0.08"/>
      </svg>

      <div className="lp-about-inner">
        <div className="lp-about-header">
          <p className="lp-about-desc">
            We built the platform we wish we had. Scholarship Lab helps
            Indonesian students discover the right scholarships and take
            confident steps toward their future.
          </p>
          <div>
            <p className="lp-about-eyebrow">About Us</p>
            <h2 className="lp-about-title">
              A place to <em>discover.</em><br />
              A path to your <em>future.</em>
            </h2>
          </div>
        </div>

        <div className="lp-about-cards">
          {cards.map((card) => (
            <div key={card.num} className="lp-about-card">
              <div className="lp-about-card-num">{card.num}</div>
              <div>
                <div className="lp-about-card-title">{card.title}</div>
                <div className="lp-about-card-desc">{card.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── PAGE ────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div>
      <LPNavbar />
      <LPHero />
      <LPAbout />
      <Footer />
    </div>
  )
}