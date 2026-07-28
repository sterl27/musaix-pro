import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import AudioEcosystem from './pages/AudioEcosystem'
import MusicDiscovery from './pages/MusicDiscovery'
import ProductionBoard from './pages/ProductionBoard'
import DesktopSettings from './pages/DesktopSettings'
import SecurityDashboard from './pages/SecurityDashboard'
import SecurityAuditLog from './pages/SecurityAuditLog'
import SecurityPanel from './pages/SecurityPanel'
import SystemNotifications from './pages/SystemNotifications'
import NodeDiagnostics from './pages/NodeDiagnostics'
import PasswordReset from './pages/PasswordReset'
import DeploymentConfirmation from './pages/DeploymentConfirmation'
import LatestReleases from './pages/LatestReleases'
import MobileLanding from './pages/MobileLanding'

export default function App() {
  return (
    <BrowserRouter>
      <div className="dark">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ecosystem" element={<AudioEcosystem />} />
          <Route path="/discover" element={<MusicDiscovery />} />
          <Route path="/production" element={<ProductionBoard />} />
          <Route path="/settings" element={<DesktopSettings />} />
          <Route path="/security" element={<SecurityDashboard />} />
          <Route path="/security/audit" element={<SecurityAuditLog />} />
          <Route path="/security/panel" element={<SecurityPanel />} />
          <Route path="/notifications" element={<SystemNotifications />} />
          <Route path="/diagnostics" element={<NodeDiagnostics />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/deployment" element={<DeploymentConfirmation />} />
          <Route path="/releases" element={<LatestReleases />} />
          <Route path="/mobile" element={<MobileLanding />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
