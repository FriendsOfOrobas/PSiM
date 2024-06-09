import React, { useState } from 'react'
import './PointsList.css'
import PointsListFinished from './PointsListFinished'
import PointsListUnfinished from './PointsListUnfinished'

const PointsList = ({updateHandler}) => {
    const [finished, setFinished] = useState([])
    const [unfinished, setUnfinished] = useState([''])

    const handlePointSubmit = (i,data) =>{
        const newUnfinished = [...unfinished]; 
        newUnfinished.splice(i, 1); 
        setUnfinished(newUnfinished);

        setFinished([...finished,data]); 
        updateHandler([...finished,data])         
    }

    const handleAddPoint = () =>{
        setUnfinished([...unfinished,''])
    }

    const handleDeleteFinished = (i) =>{
        const newFinished = [...finished]; 
        newFinished.splice(i, 1); 
        newFinished.map((entry)=>{
            if (i < Number(entry["previous"])) {
                entry["previous"] = Number(entry["previous"]) - 1
            } else if(i === Number(entry["previous"])) {
                entry["previous"] = -1
            }
        })
        setFinished(newFinished);
        updateHandler(newFinished)   
    }
  return (
    <div className="tworzenie-gry-container3">
    <span className="tworzenie-gry-text06">
      <span>Punkty</span>
    </span>
    <div className="tworzenie-gry-teamlist">

        {finished.map((data, index)=>(
            <PointsListFinished
            key={index} 
            itemID={index} 
            handleDelete={handleDeleteFinished}
            name={data["name"]} 
            description={data["description"]}
            block={data["previous"]}/>
        ))}
        {unfinished.map((input, index)=>(
            <PointsListUnfinished 
            key={index} 
            itemID={index} 
            existingPoints={finished}
            outsideHandler={handlePointSubmit}
            />
        ))}
      <button type="button" className="tworzenie-gry-button-big button" onClick={handleAddPoint}>
        Dodaj punkt
      </button>
    </div>
  </div>
  )
}

export default PointsList