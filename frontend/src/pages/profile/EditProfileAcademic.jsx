import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useProfile } from "../../context/ProfileContext"
import "../../styles/editProfile.css"

const SCHOOL_LEVELS = ["SMA", "SMK", "MA"]

const MAJORS = [
  "IPA (science)",
  "IPS (social studies)",
  "Bahasa (languages)",
  "Agama (religion)",
  "Vokasi (vocational)",
]

const GRADES = ["Grade 10", "Grade 11", "Grade 12"]

const SCHOOL_TIERS = [
  "Excellence / Boarding school",
  "Public School - Accredited A",
  "Private School - Accredited A",
  "Accredited B",
  "Accredited C",
  "Not yet accredited",
  "Unknown",
]

const OLYMPIAD_LEVELS = [
  "Never competed",
  "School level",
  "City / District",
  "Provincial",
  "National",
  "International",
]

const CAREER_TRACKS = [
  "Academic / Research",
  "Industry / Tech",
  "Government service",
  "NGO / NPO",
  "Entrepreneurship",
  "Public service",
]

// ── reusable dropdown ──────────────────────────────────────────────────────
function EPDropdown({ label, value, onChange, options, placeholder = "Select..." }) {
  const [open, setOpen] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div className="ep-field">
      {label && <label className="ep-label">{label}</label>}
      <div className="ep-dropdown-wrap" ref={ref}>
        <div
          className={`ep-dropdown-trigger ${open ? "open" : ""}`}
          onClick={() => setOpen(o => !o)}
        >
          <span style={{ color: value ? "#2d5016" : "#7aa16f" }}>
            {value || placeholder}
          </span>
          <span>⌄</span>
        </div>
        {open && (
          <div className="ep-dropdown-list">
            {options.map(opt => (
              <div
                key={opt}
                className={`ep-dropdown-item ${value === opt ? "selected" : ""}`}
                onClick={() => { onChange(opt); setOpen(false) }}
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── range slider with score display ───────────────────────────────────────
function ScoreSlider({ label, value, onChange }) {
  const pct = value || 0
  const getLabel = (v) => {
    if (v >= 90) return `${v} — Excellent`
    if (v >= 75) return `${v} — Good`
    if (v >= 60) return `${v} — Average`
    return `${v} — Below average`
  }

  return (
    <div className="ep-field">
      <label className="ep-label">{label}</label>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 0,
          background: "#c8ddc4", borderRadius: 8, overflow: "hidden",
          border: "1.5px solid #7aa16f",
        }}>
          <input
            type="number"
            min={0} max={100}
            value={value || ""}
            onChange={e => onChange(Math.min(100, Math.max(0, Number(e.target.value))))}
            style={{
              width: 72, height: 46, border: "none", background: "transparent",
              fontSize: 18, color: "#2d5016", fontWeight: 600, textAlign: "right",
              padding: "0 4px 0 10px", outline: "none", fontFamily: "DM Sans, sans-serif"
            }}
          />
          <span style={{ fontSize: 15, color: "#4a6a42", paddingRight: 10 }}>/100</span>
        </div>
      </div>
      <input
        type="range"
        min={0} max={100}
        value={pct}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#2d5b0f", marginBottom: 4 }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#4a6a42" }}>
        <span>0</span>
        <span style={{ color: "#2d5016", fontWeight: 600 }}>{getLabel(pct)}</span>
        <span>100</span>
      </div>
    </div>
  )
}

export default function EditProfileAcademic() {
  const navigate = useNavigate()
  const { profile, updateProfile } = useProfile()
  const academic = profile.academic || {}

  const [schoolLevel,    setSchoolLevel]    = useState(academic.schoolLevel    || "SMA")
  const [major,          setMajor]          = useState(academic.major          || "IPA (science)")
  const [grade,          setGrade]          = useState(academic.grade          || "Grade 12")
  const [schoolName,     setSchoolName]     = useState(academic.schoolName     || "")
  const [schoolTier,     setSchoolTier]     = useState(academic.schoolTier     || "")
  const [gradYear,       setGradYear]       = useState(academic.graduationYear || "")
  const [avgGrade,       setAvgGrade]       = useState(academic.avgGrade       ?? 0)
  const [mathScore,      setMathScore]      = useState(academic.mathScore      ?? 0)
  const [englishScore,   setEnglishScore]   = useState(academic.englishScore   ?? 0)
  const [majorSubjAvg,   setMajorSubjAvg]   = useState(academic.majorSubjectAvg?? 0)
  const [extracurricular,setExtracurricular]= useState(academic.extracurricular|| "")
  const [olympiadLevel,  setOlympiadLevel]  = useState(academic.olympiadLevel  || "")
  const [careerTrack,    setCareerTrack]    = useState(academic.careerTrack    || "")
  const [willingReturn,  setWillingReturn]  = useState(academic.willingReturn  ?? null)
  const [needsFunding,   setNeedsFunding]   = useState(academic.needsFullFunding ?? null)

  const handleTabChange = (tab) => {
    if (tab === "personal") navigate("/profile/edit")
    if (tab === "skills")   navigate("/profile/edit/skills")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSave = () => {
    updateProfile("academic", {
      schoolLevel, major, grade, schoolName, schoolTier,
      graduationYear: gradYear,
      avgGrade, mathScore, englishScore, majorSubjectAvg: majorSubjAvg,
      extracurricular, olympiadLevel, careerTrack,
      willingReturn, needsFullFunding: needsFunding,
    })
    navigate("/profile")
  }

  return (
    <div className="ep-wrap">

      {/* back */}
      <button className="ep-back-btn" onClick={() => navigate("/profile")}>
        Back to profile
      </button>

      {/* tabs */}
      <div className="ep-tabs">
        <button className="ep-tab" onClick={() => handleTabChange("personal")} type="button">
          Personal information
        </button>
        <button className="ep-tab active" type="button">
          Academic
        </button>
        <button className="ep-tab" onClick={() => handleTabChange("skills")} type="button">
          Skills
        </button>
      </div>

      {/* ── school info ── */}
      <div className="ep-grid">
        <EPDropdown label="School level"         value={schoolLevel}  onChange={setSchoolLevel}  options={SCHOOL_LEVELS} />
        <EPDropdown label="Major / Program"       value={major}        onChange={setMajor}        options={MAJORS} />
        <EPDropdown label="Grade / Class"         value={grade}        onChange={setGrade}        options={GRADES} />

        {/* school name — text input */}
        <div className="ep-field">
          <label className="ep-label">School name</label>
          <input
            className="ep-input"
            type="text"
            placeholder="Enter your school name"
            value={schoolName}
            onChange={e => setSchoolName(e.target.value)}
          />
        </div>

        {/* full-width tier */}
        <div className="ep-field" style={{ gridColumn: "1 / -1" }}>
          <EPDropdown
            label="School tier / Accreditation"
            value={schoolTier}
            onChange={setSchoolTier}
            options={SCHOOL_TIERS}
            placeholder="Select accreditation"
          />
        </div>

        {/* graduation year — text input */}
        <div className="ep-field">
          <label className="ep-label">Expected graduation year</label>
          <input
            className="ep-input"
            type="number"
            placeholder="e.g. 2026"
            min={2024} max={2030}
            value={gradYear}
            onChange={e => setGradYear(e.target.value)}
          />
        </div>
      </div>

      {/* ── academic performance ── */}
      <div style={{ margin: "32px 0 10px", borderTop: "1px solid #b5c8ae", paddingTop: 28 }}>
        <p className="ep-label" style={{ marginBottom: 20 }}>Academic performance</p>
        <div className="ep-grid">
          <ScoreSlider label="Average grade (scale 100)" value={avgGrade}     onChange={setAvgGrade} />
          <ScoreSlider label="Math score"                value={mathScore}    onChange={setMathScore} />
          <ScoreSlider label="English score"             value={englishScore} onChange={setEnglishScore} />
          <ScoreSlider label="Major subject average"     value={majorSubjAvg} onChange={setMajorSubjAvg} />
        </div>
      </div>

      {/* ── extracurricular ── */}
      <div style={{ margin: "28px 0 10px", borderTop: "1px solid #b5c8ae", paddingTop: 28 }}>
        <label className="ep-label">Extracurricular & achievements</label>
        <textarea
          style={{
            width: "100%", minHeight: 100, borderRadius: 10,
            border: "1.5px solid #7aa16f", background: "#d9ecd5",
            padding: "14px 16px", fontSize: 16, color: "#2d5016",
            fontFamily: "DM Sans, sans-serif", resize: "vertical",
            marginTop: 10, outline: "none",
          }}
          placeholder="e.g. Ketua OSIS, Juara OSN Matematika, anggota Paskibra..."
          value={extracurricular}
          onChange={e => setExtracurricular(e.target.value)}
        />
        <p style={{ fontSize: 14, color: "#4a6a42", marginTop: 6 }}>
          List any relevant organisations, competitions, achievements, or experiences.
        </p>
      </div>

      {/* ── olympiad + career ── */}
      <div style={{ borderTop: "1px solid #b5c8ae", paddingTop: 28, marginTop: 8 }}>
        <div className="ep-grid">
          <EPDropdown label="Olympiad level"        value={olympiadLevel} onChange={setOlympiadLevel} options={OLYMPIAD_LEVELS} placeholder="Select level" />
          <EPDropdown label="Intended career track" value={careerTrack}   onChange={setCareerTrack}   options={CAREER_TRACKS}   placeholder="Select track" />

          {/* willing to return */}
          <div className="ep-field">
            <label className="ep-label">Willing to return home after study?</label>
            <div className="ep-toggle-group" style={{ gridTemplateColumns: "1fr 1fr" }}>
              {[true, false].map(v => (
                <button
                  key={String(v)}
                  type="button"
                  className={`ep-toggle-btn ${willingReturn === v ? "active" : ""}`}
                  onClick={() => setWillingReturn(v)}
                >
                  {v ? "Yes" : "No"}
                </button>
              ))}
            </div>
          </div>

          {/* needs full funding */}
          <div className="ep-field">
            <label className="ep-label">Needs full funding?</label>
            <div className="ep-toggle-group" style={{ gridTemplateColumns: "1fr 1fr" }}>
              {[true, false].map(v => (
                <button
                  key={String(v)}
                  type="button"
                  className={`ep-toggle-btn ${needsFunding === v ? "active" : ""}`}
                  onClick={() => setNeedsFunding(v)}
                >
                  {v ? "Yes" : "No"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* summary cards */}
      <div className="ep-summary-card clickable" onClick={() => handleTabChange("personal")}>
        <span>Personal info — {profile.personal?.fullName || "—"}, {profile.personal?.gender || "—"}, {profile.personal?.province || "—"}</span>
        <button type="button">Edit →</button>
      </div>
      <div className="ep-summary-card clickable" onClick={() => handleTabChange("skills")}>
        <span>Skills — {
          ((profile.skills?.hardSkills?.length || 0) +
           (profile.skills?.softSkills?.length || 0) +
           (profile.skills?.languageSkills?.length || 0))
        } selected</span>
        <button type="button">Edit →</button>
      </div>

      {/* footer */}
      <div className="ep-footer">
        <button className="ep-cancel-btn" onClick={() => navigate("/profile")}>Cancel</button>
        <button className="ep-save-btn"   onClick={handleSave}>Save Changes</button>
      </div>

    </div>
  )
}

