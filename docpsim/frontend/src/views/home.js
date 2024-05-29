import React from 'react'

import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import './home.css'

const Home = (props) => {
  return (
    <>
      <Helmet>
        <title>Gra miejska</title>
        <meta property="og:title" content="Gra miejska" />
      </Helmet>
      {/* <div className="home-emptynavbar"></div> */}
      <div className="home-container1">
        <span className="home-text">
          <span>Dołącz do nas lub kontynuuj zabawę!</span>
          <br></br>
        </span>
        <div className="home-container2">
          <Link to="/rejestracja" type="button" className="home-button button">
            Zarejestruj  
          </Link>
          <Link to="/logowanie" type="button" className="home-button button">
            Zaloguj
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
