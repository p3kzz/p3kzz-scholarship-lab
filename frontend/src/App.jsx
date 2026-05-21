import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

// Auth
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"

// Onboarding
import OnboardingStart from "./pages/onboarding/OnboardingStart"
import CVUpload from "./pages/onboarding/CVUpload"
import OnboardingLayout from "./pages/onboarding/OnboardingLayout"
import Step1Personal from "./pages/onboarding/Step1Personal"
import Step2Academic from "./pages/onboarding/Step2Academic"
import Step3Skills from "./pages/onboarding/Step3Skills"
import ReviewPage from "./pages/onboarding/ReviewPage"
import ProcessingPage from "./pages/onboarding/ProcessingPage"

// Main
import LandingPage from "./pages/LandingPage"
import DashboardPage from "./pages/dashboard/DashboardPage"
import ProfilePage from "./pages/profile/ProfilePage"
import EditProfilePage from "./pages/profile/EditProfilePage"
import MatchResultPage from "./pages/matching/MatchResultPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Onboarding */}
        <Route path="/onboarding" element={<OnboardingLayout />}>
          <Route index element={<OnboardingStart />} />
          <Route path="cv-upload" element={<CVUpload />} />
          <Route path="step1" element={<Step1Personal />} />
          <Route path="step2" element={<Step2Academic />} />
          <Route path="step3" element={<Step3Skills />} />
          <Route path="review" element={<ReviewPage />} />
          <Route path="processing" element={<ProcessingPage />} />
        </Route>

        {/* App */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/match" element={<MatchResultPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App