import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import "../styles/landing.css"
import bgAbout from "../assets/bg-about.jpeg"
import { Search } from "lucide-react"


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

            <button
              className="lp-browse-btn"
              onClick={() =>
                document
                  .getElementById("scholarships")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Browse Scholarships
            </button>

            <button
              className="lp-works-btn"
              onClick={() =>
                document
                  .getElementById("how")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
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

// ─────────────────────────────────────────────
// SCHOLARSHIPS
// ─────────────────────────────────────────────



const API_URL = import.meta.env.VITE_API_URL

function LPScholarships() {

  const [scholarships, setScholarships] =
    useState([])

  const [regionOpen, setRegionOpen] =
    useState(false)

  const [fundingOpen, setFundingOpen] =
    useState(false)

  const [selectedRegion, setSelectedRegion] =
    useState("All Region")

  const [selectedFunding, setSelectedFunding] =
    useState("All Funding")

  useEffect(() => {

    async function fetchScholarships() {

      try {

        const response =
          await fetch(
            `${API_URL}/scholarships`
          )

        const data =
          await response.json()

        setScholarships(
          data.scholarships || []
        )

      } catch (error) {

        console.error(
          "Failed to fetch scholarships",
          error
        )

      }

    }

    fetchScholarships()

  }, [])

  const regionOptions = [
    "All Region",
    "ASIA",
    "EUROPE"
  ]

  const fundingOptions = [
    "All Funding",
    "Fully Funded",
    "Partial Funding"
  ]

  const filteredScholarships =
    scholarships.filter((item) => {

      const regionMatch =
        selectedRegion === "All Region" ||
        item.hostRegion?.toUpperCase() ===
        selectedRegion

      const fundingMatch =

        selectedFunding === "All Funding" ||

        (
          selectedFunding ===
            "Fully Funded"

            ? item.fundingIsFullFunding

            : !item.fundingIsFullFunding
        )

      return (
        regionMatch &&
        fundingMatch
      )
    })

  return (

    <section
      id="scholarships"
      className="lp-scholarships"
    >

      <div className="lp-scholarships-container">

        <div className="lp-scholarships-top">

          <div>

            <div className="lp-scholarships-label">
              Featured Scholarships
            </div>

            <h2 className="lp-scholarships-title">

              Five doors to
              <br />
              the <em>world.</em>

            </h2>

          </div>

          <p className="lp-scholarships-description">

            Explore curated scholarships
            for Indonesian students.
            Tap any card to view details
            and visit the official page.

          </p>

        </div>

        <div className="lp-scholarships-line"></div>

        {/* FILTER */}

        <div className="lp-scholarships-filters">

          {/* REGION */}

          <div className="lp-filter-group">

            <button className="lp-filter-label-btn">
              REGION
            </button>

            <div className="lp-filter-dropdown-wrapper">

              <div
                className="lp-filter-dropdown"
                onClick={() => {

                  setRegionOpen(
                    !regionOpen
                  )

                  setFundingOpen(
                    false
                  )

                }}
              >

                <span>
                  {selectedRegion}
                </span>

                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="#2D5016"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

              </div>

              {regionOpen && (

                <div className="lp-filter-menu">

                  {regionOptions.map(
                    (region) => (

                      <button
                        key={region}
                        className="lp-filter-item"
                        onClick={() => {

                          setSelectedRegion(
                            region
                          )

                          setRegionOpen(
                            false
                          )

                        }}
                      >
                        {region}
                      </button>

                    )
                  )}

                </div>

              )}

            </div>

          </div>

          <div className="lp-filter-divider"></div>

          {/* FUNDING */}

          <div className="lp-filter-group">

            <button className="lp-filter-label-btn">
              FUNDING
            </button>

            <div className="lp-filter-dropdown-wrapper">

              <div
                className="lp-filter-dropdown"
                onClick={() => {

                  setFundingOpen(
                    !fundingOpen
                  )

                  setRegionOpen(
                    false
                  )

                }}
              >

                <span>
                  {selectedFunding}
                </span>

                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="#2D5016"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

              </div>

              {fundingOpen && (

                <div className="lp-filter-menu">

                  {fundingOptions.map(
                    (funding) => (

                      <button
                        key={funding}
                        className="lp-filter-item"
                        onClick={() => {

                          setSelectedFunding(
                            funding
                          )

                          setFundingOpen(
                            false
                          )

                        }}
                      >
                        {funding}
                      </button>

                    )
                  )}

                </div>

              )}

            </div>

          </div>

        </div>

        {/* CARDS */}

        <div className="lp-scholarships-grid">

          {filteredScholarships.length >

            0 ? (

            filteredScholarships.map(
              (item) => (

                <a
                  key={item.id}
                  href={
                    item.link || "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lp-scholarship-card"
                  onClick={(e) => {

                    if (!item.link) {

                      e.preventDefault()

                      alert(
                        "Official scholarship link is not available yet."
                      )
                    }

                  }}
                >

                  <div className="lp-scholarship-region">

                    {
                      item.hostCountry?.toUpperCase()
                    }

                  </div>

                  <h3 className="lp-scholarship-card-title">

                    {item.name}

                  </h3>

                  <p className="lp-scholarship-card-desc">

                    {

                      item.missionStatement

                        ? item
                          .missionStatement
                          .length > 150

                          ? item
                            .missionStatement
                            .slice(
                              0,
                              150
                            ) + "..."

                          : item
                            .missionStatement

                        : "Scholarship opportunity for international students."

                    }

                  </p>

                  <div className="lp-scholarship-bottom">

                    <div className="lp-scholarship-funding">

                      ✦ {

                        item.fundingIsFullFunding

                          ? "FULL FUNDING"

                          : "PARTIAL FUNDING"

                      }

                    </div>

                    <div className="lp-scholarship-arrow">
                      →
                    </div>

                  </div>

                </a>

              )
            )

          ) : (

            <div className="lp-no-results">

              No scholarships match
              your filter.

            </div>

          )}

        </div>

      </div>

    </section>

  )
}



// ─────────────────────────────────────────────
// HOW TO APPLY
// ─────────────────────────────────────────────

function LPHowToApply() {

  const requirements = [
    "High school grade 10–12",
    "Active university student",
    "GPA / avg 80+",
    "English proficiency",
    "Extracurricular active",
    "Clear career goals",
    "Leadership experience",
    "Recommendation letter",
  ]

  const steps = [
    {
      num: "01",
      title: "Build your profile",
      desc: "Fill in your academic background, achievements and goals to get started.",
    },

    {
      num: "02",
      title: "Get matched",
      desc: "Our AI analyzes your profile and recommends the most suitable scholarships for you.",
    },

    {
      num: "03",
      title: "Improve your chances",
      desc: "Follow personalized suggestions to strengthen your profile and meet all requirements.",
    },

    {
      num: "04",
      title: "Apply with confidence",
      desc: "Access official pages and submit your application with full clarity and direction.",
    },
  ]

  return (
    <section
      id="how"
      className="lp-how"
    >

      <img
        src={bgAbout}
        alt=""
        className="lp-how-bg"
      />

      <div className="lp-how-overlay"></div>

      <div className="lp-how-circle-top"></div>
      <div className="lp-how-circle-bottom"></div>

      <div className="lp-how-wave"></div>

      <div className="lp-how-container">

        {/* top */}
        <div className="lp-how-label">
          How It Works
        </div>

        <h2 className="lp-how-title">
          Your path starts here.
          <br />
          <em>Simple. Clear. Yours.</em>
        </h2>

        {/* content */}
        <div className="lp-how-content">

          {/* left */}
          <div className="lp-how-left">

            <h3 className="lp-how-subtitle">
              Who Can Apply
            </h3>

            <p className="lp-how-description">
              Each scholarship has its own requirements,
              but most share the same foundation.
              Meet these basics and you're ready to start.
            </p>

            <div className="lp-how-tags">

              {requirements.map((item, index) => (

                <div
                  key={index}
                  className="lp-how-tag"
                >

                  <span className="lp-how-tag-dot"></span>

                  {item}

                </div>

              ))}

            </div>

          </div>

          {/* right */}
          <div className="lp-how-right">

            <div className="lp-how-subtitle">
              Four Steps
            </div>

            <div className="lp-how-steps">

              {steps.map((step, index) => (

                <div
                  key={index}
                  className="lp-how-step"
                >

                  <div className="lp-how-step-top">

                    <div className="lp-how-step-number">
                      {step.num}
                    </div>

                    <div>

                      <div className="lp-how-step-title">
                        {step.title}
                      </div>

                      <div className="lp-how-step-desc">
                        {step.desc}
                      </div>

                    </div>

                  </div>

                  <div className="lp-how-step-line"></div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}


// ─────────────────────────────────────────────
// CTA
// ─────────────────────────────────────────────

function LPCTA() {
  return (
    <section className="lp-cta-section">
      <div className="lp-cta-container">

        <div className="lp-cta-left">
          <p className="lp-cta-small-title">
            Ready To Apply?
          </p>

          <h2 className="lp-cta-title">
            Your future <br />
            starts <span>today.</span>
          </h2>

          <p className="lp-cta-desc">
            Find scholarships that match your potential
            <br />
            and get clear guidance on what to do next.
            <br />
            No account needed to browse just start exploring.
          </p>
        </div>

        <div className="lp-cta-card">
          <p className="lp-cta-card-top">
            Take the first step.
          </p>

          <h3 className="lp-cta-card-title">
            Match with your <br />
            perfect scholarship.
          </h3>

          <p className="lp-cta-card-desc">
            Build your profile, get matched by AI, and apply
            <br />
            with full confidence and direction.
          </p>

          <div className="lp-cta-line"></div>

          <div className="lp-cta-buttons">

            {/* GET STARTED */}
            <Link to="/register" className="lp-cta-btn primary">

              <div className="lp-cta-btn-circle">
                →
              </div>

              <span>Get Started</span>

              <div className="lp-cta-btn-arrow">
                →
              </div>

            </Link>

            {/* SEE ALL SCHOLARSHIPS */}
            <a
              href="#scholarships"
              className="lp-cta-btn secondary"
            >

              <div className="lp-cta-btn-circle search-circle">
                <Search size={18} strokeWidth={2.5} />
              </div>

              <span>See All Scholarships</span>

              <div className="lp-cta-btn-arrow">
                →
              </div>

            </a>

          </div>
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

      <LPScholarships />

      <LPHowToApply />

      <LPCTA />

      <Footer />
    </>
  )
}