import React from 'react'

import { Helmet } from 'react-helmet'

import AppComponent from '../components/component'
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
            placeholder="placeholder"
            className="app-component-textinput input"
          />
          <input
            type="text"
            placeholder="placeholder"
            className="app-component-textinput1 input"
          />
          <button type="button" className="tworzenie-gry-button button" style={{alignSelf:"flex-start"}}>
            Dodaj kolejnego gracza
          </button>
          <button type="button" className="tworzenie-gry-button-big button">
            Zaakceptuj zespół
          </button>
        </div>
        <button type="button" className="tworzenie-gry-button-big button">
          Dodaj zespół
        </button>
      </div>
    </div>
        <div className="tworzenie-gry-container3">
          <span className="tworzenie-gry-text06">
            <span>Punkty</span>
            <br></br>
          </span>
          <div className="tworzenie-gry-teamlist">
            <div className="tworzenie-gry-teamitem button">
              <span className="tworzenie-gry-text09">
                <span>Punkt 1</span>
                <br></br>
              </span>
              <span className="tworzenie-gry-text12">
                <span>
                  Punkt 1 znajduje się pod ławko w Parku przy ulicy
                  Politechnicznej
                </span>
                <br></br>
                <span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
              </span>
              <span className="tworzenie-gry-text16">
                <span>Punkt blokowany przez punkt nr 0</span>
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
            <div className="tworzenie-gry-teamitemunfinished button">
              <input
                type="text"
                placeholder="Nazwa punktu"
                className="tworzenie-gry-textinput1 input"
              />
              <textarea
                placeholder="Opis punktu"
                className="textarea"
              ></textarea>
              <div className="tworzenie-gry-container4">
                <span>Punkt blokowany do odkrycia punktu nr </span>
                <select>
                  <option value="1">1</option>
                  <option value="Option 2">2</option>
                </select>
              </div>
              <button type="button" className="tworzenie-gry-button button">
                Zaakceptuj punkt
              </button>
            </div>
            <button type="button" className="tworzenie-gry-button-big button">
              Dodaj punkt
            </button>
          </div>
        </div>
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
