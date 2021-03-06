import React, {FunctionComponent, useState} from 'react';
import {Redirect} from "react-router-dom"
import useThunk from "../../../hooks/use-thunk";
import useAppStateSelection from "../../../hooks/use-selectors-state/use-app-state";
import useHotelsSelection from "../../../hooks/use-selectors-state/use-hotels";
import {PlaceFavoriteButtonEnum} from "../../../enum";

interface OwnProps {
  cardId: number,
  buttonPlace: PlaceFavoriteButtonEnum,
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
  [PlaceFavoriteButtonEnum.card, {
    classActive: `place-card__bookmark-button place-card__bookmark-button--active button`,
    classNoActive: `place-card__bookmark-button button`,
    size: {
      height: 19,
      width: 18

    },
    classIcon: "place-card__bookmark-icon"
  }],
  [PlaceFavoriteButtonEnum.property, {
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
  const auth = useAppStateSelection.isAuth()
  const isFavorite = useHotelsSelection.hotelFavorites(+cardId)
  const {thunkButtonFavorites} = useThunk()
  //eslint-disable-next-line
  //@ts-ignore
  const buttonHTML: buttonHTML = placeMap.get(buttonPlace)

  if (redirectLogin) {
    return <Redirect to={"/login"}/>
  }
  const handleAddFavorite = () => {
    if (auth.now) {
      thunkButtonFavorites(+cardId)
    } else {
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
    onClick={handleAddFavorite}
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
