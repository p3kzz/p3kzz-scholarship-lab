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

/* ───────────────────────────────────────────────────────────── */
/* DROPDOWN */
/* ───────────────────────────────────────────────────────────── */

function EPDropdown({
  label,
  value,
  onChange,
  options,
  placeholder = "Select..."
}) {

  const [open, setOpen] = useState(false)
  const ref = useRef()

  useEffect(() => {

    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handler)

    return () => {
      document.removeEventListener("mousedown", handler)
    }

  }, [])

  return (
    <div className="ep-field">

      <label className="ep-label">
        {label}
      </label>

      <div
        className="ep-dropdown-wrap"
        ref={ref}
      >

        <div
          className={`ep-dropdown-trigger ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
        >

          <span
            style={{
              color: value ? "#2d5016" : "#7aa16f"
            }}
          >
            {value || placeholder}
          </span>

          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            ⌄
          </span>

        </div>

        {open && (
          <div className="ep-dropdown-list">

            {options.map((opt) => (
              <div
                key={opt}
                className={`ep-dropdown-item ${
                  value === opt ? "selected" : ""
                }`}
                onClick={() => {
                  onChange(opt)
                  setOpen(false)
                }}
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

/* ───────────────────────────────────────────────────────────── */
/* SCORE SLIDER */
/* ───────────────────────────────────────────────────────────── */

function ScoreSlider({
  label,
  value,
  onChange
}) {

  return (
    <div className="ep-field">

      <label className="ep-label">
        {label}
      </label>

      {/* score input */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 16,
        }}
      >

        <div
          style={{
            width: 130,
            height: 64,

            border: "1.5px solid #90a58a",
            borderRadius: 8,

            background: "#c5d0c1",

            display: "flex",
            overflow: "hidden",
          }}
        >

          <input
            type="number"
            min={0}
            max={100}
            value={value}
            onChange={(e) =>
              onChange(Number(e.target.value))
            }
            style={{
              width: 70,
              border: "none",
              background: "transparent",

              textAlign: "center",

              fontSize: 20,
              fontWeight: 500,
              color: "#355021",

              outline: "none",
              fontFamily: "DM Sans, sans-serif",
            }}
          />

          <div
            style={{
              width: 1,
              background: "#8ea086",
            }}
          />

          <div
            style={{
              flex: 1,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              fontSize: 16,
              color: "#355021",
            }}
          >
            /100
          </div>

        </div>

      </div>

      {/* slider */}
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) =>
          onChange(Number(e.target.value))
        }
        style={{
          width: "100%",
          accentColor: "#28cc2f",
          cursor: "pointer",
        }}
      />

      {/* bottom numbers */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",

          marginTop: 8,

          fontSize: 13,
          color: "#5c7052",
        }}
      >

        <span>0</span>

        <span>
          {value >= 90 ? "90 — Exellent" : value}
        </span>

        <span>100</span>

      </div>

    </div>
  )
}

/* ───────────────────────────────────────────────────────────── */
/* PAGE */
/* ───────────────────────────────────────────────────────────── */

export default function EditProfileAcademic() {

  const navigate = useNavigate()

  const {
    profile,
    updateProfile
  } = useProfile()

  const academic = profile.academic || {}

  const [schoolLevel, setSchoolLevel] =
    useState(academic.schoolLevel || "SMA")

  const [major, setMajor] =
    useState(academic.major || "IPA (science)")

  const [grade, setGrade] =
    useState(academic.grade || "Grade 12")

  const [schoolName, setSchoolName] =
    useState(academic.schoolName || "SMAN 10 Kota Bandung")

  const [schoolTier, setSchoolTier] =
    useState(
      academic.schoolTier ||
      "Public School - Accredited A"
    )

  const [gradYear, setGradYear] =
    useState(academic.graduationYear || "2026")

  const [avgGrade, setAvgGrade] =
    useState(academic.avgGrade ?? 90)

  const [mathScore, setMathScore] =
    useState(academic.mathScore ?? 80)

  const [englishScore, setEnglishScore] =
    useState(academic.englishScore ?? 90)

  const [majorSubjAvg, setMajorSubjAvg] =
    useState(academic.majorSubjectAvg ?? 80)

  const [extracurricular, setExtracurricular] =
    useState(
      academic.extracurricular ||
      "Ketua OSIS 2024–2025, Juara 1 OSN Matematika tingkat kota, anggota Paskibra, peserta LKIR tingkat provinsi"
    )

  const [olympiadLevel, setOlympiadLevel] =
    useState(
      academic.olympiadLevel || "City / District"
    )

  const [careerTrack, setCareerTrack] =
    useState(
      academic.careerTrack || "Industry / Tech"
    )

  const handleTabChange = (tab) => {

    if (tab === "personal") {
      navigate("/profile/edit")
    }

    if (tab === "skills") {
      navigate("/profile/edit/skills")
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  const handleSave = () => {

    updateProfile("academic", {
      schoolLevel,
      major,
      grade,
      schoolName,
      schoolTier,
      graduationYear: gradYear,
      avgGrade,
      mathScore,
      englishScore,
      majorSubjectAvg: majorSubjAvg,
      extracurricular,
      olympiadLevel,
      careerTrack,
    })

    navigate("/profile")
  }

  return (

    <div className="ep-wrap">

      {/* BACK */}
      <button
        className="ep-back-btn"
        onClick={() => navigate("/profile")}
      >
        Back to profile
      </button>

      {/* TABS */}
      <div className="ep-tabs">

        <button
          className="ep-tab"
          onClick={() => handleTabChange("personal")}
        >
          Personal information
        </button>

        <button className="ep-tab active">
          Academic
        </button>

        <button
          className="ep-tab"
          onClick={() => handleTabChange("skills")}
        >
          Skills
        </button>

      </div>

      {/* TOP FORM */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: 28,
          rowGap: 22,
        }}
      >

        <EPDropdown
          label="SCHOOL LEVEL"
          value={schoolLevel}
          onChange={setSchoolLevel}
          options={SCHOOL_LEVELS}
        />

        <EPDropdown
          label="MAJOR/PROGRAM"
          value={major}
          onChange={setMajor}
          options={MAJORS}
        />

        <EPDropdown
          label="GRADE / CLASS"
          value={grade}
          onChange={setGrade}
          options={GRADES}
        />

        <div className="ep-field">

          <label className="ep-label">
            SCHOOL NAME
          </label>

          <input
            className="ep-input"
            value={schoolName}
            onChange={(e) =>
              setSchoolName(e.target.value)
            }
          />

        </div>

        <EPDropdown
          label="SCHOOL TIER / ACCREDITATION"
          value={schoolTier}
          onChange={setSchoolTier}
          options={SCHOOL_TIERS}
        />

        <div className="ep-field">

          <label className="ep-label">
            EXPECTED GRADUATION YEAR
          </label>

          <input
            className="ep-input"
            value={gradYear}
            onChange={(e) =>
              setGradYear(e.target.value)
            }
          />

        </div>

      </div>

      {/* DIVIDER */}
      <div
        style={{
          width: "100%",
          height: 1,
          background: "#c4d0be",

          marginTop: 42,
          marginBottom: 28,
        }}
      />

      {/* PERFORMANCE */}
      <div>

        <p
          style={{
            fontSize: 18,
            color: "#3e4f35",
            marginBottom: 24,
            textTransform: "uppercase",
          }}
        >
          Academic performance
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: 48,
            rowGap: 28,
          }}
        >

          <ScoreSlider
            label="AVERAGE GRADE (SCALE 100)"
            value={avgGrade}
            onChange={setAvgGrade}
          />

          <ScoreSlider
            label="MATH SCORE"
            value={mathScore}
            onChange={setMathScore}
          />

          <ScoreSlider
            label="ENGLISH SCORE"
            value={englishScore}
            onChange={setEnglishScore}
          />

          <ScoreSlider
            label="MAJOR SUBJECT AVERAGE"
            value={majorSubjAvg}
            onChange={setMajorSubjAvg}
          />

        </div>

      </div>

      {/* DIVIDER */}
      <div
        style={{
          width: "100%",
          height: 1,
          background: "#c4d0be",

          marginTop: 28,
          marginBottom: 26,
        }}
      />

      {/* EXTRACURRICULAR */}
      <div>

        <label className="ep-label">
          EXTRACURRICULAR & ACHIEVEMENTS
        </label>

        <textarea
          value={extracurricular}
          onChange={(e) =>
            setExtracurricular(e.target.value)
          }
          style={{
            width: "100%",
            height: 170,

            borderRadius: 10,
            border: "1.5px solid #7ea071",

            background: "#d9ecd5",

            padding: "20px",

            fontSize: 16,
            color: "#355021",

            fontFamily: "DM Sans, sans-serif",

            resize: "none",
            outline: "none",

            marginTop: 12,
          }}
        />

        <p
          style={{
            marginTop: 14,

            fontSize: 16,
            color: "#48623c",
          }}
        >
          List any relevant organizations, competitions,
          achievements, or experiences.
        </p>

      </div>

      {/* BOTTOM */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 28,

          marginTop: 26,
        }}
      >

        <EPDropdown
          label="OLYMPIAD LEVEL"
          value={olympiadLevel}
          onChange={setOlympiadLevel}
          options={OLYMPIAD_LEVELS}
        />

        <EPDropdown
          label="INTENDED CAREER BACK"
          value={careerTrack}
          onChange={setCareerTrack}
          options={CAREER_TRACKS}
        />

      </div>

      {/* SUMMARY */}
      <div
        className="ep-summary-card clickable"
        style={{ marginTop: 56 }}
        onClick={() => handleTabChange("personal")}
      >

        <span>
          Personal info — Arunika, Female, Jawa Barat
        </span>

        <button type="button">
          Edit →
        </button>

      </div>

      <div
        className="ep-summary-card clickable"
        style={{ marginTop: 18 }}
        onClick={() => handleTabChange("skills")}
      >

        <span>
          Skills — 6 selected
        </span>

        <button type="button">
          Edit →
        </button>

      </div>

      {/* FOOTER */}
      <div
        className="ep-footer"
        style={{
          marginTop: 72,
        }}
      >

        <button
          className="ep-cancel-btn"
          onClick={() => navigate("/profile")}
        >
          Cancel
        </button>

        <button
          className="ep-save-btn"
          onClick={handleSave}
        >
          Save Canges
        </button>

      </div>

    </div>
  )
}