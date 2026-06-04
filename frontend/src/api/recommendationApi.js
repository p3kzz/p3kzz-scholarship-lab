import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL

export async function getRecommendations() {

    const token =
        localStorage.getItem("token")

    const response =
        await axios.get(
            `${API_URL}/recommendations`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        )

    return response.data
}