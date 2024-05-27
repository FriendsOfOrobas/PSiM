import React from 'react'

import { Helmet } from 'react-helmet'

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
          <button type="button" className="home-button button">
            <span>
              <span>Zarejestruj</span>
              <br></br>
            </span>
          </button>
          <button type="button" className="home-button1 button">
            <span>
              <span>Zaloguj</span>
              <br></br>
            </span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Home
