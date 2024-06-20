import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { useSignOut } from 'react-auth-kit';
import './navbar.css'


const GreetingText = ({team, player, point}) => {
  if (team !== "empty") {
    return (<h1 className="zespol-text">Witaj {team}!</h1>);
  } else if(player !== "empty") {
    return <h1 className="zespol-text">Witaj {player}!</h1>;
  }else if (point !== "empty") {
    return <h1 className="zespol-text">Witaj {point}!</h1>;
  }else{
    return <h1 className="zespol-text"></h1>;
  }
}

const ButtonContainer = ({location,handleLogout}) => {
  
  if (location === "/" || location === "/logowanie"|| location === "/rejestracja"|| location.slice(0,7) === "/unlock") {
    return (
      <Link to="/" type="button" className="zespol-button" style={{fontSize: "40px"}}>
            <FaHome />
      </Link>
    )
  } else {
    return(
      <>
      <div className='navbar-buttons-containter'>
      <Link to="/moje-gry" type="button" className="zespol-button">
            Moje Gry
        </Link>
        <Link to="/zespol" type="button" className="zespol-button">
            Mój zespół
        </Link>
        <Link to="/gra" type="button" className="zespol-button">
            Gra
        </Link>
      </div>
      <Link to="/" type="button" className="zespol-button" onClick={handleLogout}>
            Wyloguj
      </Link>
      </>
    )
  }
}

const Navbar = ({team="empty", player="empty", point="empty", location, handleLogout}) => {
  const signOut = useSignOut()
  const logOut = () =>{
    signOut()
    handleLogout()
  }
  return (
    <div className="zespol-navbar">
      <GreetingText team={team} player={player} point={point}/>
      <ButtonContainer location={location} handleLogout={logOut}/>
    </div>
  )
}

export default Navbar