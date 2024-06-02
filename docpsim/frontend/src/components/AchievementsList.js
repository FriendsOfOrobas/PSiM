import { useState } from "react"
import React from 'react'
import "./AchievementsList.css"
import AchievementsListFinished from './AchievementsListFinished'
import AchievementsListUnfinished from "./AchievementsListUnfinished"

const AchievementsList = () => {
    const [finished, setFinished] = useState([])
    const [unfinished, setUnfinished] = useState([''])

    const handleAchievementSubmit = (i,data) =>{
        const newUnfinished = [...unfinished]; 
        newUnfinished.splice(i, 1); 
        setUnfinished(newUnfinished);

        setFinished([...finished,data]);        
    }

    const handleAddAchievement = () =>{
        setUnfinished([...unfinished,''])
    }

    const handleDeleteFinished = (i) =>{
        const newFinished = [...finished]; 
        newFinished.splice(i, 1); 
        setFinished(newFinished);
    }
  return (
    <div className="tworzenie-gry-container5">
    <span className="tworzenie-gry-text27">
      <span>Osiągnięcia</span>
      <br></br>
    </span>
    <div className="tworzenie-gry-teamlist1">
      {finished.map((data,id) => (
        <AchievementsListFinished 
        key={id} 
        itemID={id} 
        outsideHandler={handleDeleteFinished}
        title={data["title"]}
        description={data["description"]}
        bonus={data["bonus"]} />
      ))}

      {unfinished.map((data,id)=>(
        <AchievementsListUnfinished
        key={id}
        itemID={id}
        outsideHandler={handleAchievementSubmit} />
      ))}
      
      <button type="button" className="tworzenie-gry-button-big button" onClick={handleAddAchievement}>
        Dodaj osiągnięcie
      </button>
    </div>
  </div>
  )
}

export default AchievementsList