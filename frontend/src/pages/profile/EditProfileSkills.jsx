import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useProfile } from "../../context/ProfileContext"
import "../../styles/editProfile.css"

const LANGUAGE_TESTS = ["IELTS", "TOEFL", "TOPIK", "JLPT", "DELF", "HSK"]

// ── tag input section ──────────────────────────────────────────────────────
function TagSection({ title, description, tags, onAdd, onRemove, placeholder }) {
  const [inputVal, setInputVal] = useState("")

  const handleAdd = () => {
    const val = inputVal.replace(/,/g, "").trim()
    if (!val) return
    if (tags.map(t => t.toLowerCase()).includes(val.toLowerCase())) {
      setInputVal("")
      return
    }
    onAdd(val)
    setInputVal("")
  }

  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <div style={{
      background: "#edf3ea",
      border: "1px solid #b5c8ae",
      borderRadius: 16,
      padding: "22px 24px",
      marginBottom: 16,
    }}>
      <p style={{ fontSize: 14, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "#355021", marginBottom: 4 }}>
        {title}
      </p>
      <p style={{ fontSize: 15, color: "#4a6a42", marginBottom: 14 }}>{description}</p>

      {/* tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12, minHeight: 20 }}>
        {tags.length === 0 && (
          <span style={{ fontSize: 15, color: "#8aaa84", fontStyle: "italic" }}>
            No {title.toLowerCase()} added yet
          </span>
        )}
        {tags.map(tag => (
          <span key={tag} style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "5px 12px", borderRadius: 99, fontSize: 14,
            border: "1px solid #b5c8ae", background: "#fff", color: "#2d5016",
          }}>
            {tag}
            <span
              onClick={() => onRemove(tag)}
              style={{
                width: 18, height: 18, borderRadius: "50%",
                background: "#3bd234", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, cursor: "pointer", fontWeight: 700, flexShrink: 0,
              }}
            >
              ×
            </span>
          </span>
        ))}
      </div>

      {/* input */}
      <div style={{ display: "flex", borderRadius: 10, overflow: "hidden", border: "1.5px solid #7aa16f" }}>
        <input
          type="text"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder || "Type a skill and press Enter"}
          style={{
            flex: 1, height: 48, border: "none", background: "#d9ecd5",
            fontSize: 15, color: "#2d5016", padding: "0 14px", outline: "none",
            fontFamily: "DM Sans, sans-serif",
          }}
        />
        <button
          type="button"
          onClick={handleAdd}
          style={{
            height: 48, padding: "0 20px", border: "none",
            background: "#2d5b0f", color: "#fff", fontSize: 15,
            fontWeight: 700, cursor: "pointer", fontFamily: "DM Sans, sans-serif",
          }}
        >
          add
        </button>
      </div>
      <p style={{ fontSize: 13, color: "#4a6a42", marginTop: 6 }}>Press Enter or comma to add</p>
    </div>
  )
}

// ── language certificate entry ─────────────────────────────────────────────
function LangCertSection({ certs, onAdd, onRemove }) {
  const [testType,   setTestType]   = useState("")
  const [score,      setScore]      = useState("")
  const [validUntil, setValidUntil] = useState("")
  const [ddOpen,     setDdOpen]     = useState(false)
  const ref = useRef()

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setDdOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const PLACEHOLDERS = {
    IELTS: "Score (e.g. 6.5)",
    TOEFL: "Score (e.g. 550)",
    TOPIK: "Level (e.g. 3)",
    JLPT:  "Level (e.g. N3)",
    DELF:  "Level (e.g. B2)",
    HSK:   "Level (e.g. 4)",
  }

  const handleAdd = () => {
    if (!testType || !score.trim()) return
    onAdd({ test: testType, score: score.trim(), validUntil })
    setTestType("")
    setScore("")
    setValidUntil("")
  }

  return (
    <div style={{
      background: "#edf3ea",
      border: "1px solid #b5c8ae",
      borderRadius: 16,
      padding: "22px 24px",
      marginBottom: 16,
    }}>
      <p style={{ fontSize: 14, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "#355021", marginBottom: 4 }}>
        Language certificates
      </p>
      <p style={{ fontSize: 15, color: "#4a6a42", marginBottom: 14 }}>
        Formal test scores. Supported: IELTS · TOEFL · TOPIK · JLPT · DELF · HSK
      </p>

      {/* existing certs */}
      {certs.length === 0 && (
        <p style={{ fontSize: 15, color: "#8aaa84", fontStyle: "italic", marginBottom: 12 }}>
          No certificate added yet
        </p>
      )}
      {certs.map((c, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 12,
          background: "#d9ecd5", border: "1px solid #7aa16f",
          borderRadius: 10, padding: "10px 14px", marginBottom: 8,
        }}>
          <span style={{ fontWeight: 700, color: "#2d5016", minWidth: 52, fontSize: 14 }}>{c.test}</span>
          <span style={{ flex: 1, fontSize: 14, color: "#355021" }}>{c.score}</span>
          {c.validUntil && (
            <span style={{ fontSize: 12, color: "#4a6a42" }}>Until {c.validUntil}</span>
          )}
          <span
            onClick={() => onRemove(i)}
            style={{ fontSize: 13, color: "#d04040", cursor: "pointer", fontWeight: 600 }}
          >
            Remove
          </span>
        </div>
      ))}

      {/* add new cert */}
      <div style={{ display: "grid", gridTemplateColumns: "150px 1fr 160px auto", gap: 10, alignItems: "flex-end", marginTop: 8 }}>

        {/* test type dropdown */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#355021", letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 6 }}>Test type</p>
          <div style={{ position: "relative" }} ref={ref}>
            <div
              onClick={() => setDdOpen(o => !o)}
              style={{
                height: 48, borderRadius: 10, border: "1.5px solid #7aa16f",
                background: "#d9ecd5", padding: "0 12px", display: "flex",
                alignItems: "center", justifyContent: "space-between",
                cursor: "pointer", fontSize: 15, color: testType ? "#2d5016" : "#7aa16f",
              }}
            >
              <span>{testType || "Select"}</span>
              <span>⌄</span>
            </div>
            {ddOpen && (
              <div style={{
                position: "absolute", top: "100%", left: 0, right: 0,
                background: "#fff", border: "1.5px solid #2d5b0f",
                borderTop: "none", borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
                zIndex: 30,
              }}>
                {LANGUAGE_TESTS.map(t => (
                  <div
                    key={t}
                    onClick={() => { setTestType(t); setDdOpen(false) }}
                    style={{
                      padding: "10px 14px", fontSize: 15, color: "#355021",
                      cursor: "pointer", background: testType === t ? "#d9ecd5" : "#fff",
                    }}
                  >
                    {t}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* score */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#355021", letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 6 }}>Score</p>
          <input
            type="text"
            value={score}
            onChange={e => setScore(e.target.value)}
            placeholder={testType ? PLACEHOLDERS[testType] : "Score"}
            style={{
              width: "100%", height: 48, borderRadius: 10, border: "1.5px solid #7aa16f",
              background: "#d9ecd5", padding: "0 14px", fontSize: 15, color: "#2d5016",
              outline: "none", fontFamily: "DM Sans, sans-serif",
            }}
          />
        </div>

        {/* valid until */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#355021", letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 6 }}>Valid until (optional)</p>
          <input
            type="date"
            value={validUntil}
            onChange={e => setValidUntil(e.target.value)}
            style={{
              width: "100%", height: 48, borderRadius: 10, border: "1.5px solid #7aa16f",
              background: "#d9ecd5", padding: "0 12px", fontSize: 14, color: "#2d5016",
              outline: "none", fontFamily: "DM Sans, sans-serif",
            }}
          />
        </div>

        {/* add button */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: "transparent", marginBottom: 6 }}>.</p>
          <button
            type="button"
            onClick={handleAdd}
            style={{
              height: 48, padding: "0 20px", border: "none", borderRadius: 10,
              background: "#2d5b0f", color: "#fff", fontSize: 15,
              fontWeight: 700, cursor: "pointer", fontFamily: "DM Sans, sans-serif",
            }}
          >
            add
          </button>
        </div>

      </div>
    </div>
  )
}

// ── main component ─────────────────────────────────────────────────────────
export default function EditProfileSkills() {
  const navigate = useNavigate()
  const { profile, updateProfile } = useProfile()
  const skills = profile.skills || {}

  const [hardSkills,      setHardSkills]      = useState(skills.hardSkills      || [])
  const [softSkills,      setSoftSkills]      = useState(skills.softSkills      || [])
  const [languageSkills,  setLanguageSkills]  = useState(skills.languageSkills  || [])
  const [langCertificates,setLangCertificates]= useState(skills.langCertificates|| [])

  const totalSkills = hardSkills.length + softSkills.length + languageSkills.length + langCertificates.length

  const addTag    = (setter) => (val) => setter(prev => [...prev, val])
  const removeTag = (setter) => (val) => setter(prev => prev.filter(t => t !== val))

  const addCert    = (cert) => setLangCertificates(prev => [...prev, cert])
  const removeCert = (idx)  => setLangCertificates(prev => prev.filter((_, i) => i !== idx))

  const handleTabChange = (tab) => {
    if (tab === "personal") navigate("/profile/edit")
    if (tab === "academic") navigate("/profile/edit/academic")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSave = () => {
    updateProfile("skills", { hardSkills, softSkills, languageSkills, langCertificates })
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
        <button className="ep-tab" onClick={() => handleTabChange("academic")} type="button">
          Academic
        </button>
        <button className="ep-tab active" type="button">
          Skills
        </button>
      </div>

      {/* skill count bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "#c8e6c4", border: "1px solid #8ed79d", borderRadius: 14,
        padding: "14px 20px", marginBottom: 24,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 30, height: 30, borderRadius: "50%", background: "#2d5b0f",
            color: "#fff", fontSize: 14, fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {totalSkills}
          </div>
          <span style={{ fontSize: 16, color: "#2d5016", fontWeight: 600 }}>Skills added</span>
        </div>
        <span style={{ fontSize: 15, color: "#4a6a42" }}>Type and press Enter or comma to add more</span>
      </div>

      {/* hard skills */}
      <TagSection
        title="Hard skills"
        description="Technical and academic abilities. e.g. Mathematics, Programming, Research"
        tags={hardSkills}
        onAdd={addTag(setHardSkills)}
        onRemove={removeTag(setHardSkills)}
        placeholder="Type a skill and press Enter"
      />

      {/* soft skills */}
      <TagSection
        title="Soft skills"
        description="Interpersonal and personal strengths. e.g. Leadership, Public speaking, Volunteer"
        tags={softSkills}
        onAdd={addTag(setSoftSkills)}
        onRemove={removeTag(setSoftSkills)}
        placeholder="Type a skill and press Enter"
      />

      {/* language skills (free tag) */}
      <TagSection
        title="Language skills"
        description="Languages you speak or are learning. e.g. English, Arabic, Mandarin"
        tags={languageSkills}
        onAdd={addTag(setLanguageSkills)}
        onRemove={removeTag(setLanguageSkills)}
        placeholder="Type a language and press Enter"
      />

      {/* language certificates */}
      <LangCertSection
        certs={langCertificates}
        onAdd={addCert}
        onRemove={removeCert}
      />

      {/* summary cards */}
      <div className="ep-summary-card clickable" onClick={() => handleTabChange("personal")}>
        <span>Personal info — {profile.personal?.fullName || "—"}, {profile.personal?.gender || "—"}, {profile.personal?.province || "—"}</span>
        <button type="button">Edit →</button>
      </div>
      <div className="ep-summary-card clickable" onClick={() => handleTabChange("academic")}>
        <span>
          Academic — {profile.academic?.schoolLevel || "SMA"} {profile.academic?.grade || ""}, {profile.academic?.major || "IPA"}, avg. {profile.academic?.avgGrade || 0}
        </span>
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

