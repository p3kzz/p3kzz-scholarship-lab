const API_URL = import.meta.env.VITE_API_URL

const AI_URL =
  "https://ydmhmhm-scholarshipid.hf.space"

export async function uploadCV(file, token) {
  const formData = new FormData()

  formData.append("cv", file)

  const response = await fetch(
    `${API_URL}/profile/upload-cv`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to upload CV"
    )
  }

  return data
}

export async function parseCV(file) {
  const formData = new FormData()

  formData.append("file", file)

  const response = await fetch(
    `${AI_URL}/parse-cv`,
    {
      method: "POST",
      body: formData,
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.detail ||
      "Failed to parse CV"
    )
  }

  return data
}