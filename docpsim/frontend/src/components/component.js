import React from 'react'

import PropTypes from 'prop-types'

import './component.css'

const AppComponent = (props) => {
  return (
    <div className="app-component-container">
      <span className="app-component-text">
        <span>Zespoły</span>
        <br></br>
      </span>
      <div className="app-component-teamlist">
        <div className="app-component-teamitem button">
          <span className="app-component-text03">
            <span>Zespół 1</span>
            <br></br>
          </span>
          <span className="app-component-text06">
            <span>- Gracz 1</span>
            <br></br>
            <span>- Gracz 2</span>
            <br></br>
            <span>
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
          </span>
        </div>
        <div className="app-component-teamitemunfinished button">
          <input
            type="text"
            placeholder={props.textinputPlaceholder}
            className="app-component-textinput input"
          />
          <input
            type="text"
            placeholder={props.textinputPlaceholder1}
            className="app-component-textinput1 input"
          />
          <button type="button" className="app-component-button button">
            <span className="app-component-text12">
              <span>Dodaj kolejnego gracza</span>
              <br></br>
            </span>
          </button>
          <button type="button" className="app-component-button1 button">
            <span className="app-component-text15">
              <span>Zaakceptuj zespół</span>
              <br></br>
            </span>
          </button>
        </div>
        <button type="button" className="app-component-button2 button">
          <span className="app-component-text18">
            <span>Dodaj zespół</span>
            <br></br>
          </span>
        </button>
      </div>
    </div>
  )
}

AppComponent.defaultProps = {
  textinputPlaceholder1: 'Nazwa gracza',
  textinputPlaceholder: 'Nazwa zespołu',
}

AppComponent.propTypes = {
  textinputPlaceholder1: PropTypes.string,
  textinputPlaceholder: PropTypes.string,
}

export default AppComponent
