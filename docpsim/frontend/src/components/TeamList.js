import React, { useState } from 'react'
import './TeamList.css'
import TeamListFinished from './TeamListFinished'
import TeamListUnfinished from './TeamListUnfinished'

const TeamList = ({updateHandler}) => {
    const [finished, setFinished] = useState([])
    const [unfinished, setUnfinished] = useState([''])

    const handleTeamSubmit = (i,data) =>{
        const newUnfinished = [...unfinished]; 
        newUnfinished.splice(i, 1); 
        setUnfinished(newUnfinished);

        setFinished([...finished,data]); 
        updateHandler([...finished,data])          
    }

    const handleAddTeam = () =>{
        setUnfinished([...unfinished,''])
    }

    const handleDeleteFinished = (i) =>{
        const newFinished = [...finished]; 
        newFinished.splice(i, 1); 
        setFinished(newFinished);
        updateHandler(newFinished)   
    }

  return (
    <div className="app-component-container">
        <span className="app-component-text">
            <span>Zespoły</span>
        </span>
        <div className="app-component-teamlist">
            
            {finished.map((data, index)=>(
                <TeamListFinished 
                key={index} 
                itemID={index} 
                handleDelete={handleDeleteFinished}
                teamName={data["name"]} teamPlayers={data["players"]}/>
            ))}
            {unfinished.map((input, index)=>(
                <TeamListUnfinished 
                key={index} 
                itemID={index} 
                outsideHandler={handleTeamSubmit}/>
            ))}
            
            <button type="button" onClick={handleAddTeam} className="tworzenie-gry-button-big button">
                Dodaj zespół
            </button>
        </div>
    </div>
  )
}

export default TeamList