import React, { useEffect, useState } from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import Navbar from '../components/navbar'

const NavbarLocalizer = ({location,logout,username}) => {
  if (location === "/gra"|| location === "/moje-gry") { 
    return <Navbar player={username} location={location} handleLogout={logout}/>
  } else if(location === "/zespol") {
    return <Navbar team={username} location={location} handleLogout={logout}/>
  } else if (location === "/punkt" || location === "/punkt-admin") {
    return <Navbar point={username} location={location} handleLogout={logout}/>
  } else {
    return <Navbar location={location} handleLogout={logout}/>
  }
}

function MainLayout({logoutFunc,user}) {
  const location = useLocation();

  return (
    <>
        <NavbarLocalizer location={location.pathname} logout={logoutFunc} username={user=={}?'':user["username"]}/>
        <Outlet />
    </>
  )
}

export default MainLayout