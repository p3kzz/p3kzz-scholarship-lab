const API_URL = import.meta.env.VITE_API_URL

export const completeOnboarding = async (
    token,
    formData
) => {

    const response = await fetch(
        `${API_URL}/onboarding`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify(formData),
        }
    )

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }

    return data
}