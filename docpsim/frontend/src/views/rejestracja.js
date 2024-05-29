import React from 'react'

import { Helmet } from 'react-helmet'

import './rejestracja.css'

const Rejestracja = (props) => {
  return (
    <>
      <Helmet>
        <title>Rejestracja - Gra miejska</title>
        <meta property="og:title" content="Rejestracja - Gra miejska" />
      </Helmet>
      {/* <div className="rejestracja-emptynavbar"></div> */}
      <div className="rejestracja-container1">
        <div className="rejestracja-container2">
          <span className="rejestracja-text">Zarejestruj się</span>
          <input
            type="text"
            required="true"
            placeholder="login"
            className="rejestracja-textinput input"
          />
          <input
            type="password"
            required="true"
            placeholder="hasło"
            className="input"
          />
          <input
            type="password"
            required="true"
            placeholder="powtórz hasło"
            className="input"
          />
          <button type="button" className="rejestracja-button button">
            Zarejestruj
          </button>
        </div>
      </div>
    </>
  )
}

export default Rejestracja
