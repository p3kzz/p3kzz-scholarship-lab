import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../styles/review.css"
import { getRecommendations } from "../../api/recommendationApi"
import { useRef } from "react"

const STEPS = [
  "Profile saved",
  "Comparing with scholarships",
  "Generating recommendations..."
]

const recommendations =
  JSON.parse(
    localStorage.getItem(
      "recommendations"
    )
  ) || []
console.log(recommendations)


export default function ProcessingPage() {
  const hasRun = useRef(false)
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {

    if (hasRun.current) return

    hasRun.current = true

    async function processRecommendation() {

      try {

        setCurrentStep(1)

        const response =
          await getRecommendations()

        setCurrentStep(2)

        localStorage.setItem(
          "recommendations",
          JSON.stringify(
            response.recommendations
          )
        )

        setTimeout(() => {
          navigate("/match")
        }, 1000)

      } catch (error) {

        console.error(error)

      }

    }

    processRecommendation()

  }, [navigate])
console.log("BEFORE RESPONSE");
  return (
    <div className="proc-wrap">
      {/* BIG SPINNER */}
      <div className="proc-spinner">
        <svg
          className="proc-spinner-svg"
          viewBox="0 0 100 100"
          fill="none"
        >
          {/* abu */}
          <circle
            cx="50"
            cy="50"
            r="34"
            stroke="#565656"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="150 70"
          />

          {/* hijau */}
          <circle
            cx="50"
            cy="50"
            r="34"
            stroke="#08CB00"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="26 194"
            strokeDashoffset="-152"
          />
        </svg>
      </div>

      <h1 className="proc-title">
        Finding your matches...
      </h1>

      <p className="proc-sub">
        AI is analyzing your profile against available scholarships.
        This takes a few seconds.
      </p>

      <div className="proc-steps">
        {STEPS.map((step, index) => (
          <div
            key={step}
            className={`proc-step ${index === currentStep ? "active" : ""
              }`}
          >
            {index === currentStep && (
              <div className="proc-step-loader">
                <div className="proc-step-loader-inner"></div>
              </div>
            )}

            <span>{step}</span>
          </div>
        ))}
      </div>
    </div>
  )
}