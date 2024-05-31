import React from 'react'
import './TeamList.css'
import { MdDelete } from "react-icons/md";

const TeamListFinished = ({teamName='Default name', teamPlayers=["Player1","Player2","Player3"], handleDelete, ItemID}) => {
  return (
    
    <div className="app-component-teamitem button">
        <div style={{display:"flex", flexDirection:"column",width:"100%"}}>
            <span className="app-component-text03">
                <span>{teamName}</span>
            </span>
            <span className="app-component-text06">
                
                {teamPlayers.map((player) => (
                    <span>- {player}</span>
                ))}

            </span>
        </div>
        <button className='delete-button' onClick={(e) => handleDelete(ItemID)} style={{alignSelf:"flex-end"}}>
            <MdDelete />
        </button>
    </div>  
  )
}

export default TeamListFinished