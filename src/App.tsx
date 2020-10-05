import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { About } from './pages/About'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { FinalFormExample } from './pages/FinalFormExample'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route path="/final-form" component={FinalFormExample} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
