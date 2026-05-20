import { useState } from "react"

export default function TagInput({ label, subLabel, tags = [], onChange }) {
  const [input, setInput] = useState("")

  const addTag = () => {
    const val = input.trim().replace(",", "")
    if (!val || tags.includes(val)) return
    onChange([...tags, val])
    setInput("")
  }

  const removeTag = (tag) => onChange(tags.filter(t => t !== tag))

  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <div className="skill-card">
      {label && <div className="skill-card-title">{label}</div>}
      {subLabel && <div className="skill-card-sub">{subLabel}</div>}
      <div className="skill-tags">
        {tags.map(tag => (
          <span key={tag} className="skill-tag">
            {tag}
            <span className="skill-tag-x" onClick={() => removeTag(tag)}>✕</span>
          </span>
        ))}
      </div>
      <div className="skill-input-row">
        <input
          className="skill-inp"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type and press Enter..."
        />
        <button type="button" className="skill-add" onClick={addTag}>add</button>
      </div>
      <div className="skill-hint">Press Enter or comma to add</div>
    </div>
  )
}