import React from 'react'

import { Helmet } from 'react-helmet'

import './logowanie.css'

const Logowanie = (props) => {
  return (
    <div className="logowanie-container">
      <Helmet>
        <title>Logowanie - Gra miejska</title>
        <meta property="og:title" content="Logowanie - Gra miejska" />
      </Helmet>
      <div className="logowanie-emptynavbar"></div>
      <div className="logowanie-container1">
        <div className="logowanie-container2">
          <span className="logowanie-text">Zaloguj się</span>
          <input
            type="text"
            placeholder="login"
            className="logowanie-textinput input"
          />
          <input type="password" placeholder="hasło" className="input" />
          <button type="button" className="logowanie-button button">
            <span>
              <span>Zaloguj</span>
              <br></br>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Logowanie
