import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppPagesLayout from './layouts/AppPagesLayout'
import { appRoutes, notFoundRoute } from './routes/appRoutes'

export default function App() {
  const publicRoutes = appRoutes.filter((route) => route.group === 'public')
  const shellRoutes = appRoutes.filter((route) => route.group === 'app')

  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        <Route element={<AppPagesLayout />}>
          {shellRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        <Route path={notFoundRoute.path} element={notFoundRoute.element} />
      </Routes>
    </BrowserRouter>
  )
}
