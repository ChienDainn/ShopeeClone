import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import DemoItem from '../components/DemoItem'

function UserDetail() {
  const { userId } = useParams()
  return <p className="demo-result">Đang xem user có id = <strong>{userId}</strong></p>
}

function RouterSandbox() {
  return (
    <Routes>
      <Route path="user/:userId" element={<UserDetail />} />
      <Route
        path="*"
        element={<p className="demo-result">Chọn user bên dưới để thấy useParams</p>}
      />
    </Routes>
  )
}

export default function Section15ReactRouter() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <section className="demo-section">
      <h2>15. React Router — Điều hướng trang</h2>
      <p className="demo-section-intro">
        React Router map URL với component. App của bạn đang dùng BrowserRouter, Routes, Route, NavLink — mỗi chủ đề học có path riêng (ví dụ /react/use-state).
      </p>
      <ul className="demo-list">
        <DemoItem
          title="Ví dụ 1: Route + NavLink (menu active)"
          meaning="Route path='...' element={Component} — khi URL khớp path thì render component. NavLink tự thêm class active khi đang ở đúng route."
          usage={`<Routes>
  <Route path="/products" element={<Products />} />
</Routes>
<NavLink to="/products">Sản phẩm</NavLink>`}
          when="App nhiều trang: home, chi tiết SP, giỏ hàng, profile — thay vì render tất cả section trên 1 trang dài."
          before={`function App() {
  return (
    <>
      <Section1 />
      <Section2 />
      ...  // scroll 1 trang dài
    </>
  )
}`}
          after={`<BrowserRouter>
  <nav>
    <NavLink to="/js/destructuring">1</NavLink>
    <NavLink to="/react/use-state">10</NavLink>
  </nav>
  <Routes>
    <Route path="/js/destructuring" element={<Section1 />} />
    <Route path="/react/use-state" element={<Section10 />} />
  </Routes>
</BrowserRouter>`}
        >
          <p className="demo-result">
            URL hiện tại: <code>{location.pathname}</code>
          </p>
          <div className="demo-actions">
            <NavLink to="/react/use-state" className="demo-link">
              → useState
            </NavLink>
            <NavLink to="/react/use-effect" className="demo-link">
              → useEffect
            </NavLink>
            <Link to="/" className="demo-link">
              → Trang chủ
            </Link>
          </div>
        </DemoItem>

        <DemoItem
          title="Ví dụ 2: useNavigate + useParams (route động)"
          meaning="useNavigate() trả về hàm chuyển trang bằng code (sau login, sau submit). useParams() đọc tham số từ URL như /user/:userId."
          usage={`const navigate = useNavigate()
navigate('/dashboard')

const { userId } = useParams()
// URL /user/42 → userId = '42'`}
          when="Chuyển trang sau đăng nhập, redirect 404, trang chi tiết /product/:id, /user/:userId."
          before={`// Đổi URL thủ công
window.location.href = '/user/42'
// → reload cả trang, mất state React`}
          after={`const navigate = useNavigate()
navigate('/user/42')  // SPA, không reload

const { userId } = useParams()
// đọc id từ URL`}
        >
          <div className="demo-actions">
            <Button onClick={() => navigate('user/42')}>navigate('user/42')</Button>
            <Button onClick={() => navigate('user/99')}>navigate('user/99')</Button>
            <Button onClick={() => navigate('.')}>Reset sandbox</Button>
          </div>
          <div className="router-sandbox">
            <p className="demo-result">
              Sandbox path: <code>{location.pathname.replace('/react/router', '') || '/'}</code>
            </p>
            <RouterSandbox />
          </div>
        </DemoItem>
      </ul>
    </section>
  )
}
