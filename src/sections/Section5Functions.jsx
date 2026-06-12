import { useEffect, useState } from 'react'
import DemoItem from '../components/DemoItem'
import { withLoading } from '../components/withLoading'

function ProductList({ items }) {
  return (
    <ul className="inline-list">
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}

const ProductListWithLoading = withLoading(ProductList)

function fetchData(onSuccess) {
  setTimeout(() => onSuccess({ id: 1, name: 'SP A' }), 500)
}

export default function Section5Functions() {
  const [callbackResult, setCallbackResult] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hocItems, setHocItems] = useState([])

  useEffect(() => {
    fetchData(
      (data) => setCallbackResult(JSON.stringify(data)),
      (err) => setCallbackResult(`Lỗi: ${err}`),
    )

    const timer = setTimeout(() => {
      setIsLoading(false)
      setHocItems([{ id: 1, name: 'Áo thun' }, { id: 2, name: 'Quần jean' }])
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="demo-section">
      <h2>5. Arrow function, HOC, callback</h2>
      <p className="demo-section-intro">
        Function là nền tảng của React: component là function, event handler là function, và pattern callback/HOC giúp tái sử dụng logic UI.
      </p>
      <ul className="demo-list">
        <DemoItem
          title="Arrow function"
          meaning="Cú pháp (params) => expression; không có this riêng, viết gọn hơn function thường."
          usage="Callback trong map/filter, event handler, truyền function ngắn vào props."
          before={`const numbers = [1, 2, 3]

const doubled = numbers.map(function(n) {
  return n * 2
})`}
          after={`const doubled = numbers.map((n) => n * 2)

// [2, 4, 6]`}
        />
        <DemoItem
          title="Callback"
          meaning="Truyền một function vào function khác; function bên trong gọi lại khi xong việc."
          usage="Xử lý bất đồng bộ, event, hoặc báo kết quả sau setTimeout/fetch."
          before={`fetchData()
// Không biết khi nào xong,
// không nhận được data`}
          after={`fetchData(
  (data) => console.log(data),  // gọi khi xong
  (err) => console.error(err)
)

// Sau 500ms → { id: 1, name: 'SP A' }`}
        >
          {callbackResult ?? 'Đang chờ callback...'}
        </DemoItem>
        <DemoItem
          title="HOC (Higher-Order Component)"
          meaning="Function nhận component, bọc thêm logic (loading, auth...), trả về component mới."
          usage="Tái sử dụng logic UI chung; hiện nay hooks (useXxx) thường được ưa chuộng hơn."
          before={`<ProductList items={items} />
// Luôn render list,
// phải copy logic loading ở mọi nơi`}
          after={`const List = withLoading(ProductList)

<List isLoading={true} items={[]} />
// → 'Đang tải...'

<List isLoading={false} items={items} />
// → hiện danh sách`}
        >
          <ProductListWithLoading isLoading={isLoading} items={hocItems} />
        </DemoItem>
      </ul>
    </section>
  )
}
