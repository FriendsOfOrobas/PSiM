import React from 'react'

import { Helmet } from 'react-helmet'
import PointListItem from '../components/PointListItem'
import AchievementListItem from '../components/AchievementListItem'

import './gra.css'

const Gra = ({game,name}) => {
  const points = game["checkpoints"]
  const achievements = game["achievements"]

  return (
    <>
      <Helmet>
        <title>Gracz - Gra miejska</title>
        <meta property="og:title" content="Gracz - Gra miejska" />
      </Helmet>
      
      <div className='gra-container'>
      <span className="gracz-text06">
        <span>{game.game["name"]}</span>
      </span>
      <div className="gracz-container1">
        <div className="gracz-container2">
          <div className="gracz-container3">
            <h1 className="gracz-text09">
              <span>ODBLOKOWANE PUNKTY</span>
              <br></br>
            </h1>
            <ul className="list gracz-ul">
              {points.map((point, index) => (
                <PointListItem key={index} point={point}/>
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
                <PointListItem key={index} point={point}/>
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
      </div>
      </div>
    </>
  )
}

export default Gra
