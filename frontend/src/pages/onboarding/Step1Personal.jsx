import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useProfile } from "../../context/ProfileContext"
import "../../styles/step1.css"

const PROVINCES = [
  "Aceh","Bali","DKI Jakarta","Jawa Barat","Jawa Timur","Jawa Tengah",
  "Kalimantan Timur","Maluku","Nusa Tenggara Timur","Papua","Papua Barat",
  "Sulawesi Utara","Sulawesi Selatan","Sumatera Utara","Sumatera Barat",
  "Sumatera Selatan","Riau","Kepulauan Riau","Lampung","Bengkulu",
  "Jambi","Bangka Belitung","Kalimantan Barat","Kalimantan Selatan",
  "Kalimantan Tengah","Kalimantan Utara","Sulawesi Tengah","Sulawesi Tenggara",
  "Sulawesi Barat","Gorontalo","Maluku Utara","Nusa Tenggara Barat",
  "Papua Selatan","Lainnya"
]

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const DAYS_OF_WEEK = ["Su","Mo","Tu","We","Th","Fr","Sa"]
const ECO_OPTIONS = ["Very Low Income","Low Income","Middle Income","Upper Middle Income","High Income"]

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDayOfMonth(month, year) {
  return new Date(year, month, 1).getDay()
}

export default function Step1Personal() {
  const navigate = useNavigate()
  const { profile, updateProfile } = useProfile()

  const [fullName, setFullName] = useState(profile.personal?.fullName || "")
  const [province, setProvince] = useState(profile.personal?.province || "Jawa Barat")
  const [gender, setGender] = useState(profile.personal?.gender || "Female")
  const [eco, setEco] = useState(profile.personal?.economicBackground || "Very Low Income")
  const [dob, setDob] = useState(profile.personal?.dateOfBirth || "")
  const [region3T, setRegion3T] = useState(profile.personal?.fromUnderrepresentedRegion ?? true)

  // dropdown province
  const [provOpen, setProvOpen] = useState(false)
  const provRef = useRef()

  // date picker
  const [calOpen, setCalOpen] = useState(false)
  const calRef = useRef()
  const today = new Date()
  const [calMonth, setCalMonth] = useState(dob ? new Date(dob).getMonth() : 8)
  const [calYear, setCalYear] = useState(dob ? new Date(dob).getFullYear() : 2004)
  const [selDay, setSelDay] = useState(dob ? new Date(dob).getDate() : 4)

  // close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (provRef.current && !provRef.current.contains(e.target)) setProvOpen(false)
      if (calRef.current && !calRef.current.contains(e.target)) setCalOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const formatDob = () => {
    if (!selDay) return ""
    const d = String(selDay).padStart(2,"0")
    const m = String(calMonth + 1).padStart(2,"0")
    return `${d} / ${m} / ${calYear}`
  }

  const handleSelectDay = (day) => {
    setSelDay(day)
    const dateStr = `${calYear}-${String(calMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`
    setDob(dateStr)
    setCalOpen(false)
  }

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1) }
    else setCalMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1) }
    else setCalMonth(m => m + 1)
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(calMonth, calYear)
    const firstDay = getFirstDayOfMonth(calMonth, calYear)
    const prevDays = getDaysInMonth(calMonth === 0 ? 11 : calMonth - 1, calMonth === 0 ? calYear - 1 : calYear)
    const cells = []

    for (let i = firstDay - 1; i >= 0; i--) {
      cells.push(<div key={`p${i}`} className="step-cal-day other-month">{prevDays - i}</div>)
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const isSelected = d === selDay && calMonth === (dob ? new Date(dob).getMonth() : calMonth) && calYear === (dob ? new Date(dob).getFullYear() : calYear)
      cells.push(
        <div key={d} className={`step-cal-day${selDay === d ? " selected" : ""}`} onClick={() => handleSelectDay(d)}>{d}</div>
      )
    }
    let next = 1
    while (cells.length % 7 !== 0) {
      cells.push(<div key={`n${next}`} className="step-cal-day other-month">{next++}</div>)
    }
    return cells
  }

  const handleContinue = () => {
    updateProfile("personal", { fullName, province, gender, economicBackground: eco, dateOfBirth: dob, fromUnderrepresentedRegion: region3T })
    navigate("/onboarding/step2")
  }

  const years = Array.from({ length: 30 }, (_, i) => 2010 - i)

  return (
    <div className="step-wrap">
      <div className="step-badge">Step 1 of 3</div>

      {/* progress */}
      <div className="step-progress">
        <div className="step-bar active" />
        <div className="step-bar idle" />
        <div className="step-bar idle" />
      </div>
      <div className="step-labels">
        <div className="step-label active">Personal information</div>
        <div className="step-label center">Academic</div>
        <div className="step-label right">Skills</div>
      </div>

      {/* form */}
      <div className="step-form-grid">

        {/* Full name */}
        <div className="step-field">
          <label className="step-label-text">Full name</label>
          <input className="step-input" type="text" placeholder="Your full name" value={fullName} onChange={e => setFullName(e.target.value)} />
        </div>

        {/* Province */}
        <div className="step-field">
          <label className="step-label-text">Province</label>
          <div className="step-dropdown-wrap" ref={provRef}>
            <div className={`step-dropdown-trigger ${provOpen ? "open" : ""}`} onClick={() => setProvOpen(o => !o)}>
              <span>{province}</span>
              <span className="step-dropdown-arrow">{provOpen ? "∧" : "∨"}</span>
            </div>
            {provOpen && (
              <div className="step-dropdown-list">
                {PROVINCES.map(p => (
                  <div key={p} className={`step-dropdown-item ${province === p ? "selected" : ""}`}
                    onClick={() => { setProvince(p); setProvOpen(false) }}>
                    {p}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Gender */}
        <div className="step-field">
          <label className="step-label-text">Gender</label>
          <div className="step-toggle-group">
            {["Male","Female","Prefer not to say"].map(opt => (
              <button key={opt} className={`step-toggle-opt ${gender === opt ? "active" : ""}`}
                onClick={() => setGender(opt)} type="button">
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Economic background */}
        <div className="step-field">
          <label className="step-label-text">Economic background</label>
          <div className="step-eco-list">
            {ECO_OPTIONS.map(opt => (
              <div key={opt} className={`step-eco-opt ${eco === opt ? "selected" : ""}`}
                onClick={() => setEco(opt)}>
                <span className="step-eco-dot" />
                {opt}
              </div>
            ))}
          </div>
        </div>

        {/* Date of birth */}
        <div className="step-field">
          <label className="step-label-text">Date of birth</label>
          <div className="step-date-wrap" ref={calRef}>
            <div className={`step-date-trigger ${calOpen ? "open" : ""}`} onClick={() => setCalOpen(o => !o)}>
              <span>{selDay ? formatDob() : "DD / MM / YYYY"}</span>
              <span className="step-date-icon">📅</span>
            </div>
            {calOpen && (
              <div className="step-calendar">
                <div className="step-cal-header">
                  <button className="step-cal-nav" onClick={prevMonth} type="button">‹</button>
                  <select className="step-cal-select" value={calMonth}
                    onChange={e => setCalMonth(Number(e.target.value))}>
                    {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
                  </select>
                  <select className="step-cal-select" value={calYear}
                    onChange={e => setCalYear(Number(e.target.value))}>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                  <button className="step-cal-nav" onClick={nextMonth} type="button">›</button>
                </div>
                <div className="step-cal-grid">
                  {DAYS_OF_WEEK.map(d => <div key={d} className="step-cal-dow">{d}</div>)}
                  {renderCalendar()}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Region 3T */}
        <div className="step-field">
          <label className="step-label-text">From underrepresented region (3T)?</label>
          <div className="step-toggle-group" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {[true, false].map(opt => (
              <button key={String(opt)} type="button"
                className={`step-toggle-opt ${region3T === opt ? "active" : ""}`}
                onClick={() => setRegion3T(opt)}>
                {opt ? "Yes" : "No"}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* footer */}
      <div className="step-footer">
        <button className="step-btn-back" onClick={() => navigate("/onboarding")}>Back</button>
        <button className="step-btn-continue" onClick={handleContinue}>Continue</button>
      </div>
    </div>
  )
}