import Button from '../components/Button'
import DemoItem from '../components/DemoItem'
import { add, multiply } from '../utils/math'

export default function Section7Module() {
  return (
    <section className="demo-section">
      <h2>7. ES6 module</h2>
      <p className="demo-section-intro">
        Chia code thành nhiều file, export/import rõ ràng — mỗi component, hook, util thường là một module riêng trong dự án React.
      </p>
      <ul className="demo-list">
        <DemoItem
          title="Named export / import"
          meaning="Export nhiều thứ từ một file; import phải đúng tên trong { }."
          usage="Utils, constants, nhiều function nhỏ: import { add } from './utils/math'."
          before={`// Tất cả code trong 1 file App.jsx
function add(a, b) { return a + b }
function multiply(a, b) { return a * b }
// File dài, khó tái sử dụng`}
          after={`// utils/math.js
export const add = (a, b) => a + b
export const multiply = (a, b) => a * b

// App.jsx
import { add, multiply } from './utils/math'
add(2, 3)  // → 5`}
        >
          add(2, 3) = {add(2, 3)}, multiply(4, 5) = {multiply(4, 5)}
        </DemoItem>
        <DemoItem
          title="Default export / import"
          meaning="Mỗi file thường có một export chính; import tên tùy ý."
          usage="Component React: export default function Button() — import Button from './Button'."
          before={`// Viết button inline mỗi lần dùng
<button type="button">Mua ngay</button>
<button type="button">Thêm giỏ</button>
// Lặp code, khó đồng bộ style`}
          after={`// components/Button.jsx
export default function Button({ children }) {
  return <button>{children}</button>
}

// Dùng lại ở nhiều nơi
import Button from './components/Button'
<Button>Mua ngay</Button>`}
        >
          <Button onClick={() => alert('Button từ default export')}>
            Mua ngay
          </Button>
        </DemoItem>
      </ul>
    </section>
  )
}
