import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import "../../styles/onboarding.css"

export default function CVUpload() {
  const navigate = useNavigate()
  const fileRef = useRef()
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dragover, setDragover] = useState(false)

  const handleFile = (f) => {
    if (!f) return
    setFile(f)
    setLoading(true)
    // simulate reading CV — 2.5 seconds then go to step1
    setTimeout(() => {
      setLoading(false)
      navigate("/onboarding/step1")
    }, 2500)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragover(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }

  return (
    <div className="ob-wrap">
      <div className="ob-badge">Before we start</div>

      <h1 className="ob-title">Upload your CV</h1>
      <p className="ob-sub">
        System will read it and fill your profile automatically.
        You can review and edit before saving.
      </p>

      {/* dropzone */}
      <div
        className={`ob-dropzone ${dragover ? "dragover" : ""}`}
        onClick={() => fileRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragover(true) }}
        onDragLeave={() => setDragover(false)}
        onDrop={handleDrop}
      >
        <input
          ref={fileRef}
          type="file"
          accept=".pdf"
          style={{ display: "none" }}
          onChange={e => handleFile(e.target.files[0])}
        />
        <div className="ob-dropzone-title">
          {file ? file.name : "Drop your CV here"}
        </div>
        <div className="ob-dropzone-sub">
          {file ? "File selected — processing..." : "Or click to browse files"}
        </div>
        {!file && <span className="ob-dropzone-badge">PDF — max 2MB</span>}
      </div>

      {/* loading state */}
      {loading && (
        <div className="ob-loading-bar">
          <div className="ob-loading-spinner" />
          <div>
            <div className="ob-loading-text">System is reading your CV</div>
            <div className="ob-loading-sub">This only takes a few seconds</div>
          </div>
        </div>
      )}

      {/* divider + manual */}
      <div className="ob-divider">
        <div className="ob-divider-line" />
        <span className="ob-divider-text">Or skip CV</span>
        <div className="ob-divider-line" />
      </div>

      <button
        className="ob-manual-btn"
        onClick={() => navigate("/onboarding/step1")}
      >
        Fill in manually
      </button>

      {/* footer */}
      <div className="ob-footer">
        <button className="ob-btn-back" onClick={() => navigate("/onboarding")}>
          Back
        </button>
        <button
          className="ob-btn-continue"
          onClick={() => navigate("/onboarding/step1")}
          disabled={loading}
        >
          Continue
        </button>
      </div>
    </div>
  )
}