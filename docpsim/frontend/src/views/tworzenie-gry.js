import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

import { Helmet } from 'react-helmet'
import TeamList from '../components/TeamList'
import PointsList from '../components/PointsList'
import AchievementsList from '../components/AchievementsList'

import './tworzenie-gry.css'


const TworzenieGry = ({user}) => {
  const [name,setName] = useState('')
  const [description,setDescription] = useState('')
  const [teamSize,setTeamSize] = useState(1)
  const [teamsFinished,setTeamsFinished] = useState([])
  const [pointsFinished,setPointsFinished] = useState([])
  const [achievementsFinished,setAchievementsFinished] = useState([])
  const navigate = useNavigate()

  const updateTeams = (newTeams) =>{
    setTeamsFinished(newTeams)
  }
  const updatePoints = (newPoints) =>{
    setPointsFinished(newPoints)
  }
  const updateAchievements = (newAchievements) =>{
    setAchievementsFinished(newAchievements)
  }
  
  const gamePOSTRequest = async(newGame) =>{
    const res = await fetch("http://localhost:8000/games",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newGame)
    });
    return;
  }

  const teamPOSTRequest = async(newTeam) =>{
    const res = await fetch("http://localhost:8000/teams",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTeam)
    });
    return;
  }

  const submitGame = () =>{
    const id = uuidv4()
    const gameData = {
      id,
      "game":{
      name,
      description,
      "max_team_size":Number(teamSize),
      "game_admin_id":user["id"]
    },
      "checkpoints":pointsFinished,
      "achievements":achievementsFinished
    }
    teamsFinished.map((team) => {
      const teamData = {
        "game_id":id,
        "name":team["name"],
        "players":team["players"]
      }
      teamPOSTRequest(teamData)
    })

    gamePOSTRequest(gameData)
    return navigate('/moje-gry')
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
          placeholder="Nazwa gry" 
          className="input" 
          onChange={(e) => {setName(e.target.value)}}/>
          <span className="tworzenie-gry-text03">
            <span>Opis gry</span>
          </span>
          <textarea
          placeholder="Opis gry" 
          className="input" 
          onChange={(e) => {setDescription(e.target.value)}}/>
          <span className="tworzenie-gry-text03">
            <span>Maksymalna wielkość zespołów</span>
          </span>
          <input 
          type="number" 
          placeholder="Maksymalna wielkość zespołów" 
          className="input" 
          onChange={(e) => {setTeamSize(e.target.value)}}/>
        </div>
        <TeamList updateHandler={updateTeams}/>
        <PointsList updateHandler={updatePoints}/>
        <AchievementsList updateHandler={updateAchievements}/>
        <button type="button" className="tworzenie-gry-button-big button" onClick={submitGame}>
          Zaakceptuj grę
        </button>
      </div>
    </>
  )
}

export default TworzenieGry
