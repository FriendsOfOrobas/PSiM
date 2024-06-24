import React, { useState } from 'react'

import { Helmet } from 'react-helmet'
import {useNavigate} from 'react-router-dom'
import {useSignIn} from 'react-auth-kit'

import './logowanie.css'

const Logowanie = ({loginFunc}) => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  const signIn = useSignIn()

  const loginSubmit = async() =>{
    const data = {
      username,
      password
    }
    const body_str = 'username='+data["username"]+'&password='+data["password"]+'&scope=&client_id=&client_secret='
    const res = await fetch("api/login/",{
      method: "POST",
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body_str
    });
    if(res.status === 200){
      const res_data = await res.json()
      signIn({
        token: res_data["access_token"],
        expiresIn: 1440,
        tokenType: "Bearer",
        authState: {username: data["username"]}
      })

      const user_res = await fetch("api/users/me/", {
        headers:{
          "Authorization": "Bearer "+res_data["access_token"]
        }
      })
      const user_res_data = await user_res.json()
      loginFunc(user_res_data)
  
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
