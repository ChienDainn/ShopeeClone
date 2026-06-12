import { memo, useCallback, useMemo, useState } from 'react'
import Button from '../components/Button'
import DemoItem from '../components/DemoItem'

function slowDouble(n) {
  let sum = 0
  for (let i = 0; i < 1_000_000; i++) sum += 1
  return n * 2 + (sum > 0 ? 0 : 0)
}

const ExpensiveList = memo(function ExpensiveList({ items, onSelect }) {
  return (
    <ul className="inline-list">
      {items.map((item) => (
        <li key={item}>
          <button type="button" className="demo-btn" onClick={() => onSelect(item)}>
            {item}
          </button>
        </li>
      ))}
    </ul>
  )
})

export default function Section14UseMemoCallback() {
  const [number, setNumber] = useState(1)
  const [dark, setDark] = useState(false)
  const [selected, setSelected] = useState(null)
  const [unrelated, setUnrelated] = useState(0)

  const doubled = useMemo(() => slowDouble(number), [number])
  const items = useMemo(() => ['Áo', 'Quần', 'Giày'], [])
  const handleSelect = useCallback((item) => setSelected(item), [])

  return (
    <section className="demo-section">
      <h2>14. useMemo & useCallback — Tối ưu re-render</h2>
      <p className="demo-section-intro">
        useMemo cache kết quả tính toán; useCallback cache hàm. Cả hai chỉ tạo lại khi dependency đổi — giúp tránh tính toán nặng và re-render con không cần thiết.
      </p>
      <ul className="demo-list">
        <DemoItem
          title="Ví dụ 1: useMemo — cache kết quả tính toán"
          meaning="useMemo(() => compute(a, b), [a, b]) chỉ chạy compute lại khi a hoặc b đổi. Các lần render khác trả về giá trị đã cache."
          usage="const total = useMemo(() => items.reduce(...), [items])"
          when="Filter/sort list lớn, tính toán nặng, tạo object/array truyền xuống component con đã bọc memo."
          before={`function Cart({ items }) {
  // Chạy lại MỖI lần render
  const total = items.reduce((s, i) => s + i.price, 0)
  return <p>{total}</p>
}`}
          after={`const doubled = useMemo(
  () => slowDouble(number),
  [number]  // chỉ tính lại khi number đổi
)`}
        >
          <div className="demo-actions">
            <Button onClick={() => setNumber((n) => n + 1)}>number: {number}</Button>
            <Button onClick={() => setUnrelated((u) => u + 1)}>unrelated: {unrelated}</Button>
          </div>
          <p className="demo-result">
            doubled = {doubled} (useMemo chỉ tính lại khi number đổi, không phải unrelated)
          </p>
        </DemoItem>

        <DemoItem
          title="Ví dụ 2: useCallback — cache hàm truyền xuống con"
          meaning="useCallback(fn, deps) trả về cùng tham chiếu hàm giữa các render nếu deps không đổi. Con bọc memo sẽ không re-render vì prop function 'mới' mỗi lần."
          usage="const onSave = useCallback(() => save(data), [data]) — <Child onSave={onSave} />"
          when="Truyền callback xuống component con đã React.memo, hoặc làm dependency của useEffect."
          before={`function Parent() {
  const [dark, setDark] = useState(false)

  // Hàm mới mỗi render → con memo vẫn re-render
  const onSelect = (item) => setSelected(item)

  return <ExpensiveList onSelect={onSelect} />
}`}
          after={`const handleSelect = useCallback(
  (item) => setSelected(item),
  []  // cùng tham chiếu hàm
)

return (
  <ExpensiveList
    items={items}
    onSelect={handleSelect}
  />
)`}
        >
          <div className="demo-actions">
            <Button onClick={() => setDark((d) => !d)}>Toggle theme: {dark ? 'dark' : 'light'}</Button>
          </div>
          <ExpensiveList items={items} onSelect={handleSelect} />
          <p className="demo-result">Đã chọn: {selected ?? 'chưa chọn'}</p>
        </DemoItem>
      </ul>
    </section>
  )
}
