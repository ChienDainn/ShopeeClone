export default function Button({ children, onClick, className = '' }) {
  return (
    <button type="button" className={`demo-btn ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}
