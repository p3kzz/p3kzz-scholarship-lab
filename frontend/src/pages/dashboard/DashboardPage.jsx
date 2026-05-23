import Sidebar from "../../components/layout/Sidebar"
import "../../styles/dashboard.css"

export default function DashboardPage() {

  const recommendations = [
    {
      percent: "92%",
      title: "GKS Korea Scholarship",
      desc: "NIIED Korea • South Korea",
      deadline: "15 Days Left"
    },
    {
      percent: "84%",
      title: "Lund University Scholarship",
      desc: "Lund University • Sweden",
      deadline: "28 Days Left"
    },
    {
      percent: "81%",
      title: "CIMB ASEAN Scholarship",
      desc: "CIMB Group • ASEAN",
      deadline: "32 Days Left"
    }
  ]

  return (
    <div className="dashboard-page">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="dashboard-main">

        {/* TOP */}
        <div className="dashboard-top">

          <div>

            <h1 className="dashboard-title">
              Welcome back,
              <span> Afif.</span>
            </h1>

            <p className="dashboard-subtitle">
              Your AI scout found 4 new high-match scholarships today.
            </p>

          </div>

          <div className="dashboard-progress-pill">
            ● PROFILE COMPLETION 75%
          </div>

        </div>

        {/* STATS */}
        <div className="dashboard-stats">

          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon green">
              ⦿
            </div>

            <h2>24</h2>

            <p>MATCHED</p>

          </div>

          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon green">
              ★
            </div>

            <h2>8</h2>

            <p>HIGH MATCH</p>

          </div>

          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon red">
              !
            </div>

            <h2>5</h2>

            <p>DEADLINES</p>

          </div>

          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon green">
              🏆
            </div>

            <h2>12</h2>

            <p>SAVED</p>

          </div>

        </div>

        {/* CONTENT */}
        <div className="dashboard-content">

          {/* LEFT */}
          <div className="dashboard-left">

            <div className="dashboard-section-top">

              <h2 className="dashboard-section-title">
                Top AI Recommendations
              </h2>

              <button className="dashboard-seeall">
                SEE ALL →
              </button>

            </div>

            <div className="dashboard-recommendations">

              {recommendations.map((item) => (
                <div
                  key={item.title}
                  className="dashboard-rec-card"
                >

                  <div className="dashboard-rec-left">

                    <div className="dashboard-rec-percent">
                      {item.percent}
                    </div>

                    <div>

                      <h3 className="dashboard-rec-title">
                        {item.title}
                      </h3>

                      <p className="dashboard-rec-desc">
                        {item.desc}
                      </p>

                    </div>

                  </div>

                  <div className="dashboard-rec-right">

                    <span>
                      DEADLINE
                    </span>

                    <p>
                      {item.deadline}
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* RIGHT */}
          <div className="dashboard-right">

            <h2 className="dashboard-section-title">
              AI Profile Insights
            </h2>

            <div className="dashboard-insight-card">

              <div className="dashboard-lightning"></div>

              {/* strengths */}
              <div className="dashboard-insight-section">

                <h4>
                  STRENGTHS
                </h4>

                <div className="dashboard-insight-list">

                  <div className="dashboard-insight-item success">
                    <span>●</span>
                    Leadership Experience
                  </div>

                  <div className="dashboard-insight-item success">
                    <span>●</span>
                    High Score (90+)
                  </div>

                  <div className="dashboard-insight-item success">
                    <span>●</span>
                    Active Organization
                  </div>

                </div>

              </div>

              <div className="dashboard-divider"></div>

              {/* action */}
              <div className="dashboard-insight-section">

                <h4 className="red">
                  ACTION NEEDED
                </h4>

                <div className="dashboard-insight-item warning">
                  <span>!</span>
                  No IELTS Certificate
                </div>

              </div>

              <button className="dashboard-improve-btn">
                Improve My Profile Match
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}