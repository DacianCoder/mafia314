import React from 'react'
import { WelcomePage } from './pages/WelcomePage'
import { useAuthListener } from './hooks/useAuthListener'
import { ProtectedRoutes } from './components/ProtectedRoutes'

const App: React.FC = () => {
  const isLogged = useAuthListener()

  if (!isLogged) {
    return <WelcomePage />
  }

  return <ProtectedRoutes />
}

export default App
