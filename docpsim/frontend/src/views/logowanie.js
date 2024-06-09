import React, { useState } from 'react'

import { Helmet } from 'react-helmet'
import {useNavigate} from 'react-router-dom'

import './logowanie.css'

const Logowanie = ({loginFunc}) => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()

  const loginSubmit = async() =>{
    const data = {
      username,
      password
    }
    const result = await loginFunc(data)

    if (result) {
      return navigate('/moje-gry')
    }else{
      return navigate('/')
    }
  }

  return (
    <>
      <Helmet>
        <title>Logowanie - Gra miejska</title>
        <meta property="og:title" content="Logowanie - Gra miejska" />
      </Helmet>
      <div className="logowanie-container1">
        <div className="logowanie-container2">
          <span className="logowanie-text">Zaloguj się</span>
          <input
            onChange={(e) => {setUsername(e.target.value)}}
            type="text"
            placeholder="login"
            className="logowanie-textinput input"
          />
          <input 
            onChange={(e) => {setPassword(e.target.value)}}
            type="password" 
            placeholder="hasło" 
            className="input" />
          <button type="button" className="logowanie-button button" onClick={loginSubmit}>
            Zaloguj
          </button>
        </div>
      </div>
    </>
  )
}

export default Logowanie
