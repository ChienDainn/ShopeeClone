export default function BeforeAfter({ before, after }) {
  return (
    <div className="before-after">
      <div className="before-after__box before-after__box--before">
        <span className="before-after__tag">Trước</span>
        <pre className="before-after__code"><code>{before}</code></pre>
      </div>
      <div className="before-after__arrow" aria-hidden="true">
        →
      </div>
      <div className="before-after__box before-after__box--after">
        <span className="before-after__tag">Sau</span>
        <pre className="before-after__code"><code>{after}</code></pre>
      </div>
    </div>
  )
}
