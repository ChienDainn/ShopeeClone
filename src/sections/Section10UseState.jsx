import { useState } from 'react'
import Button from '../components/Button'
import DemoItem from '../components/DemoItem'

export default function Section10UseState() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  return (
    <section className="demo-section">
      <h2>10. useState — State trong component</h2>
      <p className="demo-section-intro">
        useState là Hook cơ bản nhất của React: lưu dữ liệu thay đổi theo thời gian và khiến component render lại khi state đổi.
      </p>
      <ul className="demo-list">
        <DemoItem
          title="Ví dụ 1: Đếm số (counter)"
          meaning="useState(initial) trả về mảng [giá_trị, hàm_cập_nhật]. Khi gọi setCount, React render lại component với giá trị mới."
          usage="const [count, setCount] = useState(0) — gọi setCount(count + 1) hoặc setCount((c) => c + 1) khi cần tăng."
          when="Dùng cho mọi dữ liệu UI thay đổi: số lượng giỏ hàng, bật/tắt modal, tab đang chọn, loading..."
          before={`function Counter() {
  let count = 0  // gán lại không làm UI cập nhật

  return (
    <button onClick={() => count++}>
      {count}
    </button>
  )
}`}
          after={`function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(c => c + 1)}>
      {count}
    </button>
  )
}`}
        >
          <div className="demo-actions">
            <Button onClick={() => setCount((c) => c - 1)}>-1</Button>
            <strong>{count}</strong>
            <Button onClick={() => setCount((c) => c + 1)}>+1</Button>
          </div>
        </DemoItem>

        <DemoItem
          title="Ví dụ 2: Input có kiểm soát (controlled input)"
          meaning="State lưu giá trị input; mỗi lần gõ, onChange gọi setName → React render lại và input hiển thị giá trị mới từ state."
          usage="const [name, setName] = useState('') — input value={name} onChange={(e) => setName(e.target.value)}"
          when="Form, ô tìm kiếm, filter, bất kỳ input nào cần đọc/ghi giá trị từ React (validate, submit, reset form)."
          before={`<input type="text" />
// React không biết user gõ gì
// Khó validate hoặc submit giá trị`}
          after={`const [name, setName] = useState('')

<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
<p>Xin chào, {name || 'bạn'}!</p>`}
        >
          <input
            className="demo-input"
            type="text"
            placeholder="Nhập tên..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className="demo-result">Xin chào, {name || 'bạn'}!</p>
        </DemoItem>
      </ul>
    </section>
  )
}
