import React, {FC, useState, useMemo} from "react"
import Header from "../../block/header/header";
import Nav from "../../block/nav/nav";
import MapFc from "../../block/map-fc/map-fc";
import Hotels from "../hotels/hotels";
import useHotelsSelection from "../../../hooks/use-selectors-state/use-hotels";
import useAppStateSelection from "../../../hooks/use-selectors-state/use-app-state";

const HomeComponents: FC = () => {
  const cityNow = useAppStateSelection.cityNow()
  const tempHotels = useHotelsSelection.hotels()
  const [activeId, setActiveId] = useState(-1)
  const hotels = useMemo(() => tempHotels.filter((obj) => obj.city.name === cityNow), [cityNow])

  return (
    <>
      <div>
        <div style={{display: `none`}}>
          <svg xmlns="http://www.w3.org/2000/svg">
            <symbol id="icon-arrow-select" viewBox="0 0 7 4">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"
              />
            </symbol>
            <symbol id="icon-bookmark" viewBox="0 0 17 18">
              <path
                d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"/>
            </symbol>
            <symbol id="icon-star" viewBox="0 0 13 12">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"
              />
            </symbol>
          </svg>
        </div>
        <div className={`page page--gray page--main ${!hotels?.length&&`page__main--index-empty`}`}>
          <Header isMain={true}/>
          <main className="page__main page__main--index">
            <h1 className="visually-hidden">Cities</h1>
            <Nav/>
            <div className="cities">
              {hotels?.length ? <div className="cities__places-container container">
                  <Hotels hotels={hotels} setActiveId={setActiveId}/>
                  <div className="cities__right-section">
                    <section className="cities__map map">
                      <MapFc hotels={hotels} activeId={activeId}/>
                    </section>
                  </div>
                </div> :
                <div className="cities__places-container cities__places-container--empty container">
                  <section className="cities__no-places">
                    <div className="cities__status-wrapper tabs__content">
                      <b className="cities__status">No places to stay available</b>
                      <p className="cities__status-description">We could not find any property available at the moment
                        in {cityNow}</p>
                    </div>
                  </section>
                  <div className="cities__right-section"> </div>
                </div>
              }
            </div>
          </main>
        </div>
      </div>
    </>
  )
};


export default HomeComponents;
