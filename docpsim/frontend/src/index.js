import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'
import Punkt from './views/punkt'
import PunktAdmin from './views/punkt-admin'
import Logowanie from './views/logowanie'
import Gracz from './views/gracz'
import MojeGry from './views/moje-gry'
import TworzenieGry from './views/tworzenie-gry'
import Rejestracja from './views/rejestracja'
import Zespol from './views/zespol'
import Home from './views/home'
import NotFound from './views/not-found'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Punkt} exact path="/punkt" />
        <Route component={PunktAdmin} exact path="/punkt-admin" />
        <Route component={Logowanie} exact path="/logowanie" />
        <Route component={Gracz} exact path="/gracz" />
        <Route component={MojeGry} exact path="/moje-gry" />
        <Route component={TworzenieGry} exact path="/tworzenie-gry" />
        <Route component={Rejestracja} exact path="/rejestracja" />
        <Route component={Zespol} exact path="/zespol" />
        <Route component={Home} exact path="/" />
        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
