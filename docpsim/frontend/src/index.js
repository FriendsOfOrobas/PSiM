import React, { useEffect, useState } from 'react'
import { createRoot } from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from 'react-router-dom'
import {StrictMode} from 'react';
import {AuthProvider, RequireAuth} from 'react-auth-kit'


// import createStore from 'react-auth-kit/createStore';

import './style.css'
import Punkt from './views/punkt'
import PunktAdmin from './views/punkt-admin'
import Logowanie from './views/logowanie'
import Gra from './views/gra'
import MojeGry from './views/moje-gry'
import TworzenieGry from './views/tworzenie-gry'
import Rejestracja from './views/rejestracja'
import Zespol from './views/zespol'
import Home from './views/home'
import NotFound from './views/not-found'
import MainLayout from './layouts/MainLayout'
import Unlock from './views/unlock';



const App = () => {
  const [user,setUser] = useState(() => JSON.parse(sessionStorage.getItem('user') ?? '{}'))
  const [game,setGame] = useState(() => JSON.parse(sessionStorage.getItem('game') ?? '{}'))
  const [team,setTeam] = useState(() => JSON.parse(sessionStorage.getItem('team') ?? '{}'))
  

  // const store = createStore({
  //   authName:'_auth',
  //   authType:'cookie',
  //   cookieDomain: window.location.hostname,
  //   cookieSecure: false,
  // });
  
  useEffect(()=>{
    sessionStorage.setItem('user',JSON.stringify(user))
  },[user])

  useEffect(()=>{
    sessionStorage.setItem('game',JSON.stringify(game))
  },[game])

  useEffect(()=>{
    sessionStorage.setItem('team',JSON.stringify(team))
  },[team])

  const logIn = (data) =>{
    setUser(data)
  }

  const logOut = () =>{
    setUser({})
    setGame({})
  }

  const changeCurrentGame = (newGame, first = false) =>{
    if(first){
      if (Object.keys(game).length === 0) {
        setGame(newGame)
      } 
    }else{
      setGame(newGame)
    }

  }

  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route element={<MainLayout logoutFunc={logOut} user={user}/>} path="/" >
          <Route element={<RequireAuth loginPath='/logowanie'><Punkt/></RequireAuth>} path="/punkt" />
          <Route element={<RequireAuth loginPath='/logowanie'><PunktAdmin/></RequireAuth>} path="/punkt-admin" />
          <Route element={<Logowanie loginFunc={logIn}/>}  path="/logowanie" />
          <Route element={<RequireAuth loginPath='/logowanie'><Gra game={game} user={user}/></RequireAuth>}  path="/gra" />
          <Route element={<RequireAuth loginPath='/logowanie'><MojeGry user={user} gameChanger={changeCurrentGame}/></RequireAuth>}  path="/moje-gry" />
          <Route element={<RequireAuth loginPath='/logowanie'><TworzenieGry user={user}/></RequireAuth>}  path="/tworzenie-gry" />
          <Route element={<Rejestracja/>}  path="/rejestracja" />
          <Route element={<RequireAuth loginPath='/logowanie'><Zespol game={game}/></RequireAuth>}  path="/zespol" />
          <Route element={<RequireAuth loginPath='/logowanie'><Unlock user={user}/></RequireAuth>} path='/unlock/:gameId/:checkpointId' />
          <Route element={<Home />}  index />
          <Route element={<NotFound/>} path="*" />
    </Route>
    )
  )

  return(    
  <AuthProvider authType={'cookie'}
  authName={'_auth'}
  cookieDomain={window.location.hostname}
  cookieSecure={window.location.protocol === "https:"}> 
    <RouterProvider router={router}/>
  </AuthProvider>
  );
  
}

// const rootElement = 
// document.getElementById('root');
// const root = 
// createRoot(rootElement);
// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// );

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);