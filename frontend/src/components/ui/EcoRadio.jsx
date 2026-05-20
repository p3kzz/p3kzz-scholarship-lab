export default function EcoRadio({ label, options = [], value, onChange }) {
  return (
    <div className="field-group">
      {label && <label className="field-label">{label}</label>}
      {options.map(opt => (
        <div
          key={opt}
          className={`eco-opt ${value === opt ? "eco-opt--sel" : ""}`}
          onClick={() => onChange(opt)}
        >
          <span className="eco-dot" style={{ opacity: value === opt ? 1 : 0.3 }}></span>
          {opt}
        </div>
      ))}
    </div>
  )
}