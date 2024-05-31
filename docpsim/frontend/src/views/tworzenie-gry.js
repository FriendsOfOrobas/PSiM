import React from 'react'

import { Helmet } from 'react-helmet'
import TeamList from '../components/TeamList'
import PointsList from '../components/PointsList'

import './tworzenie-gry.css'


const TworzenieGry = (props) => {
  return (
    <>
      <Helmet>
        <title>Tworzenie-gry - Gra miejska</title>
        <meta property="og:title" content="Tworzenie-gry - Gra miejska" />
      </Helmet>
      <div className="tworzenie-gry-container1">
        <div className="tworzenie-gry-container2">
          <span className="tworzenie-gry-text03">
            <span>Nazwa gry</span>
            <br></br>
          </span>
          <input type="text" placeholder="placeholder" className="input" />
        </div>
        <TeamList/>
        <PointsList/>
        <div className="tworzenie-gry-container5">
          <span className="tworzenie-gry-text27">
            <span>Osiągnięcia</span>
            <br></br>
          </span>
          <div className="tworzenie-gry-teamlist1">
            <div className="tworzenie-gry-teamitem1 button">
              <span className="tworzenie-gry-text30">
                <span>Wielbiciel kwiatów</span>
                <br></br>
              </span>
              <span className="tworzenie-gry-text33">
                <span>Dotrzyj jako pierwszy do punktu Kwitnący ogród</span>
                <br></br>
                <span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
              </span>
              <span className="tworzenie-gry-text37">
                <span className="tworzenie-gry-text38">Nagroda:</span>
                <span> +15 pkt</span>
              </span>
            </div>
            <div className="tworzenie-gry-teamitemunfinished1 button">
              <input
                type="text"
                rows="Nazwa osiągnięcia"
                placeholder="Nazwa punktu"
                className="tworzenie-gry-textinput2 input"
              />
              <textarea
                placeholder="Opis osiągnięcia"
                className="textarea"
              ></textarea>
              <div className="tworzenie-gry-container6">
                <span>Typ osiągnięcia: </span>
                <select>
                  <option value="Option 1">Option 1</option>
                  <option value="Ilość punktów">Ilość punktów</option>
                  <option value="Option 2">Option 2</option>
                  <option value="Option 3">Option 3</option>
                </select>
              </div>
              <input
                type="text"
                rows="Nazwa osiągnięcia"
                placeholder="Ilość wymaganych punktów"
                className="tworzenie-gry-textinput3 input"
              />
              <input
                type="text"
                rows="Nazwa osiągnięcia"
                placeholder="Ilość bonusowych punktów"
                className="tworzenie-gry-textinput4 input"
              />
              <button type="button" className="tworzenie-gry-button button">
                Zaakceptuj osiągnięcie
              </button>
            </div>
            <button type="button" className="tworzenie-gry-button-big button">
              Dodaj osiągnięcie
            </button>
          </div>
        </div>
        <button type="button" className="tworzenie-gry-button-big button">
          Zaakceptuj grę
        </button>
      </div>
    </>
  )
}

export default TworzenieGry
