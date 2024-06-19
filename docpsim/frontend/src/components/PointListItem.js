import React from 'react'
import {useNavigate} from 'react-router-dom'

const PointListItem = ({point, blocked,admin=false, user}) => {
  const navigate = useNavigate()
  const clickHandler = () =>{
    if (admin) {
      navigate('/punkt-admin',{ state: {point, user} })
    } else {
      if (blocked) {
        navigate('/punkt',{ state: { blocked: true, point, user} })
      }else{
        navigate('/punkt',{ state: { blocked: false, point, user} })
      }
    }

  }
  return (
    <div className="gracz-gameitem list-item button" onClick={clickHandler}>
        <span className="gracz-text12">
            <span>{point["name"]}</span>
        </span>
    </div>
  )
}

export default PointListItem