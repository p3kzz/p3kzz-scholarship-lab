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
    <div
      style={{
        background: "#DDE6DA",
        border: "1.5px solid #98A794",
        borderRadius: 26,
        padding: "28px 32px 20px",
        marginBottom: 26,
        boxShadow: "4px 6px 10px rgba(0,0,0,0.12)",
      }}
    >
      {/* title */}
      <div
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: "#355021",
          marginBottom: 2,
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>

      {/* desc */}
      <div
        style={{
          fontSize: 18,
          color: "#355021",
          lineHeight: 1.45,
          marginBottom: 22,
        }}
      >
        {description}
      </div>

      {/* tags */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 24,
          minHeight: 38,
        }}
      >
        {tags.length === 0 ? (
          <div
            style={{
              fontSize: 18,
              color: "#B2BDB0",
              fontStyle: "italic",
            }}
          >
            No language added yet
          </div>
        ) : (
          tags.map((tag) => (
            <div
              key={tag}
              style={{
                height: 44,
                padding: "0 18px",
                borderRadius: 999,
                border: "1.5px solid #A3ACA1",
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "#E6EEE4",
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  color: "#355021",
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>

              <div
                onClick={() => onRemove(tag)}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "#1BE11B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: 11,
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                ×
              </div>
            </div>
          ))
        )}
      </div>

      {/* input */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          style={{
            flex: 1,
            height: 46,
            borderRadius: 8,
            border: "1.5px solid #70936A",
            background: "#D8E9D4",
            padding: "0 16px",
            fontSize: 16,
            color: "#355021",
            outline: "none",
            fontFamily: "DM Sans, sans-serif",
          }}
        />

        <button
          type="button"
          onClick={handleAdd}
          style={{
            width: 66,
            height: 46,
            borderRadius: 8,
            border: "none",
            background: "#2F5E12",
            color: "#fff",
            fontSize: 18,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "DM Sans, sans-serif",
          }}
        >
          add
        </button>
      </div>

      <div
        style={{
          marginTop: 12,
          fontSize: 15,
          color: "#355021",
        }}
      >
        Press Enter or comma to add
      </div>
    </div>
  )
}

export default function EditProfileSkills() {
  const navigate = useNavigate()
  const { profile, updateProfile } = useProfile()

  const skills = profile.skills || {}

  const [hardSkills, setHardSkills] = useState(
    skills.hardSkills || ["Accounting", "UI/UX Design", "Programming"]
  )

  const [softSkills, setSoftSkills] = useState(
    skills.softSkills || ["Leadership", "Public speaking"]
  )

  const [languageSkills, setLanguageSkills] = useState(
    skills.languageSkills || []
  )

  const totalSkills =
    hardSkills.length +
    softSkills.length +
    languageSkills.length

  const addTag = (setter) => (val) =>
    setter((prev) => [...prev, val])

  const removeTag = (setter) => (val) =>
    setter((prev) => prev.filter((t) => t !== val))

  const handleTabChange = (tab) => {
    if (tab === "personal") navigate("/profile/edit")
    if (tab === "academic") navigate("/profile/edit/academic")
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
    <div
      style={{
        width: "100%",
        minHeight: "1440px",
        background: "#DDE6DA",
        padding: "70px 80px 90px",
        fontFamily: "DM Sans, sans-serif",
      }}
    >
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/profile")}
        style={{
          width: 230,
          height: 72,
          borderRadius: 40,
          border: "none",
          background: "#9FE0A1",
          fontSize: 20,
          color: "#355021",
          cursor: "pointer",
          boxShadow: "5px 6px 8px rgba(0,0,0,0.18)",
          marginBottom: 54,
          fontFamily: "DM Sans, sans-serif",
        }}
      >
        Back to profile
      </button>

      {/* TABS */}
      <div
        style={{
          width: "100%",
          height: 72,
          background: "#A6DEA6",
          borderRadius: 24,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          alignItems: "center",
          padding: "0 20px",
          marginBottom: 52,
        }}
      >
        <button
          type="button"
          onClick={() => handleTabChange("personal")}
          style={{
            border: "none",
            background: "transparent",
            fontSize: 20,
            color: "#355021",
            cursor: "pointer",
            fontFamily: "DM Sans, sans-serif",
          }}
        >
          Personal information
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("academic")}
          style={{
            border: "none",
            background: "transparent",
            fontSize: 20,
            color: "#355021",
            cursor: "pointer",
            fontFamily: "DM Sans, sans-serif",
          }}
        >
          Academic
        </button>

        <div
          style={{
            height: 52,
            background: "#DDE6DA",
            borderRadius: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            color: "#355021",
            fontWeight: 500,
          }}
        >
          Skills
        </div>
      </div>

      {/* TOP BAR */}
      <div
        style={{
          width: "100%",
          height: 72,
          background: "#A6DEA6",
          borderRadius: 12,
          padding: "0 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 52,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "#2F5E12",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            {totalSkills}
          </div>

          <div
            style={{
              fontSize: 20,
              color: "#355021",
              fontWeight: 500,
            }}
          >
            Skills added
          </div>
        </div>

        <div
          style={{
            fontSize: 20,
            color: "#355021",
          }}
        >
          Type and press Enter or comma to add more
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

      {/* SUMMARY CARDS */}
      <div
        style={{
          width: "100%",
          height: 96,
          borderRadius: 24,
          border: "1.5px solid #7C8E75",
          background: "#D7E0D4",
          boxShadow: "3px 5px 8px rgba(0,0,0,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 30px",
          marginTop: 50,
          marginBottom: 26,
          cursor: "pointer",
        }}
        onClick={() => handleTabChange("personal")}
      >
        <div
          style={{
            fontSize: 20,
            color: "#355021",
          }}
        >
          Personal info — Arunika, Female, Jawa Barat
        </div>

        <div
          style={{
            fontSize: 16,
            color: "#355021",
            fontWeight: 700,
          }}
        >
          Edit →
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: 96,
          borderRadius: 24,
          border: "1.5px solid #7C8E75",
          background: "#D7E0D4",
          boxShadow: "3px 5px 8px rgba(0,0,0,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 30px",
          marginBottom: 50,
          cursor: "pointer",
        }}
        onClick={() => handleTabChange("academic")}
      >
        <div
          style={{
            fontSize: 20,
            color: "#355021",
          }}
        >
          Academic — SMA Grade 12, IPA, avg. 90
        </div>

        <div
          style={{
            fontSize: 16,
            color: "#355021",
            fontWeight: 700,
          }}
        >
          Edit →
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          gap: 40,
        }}
      >
        <button
          onClick={() => navigate("/profile")}
          style={{
            height: 84,
            borderRadius: 10,
            border: "1.5px solid #6E8068",
            background: "transparent",
            fontSize: 28,
            color: "#355021",
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "DM Sans, sans-serif",
          }}
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          style={{
            height: 84,
            borderRadius: 10,
            border: "none",
            background: "#2F5E12",
            fontSize: 28,
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "DM Sans, sans-serif",
          }}
        >
          Save Canges
        </button>
      </div>
    </div>
  )
}