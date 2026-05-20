export default function Dropdown({ label, value, onChange, options = [], placeholder = "Select..." }) {
  return (
    <div className="field-group">
      {label && <label className="field-label">{label}</label>}
      <select value={value} onChange={e => onChange(e.target.value)} className="field-select">
        <option value="">{placeholder}</option>
        {options.map(opt => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
    </div>
  )
}