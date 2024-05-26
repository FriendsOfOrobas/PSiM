import React from 'react'

import { Helmet } from 'react-helmet'

import './punkt-admin.css'

const PunktAdmin = (props) => {
  return (
    <div className="punkt-admin-container">
      <Helmet>
        <title>PunktAdmin - Gra miejska</title>
        <meta property="og:title" content="PunktAdmin - Gra miejska" />
      </Helmet>
      <div className="punkt-admin-navbar">
        <h1 className="punkt-admin-text">&#123;Nazwa_Punktu&#125;</h1>
        <button type="button" className="punkt-admin-button button">
          <span>
            <span>Wyloguj</span>
            <br></br>
          </span>
        </button>
      </div>
      <div className="punkt-admin-container1">
        <div className="punkt-admin-container2">
          <h1 className="punkt-admin-text04">Komentarze</h1>
          <ul className="list punkt-admin-ul">
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
            className="punkt-admin-textinput input"
          />
          <button type="submit" className="button punkt-admin-button1">
            <span>
              <span>Skomentuj</span>
              <br></br>
            </span>
          </button>
        </div>
        <div className="punkt-admin-container3">
          <div className="punkt-admin-container4">
            <h1 className="punkt-admin-text13">
              <span>OPIS</span>
              <br></br>
              <br></br>
            </h1>
            <textarea
              placeholder="placeholder"
              className="textarea punkt-admin-textarea"
            ></textarea>
          </div>
          <div className="punkt-admin-container5">
            <h1 className="punkt-admin-text17">
              <span>QR</span>
              <br></br>
              <br></br>
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PunktAdmin
