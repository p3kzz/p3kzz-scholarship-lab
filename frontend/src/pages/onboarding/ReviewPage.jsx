import { useNavigate } from "react-router-dom"
import { useProfile } from "../../context/ProfileContext"
import "../../styles/review.css"

export default function ReviewPage() {
  const navigate = useNavigate()
  const { profile } = useProfile()
  const p = profile.personal  || {}
  const a = profile.academic  || {}
  const s = profile.skills    || {}

  const formatDob = (str) => {
    if (!str) return "—"
    const d = new Date(str)
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
  }

  return (
    <div className="rv-wrap">
      <div className="rv-badge">Review</div>

      <h1 className="rv-title">Review your profile</h1>
      <p className="rv-sub">Check your details before we run the analysis. You can edit anytime later.</p>

      <div className="rv-notice">
        More complete profile = more accurate system results.
      </div>

      <div className="rv-grid">
        {/* LEFT col */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Personal */}
          <div className="rv-card">
            <div className="rv-card-head">
              <span className="rv-card-title">Personal information</span>
              <button className="rv-edit" onClick={() => navigate("/onboarding/step1")}>Edit →</button>
            </div>
            <div className="rv-row"><span className="rv-row-key">Gender</span><span className="rv-row-val">{p.gender || "—"}</span></div>
            <div className="rv-row"><span className="rv-row-key">Date of birth</span><span className="rv-row-val">{formatDob(p.dateOfBirth)}</span></div>
            <div className="rv-row"><span className="rv-row-key">Province</span><span className="rv-row-val">{p.province || "—"}</span></div>
            <div className="rv-row"><span className="rv-row-key">Economic</span><span className="rv-row-val">{p.economicBackground || "—"}</span></div>
            <div className="rv-row"><span className="rv-row-key">Region 3T</span><span className="rv-row-val">{p.fromUnderrepresentedRegion ? "Yes" : "No"}</span></div>
          </div>

          {/* Academic */}
          <div className="rv-card">
            <div className="rv-card-head">
              <span className="rv-card-title">Academic</span>
              <button className="rv-edit" onClick={() => navigate("/onboarding/step2")}>Edit →</button>
            </div>
            <div className="rv-row"><span className="rv-row-key">School level</span><span className="rv-row-val">{a.schoolLevel || "—"} / {a.grade || "—"}</span></div>
            <div className="rv-row"><span className="rv-row-key">Major</span><span className="rv-row-val">{a.major || "—"}</span></div>
            <div className="rv-row"><span className="rv-row-key">Avg. grade</span><span className="rv-row-val">{a.overallGrade || "—"}/100</span></div>
            <div className="rv-row"><span className="rv-row-key">School</span><span className="rv-row-val">{a.schoolName || "—"}</span></div>
            <div className="rv-row"><span className="rv-row-key">Career Track</span><span className="rv-row-val">{a.intendedCareerTrack || "—"}</span></div>
            {a.extracurricular && (
              <>
                <div className="rv-divider" />
                <div className="rv-section-label">Extracurricular &amp; Achievements</div>
                <div className="rv-extra-text">{a.extracurricular}</div>
              </>
            )}
          </div>
        </div>

        {/* RIGHT col — skills */}
        <div className="rv-card">
          <div className="rv-card-head">
            <span className="rv-card-title">Skills</span>
            <button className="rv-edit" onClick={() => navigate("/onboarding/step3")}>Edit →</button>
          </div>

          <div className="rv-section-label">Hard Skills</div>
          {s.hardSkills?.length ? (
            <div className="rv-tags">{s.hardSkills.map(t => <span key={t} className="rv-tag">{t}</span>)}</div>
          ) : <div className="rv-none">None added</div>}

          <div className="rv-section-label">Soft Skills</div>
          {s.softSkills?.length ? (
            <div className="rv-tags">{s.softSkills.map(t => <span key={t} className="rv-tag">{t}</span>)}</div>
          ) : <div className="rv-none">None added</div>}

          <div className="rv-section-label">Language Skills</div>
          {s.langSkills?.length ? (
            <div className="rv-tags">{s.langSkills.map(t => <span key={t} className="rv-tag">{t}</span>)}</div>
          ) : <div className="rv-none">None added</div>}

          <div className="rv-section-label">Language Certificates</div>
          {s.langCerts?.length ? (
            <div className="rv-tags">
              {s.langCerts.map((c, i) => (
                <span key={i} className="rv-tag">{c.testType} {c.score}</span>
              ))}
            </div>
          ) : <div className="rv-none">None added</div>}

          <div className="rv-section-label">Target Countries</div>
          {s.targetCountries?.length ? (
            <div className="rv-tags">
              {s.targetCountries.map(c => <span key={c} className="rv-tag">{c.toUpperCase()}</span>)}
            </div>
          ) : <div className="rv-none">None added</div>}
        </div>
      </div>

      <div className="rv-footer">
        <button className="rv-btn-back" onClick={() => navigate("/onboarding/step3")}>Back</button>
        <button className="rv-btn-continue" onClick={() => navigate("/onboarding/processing")}>Find My Scholarships</button>
      </div>
    </div>
  )
}