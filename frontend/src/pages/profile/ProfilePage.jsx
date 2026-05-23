import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useProfile } from "../../context/ProfileContext"
import "../../styles/profile.css"

export default function ProfilePage() {
  const navigate = useNavigate()
  const { profile } = useProfile()

  const p = profile.personal || {}
  const a = profile.academic || {}
  const s = profile.skills || {}

  const [cvFile, setCvFile] = useState({
    name: "CV_Arunika.pdf",
    uploadedAt: "Uploaded 11 Mei 2026"
  })

  const handleCvUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const today = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })

    setCvFile({
      name: file.name,
      uploadedAt: `Uploaded ${today}`
    })
  }

  const formatDob = (str) => {
    if (!str) return "—"

    const d = new Date(str)

    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
  }

  return (
    <div className="pf-wrap">

      {/* top actions */}
      <div className="pf-topbar">
        <button
  className="pf-top-btn"
  onClick={() => navigate("/dashboard")}
>
  Back to dashboard
</button>

        <button
          className="pf-top-btn"
          onClick={() => navigate("/profile/edit")}
        >
          Edit Profile
        </button>
      </div>

      {/* header */}
      <div className="pf-header">

        <div className="pf-avatar">
          {p.fullName?.charAt(0) || "A"}
        </div>

        <div className="pf-user">
          <h1 className="pf-name">
            {p.fullName || "Arunika Widuri Almira"}
          </h1>

          <p className="pf-email">
            {p.email || "arunikawidurialmira4@gmail.com"}
          </p>

          <div className="pf-badges">
            <span className="pf-badge">
              {a.schoolLevel || "SMA"}/{a.grade || "Grade 12"}
            </span>

            <span className="pf-badge">
              Avg {a.overallGrade || 90}
            </span>

            <span className="pf-badge">
              {p.economicBackground || "Low income"}
            </span>
          </div>
        </div>
      </div>

      {/* completion */}
      <div className="pf-progress-card">

        <div className="pf-progress-head">
          PROFILE COMPLETION
        </div>

        <div className="pf-progress-row">
          <div className="pf-progress-bar">
            <div
              className="pf-progress-fill"
              style={{ width: "70%" }}
            />
          </div>

          <span className="pf-progress-text">
            70%
          </span>
        </div>
      </div>

      {/* content */}
      <div className="pf-grid">

        {/* LEFT */}
        <div className="pf-left">

          {/* personal */}
          <div className="pf-card">

            <div className="pf-card-title">
              PERSONAL INFORMATION
            </div>

            <div className="pf-row">
              <span>Gender</span>
              <span>{p.gender || "Female"}</span>
            </div>

            <div className="pf-row">
              <span>Date of birth</span>
              <span>{formatDob(p.dateOfBirth) || "4 September 2004"}</span>
            </div>

            <div className="pf-row">
              <span>Province</span>
              <span>{p.province || "Jawa Barat"}</span>
            </div>

            <div className="pf-row">
              <span>Economic</span>
              <span>{p.economicBackground || "Very Low income"}</span>
            </div>

            <div className="pf-row">
              <span>Region 3T</span>
              <span>{p.fromUnderrepresentedRegion ? "Yes" : "No"}</span>
            </div>

          </div>

          {/* academic */}
          <div className="pf-card">

            <div className="pf-card-title">
              ACADEMIC
            </div>

            <div className="pf-row">
              <span>School level</span>
              <span>{a.schoolLevel || "SMA"}/{a.grade || "Grade 12"}</span>
            </div>

            <div className="pf-row">
              <span>Major</span>
              <span>{a.major || "IPA (science)"}</span>
            </div>

            <div className="pf-row">
              <span>Avg. grade</span>
              <span>{a.overallGrade || 90}/100</span>
            </div>

            <div className="pf-row">
              <span>School</span>
              <span>{a.schoolName || "SMAN 10 Kota Bandung"}</span>
            </div>

            <div className="pf-row">
              <span>Career Track</span>
              <span>{a.intendedCareerTrack || "Industry / Tech"}</span>
            </div>

            <div className="pf-divider" />

            <div className="pf-section-title">
              EXTRACURRICULAR & ACHIEVEMENTS
            </div>

            <p className="pf-achievement">
              {a.extracurricular ||
                "Ketua OSIS 2024–2025, Juara 1 OSN Matematika tingkat kota, anggota Paskibra, peserta LKIR tingkat provinsi"}
            </p>

          </div>

        </div>

        {/* RIGHT */}
        <div className="pf-right">

          {/* skills */}
          <div className="pf-card">

            <div className="pf-section-title">
              HARD SKILLS
            </div>

            <div className="pf-tags">
              {s.hardSkills?.length ? (
                s.hardSkills.map((item) => (
                  <span key={item} className="pf-tag">
                    {item}
                  </span>
                ))
              ) : (
                <>
                  <span className="pf-tag">Accounting</span>
                  <span className="pf-tag">UI/UX Design</span>
                  <span className="pf-tag">Programming</span>
                </>
              )}
            </div>

            <div className="pf-section-title">
              SOFT SKILLS
            </div>

            <div className="pf-tags">
              {s.softSkills?.length ? (
                s.softSkills.map((item) => (
                  <span key={item} className="pf-tag">
                    {item}
                  </span>
                ))
              ) : (
                <>
                  <span className="pf-tag">Leaderships</span>
                  <span className="pf-tag">Public Speaking</span>
                </>
              )}
            </div>

            <div className="pf-section-title">
              LANGUAGE SKILLS
            </div>

            {s.langSkills?.length ? (
              <div className="pf-tags">
                {s.langSkills.map((item) => (
                  <span key={item} className="pf-tag">
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <div className="pf-none">
                None added
              </div>
            )}

          </div>

          {/* CV */}
          <div className="pf-card">

            <div className="pf-card-title">
              QUICK UPDATE WITH CV
            </div>

            <p className="pf-cv-sub">
              Upload your latest CV and AI will auto-fill your profile.
              Review before saving.
            </p>

            <div className="pf-cv-file">
              <span>{cvFile.name}</span>
              <span>{cvFile.uploadedAt}</span>
            </div>

            <input
              type="file"
              id="cv-upload"
              accept=".pdf,.doc,.docx"
              style={{ display: "none" }}
              onChange={handleCvUpload}
            />

            <label
              htmlFor="cv-upload"
              className="pf-cv-btn"
            >
              Re-upload CV
            </label>

          </div>

        </div>

      </div>
    </div>
  )
}