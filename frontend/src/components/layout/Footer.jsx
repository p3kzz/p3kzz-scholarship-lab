import { Link } from "react-router-dom"
import logoDark from "../../assets/logo-dark.png"

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-inner">

        {/* top */}
        <div className="footer-top">

          {/* brand */}
          <div className="footer-brand-col">

            <img
              src={logoDark}
              alt="Scholarship Lab"
              className="footer-logo"
            />

            <p className="footer-desc">
              A smarter way for Indonesian
              students to find and match with
              global scholarship opportunities.
            </p>

          </div>

          {/* scholarships */}
<div className="footer-col">

  <h4 className="footer-title">
    SCHOLARSHIPS
  </h4>

  <ul className="footer-list">

    <li>
      <button
        onClick={() => {
          document
            .getElementById("scholarships")
            ?.scrollIntoView({ behavior: "smooth" })
        }}
        className="footer-link-btn"
      >
        Lund University
      </button>
    </li>

    <li>
      <button
        onClick={() => {
          document
            .getElementById("scholarships")
            ?.scrollIntoView({ behavior: "smooth" })
        }}
        className="footer-link-btn"
      >
        Singapore ASEAN
      </button>
    </li>

    <li>
      <button
        onClick={() => {
          document
            .getElementById("scholarships")
            ?.scrollIntoView({ behavior: "smooth" })
        }}
        className="footer-link-btn"
      >
        CIMB ASEAN
      </button>
    </li>

    <li>
      <button
        onClick={() => {
          document
            .getElementById("scholarships")
            ?.scrollIntoView({ behavior: "smooth" })
        }}
        className="footer-link-btn"
      >
        BJUT China
      </button>
    </li>

    <li>
      <button
        onClick={() => {
          document
            .getElementById("scholarships")
            ?.scrollIntoView({ behavior: "smooth" })
        }}
        className="footer-link-btn"
      >
        GKS Korea
      </button>
    </li>

  </ul>

</div>

{/* resources */}
<div className="footer-col">

  <h4 className="footer-title">
    RESOURCES
  </h4>

  <ul className="footer-list">

    <li>
      <button
        onClick={() => {
          document
            .getElementById("how")
            ?.scrollIntoView({ behavior: "smooth" })
        }}
        className="footer-link-btn"
      >
        How it works
      </button>
    </li>

    <li>
      <button
        onClick={() => {
          document
            .getElementById("how")
            ?.scrollIntoView({ behavior: "smooth" })
        }}
        className="footer-link-btn"
      >
        Eligibility
      </button>
    </li>

  </ul>

</div>

{/* company */}
<div className="footer-col">

  <h4 className="footer-title">
    COMPANY
  </h4>

  <ul className="footer-list">

    <li>
      <button
        onClick={() => {
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" })
        }}
        className="footer-link-btn"
      >
        About
      </button>
    </li>

  </ul>

</div>

        </div>

        {/* line */}
        <div className="footer-line" />

        {/* bottom */}
        <div className="footer-bottom">

          <p className="footer-copy">
            © 2026 Scholarship Lab. All rights reserved.
          </p>

          <p className="footer-made">
            Made for Indonesian students reaching{" "}
            <span>global opportunities.</span>
          </p>

        </div>

      </div>
    </footer>
  )
}