export default function ProgressBar({ value = 0, max = 100 }) {
  const pct = Math.round((value / max) * 100)
  return (
    <div className="completion-bar-wrap">
      <div className="completion-bar" style={{ width: `${pct}%` }}></div>
    </div>
  )
}