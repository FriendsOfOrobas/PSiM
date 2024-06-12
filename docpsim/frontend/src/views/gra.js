import React from 'react'

import { Helmet } from 'react-helmet'
import PointListItem from '../components/PointListItem'
import AchievementListItem from '../components/AchievementListItem'

import './gra.css'

const Gra = ({game = {}, admin=false, user = {}}) => {
  console.log(typeof game)
  const points = Object.keys(game).length === 0 ? [] :game["checkpoints"]
  const achievements = Object.keys(game).length === 0 ? [] :game["achievements"]
  const is_admin = Object.keys(game).length === 0 || Object.keys(user).length === 0 ? false : game.game["game_admin_id"] == user["id"]
  const name = Object.keys(game).length === 0 ? 'Brak gry!' : game.game["name"]

  return (
    <>
      <Helmet>
        <title>Gracz - Gra miejska</title>
        <meta property="og:title" content="Gracz - Gra miejska" />
      </Helmet>
      
      <div className='gra-container'>
      <span className="gracz-text06">
        <span>{name}</span>
      </span>
     {Object.keys(game).length === 0 || Object.keys(user).length === 0?'':
      <div className="gracz-container1">
        <div className="gracz-container2">
          <div className="gracz-container3">
            <h1 className="gracz-text09">
              <span>ODBLOKOWANE PUNKTY</span>
              <br></br>
            </h1>
            <ul className="list gracz-ul">
              {points.map((point, index) => (
                <PointListItem key={index} point={point} user={user} admin={is_admin}/>
              ))}
            </ul>
          </div>
          <div className="gracz-container4">
            <h1 className="gracz-text24">
              <span>BLOKOWANE PUNKTY</span>
              <br></br>
            </h1>
            <ul className="list gracz-ul1">
            {points.map((point, index) => (
                <PointListItem key={index} point={point} user={user} admin={is_admin}/>
              ))}
            </ul>
          </div>
        </div>
        <div className="gracz-container5">
          <h1 className="gracz-text39">Osiagniecia</h1>
          <ul className="list gracz-ul2">
            {achievements.map((achievement, index) => (
              <AchievementListItem achievement={achievement} key={index} />
            ))}
          
          </ul>
        </div>
      </div>}
      </div>
    </>
  )
}

export default Gra
