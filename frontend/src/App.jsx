import { useEffect, useState } from "react"

function App() {
  const [msg, setMsg] = useState("Loading...")

  useEffect(() => {
    fetch("http://localhost:3000/ping")
      .then(res => res.json())
      .then(data => setMsg(data.message))
      .catch(err => {
        console.error(err)
        setMsg("Gagal connect ke backend")
      })
  }, [])

  return (
    <div className="container mt-5">
      <h1>Scholarship Lab</h1>
      <p>{msg}</p>
    </div>
  )
}

export default App