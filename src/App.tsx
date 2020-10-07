import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Navbar } from './components/navbar/Navbar'
import { WelcomePage } from './pages/WelcomePage'
import { useAuthListener } from './hooks/useAuthListener'
import { ROUTES } from './constants/routes'
import { HomePage } from './pages/HomePage'

const App: React.FC = () => {
  useAuthListener()

  return (
    <BrowserRouter>
      <Navbar />
      <div>
        <Switch>
          <Route path={ROUTES.WELCOME} component={WelcomePage} exact />
          <Route path={ROUTES.HOME} component={HomePage} exact />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
