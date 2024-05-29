import React from 'react'

import { Helmet } from 'react-helmet'

import './punkt.css'

const Punkt = (props) => {
  return (
    <>
      <Helmet>
        <title>Punkt - Gra miejska</title>
        <meta property="og:title" content="Punkt - Gra miejska" />
      </Helmet>
      {/* <div className="punkt-navbar">
        <h1 className="punkt-text">&#123;Nazwa_Punktu&#125;</h1>
        <button type="button" className="punkt-button button">
          <span>
            <span>Wyloguj</span>
            <br></br>
          </span>
        </button>
      </div> */}
      <div className="punkt-container1">
        <div className="punkt-container2">
          <h1 className="punkt-text04">Komentarze</h1>
          <ul className="list punkt-ul">
            <li className="list-item">
              <span>
                <span>Komentarze</span>
                <br></br>
              </span>
            </li>
            <li className="list-item">
              <span>Text</span>
            </li>
            <li className="list-item">
              <span>Text</span>
            </li>
          </ul>
          <input
            type="text"
            placeholder="placeholder"
            className="punkt-textinput input"
          />
          <button type="submit" className="button punkt-button">
            Skomentuj
          </button>
        </div>
        <div className="punkt-container3">
          <div className="punkt-container4">
            <h1 className="punkt-text13">
              <span>OPIS</span>
              <br></br>
              <br></br>
            </h1>
            <span className="punkt-text17">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Volutpat ac tincidunt vitae semper. Sagittis aliquam malesuada
              bibendum arcu vitae elementum. Tellus orci ac auctor augue mauris
              augue neque gravida in.
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Punkt
