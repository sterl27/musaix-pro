import type { ReactElement } from 'react'
import LandingPage from '../pages/LandingPage'
import Dashboard from '../pages/Dashboard'
import Alic3X from '../pages/Alic3X'
import AudioEcosystem from '../pages/AudioEcosystem'
import MusicDiscovery from '../pages/MusicDiscovery'
import ProductionBoard from '../pages/ProductionBoard'
import DesktopSettings from '../pages/DesktopSettings'
import SecurityDashboard from '../pages/SecurityDashboard'
import SecurityAuditLog from '../pages/SecurityAuditLog'
import SecurityPanel from '../pages/SecurityPanel'
import SystemNotifications from '../pages/SystemNotifications'
import NodeDiagnostics from '../pages/NodeDiagnostics'
import PasswordReset from '../pages/PasswordReset'
import DeploymentConfirmation from '../pages/DeploymentConfirmation'
import LatestReleases from '../pages/LatestReleases'
import MobileLanding from '../pages/MobileLanding'
import NotFound from '../pages/NotFound'

export interface AppRoute {
  path: string
  element: ReactElement
  group: 'public' | 'app'
}

export const appRoutes: AppRoute[] = [
  { path: '/assistant', element: <Alic3X />, group: 'app' },
  { path: '/', element: <LandingPage />, group: 'public' },
  { path: '/dashboard', element: <Dashboard />, group: 'app' },
  { path: '/ecosystem', element: <AudioEcosystem />, group: 'app' },
  { path: '/discover', element: <MusicDiscovery />, group: 'app' },
  { path: '/production', element: <ProductionBoard />, group: 'app' },
  { path: '/settings', element: <DesktopSettings />, group: 'app' },
  { path: '/security', element: <SecurityDashboard />, group: 'app' },
  { path: '/security/audit', element: <SecurityAuditLog />, group: 'app' },
  { path: '/security/panel', element: <SecurityPanel />, group: 'app' },
  { path: '/notifications', element: <SystemNotifications />, group: 'app' },
  { path: '/diagnostics', element: <NodeDiagnostics />, group: 'app' },
  { path: '/reset-password', element: <PasswordReset />, group: 'public' },
  { path: '/deployment', element: <DeploymentConfirmation />, group: 'app' },
  { path: '/releases', element: <LatestReleases />, group: 'app' },
  { path: '/mobile', element: <MobileLanding />, group: 'public' },
]

export const notFoundRoute: AppRoute = {
  path: '*',
  element: <NotFound />,
  group: 'public',
}
