import React from 'react'

import { Helmet } from 'react-helmet'
import TeamList from '../components/TeamList'
import PointsList from '../components/PointsList'
import AchievementsList from '../components/AchievementsList'

import './tworzenie-gry.css'


const TworzenieGry = (props) => {
  return (
    <>
      <Helmet>
        <title>Tworzenie-gry - Gra miejska</title>
        <meta property="og:title" content="Tworzenie-gry - Gra miejska" />
      </Helmet>
      <div className="tworzenie-gry-container1">
        <div className="tworzenie-gry-container2">
          <span className="tworzenie-gry-text03">
            <span>Nazwa gry</span>
            <br></br>
          </span>
          <input type="text" placeholder="placeholder" className="input" />
        </div>
        <TeamList/>
        <PointsList/>
        <AchievementsList/>
        <button type="button" className="tworzenie-gry-button-big button">
          Zaakceptuj grę
        </button>
      </div>
    </>
  )
}

export default TworzenieGry
