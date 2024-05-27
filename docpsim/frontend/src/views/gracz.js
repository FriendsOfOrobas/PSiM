import React from 'react'

import { Helmet } from 'react-helmet'

import './gracz.css'

const Gracz = (props) => {
  return (
    <>
      <Helmet>
        <title>Gracz - Gra miejska</title>
        <meta property="og:title" content="Gracz - Gra miejska" />
      </Helmet>
      {/* <div className="gracz-navbar">
        <animate-on-reveal
          animation="tada"
          duration="500ms"
          delay="200ms"
          easing="linear"
          iteration="1"
        >
          <span data-thq-animate-on-reveal="true" className="gracz-text">
            <span className="gracz-text01">
              Witaj! &#123;nazwa_gracza&#125;
            </span>
            <br></br>
          </span>
        </animate-on-reveal>
        <button type="button" className="gracz-button button">
          <span>
            <span>Wyloguj</span>
            <br></br>
          </span>
        </button>
      </div> */}
      <div className='gra-container'>
      <span className="gracz-text06">
        <span>&#123;Nazwa Aktualnie rozgrywanej Gry&#125;</span>
        <br></br>
      </span>
      <div className="gracz-container1">
        <div className="gracz-container2">
          <div className="gracz-container3">
            <h1 className="gracz-text09">
              <span>ODBLOKOWANE PUNKTY</span>
              <br></br>
            </h1>
            <ul className="list gracz-ul">
              <li className="list-item">
                <div className="gracz-gameitem button">
                  <span className="gracz-text12">
                    <span>Punkt</span>
                    <br></br>
                  </span>
                  <span className="gracz-text15">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                </div>
              </li>
              <li className="list-item">
                <div className="gracz-gameitem1 button">
                  <span className="gracz-text16">
                    <span>Punkt</span>
                    <br></br>
                  </span>
                  <span className="gracz-text19">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                </div>
              </li>
              <li className="list-item">
                <div className="gracz-gameitem2 button">
                  <span className="gracz-text20">
                    <span>Punkt</span>
                    <br></br>
                  </span>
                  <span className="gracz-text23">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div className="gracz-container4">
            <h1 className="gracz-text24">
              <span>BLOKOWANE PUNKTY</span>
              <br></br>
            </h1>
            <ul className="list gracz-ul1">
              <li className="list-item">
                <div className="gracz-gameitem3 button">
                  <span className="gracz-text27">
                    <span>Punkt</span>
                    <br></br>
                  </span>
                  <span className="gracz-text30">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                </div>
              </li>
              <li className="list-item">
                <div className="gracz-gameitem4 button">
                  <span className="gracz-text31">
                    <span>Punkt</span>
                    <br></br>
                  </span>
                  <span className="gracz-text34">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                </div>
              </li>
              <li className="list-item">
                <div className="gracz-gameitem5 button">
                  <span className="gracz-text35">
                    <span>Punkt</span>
                    <br></br>
                  </span>
                  <span className="gracz-text38">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="gracz-container5">
          <h1 className="gracz-text39">Osiagniecia</h1>
          <ul className="list gracz-ul2">
            <li className="list-item">
              <span>
                <span>Osiagniecie:</span>
                <br></br>
                <span>                   -  warunek</span>
                <br></br>
              </span>
            </li>
            <li className="list-item">
              <span>
                <span>Osiagniecie:</span>
                <br></br>
                <span>                   -  warunek</span>
                <br></br>
              </span>
            </li>
            <li className="list-item">
              <span>
                <span>Osiagniecie:</span>
                <br></br>
                <span>                   -  warunek</span>
                <br></br>
              </span>
            </li>
            <li className="list-item">
              <span>
                <span>Osiagniecie:</span>
                <br></br>
                <span>                   -  warunek</span>
                <br></br>
              </span>
            </li>
            <li className="list-item">
              <span>
                <span>Osiagniecie:</span>
                <br></br>
                <span>                   -  warunek</span>
                <br></br>
              </span>
            </li>
            <li className="list-item">
              <span>
                <span>Osiagniecie:</span>
                <br></br>
                <span>                   -  warunek</span>
                <br></br>
              </span>
            </li>
            <li className="list-item">
              <span>
                <span>Osiagniecie:</span>
                <br></br>
                <span>                   -  warunek</span>
                <br></br>
              </span>
            </li>
            <li className="list-item">
              <span>
                <span>Osiagniecie:</span>
                <br></br>
                <span>                   -  warunek</span>
                <br></br>
              </span>
            </li>
            <li className="list-item"></li>
            <li className="list-item"></li>
          </ul>
        </div>
      </div>
      </div>
    </>
  )
}

export default Gracz
