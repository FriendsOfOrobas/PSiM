import React, { useState } from 'react'
import './TeamList.css'
import { MdDelete } from "react-icons/md";

const TeamListUnfinished = ({itemID='0',outsideHandler=(index,data)=>console.log("problem")}) => {
    const [name,setName] = useState('')
    const [players,setPlayers] = useState([''])


    const handlePlayerChange = (e,i) =>{
        const newPlayers = [...players]; 
        newPlayers[i] = e.target.value; 
        setPlayers(newPlayers);
    }

    const handleAddPlayer = () =>{
        setPlayers([...players,''])
    }

    const handleDeletePlayer = (i) => { 
        const newPlayers = [...players]; 
        newPlayers.splice(i, 1); 
        setPlayers(newPlayers); 
      }; 

  return (
    <div className="app-component-teamitemunfinished button">
                <input
                type="text"
                placeholder="Nazwa zespołu"
                className="app-component-textinput input"
                onChange={(e) => {setName(e.target.value)}}
                />

                {players.map((player, index)=>(
                    <div key={index} className='player-container'>
                        <input
                        type="text"
                        value={player}
                        placeholder="Nazwa gracza"
                        className="app-component-textinput1 input"
                        onChange={(e) => handlePlayerChange(e,index)}
                        />
                        <button className='delete-button' onClick={(e) => handleDeletePlayer(index)}>
                            <MdDelete />
                        </button>
                    </div>
                ))}
                
                
                <button type="button" onClick={handleAddPlayer} className="tworzenie-gry-button button" style={{alignSelf:"flex-start"}}>
                    Dodaj kolejnego gracza
                </button>
                <button type="button" onClick={(e) => outsideHandler(itemID,{"name":name,"players":players})} className="tworzenie-gry-button-big button">
                    Zaakceptuj zespół
                </button>
            </div>
  )
}

export default TeamListUnfinished