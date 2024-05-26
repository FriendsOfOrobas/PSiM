import React from 'react'

import { Helmet } from 'react-helmet'

import './moje-gry.css'

const MojeGry = (props) => {
  return (
    <div className="moje-gry-container">
      <Helmet>
        <title>Moje-gry - Gra miejska</title>
        <meta property="og:title" content="Moje-gry - Gra miejska" />
      </Helmet>
      <div className="moje-gry-navbar">
        <button type="button" className="moje-gry-button button">
          <span>
            <span>Wyloguj</span>
            <br></br>
          </span>
        </button>
      </div>
      <div className="moje-gry-container1">
        <div className="moje-gry-container2">
          <span className="moje-gry-text03">
            <span>Jako administrator:</span>
            <br></br>
          </span>
          <div className="moje-gry-gameslist">
            <div className="moje-gry-gameitem button">
              <span className="moje-gry-text06">
                <span>Tytuł gry</span>
                <br></br>
              </span>
              <span className="moje-gry-text09">
                Opis: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nullam quis velit in felis posuere ornare feugiat id felis. Cras
                vel ipsum vitae turpis laoreet scelerisque lobortis et odio.
                Mauris accumsan ornare velit, sit amet vehicula nisl faucibus
                at. Aenean euismod finibus libero id condimentum.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
            </div>
            <div className="moje-gry-gameitem1 button">
              <span className="moje-gry-text10">
                <span>Tytuł gry</span>
                <br></br>
              </span>
              <span className="moje-gry-text13">
                Opis: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nullam quis velit in felis posuere ornare feugiat id felis. Cras
                vel ipsum vitae turpis laoreet scelerisque lobortis et odio.
                Mauris accumsan ornare velit, sit amet vehicula nisl faucibus
                at. Aenean euismod finibus libero id condimentum.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
            </div>
            <div className="moje-gry-gameitem2 button">
              <span className="moje-gry-text14">
                <span>Tytuł gry</span>
                <br></br>
              </span>
              <span className="moje-gry-text17">
                Opis: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nullam quis velit in felis posuere ornare feugiat id felis. Cras
                vel ipsum vitae turpis laoreet scelerisque lobortis et odio.
                Mauris accumsan ornare velit, sit amet vehicula nisl faucibus
                at. Aenean euismod finibus libero id condimentum.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
            </div>
          </div>
          <button type="button" className="moje-gry-button1 button">
            <span>
              <span>Stwórz grę</span>
              <br></br>
            </span>
          </button>
        </div>
        <div className="moje-gry-container3">
          <span className="moje-gry-text21">
            <span>Jako gracz:</span>
            <br></br>
          </span>
          <div className="moje-gry-gameslist1">
            <div className="moje-gry-gameitem3 button">
              <span className="moje-gry-text24">
                <span>Tytuł gry</span>
                <br></br>
              </span>
              <span className="moje-gry-text27">
                Opis: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nullam quis velit in felis posuere ornare feugiat id felis. Cras
                vel ipsum vitae turpis laoreet scelerisque lobortis et odio.
                Mauris accumsan ornare velit, sit amet vehicula nisl faucibus
                at. Aenean euismod finibus libero id condimentum.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
            </div>
            <div className="moje-gry-gameitem4 button">
              <span className="moje-gry-text28">
                <span>Tytuł gry</span>
                <br></br>
              </span>
              <span className="moje-gry-text31">
                Opis: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nullam quis velit in felis posuere ornare feugiat id felis. Cras
                vel ipsum vitae turpis laoreet scelerisque lobortis et odio.
                Mauris accumsan ornare velit, sit amet vehicula nisl faucibus
                at. Aenean euismod finibus libero id condimentum.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
            </div>
            <div className="moje-gry-gameitem5 button">
              <span className="moje-gry-text32">
                <span>Tytuł gry</span>
                <br></br>
              </span>
              <span className="moje-gry-text35">
                Opis: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nullam quis velit in felis posuere ornare feugiat id felis. Cras
                vel ipsum vitae turpis laoreet scelerisque lobortis et odio.
                Mauris accumsan ornare velit, sit amet vehicula nisl faucibus
                at. Aenean euismod finibus libero id condimentum.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
            </div>
            <div className="moje-gry-gameitem6 button">
              <span className="moje-gry-text36">
                <span>Tytuł gry</span>
                <br></br>
              </span>
              <span className="moje-gry-text39">
                Opis: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nullam quis velit in felis posuere ornare feugiat id felis. Cras
                vel ipsum vitae turpis laoreet scelerisque lobortis et odio.
                Mauris accumsan ornare velit, sit amet vehicula nisl faucibus
                at. Aenean euismod finibus libero id condimentum.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MojeGry
