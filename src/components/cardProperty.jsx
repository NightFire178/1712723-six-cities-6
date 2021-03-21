import React, {useEffect, useState} from "react";
import {Redirect} from 'react-router-dom'
import Header from "./block/header";
import Map from "./block/map";
import {useSelector, useDispatch} from "react-redux";
import hotelInfo from "../redux/thunk/hotelInfo";
import Card from "./block/card";
import Loader from "./block/loader";
import Comments from "./comments"
import FavoriteButton from "./block/favoriteButton";

// FIXME avatar server url
const CardProperty = (props) => {
  const [dataS, setDataS] = useState(false)
  const cardId = props.match.params.id;
  const dispatch = useDispatch();
  const {
    cardState, // TODO отдельный селектор с диструкторизацией
    cardNearbyState,
    cardCommentsState,
    dataState,
    isAuth,
  } = useSelector((state) => {
    if (
      state.hotelInfo.findIndex((obj) => obj.id === cardId) >= 0 &&
      state.appState.load
    ) {
      // eslint-disable-next-line eqeqeq
      const find = (array, id = cardId) => array.find((obj) => +obj.id === +id);
      const hotelInf = find(state.hotelInfo);
      const card = find(state.hotels);
      const nearby = [
        find(state.hotels, hotelInf.nearbyID[0]),
        find(state.hotels, hotelInf.nearbyID[1]),
        find(state.hotels, hotelInf.nearbyID[2]),
      ];
      return {
        isAuth: state.appState.isAuth,
        cardState: card,
        cardNearbyState: nearby,
        cardCommentsState: hotelInf.comment,
        dataState: true,
      };
    } else {
      return {dataState: false};
    }
  });
  useEffect(() => {
    dispatch(hotelInfo(cardId, setDataS));
    window.scrollTo(0, 0);
  }, [cardId]);

  const starWidth = (rating) => {
    let temp = Math.floor(rating);
    return `${(rating - temp) * 10 >= 5 ? temp * 20 + 20 : temp * 20}%`;
  };
  if (dataState && !dataS) {
    return (
      <div>
        <div style={{display: `none`}}>
          <svg xmlns="http://www.w3.org/2000/svg">
            <symbol id="icon-arrow-select" viewBox="0 0 7 4">
              <path
                fillRule="evened"
                clipRule="evened"
                d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"
              />
            </symbol>
            <symbol id="icon-bookmark" viewBox="0 0 17 18">
              <path
                d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"/>
            </symbol>
            <symbol id="icon-star" viewBox="0 0 13 12">
              <path
                fillRule="evened"
                clipRule="evened"
                d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"
              />
            </symbol>
          </svg>
        </div>
        <div className="page">
          <Header/>
          <main className="page__main page__main--property">
            <section className="property">
              <div className="property__gallery-container container">
                <div className="property__gallery">
                  {cardState.images.map((img, i) => {
                    if (i < 6) {
                      return (
                        <React.Fragment key={img + i}>
                          <div className="property__image-wrapper">
                            <img
                              className="property__image"
                              src={img}
                              alt="Photo studio"
                            />
                          </div>
                        </React.Fragment>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </div>
              <div className="property__container container">
                <div className="property__wrapper">
                  {cardState.is_premium && (
                    <div className="property__mark">
                      <span>Premium</span>
                    </div>
                  )}
                  <div className="property__name-wrapper">
                    <h1 className="property__name">{cardState.title}</h1>
                    <FavoriteButton cardId={cardState.id} buttonPlace={`property`} />
                  </div>
                  <div className="property__rating rating">
                    <div className="property__stars rating__stars">
                      <span style={{width: starWidth(cardState.rating)}}/>
                      <span className="visually-hidden">Rating</span>
                    </div>
                    <span className="property__rating-value rating__value">
                      {cardState.rating}
                    </span>
                  </div>
                  <ul className="property__features">
                    <li className="property__feature property__feature--entire">
                      {cardState.type}
                    </li>
                    <li className="property__feature property__feature--bedrooms">
                      {cardState.bedrooms} Bedrooms
                    </li>
                    <li className="property__feature property__feature--adults">
                      Max {cardState.max_adults} adults
                    </li>
                  </ul>
                  <div className="property__price">
                    <b className="property__price-value">€{cardState.price}</b>
                    <span className="property__price-text">&nbsp;night</span>
                  </div>
                  <div className="property__inside">
                    <h2 className="property__inside-title">What`s inside</h2>
                    <ul className="property__inside-list">
                      {cardState.goods.map((goods, i) => (
                        <React.Fragment key={goods + i}>
                          <li className="property__inside-item">{goods}</li>
                        </React.Fragment>
                      ))}
                    </ul>
                  </div>
                  <div className="property__host">
                    <h2 className="property__host-title">Meet the host</h2>
                    <div className="property__host-user user">
                      <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                        <img
                          className="property__avatar user__avatar"
                          src={cardState.host.avatar_url}
                          width={74}
                          height={74}
                          alt="Host avatar"
                        />
                      </div>
                      <span className="property__user-name">
                        {cardState.host.name}
                      </span>
                    </div>
                    <div className="property__description">
                      {cardState.description.split(`.`).map((item, i) => (
                        <React.Fragment key={item + i}>
                          <p className="property__text">{item}.</p>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <Comments id={cardId} cardCommentsState={cardCommentsState} starWidth={starWidth} isAuth={isAuth.now}/>
                </div>
              </div>
              <section
                className="property__map map"
                style={{
                  width: 1144,
                  margin: `0 auto`,
                }}
              >
                <Map hotels={cardNearbyState}/>
              </section>
            </section>
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">
                  Other places in the neighbourhood
                </h2>
                <div className="near-places__list places__list">
                  {cardNearbyState.map((obj) => {
                    return <Card key={obj.id} objCard={obj} cardPlace={`near`}/>;
                  })}
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    );
  } else if (dataS) {
    return (<Redirect to={`/404`}/>)
  } else {
    return <Loader/>;
  }
};

export default CardProperty;
