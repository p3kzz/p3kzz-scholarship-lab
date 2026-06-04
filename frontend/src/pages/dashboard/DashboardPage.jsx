import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Menu } from "lucide-react"
import Sidebar from "../../components/layout/Sidebar"
import "../../styles/dashboard.css"

const API_URL = import.meta.env.VITE_API_URL
const STRENGTHS = ["Leadership Experience", "High Score (90+)", "Active Organization"]

export default function DashboardPage() {

  const navigate = useNavigate()

  const [mobileOpen, setMobileOpen] =
    useState(false)

  const [stats, setStats] =
    useState({
      applied: 0,
      accepted: 0
    })

  const [recommendations, setRecommendations] =
    useState([])

  const [profile, setProfile] =
    useState(null)

  useEffect(() => {

    const loadDashboard =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            )

          // DASHBOARD STATS
          const statsResponse =
            await fetch(
              `${API_URL}/dashboard/stats`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            )

          const statsData =
            await statsResponse.json()

          setStats(
            statsData
          )

          // PROFILE
          const profileResponse =
            await fetch(
              `${API_URL}/profile`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            )

          const profileData =
            await profileResponse.json()

          setProfile(
            profileData
          )

          // RECOMMENDATIONS
          const recommendationResponse =
            await fetch(
              `${API_URL}/recommendations/saved`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            )

          const recommendationData =
            await recommendationResponse.json()

          setRecommendations(
            recommendationData.recommendations || []
          )

        } catch (error) {

          console.error(
            error
          )

        }
      }

    loadDashboard()

  }, [])

  const strengths = []
  const actions = []

  if (profile?.reportAverage >= 85) {
    strengths.push("High Academic Score")
  }

  if (profile?.extracurricularText) {
    strengths.push("Leadership Experience")
  }

  if (profile?.olympiadLevel) {
    strengths.push("Olympiad Achievement")
  }

  if (profile?.intendedCareerTrack) {
    strengths.push("Career Path Defined")
  }

  if (!profile?.englishScore) {
    actions.push("Upload IELTS / TOEFL Score")
  }

  if (!profile?.personalStatement) {
    actions.push("Complete Personal Statement")
  }

  if (!profile?.futureGoals) {
    actions.push("Add Future Goals")
  }

  if (!profile?.schoolTier) {
    actions.push("Complete School Information")
  }

  const profileFields = [

    profile?.fullName,
    profile?.gender,
    profile?.birthDate,
    profile?.nationality,
    profile?.province,

    profile?.familyIncomeCategory,

    profile?.currentDegreeLevel,

    profile?.schoolName,
    profile?.highSchoolTrack,

    profile?.reportAverage,

    profile?.extracurricularText,

    profile?.intendedCareerTrack,

    profile?.personalStatement,
    profile?.futureGoals

  ]

  const completedFields =
    profileFields.filter(
      field =>
        field !== null &&
        field !== undefined &&
        field !== ""
    ).length

  const profileCompletion =
    Math.round(
      (completedFields / profileFields.length) * 100
    )

  const matchedCount =
    recommendations.length

  const highMatchCount =
    Math.min(
      recommendations.length,
      3
    )
  return (
    <div className="db-page">

      {/* mobile hamburger */}
      <button
        className="db-mobile-menu"
        onClick={() => setMobileOpen(prev => !prev)}
      >
        <Menu size={22} color="white" />
      </button>

      {/* overlay */}
      {mobileOpen && (
        <div className="db-overlay" onClick={() => setMobileOpen(false)} />
      )}

      <Sidebar isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="db-main">

        {/* TOP */}
        <div className="db-top">
          <div>
            <h1 className="db-title">

              Welcome back,{" "}

              <span className="db-title-name">

                {
                  profile?.fullName ||
                  "Scholar"
                }

                .

              </span>

            </h1>
            <p className="db-subtitle">

              Your AI scout found{" "}

              <strong>
                {matchedCount}
              </strong>

              {" "}matching scholarships, including{" "}

              <strong>
                {highMatchCount}
              </strong>

              {" "}high-match opportunities.

            </p>
          </div>
          <div className="db-profile-pill">
            <span className="db-profile-pill-dot" />
            PROFILE COMPLETION {
              profile
                ? profileCompletion
                : 0
            }%
          </div>
        </div>

        {/* STATS */}
        <div className="db-stats">
          <div className="db-stat-card">
            <div className="db-stat-icon green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <div className="db-stat-number">  {recommendations.length}</div>
            <div className="db-stat-label">MATCHED</div>
          </div>
          <div className="db-stat-card">
            <div className="db-stat-icon green">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div className="db-stat-number">{
              recommendations.length >= 3
                ? 3
                : recommendations.length
            }</div>
            <div className="db-stat-label">HIGH MATCH</div>
          </div>
          <div className="db-stat-card">
            <div className="db-stat-icon red">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div className="db-stat-number">
              {stats.applied}
            </div>
            <div className="db-stat-label">APPLIED</div>
          </div>
          <div className="db-stat-card">
            <div className="db-stat-icon green">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61z" />
              </svg>
            </div>
            <div className="db-stat-number"> {stats.accepted} </div>
            <div className="db-stat-label"> ACCEPTED</div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="db-content">

          {/* LEFT */}
          <div className="db-left">
            <div className="db-section-top">
              <h2 className="db-section-title">Top AI Recommendations</h2>
              <button className="db-see-all" onClick={() => navigate("/match")}>
                SEE ALL &rsaquo;
              </button>
            </div>
            <div className="db-rec-list">
              {recommendations
                .slice(0, 3)
                .map(item => (

                  <div
                    key={item.id}
                    className="db-rec-card"
                  >

                    <div className="db-rec-left">

                      <div className="db-rec-circle">

                        {
                          Math.round(
                            item.score * 100
                          )
                        }%

                      </div>

                      <div>

                        <div className="db-rec-title">
                          {
                            item.scholarship?.name
                          }
                        </div>

                        <div className="db-rec-sub">
                          {
                            item.scholarship?.hostCountry
                          }
                          {" • "}
                          {
                            item.scholarship?.hostRegion
                          }
                        </div>

                      </div>

                    </div>

                    <div className="db-rec-right">

                      <div className="db-rec-deadline-label">
                        RANK
                      </div>

                      <div className="db-rec-deadline-val">
                        #{item.rank}
                      </div>

                    </div>

                  </div>

                ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="db-insight-card">

            <div className="db-insight-lightning">
              ⚡
            </div>

            <div className="db-insight-body">

              <div className="db-insight-label green">
                STRENGTHS
              </div>

              <div className="db-insight-list">

                {
                  strengths.length > 0 ? (

                    strengths.map(s => (

                      <div
                        key={s}
                        className="db-insight-item"
                      >

                        <div className="db-insight-check">

                          <svg
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke="white"
                            strokeWidth="2.5"
                          >
                            <polyline points="2,6 5,9 10,3" />
                          </svg>

                        </div>

                        <span className="db-insight-text">
                          {s}
                        </span>

                      </div>

                    ))

                  ) : (

                    <div className="db-insight-item">

                      <div className="db-insight-warn">
                        !
                      </div>

                      <span className="db-insight-text">
                        Complete your profile to unlock insights
                      </span>

                    </div>

                  )
                }

              </div>

              <div className="db-insight-divider" />

              <div className="db-insight-label red">
                ACTION NEEDED
              </div>

              {
                actions.length > 0 ? (

                  actions.map(action => (

                    <div
                      key={action}
                      className="db-insight-item"
                    >

                      <div className="db-insight-warn">
                        !
                      </div>

                      <span className="db-insight-text">
                        {action}
                      </span>

                    </div>

                  ))

                ) : (

                  <div className="db-insight-item">

                    <div className="db-insight-check">

                      <svg
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="white"
                        strokeWidth="2.5"
                      >
                        <polyline points="2,6 5,9 10,3" />
                      </svg>

                    </div>

                    <span className="db-insight-text">
                      No major improvements needed
                    </span>

                  </div>

                )
              }

              <button
                className="db-improve-btn"
                onClick={() =>
                  navigate("/profile")
                }
              >
                Improve My Profile Match
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  )
}