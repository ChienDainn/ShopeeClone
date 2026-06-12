import { useEffect, useRef, useState } from 'react'
import Button from '../components/Button'
import DemoItem from '../components/DemoItem'

export default function Section12UseRef() {
  const inputRef = useRef(null)
  const timerRef = useRef(null)
  const [text, setText] = useState('')
  const [elapsed, setElapsed] = useState(0)

  const stopTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = null
  }

  const startTimer = () => {
    if (timerRef.current) return
    timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000)
  }

  useEffect(() => {
    inputRef.current?.focus()
    return () => stopTimer()
  }, [])

  return (
    <section className="demo-section">
      <h2>12. useRef — Tham chiếu không gây re-render</h2>
      <p className="demo-section-intro">
        useRef tạo object {`{ current: value }`} giữ nguyên giữa các lần render. Đổi ref.current không làm component render lại — khác useState.
      </p>
      <ul className="demo-list">
        <DemoItem
          title="Ví dụ 1: Focus input (DOM ref)"
          meaning="Gán ref vào thuộc tính ref của phần tử JSX → ref.current trỏ tới node DOM thật. Dùng để focus, scroll, đo kích thước."
          usage="const inputRef = useRef(null) — <input ref={inputRef} /> — inputRef.current.focus()"
          when="Focus ô nhập khi mở modal, scroll tới cuối chat, tích hợp thư viện cần DOM node (chart, map)."
          before={`function SearchBox() {
  // Không có cách 'sạch' lấy DOM
  // trước khi có ref
  return <input />
}`}
          after={`const inputRef = useRef(null)

useEffect(() => {
  inputRef.current.focus()
}, [])

return <input ref={inputRef} />`}
        >
          <input
            ref={inputRef}
            className="demo-input"
            type="text"
            placeholder="Tự focus khi vào trang"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={() => inputRef.current?.focus()}>Focus lại</Button>
        </DemoItem>

        <DemoItem
          title="Ví dụ 2: Lưu timer id (không cần render)"
          meaning="ref.current lưu id từ setInterval/setTimeout. Đổi ref không gây re-render — chỉ setState elapsed mới cập nhật UI."
          usage="const timerRef = useRef(null) — timerRef.current = setInterval(...) — clearInterval(timerRef.current)"
          when="Giữ id timer, requestId, instance thư viện — giá trị nội bộ component cần nhớ nhưng UI không hiển thị trực tiếp."
          before={`let timerId  // biến local mất khi re-render
// hoặc useState cho id → render thừa`}
          after={`const timerRef = useRef(null)

timerRef.current = setInterval(() => {
  setElapsed(s => s + 1)
}, 1000)

clearInterval(timerRef.current)`}
        >
          <p className="demo-result">Đã chạy: <strong>{elapsed}</strong> giây</p>
          <div className="demo-actions">
            <Button onClick={startTimer}>Bắt đầu</Button>
            <Button onClick={stopTimer}>Dừng</Button>
            <Button onClick={() => setElapsed(0)}>Reset</Button>
          </div>
        </DemoItem>
      </ul>
    </section>
  )
}
