# Ôn tập kiến thức Javascript

Dưới đây là những kiến thức của Javascript mà trong React thường dùng.

Nếu bạn đã nắm chắc được những kiến thức này có thể bỏ qua chương này

## 1. Destructuring, Rest parameter, Spread Syntax

**Destructuring** — tách giá trị từ object/array:

```js
const user = { name: 'An', age: 20 };
const { name, age } = user;
console.log(name); // 'An'
```

**Rest parameter** — gom các tham số còn lại vào một mảng:

```js
function sum(first, ...rest) {
  return rest.reduce((total, n) => total + n, first);
}
sum(1, 2, 3, 4); // 10
```

**Spread Syntax** — sao chép hoặc trộn mảng/object:

```js
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]

const obj1 = { a: 1 };
const obj2 = { ...obj1, b: 2 }; // { a: 1, b: 2 }
```

---

## 2. Tham trị và tham chiếu

**Kiểu nguyên thủy (tham trị)** — gán lại không ảnh hưởng biến gốc:

```js
let a = 10;
let b = a;
b = 20;
console.log(a); // 10
```

**Object/Array (tham chiếu)** — cùng trỏ tới một vùng nhớ:

```js
const obj1 = { x: 1 };
const obj2 = obj1;
obj2.x = 99;
console.log(obj1.x); // 99
```

**Sao chép mảng để tránh mutate** — pattern hay dùng trong React:

```js
const items = [1, 2, 3];
const newItems = [...items, 4]; // tạo mảng mới, không đổi items
```

---

## 3. Toán tử logic, template string

**`&&`** — render có điều kiện (React):

```js
const isLoggedIn = true;
return isLoggedIn && <button>Đăng xuất</button>;
```

**`||` và `??`** — giá trị mặc định:

```js
const name = user.name || 'Khách';
const count = data.count ?? 0; // chỉ fallback khi null/undefined
```

**Template string** — nối chuỗi và biểu thức:

```js
const product = 'Áo thun';
const price = 150000;
console.log(`${product} - ${price.toLocaleString('vi-VN')}đ`);
```

---

## 4. ES6 class và `this`

**Khai báo class cơ bản:**

```js
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  getLabel() {
    return `${this.name}: ${this.price}đ`;
  }
}
```

**`this` trong method** — gọi qua instance:

```js
const p = new Product('Quần jean', 299000);
console.log(p.getLabel()); // 'Quần jean: 299000đ'
```

**Bind `this` khi truyền callback** (trước khi dùng arrow function):

```js
class Counter {
  constructor() {
    this.count = 0;
  }
  increment() {
    this.count++;
  }
}
const c = new Counter();
const fn = c.increment.bind(c);
fn();
console.log(c.count); // 1
```

---

## 5. Các loại function: arrow function, HOC, currying, callback

**Arrow function** — không có `this` riêng, gọn cho callback:

```js
const numbers = [1, 2, 3];
const doubled = numbers.map((n) => n * 2); // [2, 4, 6]
```

**Callback** — truyền function làm tham số:

```js
function fetchData(onSuccess, onError) {
  setTimeout(() => onSuccess({ id: 1, name: 'SP A' }), 500);
}
fetchData(
  (data) => console.log(data),
  (err) => console.error(err)
);
```

**HOC (Higher-Order Component)** — function nhận component, trả component mới:

```js
function withLoading(WrappedComponent) {
  return function WithLoading(props) {
    if (props.isLoading) return <p>Đang tải...</p>;
    return <WrappedComponent {...props} />;
  };
}
```

---

## 6. Bất đồng bộ với Promise, async/await

**Tạo và dùng Promise:**

```js
const getUser = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve({ id: 1, name: 'An' }), 300);
  });

getUser().then((user) => console.log(user));
```

**`.catch()` xử lý lỗi:**

```js
fetch('/api/products')
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error('Lỗi:', err));
```

**`async/await`** — viết bất đồng bộ như đồng bộ:

```js
async function loadProducts() {
  try {
    const res = await fetch('/api/products');
    const products = await res.json();
    return products;
  } catch (error) {
    console.error(error);
  }
}
```

---

## 7. ES6 module

**Export named:**

```js
// utils/math.js
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;
```

**Export default:**

```js
// components/Button.jsx
export default function Button({ children }) {
  return <button>{children}</button>;
}
```

**Import:**

```js
import Button from './components/Button';
import { add, multiply } from './utils/math';
```

---

## 8. DOM

**Chọn phần tử:**

```js
const title = document.querySelector('h1');
const items = document.querySelectorAll('.product-item');
```

**Thay đổi nội dung và class:**

```js
title.textContent = 'Shopee Clone';
title.classList.add('active');
title.classList.remove('hidden');
```

**Lắng nghe sự kiện:**

```js
const btn = document.getElementById('add-cart');
btn.addEventListener('click', () => {
  console.log('Đã thêm vào giỏ');
});
```

---

## 9. Storage (Local Storage, Cookie, Session Storage)

**Local Storage** — lưu lâu dài, không tự hết hạn:

```js
localStorage.setItem('cart', JSON.stringify([{ id: 1, qty: 2 }]));
const cart = JSON.parse(localStorage.getItem('cart'));
localStorage.removeItem('cart');
```

**Session Storage** — mất khi đóng tab:

```js
sessionStorage.setItem('token', 'abc123');
const token = sessionStorage.getItem('token');
```

**Cookie** — gửi kèm request, có thể set hạn:

```js
document.cookie = 'theme=dark; path=/; max-age=86400';
console.log(document.cookie); // 'theme=dark'
```
