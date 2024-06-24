import React, { useState , useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import {useAuthHeader} from 'react-auth-kit';

import { Helmet } from 'react-helmet'

import './punkt.css'

const Punkt = () => {
  const[comments,setComments] = useState([])
  const[newComment,setNewComment] = useState('')
  const[update,setUpdate] = useState({})
  const {state} = useLocation()
  const {blocked, point, user} = state
  const authHeader = useAuthHeader()

  const commentPOST = async(newComment) =>{
    const res = await fetch("api/checkpoint/"+point["id"]+"/comments",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader()
      },
      body: JSON.stringify(newComment)
    });
    return;
  }

  const handleComment = () =>{
    const data = {
      "user_id": user["id"],
      "comment": newComment,
    }
    commentPOST(data)
    setUpdate(data)
    setNewComment('')
  }

  useEffect(() => {
    const fetchComments = async() =>{
      const res = await fetch("api/checkpoint/"+point["id"]+"/comments",{
        headers: {
          "Authorization": authHeader()
        }
      })
      const data = await res.json()
      setComments(data)
    }

    fetchComments()
  },[update])


  return (
    <>
      <Helmet>
        <title>Punkt - Gra miejska</title>
        <meta property="og:title" content="Punkt - Gra miejska" />
      </Helmet>
      <h1 style={{"textAlign":"center","marginTop":"4px","marginBottom":"4px"}}>{point["name"]}</h1>
      <div className="punkt-container1">
      {  blocked == false?<>
        <div className="punkt-container2">
          <h1 className="punkt-text04">Komentarze</h1>
          <ul className="list punkt-ul">
            {comments.map((comment,index)=>(
            <li key={index} className="list-item">
              <span>{comment["comment"]} - {comment["author"]}</span>
              <br></br>
              <span>{comment["time"]}</span>
            </li>
            ))}

          </ul>
          <input
            onChange={(e) => {setNewComment(e.target.value)}}
            value={newComment}
            type="text"
            placeholder="placeholder"
            className="punkt-textinput input"
          />
          <button type="submit" className="button punkt-button" onClick={handleComment}>
            Skomentuj
          </button>
        </div>
        </>:
        <></>
        }
        <div className="punkt-container3">
          <div className="punkt-container4">
            <h1 className="punkt-text13">
              <span>OPIS</span>
            </h1>
            <span className="punkt-text17">
              {point["description"]}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Punkt
