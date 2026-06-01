import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Menu } from "lucide-react"
import Sidebar from "../../components/layout/Sidebar"
import "../../styles/dashboard.css"

const STRENGTHS = ["Leadership Experience", "High Score (90+)", "Active Organization"]

export default function DashboardPage() {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [stats, setStats] = useState({ applied: 0, accepted: 0 })
  const [recommendations, setRecommendations] = ([])

  useEffect(() => {

    const loadDashboard =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            )

          const statsResponse =
            await fetch(
              "http://localhost:3000/dashboard/stats",
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

          const recs =
            JSON.parse(
              localStorage.getItem(
                "recommendations"
              )
            ) || []

          setRecommendations(
            recs
          )

        } catch (error) {

          console.error(error)

        }
      }

    loadDashboard()

  }, [])
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
              <span className="db-title-name">Afif.</span>
            </h1>
            <p className="db-subtitle">
              Your AI scout found 4 new high-match scholarships today.
            </p>
          </div>
          <div className="db-profile-pill">
            <span className="db-profile-pill-dot" />
            PROFILE COMPLETION 75%
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
              recommendations.filter(
                item =>
                  Math.round(
                    item.score * 100
                  ) >= 80
              ).length
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
            <div className="db-stat-number">5</div>
            <div className="db-stat-label">DEADLINES</div>
          </div>
          <div className="db-stat-card">
            <div className="db-stat-icon green">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61z" />
              </svg>
            </div>
            <div className="db-stat-number">12</div>
            <div className="db-stat-label">SAVED</div>
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
              {RECS.map(r => (
                <div key={r.title} className="db-rec-card">
                  <div className="db-rec-left">
                    <div className="db-rec-circle">{r.pct}</div>
                    <div>
                      <div className="db-rec-title">{r.title}</div>
                      <div className="db-rec-sub">{r.sub}</div>
                    </div>
                  </div>
                  <div className="db-rec-right">
                    <div className="db-rec-deadline-label">DEADLINE</div>
                    <div className="db-rec-deadline-val">{r.days}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="db-right">
            <div className="db-section-top">
              <h2 className="db-section-title">AI Profile Insights</h2>
            </div>
            <div className="db-insight-card">
              <div className="db-insight-lightning">⚡</div>
              <div className="db-insight-body">
                <div className="db-insight-label green">STRENGTHS</div>
                <div className="db-insight-list">
                  {STRENGTHS.map(s => (
                    <div key={s} className="db-insight-item">
                      <div className="db-insight-check">
                        <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5">
                          <polyline points="2,6 5,9 10,3" />
                        </svg>
                      </div>
                      <span className="db-insight-text">{s}</span>
                    </div>
                  ))}
                </div>
                <div className="db-insight-divider" />
                <div className="db-insight-label red">ACTION NEEDED</div>
                <div className="db-insight-item">
                  <div className="db-insight-warn">!</div>
                  <span className="db-insight-text">No IELTS Certificate</span>
                </div>
                <button className="db-improve-btn" onClick={() => navigate("/profile/edit")}>
                  Improve My Profile Match
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}