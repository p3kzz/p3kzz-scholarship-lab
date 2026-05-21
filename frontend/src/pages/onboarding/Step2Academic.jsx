import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useProfile } from "../../context/ProfileContext"
import "../../styles/step2.css"

const SCHOOL_LEVELS   = ["SMA", "SMK", "MA"]
const MAJORS          = ["IPA (science)", "IPS (Social Studies)", "Bahasa (Languages)", "Agama (Religion)", "Vokasi (Vocational)"]
const GRADES          = ["Grade 10", "Grade 11", "Grade 12"]
const SCHOOL_TIERS    = ["Excellence / Boarding School", "Public School - Accredited A", "Private School - Accredited A", "Accredited B", "Accredited C", "Unaccredited", "Unknown"]
const OLYMPIAD_LEVELS = ["None", "School level", "City / District", "Provincial", "National", "International"]
const CAREER_TRACKS   = ["Academic / Research", "Industry / Tech", "Government service", "NGO / NPO", "Entrepreneurship", "Public service"]

function Dropdown({ label, value, onChange, options }) {
  const [open, setOpen] = useState(false)
  const ref = useRef()
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener("mousedown", h)
    return () => document.removeEventListener("mousedown", h)
  }, [])
  return (
    <div className="s2-field">
      <label className="s2-label-text">{label}</label>
      <div className="s2-dropdown-wrap" ref={ref}>
        <div className={`s2-dropdown-trigger ${open ? "open" : ""}`} onClick={() => setOpen(o => !o)}>
          <span>{value}</span>
          <span className="s2-dropdown-arrow">{open ? "∧" : "∨"}</span>
        </div>
        {open && (
          <div className="s2-dropdown-list">
            {options.map(opt => (
              <div key={opt} className={`s2-dropdown-item ${value === opt ? "selected" : ""}`}
                onClick={() => { onChange(opt); setOpen(false) }}>{opt}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function RangeField({ label, value, onChange }) {
  const getLabel = (v) => {
    if (v >= 90) return `${v} — Excellent`
    if (v >= 80) return `${v} — Very good`
    if (v >= 70) return `${v} — Good`
    return `${v}`
  }
  return (
    <div className="s2-field">
      <label className="s2-label-text">{label}</label>
      <div className="s2-range-row">
        <div className="s2-range-val">{value}</div>
        <div className="s2-range-unit">/100</div>
      </div>
      <div className="s2-range-track">
        <input type="range" min={0} max={100} value={value} onChange={e => onChange(Number(e.target.value))} />
        <div className="s2-range-labels"><span>0</span><span>{getLabel(value)}</span><span>100</span></div>
      </div>
    </div>
  )
}

export default function Step2Academic() {
  const navigate = useNavigate()
  const { profile, updateProfile } = useProfile()
  const ac = profile.academic || {}

  const [schoolLevel,    setSchoolLevel]    = useState(ac.schoolLevel    || "SMA")
  const [major,          setMajor]          = useState(ac.major          || "IPA (science)")
  const [grade,          setGrade]          = useState(ac.grade          || "Grade 12")
  const [schoolName,     setSchoolName]     = useState(ac.schoolName     || "")
  const [schoolTier,     setSchoolTier]     = useState(ac.schoolTier     || "Public School - Accredited A")
  const [gradYear,       setGradYear]       = useState(ac.expectedGraduationYear || "2026")
  const [gpa,            setGpa]            = useState(ac.overallGrade   || 90)
  const [math,           setMath]           = useState(ac.mathScore      || 80)
  const [english,        setEnglish]        = useState(ac.englishScore   || 90)
  const [majorAvg,       setMajorAvg]       = useState(ac.majorSubjectAverage || 80)
  const [extra,          setExtra]          = useState(ac.extracurricular || "")
  const [olympiad,       setOlympiad]       = useState(ac.olympiadLevel  || "City / District")
  const [career,         setCareer]         = useState(ac.intendedCareerTrack || "Industry / Tech")
  const [returnHome,     setReturnHome]     = useState(ac.willingToReturnHome ?? true)
  const [fullFunding,    setFullFunding]    = useState(ac.needsFullFunding ?? true)

  const handleContinue = () => {
    updateProfile("academic", {
      schoolLevel, major, grade, schoolName, schoolTier,
      expectedGraduationYear: gradYear,
      overallGrade: gpa, mathScore: math, englishScore: english, majorSubjectAverage: majorAvg,
      extracurricular: extra, olympiadLevel: olympiad,
      intendedCareerTrack: career, willingToReturnHome: returnHome, needsFullFunding: fullFunding
    })
    navigate("/onboarding/step3")
  }

  return (
    <div className="s2-wrap">
      <div className="s2-badge">Step 2 of 3</div>

      <div className="s2-progress">
        <div className="s2-bar done" />
        <div className="s2-bar active" />
        <div className="s2-bar idle" />
      </div>
      <div className="s2-labels">
        <div className="s2-label">Personal information</div>
        <div className="s2-label active center">Academic</div>
        <div className="s2-label right">Skills</div>
      </div>

      {/* row 1 */}
      <div className="s2-grid">
        <Dropdown label="School level" value={schoolLevel} onChange={setSchoolLevel} options={SCHOOL_LEVELS} />
        <Dropdown label="Major / Program" value={major} onChange={setMajor} options={MAJORS} />
        <Dropdown label="Grade / Class" value={grade} onChange={setGrade} options={GRADES} />
        <div className="s2-field">
          <label className="s2-label-text">School name</label>
          <input className="s2-input" type="text" placeholder="e.g. SMAN 10 Kota Bandung" value={schoolName} onChange={e => setSchoolName(e.target.value)} />
        </div>
        <Dropdown label="School tier / Accreditation" value={schoolTier} onChange={setSchoolTier} options={SCHOOL_TIERS} />
        <div className="s2-field">
          <label className="s2-label-text">Expected graduation year</label>
          <input className="s2-input" type="number" min="2024" max="2030" value={gradYear} onChange={e => setGradYear(e.target.value)} />
        </div>
      </div>

      <div className="s2-divider" />
      <div className="s2-section-label">Academic performance</div>

      {/* scores */}
      <div className="s2-grid">
        <RangeField label="Average grade (scale 100)" value={gpa} onChange={setGpa} />
        <RangeField label="Math score" value={math} onChange={setMath} />
        <RangeField label="English score" value={english} onChange={setEnglish} />
        <RangeField label="Major subject average" value={majorAvg} onChange={setMajorAvg} />
      </div>

      <div className="s2-divider" />
      <div className="s2-section-label">Extracurricular &amp; achievements</div>

      <div style={{ marginBottom: "20px" }}>
        <textarea className="s2-textarea" rows={4}
          placeholder="Ketua OSIS, Juara 1 OSN, anggota Paskibra..."
          value={extra} onChange={e => setExtra(e.target.value)} />
        <div className="s2-textarea-hint">List any relevant organizations, competitions, achievements, or experiences.</div>
      </div>

      {/* olympiad + career */}
      <div className="s2-grid">
        <Dropdown label="Olympiad level" value={olympiad} onChange={setOlympiad} options={OLYMPIAD_LEVELS} />
        <Dropdown label="Intended career back" value={career} onChange={setCareer} options={CAREER_TRACKS} />
      </div>

      {/* toggles */}
      <div className="s2-grid">
        <div className="s2-field">
          <label className="s2-label-text">Willing to return home after study?</label>
          <div className="s2-toggle-group">
            {[true, false].map(opt => (
              <button key={String(opt)} type="button"
                className={`s2-toggle-opt ${returnHome === opt ? "active" : ""}`}
                onClick={() => setReturnHome(opt)}>
                {opt ? "Yes" : "No"}
              </button>
            ))}
          </div>
        </div>
        <div className="s2-field">
          <label className="s2-label-text">Needs full funding?</label>
          <div className="s2-toggle-group">
            {[true, false].map(opt => (
              <button key={String(opt)} type="button"
                className={`s2-toggle-opt ${fullFunding === opt ? "active" : ""}`}
                onClick={() => setFullFunding(opt)}>
                {opt ? "Yes" : "No"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="s2-footer">
        <button className="s2-btn-back" onClick={() => navigate("/onboarding/step1")}>Back</button>
        <button className="s2-btn-continue" onClick={handleContinue}>Continue</button>
      </div>
    </div>
  )
}