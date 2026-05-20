import { createContext, useContext, useState } from "react"
import { EMPTY_PROFILE } from "../constants/dropdownOptions"

const ProfileContext = createContext(null)

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(EMPTY_PROFILE)

  const updateProfile = (section, data) => {
    setProfile(prev => ({ ...prev, [section]: { ...prev[section], ...data } }))
  }

  const resetProfile = () => setProfile(EMPTY_PROFILE)

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, resetProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error("useProfile must be used inside ProfileProvider")
  return ctx
}