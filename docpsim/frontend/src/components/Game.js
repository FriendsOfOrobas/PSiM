import React from 'react'
import {useNavigate} from 'react-router-dom'

import './Game.css'

const Game = ({game,gameChanger}) => {
    const navigate = useNavigate()
  return (
    <div className="moje-gry-gameitem button" onClick={(e)=>{
        gameChanger(game)
        return navigate('/gra')
    }}>
      <span className="moje-gry-text06">
        <span>{game.game["name"]}</span>
      </span>
      <span className="moje-gry-text09">
        {game.game["description"]}
      </span>
    </div>
  )
}

export default Game