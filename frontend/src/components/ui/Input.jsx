export default function Input({ label, type = "text", value, onChange, placeholder, hint }) {
  return (
    <div className="field-group">
      {label && <label className="field-label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="field-input"
      />
      {hint && <span className="field-hint">{hint}</span>}
    </div>
  )
}