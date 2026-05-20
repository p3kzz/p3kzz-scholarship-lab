import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../styles/onboarding.css"

export default function OnboardingStart() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState("cv")

  const handleContinue = () => {
    if (selected === "cv") {
      navigate("/onboarding/cv-upload")
    } else {
      navigate("/onboarding/step1")
    }
  }

  return (
    <div className="ob-wrap">
      <div className="ob-badge">Onboarding</div>

      <h1 className="ob-title">Build your profile</h1>
      <p className="ob-sub">
        We need a few details about you so system can find the most relevant scholarships.
        This only takes a few minutes.
      </p>

      {/* CV option */}
      <div
        className={`ob-method-card ${selected === "cv" ? "selected" : ""}`}
        onClick={() => setSelected("cv")}
      >
        <div className="ob-method-card-left">
          <div className="ob-method-card-title">
            Upload your CV
            <span className="ob-method-tag">auto-fill</span>
          </div>
          <div className="ob-method-card-desc">
            System reads your CV and auto-fills the form. You review and confirm before saving.
          </div>
        </div>
        <div className="ob-radio">
          {selected === "cv" && <div className="ob-radio-inner" />}
        </div>
      </div>

      {/* Manual option */}
      <div
        className={`ob-method-card ${selected === "manual" ? "selected" : ""}`}
        onClick={() => setSelected("manual")}
      >
        <div className="ob-method-card-left">
          <div className="ob-method-card-title">Fill in manually</div>
          <div className="ob-method-card-desc">
            Answer a few questions step by step. Takes about 3–5 minutes.
          </div>
        </div>
        <div className="ob-radio">
          {selected === "manual" && <div className="ob-radio-inner" />}
        </div>
      </div>

      <button className="ob-btn-continue-full" onClick={handleContinue}>
        Continue
      </button>
    </div>
  )
}