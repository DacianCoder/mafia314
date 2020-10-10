import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { useLoadGameData } from '../hooks/UseLoadGameData'
import { Navbar } from './navbar/Navbar'
import { ROUTES } from '../constants/routes'
import { AdminPage } from '../pages/AdminPage'
import { HomePage } from '../pages/HomePage'

export function ProtectedRoutes() {
  useLoadGameData()

  return (
    <>
      <Navbar />
      <Switch>
        <Route path={ROUTES.ADMIN} component={AdminPage} exact />
        <Route path={ROUTES.HOME} component={HomePage} />
      </Switch>
    </>
  )
}
