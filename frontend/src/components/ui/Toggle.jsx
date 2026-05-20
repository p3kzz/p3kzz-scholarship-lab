export default function Toggle({ options = [], value, onChange }) {
  return (
    <div className="toggle-group">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          className={`toggle-opt ${value === opt ? "toggle-opt--active" : ""}`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}