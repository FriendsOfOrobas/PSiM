import React from 'react'

const PointListItem = ({point}) => {
  return (
    <div className="gracz-gameitem button list-item">
        <span className="gracz-text12">
            <span>{point["name"]}</span>
        </span>
    </div>
  )
}

export default PointListItem