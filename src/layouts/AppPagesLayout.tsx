import { Outlet } from 'react-router-dom'

export default function AppPagesLayout() {
  return (
    <div className="dark bg-background min-h-screen">
      <Outlet />
    </div>
  )
}
