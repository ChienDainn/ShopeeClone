import Button from '../components/Button'
import DemoItem from '../components/DemoItem'

export default function Section3Logical() {
  const isLoggedIn = true
  const user = { name: '' }
  const data = { count: null }

  const name = user.name || 'Khách'
  const count = data.count ?? 0

  const product = 'Áo thun'
  const price = 150000
  const label = `${product} - ${price.toLocaleString('vi-VN')}đ`

  return (
    <section className="demo-section">
      <h2>3. Toán tử logic, template string</h2>
      <p className="demo-section-intro">
        Toán tử logic và template string giúp code JSX gọn hơn: render có điều kiện, gán giá trị mặc định và hiển thị chuỗi động.
      </p>
      <ul className="demo-list">
        <DemoItem
          title="&& (và logic)"
          meaning="Nếu vế trái truthy thì trả về vế phải, ngược lại trả về vế trái."
          usage="Render có điều kiện trong JSX: chỉ hiện component khi điều kiện đúng."
          before={`const isLoggedIn = true

// Cách dài
return isLoggedIn
  ? <button>Đăng xuất</button>
  : null`}
          after={`const isLoggedIn = true

// Cách ngắn trong JSX
return isLoggedIn && <button>Đăng xuất</button>`}
        >
          {isLoggedIn && <Button>Đăng xuất</Button>}
        </DemoItem>
        <DemoItem
          title="|| (hoặc logic)"
          meaning="Nếu vế trái falsy (0, '', null...) thì lấy vế phải."
          usage="Gán giá trị mặc định khi dữ liệu rỗng hoặc thiếu."
          before={`const user = { name: '' }

// user.name là chuỗi rỗng → falsy
const name = user.name`}
          after={`const name = user.name || 'Khách'

// name = 'Khách' (lấy giá trị mặc định)`}
        >
          Hiển thị: &quot;{name}&quot;
        </DemoItem>
        <DemoItem
          title="?? (nullish coalescing)"
          meaning="Chỉ fallback khi vế trái là null hoặc undefined — không coi 0 hay '' là thiếu."
          usage="Gán mặc định chính xác hơn || khi 0 hoặc chuỗi rỗng vẫn là giá trị hợp lệ."
          before={`const data = { count: null }

// count là null → cần mặc định 0
const count = data.count ?? 0

// Khác với || :
// 0 ?? 5  → 0  (giữ số 0)
// 0 || 5  → 5  (coi 0 là falsy)`}
          after={`count = 0

// Chỉ thay khi null/undefined,
// không thay khi count = 0`}
        >
          count = {count}
        </DemoItem>
        <DemoItem
          title="Template string"
          meaning="Chuỗi dùng backtick ` và ${biểu_thức} để chèn biến hoặc tính toán."
          usage="Hiển thị label, giá tiền, thông báo động trong UI."
          before={`const product = 'Áo thun'
const price = 150000

const label = product + ' - '
  + price.toLocaleString('vi-VN') + 'đ'`}
          after={`const label = \`\${product} - \${price.toLocaleString('vi-VN')}đ\`

// 'Áo thun - 150.000đ'`}
        >
          {label}
        </DemoItem>
      </ul>
    </section>
  )
}
