import React from 'react'
import "./AchievementsList.css"
import { MdDelete } from "react-icons/md";

const AchievementsListFinished = ({title='default',description='default',bonus=0,outsideHandler,itemID}) => {
  return (
    <div className="tworzenie-gry-teamitem1 button">
        <div style={{display:"flex", flexDirection:"column", width:"100%"}}>
            <span className="tworzenie-gry-text30">
            <span>{title}</span>
            </span>
            <span className="tworzenie-gry-text33">
            <span>{description}</span>
            </span>
            <span className="tworzenie-gry-text37">
            <span className="tworzenie-gry-text38">Nagroda:</span>
            <span> +{bonus} pkt</span>
            </span>
        </div>
        <button className='delete-button' onClick={(e) => outsideHandler(itemID)} style={{alignSelf:"flex-end"}}>
            <MdDelete />
        </button>
    </div>
  )
}

export default AchievementsListFinished