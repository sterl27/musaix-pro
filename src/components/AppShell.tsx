import Sidebar from './Sidebar'
import TopBar from './TopBar'
import { type ReactNode } from 'react'

interface AppShellProps {
  children: ReactNode
  title?: string
}

export default function AppShell({ children, title }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <TopBar title={title} />
      <main className="ml-64 pt-24 px-margin-desktop pb-stack-lg min-h-screen">
        <div className="max-w-container-max mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
