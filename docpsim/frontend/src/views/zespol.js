import React, { useEffect, useState } from 'react'
import {useAuthHeader} from 'react-auth-kit';

import { Helmet } from 'react-helmet'

import './zespol.css'


const Zespol = ({game}) => {
  const [team,setTeam] = useState({})
  const [teams,setTeams] = useState([])
  const [members,setMembers] = useState([])
  const [found, setFound] = useState(false)
  const authHeader = useAuthHeader()

  useEffect(()=>{
    const fetchData = async() =>{
      const user_res = await fetch("api/users/me/", {
        headers:{
          "Authorization": authHeader()
        }
      })
      const user_res_data = await user_res.json()

      const team_res = await fetch("api/teams/"+game["id"]+"/"+user_res_data["id"], {
        headers:{
          "Authorization": authHeader()
        }
      })
      const team_res_data = await team_res.json()

      const team_det_res = await fetch("api/teams/team/"+team_res_data["id"], {
        headers:{
          "Authorization": authHeader()
        }
      })
      const team_det_res_data = await team_det_res.json()
      if (team_det_res.status == 200) {
        setFound(true)
        setTeam(team_det_res_data)
        setMembers(team_det_res_data["members"])  
      }

      const teams_det_res = await fetch("api/teams/"+team_det_res_data["game_id"], {
        headers:{
          "Authorization": authHeader()
        }
      })
      const teams_det_res_data = await teams_det_res.json()
      if (teams_det_res.status === 200) {
        const sorted_teams = teams_det_res_data.sort((a,b) => a["points"] - b["points"]).reverse()
        setTeams(sorted_teams)
      }

    }
    fetchData()
  },[])

  return (
    <>
      <Helmet>
        <title>Zespol - Gra miejska</title>
        <meta property="og:title" content="Zespol - Gra miejska" />
      </Helmet>
      {found?
      <div className="zespol-container1">
        <div className="zespol-container2">
          <div className="zespol-container3">
            <span className="zespol-text04">
              <span>Liczba Punktow:</span>
              <br></br>
            </span>
            <span className="zespol-text07">
              <span className="zespol-text08"> {team["points"]}</span>
              <br></br>
            </span>
          </div>
          <div className="zespol-container4">
            <h1 className="zespol-text10">
              <span>Czlonkowie:</span>
              <br></br>
              <br></br>
            </h1>
            <ul className="list zespol-ul">
              {members.map((member,index)=>(
                <li key={index} className="list-item">
                  <span>{member}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="zespol-container5">
          <h1 className="zespol-text20">
            <span>LeaderBoard</span>
            <br></br>
          </h1>
          <ol className="list zespol-ul1">
            {teams.map((team,index) =>(
              <li key={index} className="list-item">
                <span>
                  <span>{team["name"]} : {team["points"]}</span>
                  <br></br>
                </span>
              </li>
            ))}
            
          </ol>
        </div>

      </div>:
      <h1>Nie znaleziono zespołu</h1>}
    </>
  )
}

export default Zespol
