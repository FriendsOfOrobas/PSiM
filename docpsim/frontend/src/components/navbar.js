import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

const Navbar = ({team="Default team"}) => {
  return (
    <div className="zespol-navbar">
      <h1 className="zespol-text">{team}</h1>
      <div className='navbar-buttons-containter'>
        <Link to="/moje-gry" type="button" className="zespol-button">
            Moje Gry
        </Link>
        <Link to="/zespol" type="button" className="zespol-button">
            Mój zespół
        </Link>
        <Link to="/gracz" type="button" className="zespol-button">
            Gra
        </Link>
      </div>
      <Link to="/rejestracja" type="button" className="zespol-button">
          Wyloguj
      </Link>
    </div>
  )
}

export default Navbar