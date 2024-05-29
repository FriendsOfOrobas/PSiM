import React from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import Navbar from '../components/navbar'

const NavbarLocalizer = ({location}) => {
  if (location === "/gracz") {
    
    return <Navbar player={"defau"} location={location}/>
  } else if(location === "/zespol") {
    return <Navbar team={"defaut"} location={location}/>
  } else if (location === "/punkt" || location === "/punkt-admin") {
    return <Navbar point={"defaul"} location={location}/>
  } else {
    return <Navbar location={location}/>
  }
}

function MainLayout() {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
        <NavbarLocalizer location={location.pathname}/>
        <Outlet />
    </>
  )
}

export default MainLayout