import React, { useState } from 'react'
import "./AchievementsList.css"

const AchievementsListUnfinished = ({itemID, outsideHandler}) => {
    const [description,setDescription] = useState('')
    const [type,setType] = useState("1")
    const [treshold,setTreshold] = useState(0)
    const [point,setPoint] = useState(0)
    const [bonus,setBonus] = useState(0)

    const handleAccept = () =>{
        let response
        if (type==="1") {
            response = {
                "description": description,
                "treshold": Number(treshold),
                "bonus": Number(bonus)
            }
        } else {
            response = {
                "description": description,
                "checkpoint_id": Number(point),
                "bonus": Number(bonus)
            }
        }
        console.log(response)
        outsideHandler(itemID,response)
    }

  return (
    <div className="tworzenie-gry-teamitemunfinished1 button">
        <textarea
          placeholder="Opis osiągnięcia"
          className="textarea"
          onChange={(e) => {setDescription(e.target.value)}}
        ></textarea>
        <div className="tworzenie-gry-container6">
          <span>Typ osiągnięcia: </span>
          <select onChange={(e) => {setType(e.target.value)}}>
            <option value="1">Ilość punktów</option>
            <option value="2">Pierwsze zdobycie punktu</option>
          </select>
        </div>
        {type==="1"?
            <input
            type="number"
            placeholder="Ilość wymaganych punktów"
            className="tworzenie-gry-textinput3 input"
            onChange={(e) => {setTreshold(e.target.value)}}
            />
        :
            <input
            type="number"
            placeholder="Numer wymaganego punktu"
            className="tworzenie-gry-textinput3 input"
            onChange={(e) => {setPoint(e.target.value)}}
            />
        }

        <input
          type="number"
          placeholder="Ilość bonusowych punktów"
          className="tworzenie-gry-textinput4 input"
          onChange={(e) => {setBonus(e.target.value)}}
        />
        <button type="button" className="tworzenie-gry-button button" onClick={handleAccept}>
          Zaakceptuj osiągnięcie
        </button>
    </div>
  )
}

export default AchievementsListUnfinished