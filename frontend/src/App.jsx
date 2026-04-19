import { useEffect, useState } from "react"

function App() {
  const [msg, setMsg] = useState("")

  useEffect(() => {
    fetch("http://localhost:3000/test")
      .then(res => res.json())
      .then(data => setMsg(data.message))
  }, [])

  return (
    <div className="container mt-5">
      <h1>Scholarship Lab</h1>
      <p>{msg}</p>
    </div>
  )
}

export default App