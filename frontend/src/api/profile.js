export const completeOnboarding = async (
    token,
    formData
) => {

    const response = await fetch(
        "http://localhost:3000/onboarding",
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