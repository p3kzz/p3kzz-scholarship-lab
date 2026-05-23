import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useProfile } from "../../context/ProfileContext"

import "../../styles/step3.css"

const LANG_TESTS = ["IELTS", "TOEFL", "TOPIK", "JLPT", "DELF", "HSK"]

function TagSection({
  title,
  subLabel,
  tags,
  onChange,
  optional = false,
  emptyText = ""
}) {

  const [input, setInput] = useState("")

  const add = () => {
    const val = input.trim().replace(",", "")

    if (!val || tags.includes(val)) return

    onChange([...tags, val])
    setInput("")
  }

  const remove = (tag) =>
    onChange(tags.filter(t => t !== tag))

  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      add()
    }
  }

  return (
    <div className="s3-card">

      <div className="s3-card-title">
        {title}

        {optional && (
          <span className="s3-card-optional">
            Optional
          </span>
        )}
      </div>

      <div className="s3-card-sub">
        {subLabel}
      </div>

      {tags.length === 0 && emptyText && (
        <div className="s3-tag-empty">
          {emptyText}
        </div>
      )}

      <div className="s3-tags">
        {tags.map(tag => (
          <span key={tag} className="s3-tag">

            {tag}

            <span
              className="s3-tag-x"
              onClick={() => remove(tag)}
            >
              ✕
            </span>

          </span>
        ))}
      </div>

      <div className="s3-input-row">

        <input
          className="s3-input"
          type="text"
          placeholder="Type a skill and press Enter"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
        />

        <button
          className="s3-add-btn"
          type="button"
          onClick={add}
        >
          add
        </button>

      </div>

      <div className="s3-hint">
        Press Enter or comma to add
      </div>

    </div>
  )
}

export default function Step3Skills() {

  const navigate = useNavigate()

  const {
    profile,
    updateProfile
  } = useProfile()

  const sk = profile.skills || {}

  const [hardSkills, setHardSkills] = useState(sk.hardSkills || [])
  const [softSkills, setSoftSkills] = useState(sk.softSkills || [])
  const [langSkills, setLangSkills] = useState(sk.langSkills || [])
  const [certs, setCerts] = useState(sk.langCerts || [])
  const [countries, setCountries] = useState(sk.targetCountries || [])
  const [countryInput, setCountryInput] = useState("")

  const totalSkills =
    hardSkills.length +
    softSkills.length +
    langSkills.length

  const addCert = () =>
    setCerts(c => [
      ...c,
      {
        testType: "IELTS",
        score: "",
        validUntil: ""
      }
    ])

  const removeCert = (i) =>
    setCerts(c =>
      c.filter((_, idx) => idx !== i)
    )

  const updateCert = (i, field, val) =>
    setCerts(c =>
      c.map((cert, idx) =>
        idx === i
          ? { ...cert, [field]: val }
          : cert
      )
    )

  const addCountry = () => {

    const val = countryInput.trim().replace(",", "")

    if (!val || countries.includes(val)) return

    setCountries(c => [...c, val])
    setCountryInput("")
  }

  const removeCountry = (c) =>
    setCountries(cs => cs.filter(x => x !== c))

  const handleCountryKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addCountry()
    }
  }

  const formatDate = (dateString) => {

    if (!dateString) return "DD / MM / YYYY"

    const date = new Date(dateString)

    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()

    return `${day} / ${month} / ${year}`
  }

  const handleContinue = () => {

    updateProfile("skills", {
      hardSkills,
      softSkills,
      langSkills,
      langCerts: certs,
      targetCountries: countries
    })

    navigate("/onboarding/review")
  }

  return (

    <div className="s3-wrap">

      <div className="s3-badge">
        Step 3 of 3
      </div>

      {/* progress */}

      <div className="s3-progress">
        <div className="s3-bar done" />
        <div className="s3-bar done" />
        <div className="s3-bar active" />
      </div>

      <div className="s3-labels">

        <div className="s3-label">
          Personal information
        </div>

        <div className="s3-label center">
          Academic
        </div>

        <div className="s3-label active right">
          Skills
        </div>

      </div>

      {/* counter */}

      <div className="s3-counter">

        <div className="s3-counter-left">

          <div className="s3-counter-badge">
            {totalSkills}
          </div>

          <span className="s3-counter-text">
            Skills added
          </span>

        </div>

        <span className="s3-counter-hint">
          Type and press Enter or comma to add more
        </span>

      </div>

      {/* hard skills */}

      <TagSection
        title="Hard Skills"
        subLabel="Technical and academic abilities. e.g. Mathematics, Programming, Research"
        tags={hardSkills}
        onChange={setHardSkills}
      />

      {/* soft skills */}

      <TagSection
        title="Soft Skills"
        subLabel="Interpersonal and personal strengths. e.g. Leadership, Public speaking, Volunteer"
        tags={softSkills}
        onChange={setSoftSkills}
      />

      {/* language skills */}

      <TagSection
        title="Language Skills"
        subLabel="Languages you speak or are learning. e.g. English, Arabic, Mandarin"
        tags={langSkills}
        onChange={setLangSkills}
        emptyText="No language added yet"
      />

      {/* language certificates */}

      <div className="s3-card">

        <div className="s3-card-title">

          Language Certificates

          <span className="s3-card-optional">
            Optional
          </span>

        </div>

        <div className="s3-card-sub">

          Official language test results.
          e.g. IELTS, TOEFL, TOPIK.
          Leave empty if none yet.

        </div>

        {certs.map((cert, i) => (

          <div key={i} className="s3-cert-entry">

            {/* test type */}

            <div>

              <label className="s3-cert-label">
                Test type
              </label>

              <select
                className="s3-cert-select"
                value={cert.testType}
                onChange={e =>
                  updateCert(
                    i,
                    "testType",
                    e.target.value
                  )
                }
              >
                {LANG_TESTS.map(t => (
                  <option key={t}>
                    {t}
                  </option>
                ))}
              </select>

            </div>

            {/* score */}

            <div>

              <label className="s3-cert-label">
                Score
              </label>

              <input
                className="s3-cert-input"
                type="number"
                placeholder="e.g. 7.0"
                value={cert.score}
                onChange={e =>
                  updateCert(
                    i,
                    "score",
                    e.target.value
                  )
                }
              />

            </div>

            {/* valid until */}

            <div>

  <label className="s3-cert-label">
    Valid until
  </label>

  <div className="step-date-wrap">

    <div
      className="step-date-trigger"
      onClick={() =>
        updateCert(i, "openCal", !cert.openCal)
      }
    >

      <span>
        {cert.validUntil || "DD / MM / YYYY"}
      </span>

      <span className="step-date-icon">
        📅
      </span>

    </div>

    {cert.openCal && (

      <div className="step-calendar">

        <div className="step-cal-header">

          <button
            className="step-cal-nav"
            type="button"
          >
            ‹
          </button>

          <select className="step-cal-select">
            <option>May</option>
          </select>

          <select className="step-cal-select">
            <option>2026</option>
          </select>

          <button
            className="step-cal-nav"
            type="button"
          >
            ›
          </button>

        </div>

        <div className="step-cal-grid">

          {["Su","Mo","Tu","We","Th","Fr","Sa"].map(day => (
            <div
              key={day}
              className="step-cal-dow"
            >
              {day}
            </div>
          ))}

          {Array.from({ length: 31 }, (_, idx) => (

            <div
              key={idx}
              className="step-cal-day"
              onClick={() => {

                const selected =
                  `2026-05-${String(idx + 1).padStart(2,"0")}`

                updateCert(
                  i,
                  "validUntil",
                  selected
                )

                updateCert(
                  i,
                  "openCal",
                  false
                )
              }}
            >
              {idx + 1}
            </div>

          ))}

        </div>

      </div>

    )}

  </div>

</div>

            {/* remove */}

            <button
              className="s3-cert-remove"
              onClick={() => removeCert(i)}
              type="button"
            >
              ✕
            </button>

          </div>

        ))}

        <button
          className="s3-add-cert-btn"
          type="button"
          onClick={addCert}
        >
          + Add language certificate
        </button>

      </div>

      {/* target countries */}

      <div className="s3-card">

        <div className="s3-card-title">
          Target Countries for Study
        </div>

        <div className="s3-card-sub">
          Select all countries you're considering
          for your scholarship destination.
        </div>

        <div className="s3-tags">

          {countries.map(c => (
            <span key={c} className="s3-tag">

              {c.toUpperCase()}

              <span
                className="s3-tag-x"
                onClick={() => removeCountry(c)}
              >
                ✕
              </span>

            </span>
          ))}

        </div>

        <div className="s3-input-row">

          <input
            className="s3-input"
            type="text"
            placeholder="Type a country and press Enter"
            value={countryInput}
            onChange={e => setCountryInput(e.target.value)}
            onKeyDown={handleCountryKey}
          />

          <button
            className="s3-add-btn"
            type="button"
            onClick={addCountry}
          >
            add
          </button>

        </div>

        <div className="s3-hint">
          Press Enter or comma to add
        </div>

      </div>

      {/* footer */}

      <div className="s3-footer">

        <button
          className="s3-btn-back"
          onClick={() => navigate("/onboarding/step2")}
        >
          Back
        </button>

        <button
          className="s3-btn-continue"
          onClick={handleContinue}
        >
          Continue
        </button>

      </div>

    </div>
  )
}