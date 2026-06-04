import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export async function createFeedback(
    scholarshipId,
    feedbackType
) {

    const token =
        localStorage.getItem("token")

    const response =
        await axios.post(
            `${API_URL}/feedback`,
            {
                scholarshipId,
                feedbackType
            },
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        )

    return response.data
}

export async function getFeedbackStatus(
    scholarshipId
) {

    const token =
        localStorage.getItem("token")

    const response =
        await fetch(
            `${API_URL}/feedback/status/${scholarshipId}`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        )

    return response.json()
}