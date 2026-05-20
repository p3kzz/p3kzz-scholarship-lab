export default function RangeSlider({ label, value, onChange, min = 0, max = 100 }) {
  const getLabel = (val) => {
    if (val >= 90) return `${val} — Excellent`
    if (val >= 80) return `${val} — Very good`
    if (val >= 70) return `${val} — Good`
    if (val >= 60) return `${val} — Average`
    return `${val} — Below average`
  }

  return (
    <div className="field-group">
      {label && <label className="field-label">{label}</label>}
      <div className="range-row">
        <div className="range-disp">{value}</div>
        <div className="range-unit">/{max}</div>
      </div>
      <div className="range-track">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
        />
        <div className="range-labels">
          <span>{min}</span>
          <span>{getLabel(value)}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  )
}