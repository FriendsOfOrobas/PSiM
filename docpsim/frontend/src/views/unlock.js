import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {useAuthHeader} from 'react-auth-kit';

const Unlock = ({}) => {
    const {gameId,checkpointId} = useParams()
    const authHeader = useAuthHeader()
    const [message,setMessage] = useState('')
  

    useEffect(() =>{
        const unlock = async() =>{
            const user_res = await fetch("https://p-si-m-back.vercel.app/users/me/", {
              headers:{
                "Authorization": authHeader()
              }
            })
            const user_res_data = await user_res.json()
            const team_res = await fetch("https://p-si-m-back.vercel.app/teams/"+gameId+"/"+user_res_data["id"],{
                headers: {
                  "Authorization": authHeader()
                }
            })
            const team_res_data = await team_res.json()

            const unlock_res = await fetch("https://p-si-m-back.vercel.app/checkpoint/"+checkpointId+"/team/"+team_res_data["id"]+"/unlock",{
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": authHeader()
                }
            });
            
            if (unlock_res.status == 201) {
              setMessage("Pomyślnie odblokowano punkt!")
            } else if(unlock_res.status == 400) {
              setMessage("Nie odblokowano poprzedniego punktu lub odblokowano punkt ponownie!")
            }else{
              setMessage("Błąd przy odblokowywaniu punktu")
            }
        }
        unlock()
    },[])

  return (
    <h1>{message}</h1>
  )
}

export default Unlock
