import React, {useEffect, FC,} from "react";
import useThunk from "../hooks/use-thunk";
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"
import cityes from "../data/cityes";
import Header from "./block/header";
import hotel from '../types/hotel'
import {StoreType} from "../redux/reducer/reducer";
import Card from "./block/card";

const Favorites: FC = () => {
  const {thunkFavorites} = useThunk()
  const {hotels, city} = useSelector((state: StoreType) => {
    if (state.favorite.length > 0) {
      let citySelector: Array<string> = [];
      // @ts-ignore
      const hotelsSelector: Array<hotel> = state.favorite.map((id) => (state.hotels.find((obj) => +obj.id === id)))
      if (hotelsSelector.length > 0) {
        cityes.forEach(value => {
          if (hotelsSelector.findIndex(obj => obj.city.name === value) >= 0) {
            citySelector.push(value)
          }
        })
      }
      return {hotels: hotelsSelector, city: citySelector}
    } else {
      return {hotels: undefined, city: undefined}
    }
  })
  useEffect(() => {
    thunkFavorites()
  }, [])

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
        <div className="page">
          <Header/>
          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {city && city.map(cityMap => {
                    return (<li key={cityMap} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{cityMap}</span>
                          </a>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {hotels && hotels.filter(temp => temp.city.name === cityMap).map((obj, i) => (
                          <Card objCard={obj} cardPlace={`favorites`} key={obj.id}/>
                        ))}
                      </div>
                    </li>)
                  })}
                </ul>
              </section>
            </div>
          </main>
          <footer className="footer container">
            <Link to={'/'}>
              <div className="footer__logo-link">
                <img
                  className="footer__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={64}
                  height={33}
                />
              </div>
            </Link>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Favorites;
