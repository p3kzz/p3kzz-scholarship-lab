const API_URL = import.meta.env.VITE_API_URL

export const registerUser = async (formData) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }

    return data
}

export const loginUser = async (data) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return response.json();
};

export const googleLogin = async (credential) => {
    const response = await fetch(
        `${API_URL}/auth/google`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                credential,
            }),
        }
    )

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }

    return data
}

export const getMe = async (token) => {
    const response = await fetch(`${API_URL}/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.json();
};