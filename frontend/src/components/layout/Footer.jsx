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
                <Link to="/#scholarships">
                  Lund University
                </Link>
              </li>

              <li>
                <Link to="/#scholarships">
                  Singapore ASEAN
                </Link>
              </li>

              <li>
                <Link to="/#scholarships">
                  CIMB ASEAN
                </Link>
              </li>

              <li>
                <Link to="/#scholarships">
                  BJUT China
                </Link>
              </li>

              <li>
                <Link to="/#scholarships">
                  GKS Korea
                </Link>
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
                <Link to="/#how">
                  How it works
                </Link>
              </li>

              <li>
                <Link to="/#how">
                  Eligibility
                </Link>
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
                <Link to="/#about">
                  About
                </Link>
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