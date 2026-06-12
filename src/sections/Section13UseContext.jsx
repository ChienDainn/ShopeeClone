import { createContext, useContext, useState } from 'react'
import Button from '../components/Button'
import DemoItem from '../components/DemoItem'

const ThemeContext = createContext('light')

function ThemeBadge() {
  const theme = useContext(ThemeContext)
  return (
    <span className={`theme-badge theme-badge--${theme}`}>
      Theme hiện tại: {theme}
    </span>
  )
}

function DeepChild() {
  const theme = useContext(ThemeContext)
  return <p className="demo-result">Component sâu bên trong nhận theme = &quot;{theme}&quot;</p>
}

const AuthContext = createContext(null)

function UserGreeting() {
  const user = useContext(AuthContext)
  if (!user) return <p className="demo-result">Chưa đăng nhập</p>
  return <p className="demo-result">Xin chào, {user.name}!</p>
}

export default function Section13UseContext() {
  const [theme, setTheme] = useState('light')
  const [user, setUser] = useState(null)

  return (
    <section className="demo-section">
      <h2>13. useContext — Chia sẻ data qua cây component</h2>
      <p className="demo-section-intro">
        Context tránh truyền props qua nhiều tầng (prop drilling). Provider bọc cây component; bất kỳ con nào gọi useContext đều đọc được giá trị.
      </p>
      <ul className="demo-list">
        <DemoItem
          title="Ví dụ 1: Theme toàn app"
          meaning="createContext(default) tạo context. Provider value={theme} cung cấp giá trị. useContext(ThemeContext) đọc giá trị gần nhất phía trên."
          usage={`const ThemeContext = createContext('light')
<ThemeContext.Provider value={theme}>
  <App />
</ThemeContext.Provider>
const theme = useContext(ThemeContext)`}
          when="Theme sáng/tối, ngôn ngữ i18n, cấu hình layout — data nhiều component cần nhưng không muốn truyền props 5–6 cấp."
          before={`<Layout theme={theme}>
  <Sidebar theme={theme}>
    <Menu theme={theme}>
      <Item theme={theme} />  // prop drilling
    </Menu>
  </Sidebar>
</Layout>`}
          after={`<ThemeContext.Provider value={theme}>
  <Layout>
    <Sidebar>
      <Menu>
        <Item />  // useContext(ThemeContext)
      </Menu>
    </Sidebar>
  </Layout>
</ThemeContext.Provider>`}
        >
          <ThemeContext.Provider value={theme}>
            <div className="demo-actions">
              <ThemeBadge />
              <Button onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>
                Đổi theme
              </Button>
            </div>
            <DeepChild />
          </ThemeContext.Provider>
        </DemoItem>

        <DemoItem
          title="Ví dụ 2: Auth / User đăng nhập"
          meaning="Context có thể chứa object phức tạp (user, token). Component con đọc trực tiếp — đổi value ở Provider thì mọi consumer re-render."
          usage={`const AuthContext = createContext(null)
<AuthContext.Provider value={user}>
  <Header /><Dashboard />
</AuthContext.Provider>
const user = useContext(AuthContext)`}
          when="Thông tin user đăng nhập, quyền admin, giỏ hàng global — state dùng chung nhiều nơi trong app."
          before={`// Mỗi page tự fetch user
// hoặc truyền user xuống 10 component`}
          after={`// Login 1 lần ở App
setUser({ name: 'An' })

// Header, Profile, Menu đều:
const user = useContext(AuthContext)`}
        >
          <AuthContext.Provider value={user}>
            <div className="demo-actions">
              <UserGreeting />
              {user ? (
                <Button onClick={() => setUser(null)}>Đăng xuất</Button>
              ) : (
                <Button onClick={() => setUser({ name: 'An' })}>Đăng nhập</Button>
              )}
            </div>
          </AuthContext.Provider>
        </DemoItem>
      </ul>
    </section>
  )
}
