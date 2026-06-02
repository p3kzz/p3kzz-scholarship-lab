import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../../components/layout/Sidebar"
import "../../styles/match-result.css"
import {
  createFeedback,
  getFeedbackStatus
} from "../../api/feedbackApi"

export default function MatchResultPage() {

  const navigate = useNavigate()

  const [sidebarOpen, setSidebarOpen] =
    useState(false)

  const [profile, setProfile] =
    useState(null)

  const [feedbackStatus, setFeedbackStatus] =
    useState(null)

  const [recommendations, setRecommendations] =
    useState([])

  const bestMatch =
    recommendations[0]

  const scholarships =
    recommendations.slice(1)

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

      const data =
        await response.json()

      setProfile(data)

    } catch (error) {

      console.error(error)

    }
  }

  const fetchRecommendations =
    async () => {

      try {

        const token =
          localStorage.getItem("token")

        const response =
          await fetch(
            "http://localhost:3000/recommendation",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          )

        const data =
          await response.json()

        setRecommendations(
          data.recommendations || []
        )

      } catch (error) {

        console.error(error)

      }
    }

  useEffect(() => {

    const loadData =
      async () => {

        await fetchProfile()

        await fetchRecommendations()
      }

    loadData()

  }, [])

  useEffect(() => {

    const loadStatus =
      async () => {

        if (
          !bestMatch?.scholarship?.id
        ) return

        try {

          const status =
            await getFeedbackStatus(
              bestMatch.scholarship.id
            )

          setFeedbackStatus(
            status
          )

        } catch (error) {

          console.error(error)

        }
      }

    loadStatus()

  }, [bestMatch])

  if (!recommendations.length) {

    return (

      <div className="match-page">

        <div className="match-main">

          Loading recommendations...

        </div>

      </div>
    )
  }

  const academicFit =
    Math.min(
      100,
      Math.round(
        (
          (
            bestMatch?.scholarship?.minReportCardAverage
              ? 90 /
              bestMatch.scholarship.minReportCardAverage
              : 1
          ) * 100
        )
      )
    )

  let leadershipFit = 40

  if (
    profile?.extracurricularText
  ) {
    leadershipFit += 30
  }

  if (
    profile?.olympiadLevel
  ) {
    leadershipFit += 30
  }

  leadershipFit =
    Math.min(
      leadershipFit,
      100
    )

  let languageFit = 100

  if (
    bestMatch?.scholarship
      ?.languageRequirements?.length
  ) {
    languageFit = 60
  }

  if (
    profile?.englishScore
  ) {
    languageFit += 20
  }

  languageFit =
    Math.min(
      languageFit,
      100
    )
  return (
    <div className="match-page">

      {/* HAMBURGER */}
      <button
        className="match-mobile-menu"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          width="22"
          height="22"
          fill="currentColor"
        >
          <path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z" />
        </svg>

      </button>

      {/* SIDEBAR */}
      <Sidebar isOpen={sidebarOpen} />

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN */}
      <div className="match-main">

        {/* bg blur */}
        <div className="match-bg-circle"></div>

        {/* top badge */}
        <div className="match-badge">
          ⚡ AI MATCHING ENGINE
        </div>

        {/* title */}
        <h1 className="match-title">
          Scholarship
          <span> Analysis Board.</span>
        </h1>

        {/* subtitle */}
        <p className="match-subtitle">
          We've computed global opportunities.
          Here are the ones where you have the highest
          competitive advantage.
        </p>

        {/* main card */}
        <div className="match-main-card">

          {/* left */}
          <div className="match-card-left">

            <div className="match-top-tags">

              <div className="match-green-tag">
                BEST MATCH
              </div>

              <div className="match-rank">
                FIRST RANKING
              </div>

            </div>

            <h2 className="match-scholarship-name">
              {bestMatch?.scholarship?.name}
            </h2>

            <p className="match-scholarship-desc">

              {bestMatch?.scholarship?.hostCountry}
              {" • "}
              {bestMatch?.scholarship?.fundingIsFullFunding
                ? "FULL FUNDING"
                : "PARTIAL FUNDING"}

            </p>

            <div className="match-breakdown-title">
              COMPATIBILITY BREAKDOWN
            </div>

            {/* progress */}
            <div className="match-progress-group">

              <div className="match-progress-top">
                <span>Academic Fit</span>
                <span className="green">
                  {academicFit}%
                </span>
              </div>

              <div className="match-progress-bar">
                <div
                  className="match-progress-fill green-fill"
                  style={{
                    width: `${academicFit}%`
                  }}
                ></div>
              </div>

            </div>

            <div className="match-progress-group">

              <div className="match-progress-top">
                <span>Leadership</span>
                <span className="green">{leadershipFit}%</span>
              </div>

              <div className="match-progress-bar">
                <div
                  className="match-progress-fill dark-fill"
                  style={{ width: `${leadershipFit}%` }}
                ></div>
              </div>

            </div>

            <div className="match-progress-group">

              <div className="match-progress-top">
                <span>Language</span>
                <span className="green">{languageFit}%</span>
              </div>

              <div className="match-progress-bar">
                <div
                  className="match-progress-fill red-fill"
                  style={{ width: `${languageFit}%` }}
                ></div>
              </div>

            </div>

            {/* buttons */}
            <div className="match-buttons">

              <button
                className="match-detail-btn"
                onClick={async () => {

                  try {

                    await createFeedback(
                      bestMatch.scholarship.id,
                      "click"
                    )

                  } catch (error) {

                    console.error(error)

                  }

                  navigate(
                    "/gap-analysis",
                    {
                      state: {
                        scholarship: bestMatch
                      }
                    }
                  )
                }}
              >
                View Analysis Details
              </button>

              <button
                className="match-save-btn"
                onClick={async () => {

                  try {

                    await createFeedback(
                      bestMatch.scholarship.id,
                      "apply"
                    )

                    const accepted =
                      window.confirm(
                        "Did you successfully apply for this scholarship?"
                      )

                    if (accepted) {

                      await createFeedback(
                        bestMatch.scholarship.id,
                        "accepted"
                      )
                    }

                    const status =
                      await getFeedbackStatus(
                        bestMatch.scholarship.id
                      )

                    setFeedbackStatus(
                      status
                    )

                  } catch (error) {

                    console.error(error)

                  }
                }}
              >

                {
                  feedbackStatus?.accepted
                    ? "Accepted "

                    : feedbackStatus?.applied
                      ? "Applied "

                      : "Apply"
                }

              </button>

            </div>

          </div>

          {/* right */}
          <div className="match-card-right">

            <div className="match-circle-wrapper">

              <div className="match-circle-dot"></div>

              <div className="match-circle">

                <div className="match-circle-inner">

                  <h2>
                    {Math.round(
                      (bestMatch?.score || 0) * 100
                    )}%
                  </h2>

                  <p>
                    COMPOSITE MATCH
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* cards */}
        <div className="match-grid">

          {scholarships.map((item) => (

            <div
              key={item.id}
              className="match-small-card"
            >

              <div className="match-small-top">

                <div>

                  <h3 className="match-small-title">
                    {item.scholarship?.name}
                  </h3>

                  <p className="match-small-country">
                    {item.scholarship?.hostCountry}
                  </p>

                </div>

                <div className="match-small-percent">
                  {Math.round(item.score * 100)}%
                </div>

              </div>

              <div className="match-small-tags">

                <div className="match-small-tag">
                  {item.scholarship?.fundingIsFullFunding
                    ? "FULL FUNDING"
                    : "PARTIAL"}
                </div>

                <div className="match-small-tag">
                  {item.scholarship?.hostRegion?.toUpperCase()}
                </div>

              </div>

              <div className="match-small-line"></div>

              <div className="match-small-bottom">

                <p className="match-days">
                  Rank #{item.rank}
                </p>

                <button
                  className="match-compare-btn"
                  onClick={async () => {

                    try {

                      await createFeedback(
                        item.scholarship.id,
                        "click"
                      )

                    } catch (error) {

                      console.error(error)

                    }

                    navigate(
                      "/gap-analysis",
                      {
                        state: {
                          scholarship: item
                        }
                      }
                    )
                  }}
                >
                  Compare AI →
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}