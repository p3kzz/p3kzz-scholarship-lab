import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../styles/editProfile.css"

const PROVINCES = [
  "Aceh", "Bali", "DKI Jakarta", "Jawa Barat", "Jawa Timur", "Jawa Tengah",
  "Kalimantan Timur", "Maluku", "Nusa Tenggara Timur", "Papua", "Papua Barat",
  "Sulawesi Utara", "Sulawesi Selatan", "Sumatera Utara", "Sumatera Barat",
  "Sumatera Selatan", "Riau", "Kepulauan Riau", "Lampung", "Bengkulu",
  "Jambi", "Bangka Belitung", "Kalimantan Barat", "Kalimantan Selatan",
  "Kalimantan Tengah", "Kalimantan Utara", "Sulawesi Tengah", "Sulawesi Tenggara",
  "Sulawesi Barat", "Gorontalo", "Maluku Utara", "Nusa Tenggara Barat",
  "Papua Selatan", "Lainnya"
]

const ECO_OPTIONS = [
  {
    label: "Very Low Income",
    value: "very_low"
  },
  {
    label: "Low Income",
    value: "low"
  },
  {
    label: "Middle Income",
    value: "middle"
  },
  {
    label: "High Income",
    value: "high"
  }
]

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

const DAYS_OF_WEEK = [
  "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"
]

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(month, year) {
  return new Date(year, month, 1).getDay()
}

export default function EditProfilePage() {
  const navigate = useNavigate()

  const [activeTab, setActiveTab] =
    useState("personal")

  const [fullName, setFullName] =
    useState("")

  const [province, setProvince] =
    useState("Jawa Barat")

  const [gender, setGender] =
    useState("Male")

  const [economic, setEconomic] =
    useState("middle")

  const [region3T, setRegion3T] =
    useState(false)

  const [photo, setPhoto] =
    useState(null)

  const [dob, setDob] =
    useState("")

  const [provOpen, setProvOpen] =
    useState(false)

  const provRef =
    useRef()

  const [calOpen, setCalOpen] =
    useState(false)

  const calRef =
    useRef()

  const [calMonth, setCalMonth] =
    useState(8)

  const [calYear, setCalYear] =
    useState(2004)

  const [selDay, setSelDay] =
    useState(4)


  useEffect(() => {

    const loadProfile = async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          )

        const response =
          await fetch(
            "http://localhost:3000/profile",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          )

        const data =
          await response.json()

        setFullName(
          data.fullName || ""
        )

        setProvince(
          data.province || "Jawa Barat"
        )

        setGender(
          data.gender || "Male"
        )

        setEconomic(
          data.familyIncomeCategory ||
          "middle"
        )

        setRegion3T(
          data.fromUnderrepresentedRegion ?? false
        )

        if (data.birthDate) {

          const birth =
            new Date(
              data.birthDate
            )

          setDob(
            data.birthDate
              .split("T")[0]
          )

          setCalMonth(
            birth.getMonth()
          )

          setCalYear(
            birth.getFullYear()
          )

          setSelDay(
            birth.getDate()
          )
        }

      } catch (error) {

        console.error(error)

      }
    }

    loadProfile()

  }, [])

  useEffect(() => {
    const handler = (e) => {

      if (
        provRef.current &&
        !provRef.current.contains(e.target)
      ) {
        setProvOpen(false)
      }

      if (
        calRef.current &&
        !calRef.current.contains(e.target)
      ) {
        setCalOpen(false)
      }
    }

    document.addEventListener("mousedown", handler)

    return () => {
      document.removeEventListener("mousedown", handler)
    }
  }, [])

  const currentYear =
    new Date().getFullYear()

  const years =
    Array.from(
      { length: 60 },
      (_, i) => currentYear - i
    )

  const formatDob = () => {
    if (!selDay) return ""

    const d = String(selDay).padStart(2, "0")
    const m = String(calMonth + 1).padStart(2, "0")

    return `${d} / ${m} / ${calYear}`
  }

  const handleSelectDay = (day) => {
    setSelDay(day)

    const dateStr =
      `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`

    setDob(dateStr)

    setCalOpen(false)
  }

  const prevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11)
      setCalYear((y) => y - 1)
    } else {
      setCalMonth((m) => m - 1)
    }
  }

  const nextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0)
      setCalYear((y) => y + 1)
    } else {
      setCalMonth((m) => m + 1)
    }
  }

  const renderCalendar = () => {
    const daysInMonth =
      getDaysInMonth(calMonth, calYear)

    const firstDay =
      getFirstDayOfMonth(calMonth, calYear)

    const prevDays = getDaysInMonth(
      calMonth === 0 ? 11 : calMonth - 1,
      calMonth === 0
        ? calYear - 1
        : calYear
    )

    const cells = []

    for (let i = firstDay - 1; i >= 0; i--) {
      cells.push(
        <div
          key={`p${i}`}
          className="ep-cal-day other-month"
        >
          {prevDays - i}
        </div>
      )
    }

    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(
        <div
          key={d}
          className={`ep-cal-day ${selDay === d ? "selected" : ""
            }`}
          onClick={() => handleSelectDay(d)}
        >
          {d}
        </div>
      )
    }

    let next = 1

    while (cells.length % 7 !== 0) {
      cells.push(
        <div
          key={`n${next}`}
          className="ep-cal-day other-month"
        >
          {next++}
        </div>
      )
    }

    return cells
  }

  const handleSave = async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        )

      const response =
        await fetch(
          "http://localhost:3000/profile",
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`
            },

            body: JSON.stringify({

              fullName,

              gender,

              birthDate: dob,

              province,

              familyIncomeCategory:
                economic,

              fromUnderrepresentedRegion:
                region3T
            })
          }
        )

      if (!response.ok) {

        throw new Error(
          "Failed update profile"
        )
      }

      navigate("/profile")

    } catch (error) {

      console.error(error)

    }
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]

    if (!file) return

    const imageUrl = URL.createObjectURL(file)

    setPhoto(imageUrl)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)

    if (tab === "academic") {
      navigate("/profile/edit/academic")
    }

    if (tab === "skills") {
      navigate("/profile/edit/skills")
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <div className="ep-wrap">

      {/* back */}
      <button
        className="ep-back-btn"
        onClick={() => navigate("/profile")}
      >
        Back to profile
      </button>

      {/* tabs */}
      <div className="ep-tabs">

        <button
          className={`ep-tab ${activeTab === "personal"
            ? "active"
            : ""
            }`}
          onClick={() => handleTabChange("personal")}
          type="button"
        >
          Personal information
        </button>

        <button
          className={`ep-tab ${activeTab === "academic"
            ? "active"
            : ""
            }`}
          onClick={() => handleTabChange("academic")}
          type="button"
        >
          Academic
        </button>

        <button
          className={`ep-tab ${activeTab === "skills"
            ? "active"
            : ""
            }`}
          onClick={() => handleTabChange("skills")}
          type="button"
        >
          Skills
        </button>

      </div>

      {/* photo card */}
      <div className="ep-photo-card">

        <div className="ep-avatar">

          {photo ? (
            <img
              src={photo}
              alt="profile"
            />
          ) : (
            fullName?.charAt(0) || "A"
          )}

          <div className="ep-avatar-icon">
            📷
          </div>

        </div>

        <div className="ep-photo-content">

          <h3 className="ep-photo-title">
            Profile photo
          </h3>

          <p className="ep-photo-sub">
            JPG or PNG, max 2MB.
            Will be shown on your profile.
          </p>

          <div className="ep-photo-actions">

            <label className="ep-upload-btn">

              Upload photo

              <input
                type="file"
                accept="image/png,image/jpeg"
                hidden
                onChange={handlePhotoUpload}
              />

            </label>

            <button
              className="ep-remove-btn"
              type="button"
              onClick={() => setPhoto(null)}
            >
              Remove
            </button>

          </div>

        </div>

      </div>

      {/* form */}
      <div className="ep-grid">

        {/* full name */}
        <div className="ep-field">

          <label className="ep-label">
            Full name
          </label>

          <input
            className="ep-input"
            type="text"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
          />

        </div>

        {/* province */}
        <div className="ep-field">

          <label className="ep-label">
            Province
          </label>

          <div
            className="ep-dropdown-wrap"
            ref={provRef}
          >

            <div
              className={`ep-dropdown-trigger ${provOpen ? "open" : ""
                }`}
              onClick={() =>
                setProvOpen((o) => !o)
              }
            >
              <span>{province}</span>
              <span>⌄</span>
            </div>

            {provOpen && (
              <div className="ep-dropdown-list">

                {PROVINCES.map((item) => (
                  <div
                    key={item}
                    className={`ep-dropdown-item ${province === item
                      ? "selected"
                      : ""
                      }`}
                    onClick={() => {
                      setProvince(item)
                      setProvOpen(false)
                    }}
                  >
                    {item}
                  </div>
                ))}

              </div>
            )}

          </div>

        </div>

        {/* gender */}
        <div className="ep-field">

          <label className="ep-label">
            Gender
          </label>

          <div className="ep-toggle-group">

            {[
              "Male",
              "Female",
              "Prefer not to say"
            ].map((item) => (
              <button
                key={item}
                type="button"
                className={`ep-toggle-btn ${gender === item
                  ? "active"
                  : ""
                  }`}
                onClick={() =>
                  setGender(item)
                }
              >
                {item}
              </button>
            ))}

          </div>

        </div>

        {/* economic */}
        <div className="ep-field">

          <label className="ep-label">
            Economic background
          </label>

          <div className="ep-eco-list">

            {ECO_OPTIONS.map((item) => (
              <div
                key={item.value}
                className={`ep-eco-item ${economic === item.value
                    ? "selected"
                    : ""
                  }`}
                onClick={() =>
                  setEconomic(
                    item.value
                  )
                }
              >
                <span className="ep-eco-dot" />
                {item.label}
              </div>
            ))}

          </div>

        </div>

        {/* date of birth */}
        <div className="ep-field">

          <label className="ep-label">
            Date of birth
          </label>

          <div
            className="ep-date-wrap"
            ref={calRef}
          >

            <div
              className={`ep-date-trigger ${calOpen ? "open" : ""
                }`}
              onClick={() =>
                setCalOpen((o) => !o)
              }
            >

              <span>
                {selDay
                  ? formatDob()
                  : "DD / MM / YYYY"}
              </span>

              <span>📅</span>

            </div>

            {calOpen && (
              <div className="ep-calendar">

                <div className="ep-cal-header">

                  <button
                    type="button"
                    className="ep-cal-nav"
                    onClick={prevMonth}
                  >
                    ‹
                  </button>

                  <select
                    className="ep-cal-select"
                    value={calMonth}
                    onChange={(e) =>
                      setCalMonth(
                        Number(e.target.value)
                      )
                    }
                  >

                    {MONTHS.map((m, i) => (
                      <option
                        key={m}
                        value={i}
                      >
                        {m}
                      </option>
                    ))}

                  </select>

                  <select
                    className="ep-cal-select"
                    value={calYear}
                    onChange={(e) =>
                      setCalYear(
                        Number(e.target.value)
                      )
                    }
                  >

                    {years.map((y) => (
                      <option
                        key={y}
                        value={y}
                      >
                        {y}
                      </option>
                    ))}

                  </select>

                  <button
                    type="button"
                    className="ep-cal-nav"
                    onClick={nextMonth}
                  >
                    ›
                  </button>

                </div>

                <div className="ep-cal-grid">

                  {DAYS_OF_WEEK.map((d) => (
                    <div
                      key={d}
                      className="ep-cal-dow"
                    >
                      {d}
                    </div>
                  ))}

                  {renderCalendar()}

                </div>

              </div>
            )}

          </div>

        </div>

        {/* region */}
        <div className="ep-field">

          <label className="ep-label">
            From underrepresented region (3T)?
          </label>

          <div
            className="ep-toggle-group"
            style={{
              gridTemplateColumns:
                "1fr 1fr"
            }}
          >

            {[true, false].map((item) => (
              <button
                key={String(item)}
                type="button"
                className={`ep-toggle-btn ${region3T === item
                  ? "active"
                  : ""
                  }`}
                onClick={() =>
                  setRegion3T(item)
                }
              >
                {item ? "Yes" : "No"}
              </button>
            ))}

          </div>

        </div>

      </div>

      {/* summary cards */}
      <div
        className="ep-summary-card clickable"
        onClick={() =>
          handleTabChange("academic")
        }
      >

        <span>
          Academic — SMA Grade 12,
          IPA, avg. 90
        </span>

        <button type="button">
          Edit →
        </button>

      </div>

      <div
        className="ep-summary-card clickable"
        onClick={() =>
          handleTabChange("skills")
        }
      >

        <span>
          Skills — 6 selected
        </span>

        <button type="button">
          Edit →
        </button>

      </div>

      {/* footer */}
      <div className="ep-footer">

        <button
          className="ep-cancel-btn"
          onClick={() =>
            navigate("/profile")
          }
        >
          Cancel
        </button>

        <button
          className="ep-save-btn"
          onClick={handleSave}
        >
          Save Changes
        </button>

      </div>

    </div>
  )
}