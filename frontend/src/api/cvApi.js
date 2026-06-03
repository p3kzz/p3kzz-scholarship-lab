const API_URL = import.meta.env.VITE_API_URL

export async function uploadCV(file, token) {
  const formData = new FormData()
  formData.append("cv", file)

  const response = await fetch(`${API_URL}/profile/upload-cv`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  })

  if (!response.ok) throw new Error("Failed to upload CV")
  return response.json()
}

export async function parseCV(token) {
  const response = await fetch(`${API_URL}/profile/parse-cv`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) throw new Error("Failed to parse CV")
  return response.json()
}