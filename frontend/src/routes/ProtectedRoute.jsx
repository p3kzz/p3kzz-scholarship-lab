import { Navigate } from "react-router-dom"

import { useAuth } from "../context/AuthContext"

export default function ProtectedRoute({
    children,
}) {

    const {
        user,
        loading,
    } = useAuth()

    // LOADING
    if (loading) {
        return <div>Loading...</div>
    }

    // BELUM LOGIN
    if (!user) {
        return <Navigate to="/login" />
    }

    // BELUM ONBOARDING
    if (
        !user.profile ||
        !user.profile.isCompleted
    ) {

        return (
            <Navigate to="/onboarding" />
        )
    }

    // SUDAH SEMUA
    return children
}