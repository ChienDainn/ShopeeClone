import { NavLink, Outlet } from 'react-router-dom'
import { routeGroups } from '../routes/routes'

export default function AppLayout() {
  return (
    <div className="app-layout">
      <aside className="app-sidebar">
        <NavLink to="/" className="app-sidebar__home" end>
          Ôn tập JS & React
        </NavLink>
        {routeGroups.map((group) => (
          <div key={group.label} className="app-sidebar__group">
            <p className="app-sidebar__label">{group.label}</p>
            <nav className="app-sidebar__nav">
              {group.routes.map((route) => (
                <NavLink
                  key={route.path}
                  to={`/${route.path}`}
                  className={({ isActive }) =>
                    `app-sidebar__link${isActive ? ' app-sidebar__link--active' : ''}`
                  }
                >
                  {route.label}
                </NavLink>
              ))}
            </nav>
          </div>
        ))}
      </aside>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
