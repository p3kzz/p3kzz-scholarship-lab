import 'bootstrap/dist/css/bootstrap.min.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import "./styles/landing.css"
import { ProfileProvider } from './context/ProfileContext'
import { AuthProvider } from './context/AuthContext'
import { GoogleOAuthProvider } from "@react-oauth/google"
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
    >
      <AuthProvider>
        <ProfileProvider>
          <App />
        </ProfileProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
