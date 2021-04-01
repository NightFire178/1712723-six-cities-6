import React, {FunctionComponent, useState} from 'react';
import {Redirect} from "react-router-dom"
import useThunk from "../../hooks/use-thunk";
import appStateSelection from "../../redux/selectors/app-state";
import hotelsSelection from "../../redux/selectors/hotels";

interface OwnProps {
  cardId: number,
  buttonPlace: string,
}

interface buttonHTML {
  classNoActive: string,
  classActive: string,
  classIcon: string,
  size: {
    width: number,
    height: number
  }
}

type Props = OwnProps;

const placeMap = new Map([
  [`card`, {
    classActive: `place-card__bookmark-button place-card__bookmark-button--active button`,
    classNoActive: `place-card__bookmark-button button`,
    size: {
      height: 19,
      width: 18
    },
    classIcon: "place-card__bookmark-icon"
  }],
  [`property`, {
    classActive: `property__bookmark-button--active property__bookmark-button button`,
    classNoActive: `property__bookmark-button button`,
    size: {
      height: 30,
      width: 31
    },
    classIcon: `property__bookmark-icon`,
  }]
  
])

const FavoriteButton: FunctionComponent<Props> = ({cardId, buttonPlace}) => {
  const [redirectLogin, setRedirectLogin] = useState(false)
  const auth = appStateSelection.isAuth()
  const isFavorite = hotelsSelection.hotelFavorites(+cardId)
  const {thunkButtonFavorites} = useThunk()
  const buttonHTML: buttonHTML | undefined = placeMap.get(buttonPlace)
  if (!buttonHTML) {
    throw `error  buttonPlace favoriteButton` // TODO dev
  }

  if (redirectLogin) {
    return <Redirect to={"/login"}/>
  }
  const handleButtonClick = () => {
    if(auth.now){
      thunkButtonFavorites(+cardId)
    } else{
      setRedirectLogin(true)
    }
  }
  return (<button
    className={
      isFavorite
        ? buttonHTML.classActive
        : buttonHTML.classNoActive
    }
    type="button"
    onClick={handleButtonClick}
  >
    <svg
      className={buttonHTML.classIcon}
      width={buttonHTML.size.width}
      height={buttonHTML.size.height}
    >
      <use xlinkHref="#icon-bookmark"/>
    </svg>
    <span className="visually-hidden">To bookmarks</span>
  </button>);
};

export default FavoriteButton;
