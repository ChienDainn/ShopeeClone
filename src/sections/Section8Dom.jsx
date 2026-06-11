import { useEffect, useRef, useState } from 'react'
import Button from '../components/Button'
import DemoItem from '../components/DemoItem'

export default function Section8Dom() {
  const titleRef = useRef(null)
  const [domLog, setDomLog] = useState('')

  useEffect(() => {
    const title = titleRef.current
    if (!title) return

    title.textContent = 'Shopee Clone'
    title.classList.add('active')
    title.classList.remove('hidden')

    const items = document.querySelectorAll('.product-item')
    setDomLog(`Tìm thấy ${items.length} phần tử .product-item`)
  }, [])

  const handleAddCart = () => {
    setDomLog('Đã thêm vào giỏ (sau khi click)')
  }

  return (
    <section className="demo-section">
      <h2>8. DOM</h2>
      <p className="demo-section-intro">
        DOM là cây HTML trên trình duyệt. React thường quản lý DOM qua JSX, nhưng vẫn cần biết API DOM khi dùng ref, tích hợp thư viện ngoài hoặc đọc code vanilla JS.
      </p>
      <ul className="demo-list">
        <DemoItem
          title="querySelector / querySelectorAll"
          meaning="Tìm phần tử HTML theo CSS selector (class, id, tag...)."
          usage="Lấy node để đọc/sửa khi không render qua React state (ref, plugin bên thứ ba)."
          before={`// HTML có nhiều phần tử
// Không biết lấy cái nào`}
          after={`const title = document.querySelector('h3')
const items = document.querySelectorAll('.product-item')

// items.length → 2`}
        >
          <h3 ref={titleRef} className="dom-title hidden">
            Tiêu đề gốc
          </h3>
          <ul className="inline-list">
            <li className="product-item">Sản phẩm A</li>
            <li className="product-item">Sản phẩm B</li>
          </ul>
          <p className="demo-result">{domLog}</p>
        </DemoItem>
        <DemoItem
          title="textContent, classList"
          meaning="Đổi nội dung text hoặc thêm/xóa class CSS trực tiếp trên element."
          usage="Thao tác UI imperative; trong React ưu tiên state + className thay vì sửa DOM tay."
          before={`<h3 class="dom-title hidden">
  Tiêu đề gốc
</h3>
// Text: "Tiêu đề gốc"
// Class: có "hidden"`}
          after={`title.textContent = 'Shopee Clone'
title.classList.add('active')
title.classList.remove('hidden')

// Text: "Shopee Clone"
// Class: "dom-title active"`}
        />
        <DemoItem
          title="addEventListener / onClick"
          meaning="Đăng ký lắng nghe sự kiện (click, scroll...) trên element."
          usage="Trong React thường dùng onClick trên JSX; addEventListener gặp khi gắn ref hoặc code không qua React."
          before={`// Chưa click
domLog = ''
// Không có phản hồi`}
          after={`btn.addEventListener('click', () => {
  console.log('Đã thêm vào giỏ')
})

// Sau khi click:
// domLog = 'Đã thêm vào giỏ'`}
        >
          <Button onClick={handleAddCart}>Thêm vào giỏ</Button>
          <p className="demo-result">{domLog || 'Bấm nút để thử'}</p>
        </DemoItem>
      </ul>
    </section>
  )
}
