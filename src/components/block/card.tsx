import React from "react";
import {Link} from "react-router-dom";
import hotel from "../../template/hotel"
import FavoriteButton from "./favoriteButton";

interface Card{
  objCard: hotel,
  cardPlace: string
}
interface cardHTML{
  article:string,
  imgWrapper:string,
  img:{
    height:number,
    width:number
  },
  cardInfo:string
}

const Card: React.FC<Card> = ({objCard, cardPlace}) => {
  let cardHTML:cardHTML = {
    article: `cities__place-card place-card`,
    imgWrapper: `cities__image-wrapper place-card__image-wrapper`,
    img :{
      width: 260,
      height: 200
    },
    cardInfo:`place-card__info`
  };
  switch(cardPlace){
    //default value
    // case `cities`:
    //   break;
    case `near`:
      cardHTML = {
        article: `near-places__card place-card`,
        imgWrapper: `near-places__image-wrapper place-card__image-wrapper`,
        img :{
          width: 260,
          height: 200
        },
        cardInfo:`place-card__info`
      }
      break;
    case `favorites`:
      cardHTML = {
        article: `favorites__card place-card`,
        imgWrapper: `favorites__image-wrapper place-card__image-wrapper`,
        img :{
          width: 150,
          height: 110
        },
        cardInfo:`favorites__card-info place-card__info`
      }
      break;
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

  let starWidth;
  {
    let temp = Math.floor(rating);
    starWidth = `${(rating - temp) * 10 >= 5 ? temp * 20 + 20 : temp * 20}%`;
  }
  return (
    <>
      <article
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
