import React from "react";
import {Link} from "react-router-dom";
import hotel from "../../types/hotel"
import FavoriteButton from "./favorite-button";
import starWidthFunction from "../../utils/star-width"


interface Card {
  objCard: hotel,
  cardPlace: string,
  setActiveId?: React.Dispatch<React.SetStateAction<number>>
}

interface ICardHTML {
  article: string,
  imgWrapper: string,
  img: {
    height: number,
    width: number
  },
  cardInfo: string
}

const cardStylePlace = new Map([
  [`cities`, {
    article: `cities__place-card place-card`,
    imgWrapper: `cities__image-wrapper place-card__image-wrapper`,
    img: {
      width: 260,
      height: 200
    },
    cardInfo: `place-card__info`
  }],
  [`near`, {
    article: `near-places__card place-card`,
    imgWrapper: `near-places__image-wrapper place-card__image-wrapper`,
    img: {
      width: 260,
      height: 200
    },
    cardInfo: `place-card__info`
  }],
  [
    `favorites`, {
    article: `favorites__card place-card`,
    imgWrapper: `favorites__image-wrapper place-card__image-wrapper`,
    img: {
      width: 150,
      height: 110
    },
    cardInfo: `favorites__card-info place-card__info`
  }
  ]
])

const Card: React.FC<Card> = ({objCard, cardPlace, setActiveId}) => {
  const cardHTML:ICardHTML|undefined = cardStylePlace.get(cardPlace)
  // 1. Так можно, но тогда для продакш лучше использовать
  // @see https://reactjs.org/docs/error-boundaries.html#gatsby-focus-wrapper
  if(!cardHTML){
    // 2. лучше выбрасывать исключение в виде объекта ошибки:
    // throw new Error(`card.tsx error cardPlace`);
    throw `card.tsx error cardPlace`;
  }
  const {
    id,
    rating,
    is_premium: premium,
    price,
    type,
    title,
    preview_image: previewImage,
  } = objCard;
  const handleActive = () =>{
    if(setActiveId){
      setActiveId(+objCard.id)
    }
  }
  const handleInActive = () =>{
    if(setActiveId) {
      setActiveId(-1)
    }
  }
  const starWidth = starWidthFunction(rating)
  return (
    <>
      <article
        onMouseEnter={handleActive}
        onMouseLeave={handleInActive}
        className={cardHTML.article}
      >
        {premium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}
        <div
          className={cardHTML.imgWrapper}
        >
          <Link to={`/offer/${id}`}>
            <img
              className="place-card__image"
              src={previewImage}
              width={cardHTML.img.width}
              height={cardHTML.img.height}
              alt="Place image"
            />
          </Link>
        </div>
        <div className={cardHTML.cardInfo}>
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">€{price}</b>
              <span className="place-card__price-text">/&nbsp;night</span>
            </div>
            <FavoriteButton cardId={id} buttonPlace={`card`}/>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: starWidth}}/>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <Link to={`/offer/${id}`}>{title}</Link>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    </>
  );
};


export default Card;
