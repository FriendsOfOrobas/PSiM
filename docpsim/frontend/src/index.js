import React, { useState } from 'react'
import { createRoot } from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from 'react-router-dom'
import {StrictMode} from 'react';

import './style.css'
import Punkt from './views/punkt'
import PunktAdmin from './views/punkt-admin'
import Logowanie from './views/logowanie'
import Gracz from './views/gracz'
import MojeGry from './views/moje-gry'
import TworzenieGry from './views/tworzenie-gry'
import Rejestracja from './views/rejestracja'
import Zespol from './views/zespol'
import Home from './views/home'
import NotFound from './views/not-found'
import MainLayout from './layouts/MainLayout'



const App = () => {
  const [user,setUser] = useState({})


  const logIn = async(data) =>{
    const res = await fetch("http://localhost:8000/users?username="+data["username"])
    const res_data = await res.json()
    if (res_data == false) {
      return false
    }
    const res_user = res_data[0]
    if (res_user["password"] === data["password"]) {
      setUser(res_user)
      return true
    }else{
      return false
    }
  }

  const logOut = () =>{
    setUser({})
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route element={<MainLayout logoutFunc={logOut} user={user}/>} path="/" >
          <Route element={<Punkt/>} path="/punkt" />
          <Route element={<PunktAdmin/>} path="/punkt-admin" />
          <Route element={<Logowanie loginFunc={logIn}/>}  path="/logowanie" />
          <Route element={<Gracz/>}  path="/gracz" />
          <Route element={<MojeGry user={user}/>}  path="/moje-gry" />
          <Route element={<TworzenieGry user={user}/>}  path="/tworzenie-gry" />
          <Route element={<Rejestracja/>}  path="/rejestracja" />
          <Route element={<Zespol/>}  path="/zespol" />
          <Route element={<Home />}  index />
          <Route element={<NotFound/>} path="*" />
    </Route>
    )
  )

  return <RouterProvider router={router}/>;
  
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