import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'
import {Link} from 'react-router-dom'

import './moje-gry.css'

import Game from '../components/Game'

const MojeGry = ({user,gameChanger}) => {
  const [admins,setAdmins] = useState([])
  const [users,setUsers] = useState([])

  useEffect(() => {
    const fetchGames = async() =>{
      const res = await fetch("http://localhost:8000/games")
      const data = await res.json()

      setAdmins(data.filter((game) => {
        return game.game["game_admin_id"] === user["id"]
      }))
      setUsers(data.filter((game) => {
        return game.game["game_admin_id"] !== user["id"]
      }))
    }

    fetchGames()
  },[])

  return (
    <>
      <Helmet>
        <title>Moje-gry - Gra miejska</title>
        <meta property="og:title" content="Moje-gry - Gra miejska" />
      </Helmet>
      <div className="moje-gry-container1">
        <div className="moje-gry-container2">
          <span className="moje-gry-text03">
            <span>Jako administrator:</span>
          </span>
          <div className="moje-gry-gameslist1">
            {admins.map((game,index) =>(
              <Game key={index} game={game} gameChanger={gameChanger}/>
            ))}
          </div>
          <Link to="/tworzenie-gry" type="button" className="moje-gry-button button">
            Stwórz grę
          </Link>
        </div>
        <div className="moje-gry-container3">
          <span className="moje-gry-text21">
            <span>Jako gracz:</span>
          </span>
          <div className="moje-gry-gameslist1">
            {users.map((game,index) =>(
              <Game key={index} game={game} gameChanger={gameChanger}/>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default MojeGry
