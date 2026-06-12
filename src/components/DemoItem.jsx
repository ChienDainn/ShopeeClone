import BeforeAfter from './BeforeAfter'

export default function DemoItem({ title, meaning, usage, when, before, after, children }) {
  return (
    <li className="demo-item">
      <strong className="demo-item__title">{title}</strong>
      <p className="demo-item__meaning">
        <span>Nghĩa là gì:</span> {meaning}
      </p>
      <p className="demo-item__usage">
        <span>Cách dùng:</span> {usage}
      </p>
      {when && (
        <p className="demo-item__when">
          <span>Khi nào dùng:</span> {when}
        </p>
      )}
      {(before || after) && <BeforeAfter before={before} after={after} />}
      {children && (
        <div className="demo-item__live">
          <span>Chạy thử:</span>
          <div className="demo-item__live-content">{children}</div>
        </div>
      )}
    </li>
  )
}
