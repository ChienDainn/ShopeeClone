import DemoItem from '../components/DemoItem'

export default function Section2Reference() {
  return (
    <section className="demo-section">
      <h2>2. Tham trị và tham chiếu</h2>
      <p className="demo-section-intro">
        Hiểu sự khác nhau giữa kiểu nguyên thủy và object/array giúp tránh bug khi cập nhật state — React chỉ re-render khi state thực sự thay đổi (thường cần tạo bản copy mới).
      </p>
      <ul className="demo-list">
        <DemoItem
          title="Tham trị (primitive)"
          meaning="number, string, boolean... khi gán sang biến khác thì copy giá trị; đổi biến mới không ảnh hưởng biến cũ."
          usage="An toàn khi gán đơn giản; không lo bị sửa nhầm từ biến khác."
          before={`let a = 10
let b = a      // b nhận giá trị 10
b = 20         // chỉ đổi b`}
          after={`a = 10   // ← a KHÔNG đổi
b = 20`}
        />
        <DemoItem
          title="Tham chiếu (object/array)"
          meaning="Hai biến cùng trỏ tới một vùng nhớ; sửa qua biến này sẽ thấy ở biến kia."
          usage="Cần cẩn thận khi mutate object/array — dễ gây side effect không mong muốn."
          before={`const obj1 = { x: 1 }
const obj2 = obj1   // cùng 1 object
obj2.x = 99         // sửa qua obj2`}
          after={`obj1.x = 99   // ← obj1 cũng đổi!
obj2.x = 99         // cùng kết quả`}
        />
        <DemoItem
          title="Sao chép mảng (immutable)"
          meaning="Tạo mảng mới thay vì sửa mảng cũ (spread, map, filter...)."
          usage="Pattern chuẩn khi setState trong React: luôn trả về dữ liệu mới để React nhận biết thay đổi."
          before={`const items = [1, 2, 3]
items.push(4)       // sửa mảng gốc ❌

// React có thể không re-render
setItems(items)`}
          after={`const items = [1, 2, 3]
const newItems = [...items, 4]  // mảng mới ✅

// items vẫn [1,2,3]
setItems(newItems)  // React thấy thay đổi`}
        />
      </ul>
    </section>
  )
}
