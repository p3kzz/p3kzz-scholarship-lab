import { useNavigate } from "react-router-dom"
import Sidebar from "../../components/layout/Sidebar"
import {
  BookOpen,
  Mail,
  FileText,
  GraduationCap
} from "lucide-react"

import "../../styles/gap-analysis.css"

export default function GapAnalysisPage() {

  const navigate = useNavigate()

  const eligibility = [
    {
      title: "Academic Excellence",
      desc: "Your GPA meets GKS standards",
      type: "success"
    },
    {
      title: "Citizenship Requirement",
      desc: "Eligible as Indonesian applicant",
      type: "success"
    },
    {
      title: "TOPIK / English Test",
      desc: "Language certificate missing",
      type: "warning"
    },
    {
      title: "Leadership Potential",
      desc: "Strong extracurricular background",
      type: "success"
    }
  ]

  const documents = [
    {
      name: "Personal Statement",
      icon: <BookOpen size={24} strokeWidth={2.1} />
    },
    {
      name: "Letter of Recommendation",
      icon: <Mail size={24} strokeWidth={2.1} />
    },
    {
      name: "Academic Transcript",
      icon: <FileText size={24} strokeWidth={2.1} />
    },
    {
      name: "TOPIK / IELTS Certificate",
      icon: <GraduationCap size={24} strokeWidth={2.1} />
    }
  ]

  const timeline = [
    {
      title: "Application Opens",
      date: "September 1, 2026",
      active: false
    },
    {
      title: "Document Screening",
      date: "October 14, 2026",
      active: true
    },
    {
      title: "Final Interview",
      date: "November 28, 2026",
      active: true
    }
  ]

  return (
    <div className="gap-page">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="gap-main">

        {/* top */}
        <button
  className="gap-back"
  onClick={() => navigate("/match")}
>
  ← Back to Matching
</button>

        {/* header */}
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
              GKS Korea Scholarship
            </h1>

            <p className="gap-desc">
              Designed for outstanding international students
              pursuing higher education in South Korea.
              The scholarship covers full tuition,
              monthly living allowance, airfare,
              and Korean language training programs.
            </p>

          </div>

          {/* match circle */}
          <div className="gap-score-circle">

            <h2>92%</h2>

            <p>
              MATCH
            </p>

          </div>

        </div>

        {/* content */}
        <div className="gap-content">

          {/* LEFT */}
          <div>

            {/* eligibility */}
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

                    <div
                      className={
                        item.type === "success"
                          ? "gap-check success"
                          : "gap-check warning"
                      }
                    >
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

            {/* documents */}
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

                    <div className="gap-required">
                      REQUIRED
                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="gap-right-column">

            {/* ai optimization */}
            <div className="gap-ai-card">

              <div className="gap-ai-title">
                AI Optimization
              </div>

              <p className="gap-ai-desc">
                To increase your
                <span> 92% Match </span>
                to
                <span> 98%</span>
              </p>

              <div className="gap-ai-list">

                <div className="gap-ai-item">
                  Upload TOPIK or IELTS certification results.
                </div>

                <div className="gap-ai-item">
                  Add international leadership experiences.
                </div>

                <div className="gap-ai-item">
                  Highlight interest in Korean global innovation programs.
                </div>

              </div>

              <button
  type="button"
  className="gap-update-btn"
  onClick={() => navigate("/profile")}
>
  Update Profile Now
</button>

            </div>

            {/* timeline */}
            <div className="gap-timeline-card">

              <div className="gap-timeline-title">
                Timeline
              </div>

              <div className="gap-timeline-list">

                {timeline.map((item, index) => (
                  <div
                    key={item.title}
                    className="gap-timeline-item"
                  >

                    <div className="gap-timeline-left">

                      <div
                        className={
                          item.active
                            ? "gap-timeline-dot active"
                            : "gap-timeline-dot"
                        }
                      ></div>

                      {index !== timeline.length - 1 && (
                        <div className="gap-timeline-line"></div>
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
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}