import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import {
  BookOpen,
  Mail,
  FileText,
  GraduationCap,
  Menu,
} from "lucide-react"


import Sidebar from "../../components/layout/Sidebar"

import "../../styles/gap-analysis.css"

export default function GapAnalysisPage() {
  function calculateAge(
    birthDate
  ) {

    if (!birthDate)
      return null

    const today =
      new Date()

    const birth =
      new Date(birthDate)

    let age =
      today.getFullYear() -
      birth.getFullYear()

    const monthDiff =
      today.getMonth() -
      birth.getMonth()

    if (
      monthDiff < 0 ||
      (
        monthDiff === 0 &&
        today.getDate() <
        birth.getDate()
      )
    ) {
      age--
    }

    return age
  }
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const token =
          localStorage.getItem("token")

        const response =
          await fetch(
            "http://localhost:3000/profile",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          )

        const user =
          await response.json()

        console.log(
          "PROFILE RESPONSE",
          user
        )

        setProfile(
          user
        )

      } catch (error) {

        console.error(error)

      }
    }

    fetchProfile()

  }, [])
  const location = useLocation()

  const [mobileOpen, setMobileOpen] = useState(false)

  const recommendation =
    location.state?.scholarship

  const scholarship =
    recommendation?.scholarship

  if (!recommendation) {

    return (
      <div className="gap-page">

        <div className="gap-main">

          <h2>
            No scholarship selected
          </h2>

          <button
            onClick={() =>
              navigate("/match")
            }
          >
            Back to Matching
          </button>

        </div>

      </div>
    )
  }


  const eligibility = []
  const optimizations = []

  if (
    profile &&
    scholarship
  ) {

    // Academic

    if (
      profile.reportAverage <
      scholarship.minReportCardAverage
    ) {

      optimizations.push(
        `Increase your academic score to at least ${scholarship.minReportCardAverage}`
      )
    }

    // Language

    if (
      scholarship.languageRequirements?.length
    ) {

      optimizations.push(
        "Upload IELTS / TOEFL certificate to strengthen your application"
      )
    }

    // Leadership

    if (
      !profile.extracurricularText
    ) {

      optimizations.push(
        "Add extracurricular and leadership experiences"
      )
    }

    // Personal Statement

    if (
      !profile.personalStatement
    ) {

      optimizations.push(
        "Complete your personal statement"
      )
    }

    // Future Goals

    if (
      !profile.futureGoals
    ) {

      optimizations.push(
        "Describe your future academic and career goals"
      )
    }
    if (
      optimizations.length === 0
    ) {

      optimizations.push(
        "Your profile already matches most scholarship requirements."
      )
    }
  }

  if (
    profile &&
    scholarship
  ) {

    // Academic

    const academicMatch =
      Number(profile.reportAverage || 0) >=
      Number(
        scholarship.minReportCardAverage || 0
      )

    eligibility.push({

      title:
        "Academic Requirement",

      desc:
        academicMatch

          ? `Your score (${profile.reportAverage}) meets the requirement`

          : `Minimum score required is ${scholarship.minReportCardAverage}`,

      type:
        academicMatch
          ? "success"
          : "warning"
    })

    // Nationality

    const nationalityMatch =
      scholarship
        .eligibleNationalities
        ?.includes(
          profile.nationality
            ?.toLowerCase()
        )

    eligibility.push({

      title:
        "Nationality Requirement",

      desc:
        nationalityMatch

          ? "Your nationality is eligible"

          : "Nationality not eligible",

      type:
        nationalityMatch
          ? "success"
          : "warning"
    })

    // Age

    const age =
      calculateAge(
        profile.birthDate
      )

    if (age === null) {

      eligibility.push({

        title:
          "Age Requirement",

        desc:
          "Birth date has not been filled in your profile",

        type:
          "warning"
      })

    } else {

      const ageMatch =
        age >= scholarship.minAge &&
        age <= scholarship.maxAge

      eligibility.push({

        title:
          "Age Requirement",

        desc:
          ageMatch

            ? `Age ${age} is within allowed range`

            : `Required age: ${scholarship.minAge}-${scholarship.maxAge}`,

        type:
          ageMatch
            ? "success"
            : "warning"
      })
    }

    // High School Track

    const normalizedTrack =
      profile.highSchoolTrack
        ?.toLowerCase()

    const trackMatch =
      scholarship
        .eligibleHighSchoolTracks
        ?.some(track =>
          normalizedTrack?.includes(
            track.toLowerCase()
          )
        )

    eligibility.push({

      title:
        "High School Track",

      desc:
        trackMatch

          ? "Your track matches"

          : "Track does not match",

      type:
        trackMatch
          ? "success"
          : "warning"
    })

  }

  const documents = []

  documents.push({
    name: "Academic Transcript",
    icon: <FileText size={22} strokeWidth={2} />,
    completed: !!profile?.reportAverage
  })

  if (
    scholarship?.missionStatement
  ) {

    documents.push({
      name: "Personal Statement",
      icon: <BookOpen size={22} strokeWidth={2} />,
      completed: !!profile?.personalStatement
    })
  }

  documents.push({
    name: "Letter of Recommendation",
    icon: <Mail size={22} strokeWidth={2} />,
    completed: !!profile?.extracurricularText
  })

  if (
    scholarship?.languageRequirements?.length
  ) {

    const tests =
      scholarship.languageRequirements
        .map(
          item =>
            item.test_type?.toUpperCase()
        )
        .join(" / ")

    documents.push({
      name: `${tests} Certificate`,
      icon: <GraduationCap size={22} strokeWidth={2} />,
      completed: false
    })
  }

  const timeline = []

  return (

    <div className="gap-page">

      {/* MOBILE HAMBURGER */}
      <button
        className="gap-mobile-menu"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu size={22} color="white" />
      </button>

      {/* OVERLAY */}
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <Sidebar
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* MAIN */}
      <div className="gap-main">

        {/* BACK */}
        <button
          className="gap-back"
          onClick={() => navigate("/match")}
        >
          ← Back to Matching
        </button>

        {/* HEADER */}
        <div className="gap-header">

          <div>

            <div className="gap-badges">

              <div className="gap-global-badge">
                GLOBAL
              </div>

              <div className="gap-opportunity">
                • Full Funding Opportunity
              </div>

            </div>

            <h1 className="gap-title">
              {scholarship?.name}
            </h1>

            <p className="gap-desc">
              {recommendation?.metadata?.host_country}
              {" • "}
              {
                recommendation?.metadata
                  ?.funding_is_full_funding
                  ? "FULL FUNDING"
                  : "PARTIAL FUNDING"
              }
            </p>

          </div>

          {/* SCORE */}
          <div className="gap-score-circle">

            <h2>
              {
                Math.round(
                  (recommendation?.score || 0) * 100
                )
              }%
            </h2>

            <p>MATCH</p>

          </div>

        </div>

        {/* CONTENT */}
        <div className="gap-content">

          {/* LEFT */}
          <div>

            {/* ELIGIBILITY */}
            <div className="gap-section">

              <div className="gap-section-title">
                Eligibility Check
              </div>

              <div className="gap-eligibility-grid">

                {eligibility.map((item) => (

                  <div
                    key={item.title}
                    className="gap-eligibility-card"
                  >

                    <div className={`gap-check ${item.type}`}>
                      {item.type === "success" ? "✓" : "!"}
                    </div>

                    <div>

                      <div className="gap-eligibility-title">
                        {item.title}
                      </div>

                      <div className="gap-eligibility-desc">
                        {item.desc}
                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* DOCUMENTS */}
            <div className="gap-section">

              <div className="gap-section-title">
                Required Documents
              </div>

              <div className="gap-documents-card">

                {documents.map((doc) => (

                  <div
                    key={doc.name}
                    className="gap-document-row"
                  >

                    <div className="gap-document-left">

                      <div className="gap-document-icon">
                        {doc.icon}
                      </div>

                      <div className="gap-document-name">
                        {doc.name}
                      </div>

                    </div>

                    <div
                      className={
                        doc.completed
                          ? "gap-complete"
                          : "gap-required"
                      }
                    >

                      {
                        doc.completed
                          ? "READY"
                          : "REQUIRED"
                      }

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="gap-right-column">

            {/* AI CARD */}
            <div className="gap-ai-card">

              <div className="gap-ai-title">
                AI Optimization
              </div>

              <p className="gap-ai-desc">

                To increase your{" "}

                <span>
                  {
                    Math.round(
                      (recommendation?.score || 0) * 100
                    )
                  }% Match
                </span>{" "}

                to <span>
                  {
                    Math.min(
                      Math.round(
                        (recommendation?.score || 0) * 100
                      ) + 10,
                      100
                    )
                  }%
                </span>

              </p>

              <div className="gap-ai-list">

                {
                  optimizations.map(
                    (item, index) => (

                      <div
                        key={index}
                        className="gap-ai-item"
                      >
                        {item}
                      </div>

                    )
                  )
                }

              </div>

              <button
                className="gap-update-btn"
                onClick={() => navigate("/profile")}
              >
                Update Profile Now
              </button>

            </div>

            {/* TIMELINE */}
            <div className="gap-timeline-card">

              <div className="gap-timeline-title">
                Timeline
              </div>

              <div className="gap-timeline-list">

                {
                  timeline.length === 0 ? (

                    <div className="gap-empty-state">

                      Timeline information is not available
                      for this scholarship.

                    </div>

                  ) : (

                    timeline.map((item, i) => (

                      <div
                        key={item.title}
                        className="gap-timeline-item"
                      >

                        <div className="gap-timeline-left">

                          <div
                            className={`gap-timeline-dot${item.active ? " active" : ""
                              }`}
                          />

                          {i < timeline.length - 1 && (
                            <div className="gap-timeline-line" />
                          )}

                        </div>

                        <div>

                          <div className="gap-timeline-item-title">
                            {item.title}
                          </div>

                          <div className="gap-timeline-date">
                            {item.date}
                          </div>

                        </div>

                      </div>

                    ))

                  )
                }

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}