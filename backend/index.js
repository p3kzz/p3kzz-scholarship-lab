const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

app.get("/test", (req, res) => {
  res.json({ message: "Backend OK" })
})

app.get("/ping", (req, res) => {
  res.json({ message: "ping dari backend" })
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})