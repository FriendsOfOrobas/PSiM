import React from 'react'
import './AchievementListItem.css'

const AchievementListItem = ({achievement}) => {
  return (
    <div className="achievement-item">
        <span className='achievement-text-container'>
            <span>{achievement["title"]}: {achievement["description"]} </span>
            <span>
                {"point" in achievement?
                "Dotrzyj do punktu nr " + achievement["point"] + " jako pierwszy"
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