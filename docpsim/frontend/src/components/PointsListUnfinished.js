import React, { useEffect, useState } from 'react'
import './PointsList.css'

const PointsListUnfinished = ({itemID, outsideHandler, existingPoints}) => {
    const [name, setName] = useState('')
    const [description,setDescription] = useState('')
    const [block, setBlock] = useState(-1)
  return (
    <div className="tworzenie-gry-teamitemunfinished button">
        <input
          type="text"
          placeholder="Nazwa punktu"
          className="tworzenie-gry-textinput1 input"
          onChange={(e) => {setName(e.target.value)}}
        />
        <textarea
          placeholder="Opis punktu"
          className="textarea"
          onChange={(e) => {setDescription(e.target.value)}}
        ></textarea>
        <div className="tworzenie-gry-container4">
          <span>Punkt blokowany do odkrycia punktu nr </span>
          <select onChange={(e) => {setBlock(e.target.value)}}>
            <option value="-1">-</option>
            {existingPoints.map((entry,index)=>(
                <option key={index} value={index}>{index + 1}</option>
            ))}
            
          </select>
        </div>
        <button type="button" className="tworzenie-gry-button button"
         onClick={(e) => {outsideHandler(itemID,{"name":name,"description":description,"block":block})}}>
          Zaakceptuj punkt
        </button>
      </div>
  )
}

export default PointsListUnfinished