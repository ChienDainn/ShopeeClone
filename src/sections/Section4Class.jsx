import DemoItem from '../components/DemoItem'

export default function Section4Class() {
  return (
    <section className="demo-section">
      <h2>4. ES6 class và this</h2>
      <p className="demo-section-intro">
        Class gom data và method vào một kiểu; this trỏ tới instance hiện tại. React chủ yếu dùng function component, nhưng vẫn gặp class trong thư viện cũ hoặc khi đọc code legacy.
      </p>
      <ul className="demo-list">
        <DemoItem
          title="ES6 class"
          meaning="Cú pháp tạo kiểu đối tượng có constructor (khởi tạo) và method (hành vi)."
          usage="Đóng gói logic liên quan một entity: Product, User, Order..."
          before={`// Trước ES6 — function + prototype
function Product(name, price) {
  this.name = name
  this.price = price
}
Product.prototype.getLabel = function() {
  return this.name + ': ' + this.price
}`}
          after={`class Product {
  constructor(name, price) {
    this.name = name
    this.price = price
  }
  getLabel() {
    return \`\${this.name}: \${this.price}đ\`
  }
}

new Product('Quần jean', 299000)
  .getLabel()
// → 'Quần jean: 299.000đ'`}
        />
        <DemoItem
          title="this trong method"
          meaning="this trong method trỏ tới instance đang gọi method đó."
          usage="Truy cập thuộc tính của chính object khi gọi p.getLabel()."
          before={`const p = new Product('Quần jean', 299000)

// Trong getLabel(), this = p
// this.name → 'Quần jean'
// this.price → 299000`}
          after={`p.getLabel()
// → 'Quần jean: 299.000đ'

// this trỏ đúng instance p`}
        />
        <DemoItem
          title="bind(this)"
          meaning="Tạo function mới với this bị khóa cố định vào instance."
          usage="Trước đây dùng khi truyền method làm callback để this không bị mất; arrow function trong class field thường thay thế."
          before={`const c = new Counter()  // count = 0

const fn = c.increment
fn()  // this bị mất → lỗi hoặc count không đổi`}
          after={`const fn = c.increment.bind(c)
fn()  // this = c

c.count  // → 1 ✅`}
        />
      </ul>
    </section>
  )
}
