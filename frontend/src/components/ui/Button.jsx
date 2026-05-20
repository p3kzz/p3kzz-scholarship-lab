export default function Button({ children, variant = "primary", fullWidth = false, onClick, type = "button" }) {
  const base = "btn-base"
  const variants = {
    primary: "btn-primary",
    outline: "btn-outline",
    ghost: "btn-ghost",
    neon: "btn-neon",
    dark: "btn-dark",
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${fullWidth ? "btn-full" : ""}`}
    >
      {children}
    </button>
  )
}