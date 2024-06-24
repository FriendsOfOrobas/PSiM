import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import { Helmet } from 'react-helmet'

import './rejestracja.css'

const Rejestracja = (props) => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [repeated,setRepeated] = useState('')
  const navigate = useNavigate()

  const userPOSTRequest = async(newUser) =>{
    const res = await fetch("api/register",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    });
    return;
  }


  const submitUser = () =>{
    if (repeated===password) {
      const userData = {
        username,
        password
      }
  
      userPOSTRequest(userData)
      return navigate('/')
    }else{
      return
    }

  }

  return (
    <>
      <Helmet>
        <title>Rejestracja - Gra miejska</title>
        <meta property="og:title" content="Rejestracja - Gra miejska" />
      </Helmet>
      {/* <div className="rejestracja-emptynavbar"></div> */}
      <div className="rejestracja-container1">
        <div className="rejestracja-container2">
          <span className="rejestracja-text">Zarejestruj się</span>
          <input
            onChange={(e) => {setUsername(e.target.value)}}
            type="text"
            required="true"
            placeholder="login"
            className="rejestracja-textinput input"
          />
          <input
            onChange={(e) => {setPassword(e.target.value)}}
            type="password"
            required="true"
            placeholder="hasło"
            className="input"
          />
          <input
            onChange={(e) => {setRepeated(e.target.value)}}
            type="password"
            required="true"
            placeholder="powtórz hasło"
            className="input"
          />
          <button type="button" className="rejestracja-button button" onClick={submitUser}>
            Zarejestruj
          </button>
        </div>
      </div>
    </>
  )
}

export default Rejestracja
