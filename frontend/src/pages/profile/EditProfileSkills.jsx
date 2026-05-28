import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useProfile } from "../../context/ProfileContext"
import "../../styles/editProfile.css"

function TagSection({
  title,
  description,
  tags,
  onAdd,
  onRemove,
  placeholder,
}) {
  const [inputVal, setInputVal] = useState("")

  const handleAdd = () => {
    const val = inputVal.replace(/,/g, "").trim()

    if (!val) return

    if (tags.includes(val)) {
      setInputVal("")
      return
    }

    onAdd(val)
    setInputVal("")
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <div className="ep-tag-section">

      {/* title */}
      <div className="ep-tag-title">
        {title}
      </div>

      {/* desc */}
      <div className="ep-tag-desc">
        {description}
      </div>

      {/* tags */}
      <div className="ep-tags-wrap">

        {tags.length === 0 ? (
          <div className="ep-empty-tag">
            No language added yet
          </div>
        ) : (
          tags.map((tag) => (
            <div
              key={tag}
              className="ep-tag-item"
            >

              <span className="ep-tag-text">
                {tag}
              </span>

              <div
                onClick={() => onRemove(tag)}
                className="ep-tag-remove"
              >
                ×
              </div>

            </div>
          ))
        )}

      </div>

      {/* input */}
      <div className="ep-tag-input-wrap">

        <input
          type="text"
          value={inputVal}
          onChange={(e) =>
            setInputVal(e.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="ep-tag-input"
        />

        <button
          type="button"
          onClick={handleAdd}
          className="ep-tag-add-btn"
        >
          add
        </button>

      </div>

      <div className="ep-tag-helper">
        Press Enter or comma to add
      </div>

    </div>
  )
}

export default function EditProfileSkills() {

  const navigate = useNavigate()

  const { profile, updateProfile } =
    useProfile()

  const skills = profile.skills || {}

  const [hardSkills, setHardSkills] =
    useState(
      skills.hardSkills || [
        "Accounting",
        "UI/UX Design",
        "Programming",
      ]
    )

  const [softSkills, setSoftSkills] =
    useState(
      skills.softSkills || [
        "Leadership",
        "Public speaking",
      ]
    )

  const [
    languageSkills,
    setLanguageSkills,
  ] = useState(
    skills.languageSkills || []
  )

  const totalSkills =
    hardSkills.length +
    softSkills.length +
    languageSkills.length

  const addTag = (setter) => (val) =>
    setter((prev) => [...prev, val])

  const removeTag = (setter) => (val) =>
    setter((prev) =>
      prev.filter((t) => t !== val)
    )

  const handleTabChange = (tab) => {

    if (tab === "personal") {
      navigate("/profile/edit")
    }

    if (tab === "academic") {
      navigate("/profile/edit/academic")
    }
  }

  const handleSave = () => {

    updateProfile("skills", {
      hardSkills,
      softSkills,
      languageSkills,
    })

    navigate("/profile")
  }

  return (
    <div className="ep-wrap">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/profile")}
        className="ep-back-btn"
      >
        Back to profile
      </button>

      {/* TABS */}
      <div className="ep-tabs">

        <button
          type="button"
          onClick={() =>
            handleTabChange("personal")
          }
          className="ep-tab"
        >
          Personal information
        </button>

        <button
          type="button"
          onClick={() =>
            handleTabChange("academic")
          }
          className="ep-tab"
        >
          Academic
        </button>

        <div className="ep-tab-active">
          Skills
        </div>

      </div>

      {/* TOP BAR */}
      <div className="ep-topbar">

        <div className="ep-topbar-left">

          <div className="ep-total-badge">
            {totalSkills}
          </div>

          <div className="ep-topbar-title">
            Skills added
          </div>

        </div>

        <div className="ep-topbar-text">
          Type and press Enter or comma to
          add more
        </div>

      </div>

      {/* HARD SKILLS */}
      <TagSection
        title="HARD SKILLS"
        description="Technical and academic abilities. e.g. Mathematics, Programming, Research"
        tags={hardSkills}
        onAdd={addTag(setHardSkills)}
        onRemove={removeTag(setHardSkills)}
        placeholder="Type a skill and press Enter"
      />

      {/* SOFT SKILLS */}
      <TagSection
        title="SOFT SKILLS"
        description="Interpersonal and personal strengths. e.g. Leadership, Public speaking, Volunteer"
        tags={softSkills}
        onAdd={addTag(setSoftSkills)}
        onRemove={removeTag(setSoftSkills)}
        placeholder="Type a skill and press Enter"
      />

      {/* LANGUAGE SKILLS */}
      <TagSection
        title="LANGUAGE SKILLS"
        description="Languages you speak or are learning. e.g. English, Arabic, Mandarin"
        tags={languageSkills}
        onAdd={addTag(setLanguageSkills)}
        onRemove={removeTag(setLanguageSkills)}
        placeholder="Type a skill and press Enter"
      />

      {/* SUMMARY */}
      <div
        className="ep-summary-card"
        onClick={() =>
          handleTabChange("personal")
        }
      >

        <div className="ep-summary-text">
          Personal info — Arunika,
          Female, Jawa Barat
        </div>

        <div className="ep-summary-edit">
          Edit →
        </div>

      </div>

      <div
        className="ep-summary-card"
        onClick={() =>
          handleTabChange("academic")
        }
      >

        <div className="ep-summary-text">
          Academic — SMA Grade 12,
          IPA, avg. 90
        </div>

        <div className="ep-summary-edit">
          Edit →
        </div>

      </div>

      {/* FOOTER */}
      <div className="ep-footer">

        <button
          onClick={() =>
            navigate("/profile")
          }
          className="ep-cancel-btn"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="ep-save-btn"
        >
          Save Changes
        </button>

      </div>

    </div>
  )
}