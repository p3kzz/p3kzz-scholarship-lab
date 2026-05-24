import { useNavigate } from "react-router-dom"
import Sidebar from "../../components/layout/Sidebar"
import "../../styles/match-result.css"

export default function MatchResultPage() {

  const navigate = useNavigate()

  const scholarships = [
    {
      name: "CIMB ASEAN Scholarship",
      country: "ASEAN • FULL FUNDING",
      percent: "88%",
      tag1: "LEADERSHIP",
      tag2: "BANKING",
      days: "32 Days Left"
    },
    {
      name: "ASEAN Scholarship Singapore",
      country: "SINGAPORE • HIGH SCHOOL",
      percent: "84%",
      tag1: "ACADEMIC",
      tag2: "ASEAN",
      days: "40 Days Left"
    },
    {
      name: "Lund University Sweden",
      country: "SWEDEN • INTERNATIONAL",
      percent: "80%",
      tag1: "RESEARCH",
      tag2: "EUROPE",
      days: "51 Days Left"
    },

    {
      name: "BJUT China Scholarship",
      country: "CHINA • ENGINEERING",
      percent: "76%",
      tag1: "ENGINEERING",
      tag2: "CHINA",
      days: "45 Days Left"
    }
  ]

  return (
    <div className="match-page">

      {/* SIDEBAR */}
      <Sidebar />

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
              GKS Korea Scholarship
            </h2>

            <p className="match-scholarship-desc">
              Study in Korea • Full Funding
            </p>

            <div className="match-breakdown-title">
              COMPATIBILITY BREAKDOWN
            </div>

            {/* progress */}
            <div className="match-progress-group">

              <div className="match-progress-top">
                <span>Academic Fit</span>
                <span className="green">95%</span>
              </div>

              <div className="match-progress-bar">
                <div
                  className="match-progress-fill green-fill"
                  style={{ width: "95%" }}
                ></div>
              </div>

            </div>

            <div className="match-progress-group">

              <div className="match-progress-top">
                <span>Leadership</span>
                <span className="green">88%</span>
              </div>

              <div className="match-progress-bar">
                <div
                  className="match-progress-fill dark-fill"
                  style={{ width: "88%" }}
                ></div>
              </div>

            </div>

            <div className="match-progress-group">

              <div className="match-progress-top">
                <span>Language</span>
                <span className="green">76%</span>
              </div>

              <div className="match-progress-bar">
                <div
                  className="match-progress-fill red-fill"
                  style={{ width: "76%" }}
                ></div>
              </div>

            </div>

            {/* buttons */}
            <div className="match-buttons">

              <button
  className="match-detail-btn"
  onClick={() => navigate("/gap-analysis")}
>
  View Analysis Details
</button>

              <button className="match-save-btn">
                Save
              </button>

            </div>

          </div>

          {/* right */}
          <div className="match-card-right">

            <div className="match-circle-wrapper">

              <div className="match-circle-dot"></div>

              <div className="match-circle">

                <div className="match-circle-inner">

                  <h2>92%</h2>

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
              key={item.name}
              className="match-small-card"
            >

              <div className="match-small-top">

                <div>

                  <h3 className="match-small-title">
                    {item.name}
                  </h3>

                  <p className="match-small-country">
                    {item.country}
                  </p>

                </div>

                <div className="match-small-percent">
                  {item.percent}
                </div>

              </div>

              <div className="match-small-tags">

                <div className="match-small-tag">
                  {item.tag1}
                </div>

                <div className="match-small-tag">
                  {item.tag2}
                </div>

              </div>

              <div className="match-small-line"></div>

              <div className="match-small-bottom">

                <p className="match-days">
                  {item.days}
                </p>

                <button className="match-compare-btn">
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