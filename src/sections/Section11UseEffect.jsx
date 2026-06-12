import { useEffect, useState } from 'react'
import DemoItem from '../components/DemoItem'

const mockFetchUser = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve({ name: 'An', role: 'admin' }), 800)
  })

export default function Section11UseEffect() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    let cancelled = false
    mockFetchUser().then((data) => {
      if (!cancelled) {
        setUser(data)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    document.title = `Đếm: ${seconds}s — Ôn tập React`
  }, [seconds])

  return (
    <section className="demo-section">
      <h2>11. useEffect — Side effect sau render</h2>
      <p className="demo-section-intro">
        useEffect chạy sau khi component render xong. Dùng cho gọi API, đăng ký timer, đồng bộ document, subscribe event — những việc không nên làm trực tiếp trong thân component.
      </p>
      <ul className="demo-list">
        <DemoItem
          title="Ví dụ 1: Gọi API khi mount (dependency [])"
          meaning="useEffect(fn, []) chỉ chạy 1 lần sau render đầu — tương đương componentDidMount. Return cleanup để hủy request nếu component unmount."
          usage={`useEffect(() => {
  fetch('/api/user').then(r => r.json()).then(setUser)
  return () => { cancelled = true }
}, [])`}
          when="Load dữ liệu ban đầu: user profile, danh sách sản phẩm, cấu hình app khi vào trang."
          before={`function Profile() {
  const [user, setUser] = useState(null)

  // ❌ Gọi fetch trực tiếp trong body
  // → chạy mỗi lần render, có thể loop vô hạn
  fetch('/api/user').then(...)

  return <p>{user?.name}</p>
}`}
          after={`useEffect(() => {
  let cancelled = false
  fetch('/api/user')
    .then(r => r.json())
    .then(data => {
      if (!cancelled) setUser(data)
    })
  return () => { cancelled = true }
}, [])`}
        >
          <p className="demo-result">
            {loading ? 'Đang tải user...' : `User: ${user.name} (${user.role})`}
          </p>
        </DemoItem>

        <DemoItem
          title="Ví dụ 2: Timer + cleanup (dependency [seconds])"
          meaning="useEffect(fn, [dep]) chạy lại mỗi khi dep đổi. Hàm return cleanup chạy trước lần effect tiếp theo hoặc khi unmount — tránh memory leak."
          usage={`useEffect(() => {
  const id = setInterval(() => setSeconds(s => s + 1), 1000)
  return () => clearInterval(id)
}, [seconds])`}
          when="setInterval, addEventListener, WebSocket — bất kỳ side effect cần dọn dẹp khi component rời trang hoặc dependency đổi."
          before={`useEffect(() => {
  setInterval(() => {
    setSeconds(s => s + 1)
  }, 1000)
  // ❌ Không clear → nhiều timer chồng lên nhau
}, [])`}
          after={`useEffect(() => {
  const id = setInterval(() => {
    setSeconds(s => s + 1)
  }, 1000)
  return () => clearInterval(id)  // ✅ dọn timer
}, [])`}
        >
          <p className="demo-result">
            Đã ở trang này: <strong>{seconds}</strong> giây (title tab cũng đổi theo)
          </p>
        </DemoItem>
      </ul>
    </section>
  )
}
