import { useState } from 'react'
import Button from '../components/Button'
import DemoItem from '../components/DemoItem'

export default function Section9Storage() {
  const [storageLog, setStorageLog] = useState('')

  const saveLocal = () => {
    localStorage.setItem('cart', JSON.stringify([{ id: 1, qty: 2 }]))
    const cart = JSON.parse(localStorage.getItem('cart'))
    setStorageLog(`Đọc lại: ${JSON.stringify(cart)}`)
  }

  const saveSession = () => {
    sessionStorage.setItem('token', 'abc123')
    const token = sessionStorage.getItem('token')
    setStorageLog(`Đọc lại token: ${token}`)
  }

  const saveCookie = () => {
    document.cookie = 'theme=dark; path=/; max-age=86400'
    setStorageLog(`Đọc lại cookie: ${document.cookie}`)
  }

  const clearLocal = () => {
    localStorage.removeItem('cart')
    setStorageLog('cart đã bị xóa khỏi localStorage')
  }

  return (
    <section className="demo-section">
      <h2>9. Storage (Local, Session, Cookie)</h2>
      <p className="demo-section-intro">
        Lưu dữ liệu phía trình duyệt: giỏ hàng, theme, token đăng nhập... Mỗi loại có thời hạn và cách gửi lên server khác nhau.
      </p>
      <ul className="demo-list">
        <DemoItem
          title="Local Storage"
          meaning="Lưu key-value trên trình duyệt, không hết hạn khi đóng tab (chỉ mất khi user xóa hoặc clear site data)."
          usage="Giỏ hàng, cài đặt UI, cache dữ liệu nhẹ — lưu object cần JSON.stringify/parse."
          before={`localStorage.getItem('cart')
// → null (chưa lưu gì)`}
          after={`localStorage.setItem('cart',
  JSON.stringify([{ id: 1, qty: 2 }])
)

JSON.parse(localStorage.getItem('cart'))
// → [{ id: 1, qty: 2 }]`}
        >
          <Button onClick={saveLocal}>Thử Local Storage</Button>
        </DemoItem>
        <DemoItem
          title="Session Storage"
          meaning="Giống localStorage nhưng chỉ sống trong một tab/session; đóng tab là mất."
          usage="Dữ liệu tạm phiên làm việc: token ngắn hạn, bước wizard multi-step."
          before={`sessionStorage.getItem('token')
// → null`}
          after={`sessionStorage.setItem('token', 'abc123')

sessionStorage.getItem('token')
// → 'abc123'
// Đóng tab → mất`}
        >
          <Button onClick={saveSession}>Thử Session Storage</Button>
        </DemoItem>
        <DemoItem
          title="Cookie"
          meaning="Lưu chuỗi nhỏ kèm domain/path; có thể set hạn; tự gửi kèm mỗi request HTTP tới cùng domain."
          usage="Session server-side, tracking, theme — thường do backend set HttpOnly cho bảo mật."
          before={`document.cookie
// → '' (chưa có cookie)`}
          after={`document.cookie =
  'theme=dark; path=/; max-age=86400'

document.cookie
// → 'theme=dark'`}
        >
          <Button onClick={saveCookie}>Thử Cookie</Button>
        </DemoItem>
      </ul>
      <div className="demo-actions">
        <Button onClick={clearLocal}>Xóa cart (localStorage)</Button>
      </div>
      <p className="demo-result">{storageLog || 'Bấm nút để xem kết quả sau khi lưu'}</p>
    </section>
  )
}
