import React, {useState} from 'react'

import { Helmet } from 'react-helmet'
import TeamList from '../components/TeamList'
import PointsList from '../components/PointsList'
import AchievementsList from '../components/AchievementsList'

import './tworzenie-gry.css'


const TworzenieGry = (props) => {
  const [name,setName] = useState('')
  const [teamsFinished,setTeamsFinished] = useState([])
  const [pointsFinished,setPointsFinished] = useState([])
  const [achievementsFinished,setAchievementsFinished] = useState([])

  const updateTeams = (newTeams) =>{
    setTeamsFinished(newTeams)
  }
  const updatePoints = (newPoints) =>{
    setPointsFinished(newPoints)
  }
  const updateAchievements = (newAchievements) =>{
    setAchievementsFinished(newAchievements)
  }

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
          </span>
          <input 
          type="text" 
          placeholder="placeholder" 
          className="input" 
          onChange={(e) => {setName(e.target.value)}}/>
        </div>
        <TeamList updateHandler={updateTeams}/>
        <PointsList updateHandler={updatePoints}/>
        <AchievementsList updateHandler={updateAchievements}/>
        <button type="button" className="tworzenie-gry-button-big button">
          Zaakceptuj grę
        </button>
      </div>
    </>
  )
}

export default TworzenieGry
