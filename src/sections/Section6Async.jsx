import { useEffect, useState } from 'react'
import DemoItem from '../components/DemoItem'

const getUser = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve({ id: 1, name: 'An' }), 300)
  })

const mockFetchProducts = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.3
        ? resolve([{ id: 1, name: 'Áo khoác' }, { id: 2, name: 'Giày' }])
        : reject(new Error('Không tải được sản phẩm'))
    }, 400)
  })

async function loadProducts() {
  try {
    const products = await mockFetchProducts()
    return products
  } catch (error) {
    return { error: error.message }
  }
}

export default function Section6Async() {
  const [promiseUser, setPromiseUser] = useState(null)
  const [fetchResult, setFetchResult] = useState(null)
  const [asyncProducts, setAsyncProducts] = useState(null)

  useEffect(() => {
    getUser().then((user) => setPromiseUser(JSON.stringify(user)))

    mockFetchProducts()
      .then((data) => setFetchResult(JSON.stringify(data)))
      .catch((err) => setFetchResult(`Lỗi: ${err.message}`))

    loadProducts().then((result) => setAsyncProducts(JSON.stringify(result)))
  }, [])

  return (
    <section className="demo-section">
      <h2>6. Promise, async/await</h2>
      <p className="demo-section-intro">
        Gọi API, đọc file, timer... thường không trả kết quả ngay. Promise và async/await giúp xử lý việc chờ đó mà không block UI.
      </p>
      <ul className="demo-list">
        <DemoItem
          title="Promise"
          meaning="Object đại diện kết quả tương lai: pending → fulfilled (thành công) hoặc rejected (lỗi)."
          usage="Bọc tác vụ bất đồng bộ; chain bằng .then() để xử lý khi xong."
          before={`getUser()
// Trạng thái: đang chờ...
// user = undefined (chưa có)`}
          after={`getUser().then((user) => {
  console.log(user)
})

// Sau 300ms:
// { id: 1, name: 'An' }`}
        >
          {promiseUser ?? 'Đang chờ...'}
        </DemoItem>
        <DemoItem
          title=".catch()"
          meaning="Bắt lỗi khi Promise bị reject hoặc throw trong .then()."
          usage="Hiển thị thông báo lỗi, fallback UI khi API fail."
          before={`fetch('/api/products')
  .then(res => res.json())
  .then(data => show(data))
// Nếu lỗi → app crash, không xử lý`}
          after={`fetch('/api/products')
  .then(res => res.json())
  .then(data => show(data))
  .catch(err => {
    showError('Lỗi: ' + err.message)
  })`}
        >
          {fetchResult ?? 'Đang chờ...'}
        </DemoItem>
        <DemoItem
          title="async/await"
          meaning="async đánh dấu function trả Promise; await tạm dừng chờ Promise resolve."
          usage="Viết code gọi API tuần tự, dễ đọc hơn chuỗi .then() dài — dùng nhiều trong useEffect."
          before={`// Nhiều .then() lồng nhau — khó đọc
fetch(url)
  .then(r => r.json())
  .then(data => {
    return fetch(url2)
      .then(r2 => r2.json())
  })`}
          after={`async function load() {
  const res = await fetch(url)
  const data = await res.json()
  return data
}

// Đọc từ trên xuống như code đồng bộ`}
        >
          {asyncProducts ?? 'Đang chờ...'}
        </DemoItem>
      </ul>
    </section>
  )
}
