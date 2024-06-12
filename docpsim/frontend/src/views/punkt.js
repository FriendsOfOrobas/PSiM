import React, { useState , useEffect} from 'react'
import { useLocation } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import './punkt.css'

const Punkt = () => {
  const[comments,setComments] = useState([])
  const[newComment,setNewComment] = useState('')
  const {state} = useLocation()
  const {blocked, point, user} = state

  const commentPOST = async(newComment) =>{
    const res = await fetch("http://localhost:8000/comments",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newComment)
    });
    return;
  }

  const handleComment = () =>{
    const data = {
      "checkpoint_id": point["id"],
      "author_id": user["id"],
      "comment": newComment,
      "date_time": "1718147530"
    }
  }

  useEffect(() => {
    const fetchComments = async() =>{
      const res = await fetch("http://localhost:8000/comments")
      const data = await res.json()
      setComments(data)
    }

    fetchComments()
  },[])


  return (
    <>
      <Helmet>
        <title>Punkt - Gra miejska</title>
        <meta property="og:title" content="Punkt - Gra miejska" />
      </Helmet>
      <div className="punkt-container1">
        <div className="punkt-container2">
          <h1 className="punkt-text04">Komentarze {point["name"]}</h1>
          <ul className="list punkt-ul">
            <li className="list-item">
              <span>
                <span>Komentarze</span>
              </span>
            </li>
            <li className="list-item">
              <span>Text</span>
            </li>
            <li className="list-item">
              <span>Text</span>
            </li>
          </ul>
          <input
            onChange={(e) => {setNewComment(e.target.value)}}
            type="text"
            placeholder="placeholder"
            className="punkt-textinput input"
          />
          <button type="submit" className="button punkt-button">
            Skomentuj
          </button>
        </div>
        <div className="punkt-container3">
          <div className="punkt-container4">
            <h1 className="punkt-text13">
              <span>OPIS</span>
              <br></br>
              <br></br>
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
