import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-topline" />
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="footer-brand-row">
              <div className="footer-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9 12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                </svg>
              </div>
              <span className="footer-brand">Scholarship.Lab</span>
            </div>
            <p className="footer-desc">A smarter way for Indonesian students to find and match with global scholarship opportunities.</p>
          </div>

          <div className="footer-col">
            <h4>Scholarships</h4>
            <ul>
              <li><Link to="/#scholarships">CIMB ASEAN</Link></li>
              <li><Link to="/#scholarships">Singapore ASEAN</Link></li>
              <li><Link to="/#scholarships">Lund University</Link></li>
              <li><Link to="/#scholarships">BJUT China</Link></li>
              <li><Link to="/#scholarships">GKS Korea</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/#how">How It Works</Link></li>
              <li><Link to="/#how">Eligibility</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/#about">About</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2026 Scholarship Lab. All rights reserved.</p>
          <p className="footer-made">
            Made for Indonesian students reaching{" "}
            <span className="neon-txt">global opportunities</span>.
          </p>
        </div>
      </div>
    </footer>
  )
}