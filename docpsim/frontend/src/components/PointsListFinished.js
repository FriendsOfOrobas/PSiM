import React from 'react'
import './PointsList.css'
import { MdDelete } from "react-icons/md";


const PointsListFinished = ({name, description, block, itemID, handleDelete}) => {
  return (
    <div className="tworzenie-gry-teamitem button">
      <div style={{display:"flex", flexDirection:"column", width:"100%"}}>
        <span className="tworzenie-gry-text09">
          <span>{name}</span>
        </span>
        <span className="tworzenie-gry-text12">
          <span>
            {description}
          </span>
        </span>
        {Number(block) !== -1? 
        <span className="tworzenie-gry-text16">
          <span>Punkt blokowany przez punkt nr {Number(block)+1}</span>
        </span>
        :
        <span className="tworzenie-gry-text16">
          <span>Punkt dostępny</span>
        </span>}
        
      </div>
      <button className='delete-button' onClick={(e) => handleDelete(itemID)} style={{alignSelf:"flex-end"}}>
            <MdDelete />
        </button>
    </div>
  )
}

export default PointsListFinished