import { Link } from 'react-router-dom'
import { routeGroups } from '../routes/routes'

export default function HomePage() {
  return (
    <div className="home-page">
      <header className="js-review__header">
        <h1>Ôn tập Javascript & React</h1>
        <p>
          Mỗi chủ đề có route riêng — chọn từ menu bên trái hoặc danh sách bên dưới.
          Mỗi mục có định nghĩa, cách dùng, khi nào dùng và ví dụ chạy trực tiếp.
        </p>
      </header>

      {routeGroups.map((group) => (
        <section key={group.label} className="home-page__group">
          <h2>{group.label}</h2>
          <ul className="home-page__links">
            {group.routes.map((route) => (
              <li key={route.path}>
                <Link to={`/${route.path}`}>{route.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
