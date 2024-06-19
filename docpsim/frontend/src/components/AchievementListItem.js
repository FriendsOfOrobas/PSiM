import React from 'react'
import './AchievementListItem.css'

const AchievementListItem = ({achievement}) => {
  return (
    <div className="achievement-item">
        <span className='achievement-text-container'>
            <span>{achievement["description"]} </span>
            <span>
                {achievement["checkpoint_id"] != null?
                "Dotrzyj do punktu nr " + achievement["checkpoint_id"] + " jako pierwszy"
                :
                "Zdobądź " + achievement["treshold"] + " punktów jako pierwszy"
                }
            </span>
            <span>Bonus: {achievement["bonus"]}</span>
        </span>
    </div>
  )
}

export default AchievementListItem