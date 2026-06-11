import DemoItem from '../components/DemoItem'

export default function Section1Destructuring() {
  return (
    <section className="demo-section">
      <h2>1. Destructuring, Rest parameter, Spread Syntax</h2>
      <p className="demo-section-intro">
        Ba cú pháp ES6 giúp lấy dữ liệu, gom tham số và sao chép mảng/object nhanh hơn — rất hay gặp khi nhận props hoặc cập nhật state trong React.
      </p>
      <ul className="demo-list">
        <DemoItem
          title="Destructuring"
          meaning="Tách các thuộc tính/phần tử từ object hoặc mảng ra thành biến riêng."
          usage="Lấy nhanh props, state hoặc field từ API mà không cần viết user.name, user.age nhiều lần."
          before={`const user = { name: 'An', age: 20 }

const ten = user.name   // phải gõ user. nhiều lần
const tuoi = user.age`}
          after={`const user = { name: 'An', age: 20 }

const { name, age } = user
// name = 'An', age = 20`}
        />
        <DemoItem
          title="Rest parameter (...rest)"
          meaning="Gom phần còn lại của tham số hoặc phần tử vào một mảng."
          usage="Viết function nhận số lượng đối số không cố định, hoặc tách phần đầu ra khỏi phần còn lại."
          before={`// Không biết truyền bao nhiêu số
sum(1)
sum(1, 2, 3, 4)  // khó xử lý`}
          after={`function sum(first, ...rest) {
  // first = 1
  // rest = [2, 3, 4]
  return rest.reduce((t, n) => t + n, first)
}

sum(1, 2, 3, 4)  // → 10`}
        />
        <DemoItem
          title="Spread Syntax (...)"
          meaning="Trải các phần tử/thuộc tính của mảng hoặc object sang chỗ mới."
          usage="Sao chép mảng/object, merge state, truyền props — tránh mutate dữ liệu cũ trong React."
          before={`const arr1 = [1, 2]
const arr2 = arr1.concat(3, 4)

const obj1 = { a: 1 }
const obj2 = Object.assign({}, obj1, { b: 2 })`}
          after={`const arr1 = [1, 2]
const arr2 = [...arr1, 3, 4]  // [1,2,3,4]

const obj1 = { a: 1 }
const obj2 = { ...obj1, b: 2 }  // { a:1, b:2 }`}
        />
      </ul>
    </section>
  )
}
