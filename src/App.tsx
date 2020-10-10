import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Navbar } from './components/navbar/Navbar'
import { WelcomePage } from './pages/WelcomePage'
import { useAuthListener } from './hooks/useAuthListener'
import { ROUTES } from './constants/routes'
import { HomePage } from './pages/HomePage'

const App: React.FC = () => {
  const isLogged = useAuthListener()

  if (!isLogged) {
    return <WelcomePage />
  }

  return (
    <>
      <Navbar />
      <Switch>
        <Route path={ROUTES.HOME} component={HomePage} exact />
      </Switch>
    </>
  )
}

export default App
