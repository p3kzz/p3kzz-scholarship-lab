import axios from "axios"

const API_URL =
    "http://localhost:3000"

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
            `http://localhost:3000/feedback/status/${scholarshipId}`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        )

    return response.json()
}