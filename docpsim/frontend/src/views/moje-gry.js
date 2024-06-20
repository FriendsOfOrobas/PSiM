import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'
import {Link} from 'react-router-dom'
import {useAuthHeader} from 'react-auth-kit';

import './moje-gry.css'

import Game from '../components/Game'

const MojeGry = ({user,gameChanger}) => {
  const [admins,setAdmins] = useState([])
  const [users,setUsers] = useState([])
  const authHeader = useAuthHeader()

  useEffect(() => {
    const fetchGames = async() =>{
      
      const user_res = await fetch("/users/me/", {
        headers:{
          "Authorization": authHeader()
        }
      })
      const user_res_data = await user_res.json()

      const res_user = await fetch("/games/users/"+user_res_data["id"]+"/player",{
        headers:{
          "Authorization": authHeader()
        }
      })
      const data_user = await res_user.json()
      setUsers(data_user)
      if (data_user != []) {
        gameChanger(data_user[0],true)
      } 
    
      const res = await fetch("/games/users/"+user_res_data["id"]+"/admin",{
        headers:{
          "Authorization": authHeader()
        }
      })
      const data = await res.json()
      setAdmins(data)
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
