import React, { useState , useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import {useAuthHeader} from 'react-auth-kit';

import { Helmet } from 'react-helmet'

import './punkt-admin.css'

const PunktAdmin = (props) => {
  const[comments,setComments] = useState([])
  const[newComment,setNewComment] = useState('')
  const[update,setUpdate] = useState({})
  const[checkpoint,setCheckpoint] = useState({})
  const {state} = useLocation()
  const {point, user} = state
  const authHeader = useAuthHeader()
  

  const commentPOST = async(newComment) =>{
    const res = await fetch("/checkpoint/"+point["id"]+"/comments",{
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
      const res = await fetch("/checkpoint/"+point["id"]+"/comments",{
        headers: {
          "Authorization": authHeader()
        }
      })
      const data = await res.json()
      setComments(data)
    }

    fetchComments()
  },[update])
  useEffect(() =>{
    const fetchPoint = async() =>{
      const res = await fetch("/checkpoints/"+point["id"]+"/admin",{
        headers: {
          "Authorization": authHeader()
        }
      })
      const data = await res.json()
      setCheckpoint(data)
    }

    fetchPoint()
  },[])


  return (
    <div className='punkt-admin-container'>
      <Helmet>
        <title>PunktAdmin - Gra miejska</title>
        <meta property="og:title" content="PunktAdmin - Gra miejska" />
      </Helmet>
      <h1 style={{"textAlign":"center","marginTop":"4px","marginBottom":"4px"}}>{checkpoint["name"]} - Panel administratora</h1>
      <div className="punkt-admin-container1">
        <div className="punkt-admin-container2">
          <h1 className="punkt-admin-text04">Komentarze</h1>
          <ul className="list punkt-admin-ul">
          {comments.map((comment,index)=>(
            <li key={index} className="list-item">
              <span>{comment["comment"]} - {comment["author"]}</span>
              <br></br>
              <span>{comment["time"]}</span>
            </li>
            ))}

          </ul>
          <input
            type="text"
            placeholder="placeholder"
            className="punkt-admin-textinput input"
          />
          <button type="submit" className="button punkt-admin-button" onClick={handleComment}>
            Skomentuj
          </button>
        </div>
        <div className="punkt-admin-container3">
          <div className="punkt-admin-container4">
            <h1 className="punkt-admin-text13">
              <span>OPIS</span>

            </h1>
            <span className="punkt-text17">
              {checkpoint["description"]}
            </span>
          </div>
          <div className="punkt-admin-container5">
            <h1 className="punkt-admin-text17">
              {/* <span>QR</span> */}
              <img style={{"maxWidth":"100%","maxHeight":"100%"}} src={"\\assets\\images\\"+checkpoint["qr_code_path"]} />
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PunktAdmin
