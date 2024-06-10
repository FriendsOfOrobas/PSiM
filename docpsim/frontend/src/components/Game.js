import React from 'react'

import './Game.css'

const Game = ({title,description,id=0}) => {
  return (
    <div className="moje-gry-gameitem button">
      <span className="moje-gry-text06">
        <span>{title}</span>
      </span>
      <span className="moje-gry-text09">
        {description}
      </span>
    </div>
  )
}

export default Game