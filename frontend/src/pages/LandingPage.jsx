import { Link } from "react-router-dom"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import "../styles/landing.css"
import bgAbout from "../assets/bg-about.jpeg"


// ── HERO ──────────────────────────────────────────────
function LPHero() {
  return (
    <section className="lp-hero">

      <div className="lp-hero-tag">
        <span className="lp-hero-dot"></span>
        AI-Powered Scholarship Matching
      </div>

      <h2 className="lp-hero-title">
        Unlock your future
        <br />
        with the right{" "}
        <span className="lp-hero-italic-shadow">
          scholarship.
        </span>
      </h2>

      <p className="lp-hero-subtitle">
        Find and match with curated scholarships for high school and university
        students in Indonesia, all in one place.
      </p>

      <div className="lp-hero-bottom">

        <div className="lp-hero-left-content">

          <p className="lp-hero-description">
            Scholarship Lab uses AI to analyze your profile and guide you
            toward the right opportunities with confidence.
            No more guessing. No more confusion.
          </p>

          <div className="lp-hero-buttons">

            <button className="lp-browse-btn">
              Browse Scholarships
            </button>

            <button className="lp-works-btn">
              How It Works
            </button>

          </div>

        </div>

        <div className="lp-hero-cards-wrapper">

          <div className="lp-hero-top-cards">

            <div className="lp-hero-info-card">
              <h3>Always growing</h3>
              <p>New scholarships added regularly</p>
            </div>

            <div className="lp-hero-info-card">
              <h3>Made for you</h3>
              <p>Matched to your unique profile</p>
            </div>

          </div>

          <div className="lp-hero-info-card lp-hero-large-card">

            <h3>Zero barriers</h3>

            <p>
              Open doors for every Indonesian student,
              no matter where you're starting from
            </p>

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

      <img
        src={bgAbout}
        alt=""
        className="lp-about-wave"
      />

      <div className="lp-about-container">

        <div className="lp-about-header">

          <p className="lp-about-description">
            We built the platform we wish we had.
            Scholarship Lab helps Indonesian students
            discover the right scholarships and take
            confident steps toward their future.
          </p>

          <div className="lp-about-right">

            <div className="lp-about-label">
              ABOUT US
            </div>

            <h2 className="lp-about-title">
  A place to <em>discover.</em>
  <br />
  A path to your <em>future.</em>
</h2>

          </div>

        </div>

        <div className="lp-about-cards">

          {cards.map((card) => (
            <div
              key={card.num}
              className="lp-about-card"
            >

              <div className="lp-about-number">
                {card.num}
              </div>

              <div>

                <div className="lp-about-card-title">
                  {card.title}
                </div>

                <div className="lp-about-card-desc">
                  {card.desc}
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}

export default function LandingPage() {
  return (
    <>
      <Navbar variant="light" />

      <LPHero />

      <LPAbout />

      <Footer />
    </>
  )
}