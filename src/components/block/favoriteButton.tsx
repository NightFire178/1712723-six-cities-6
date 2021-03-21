import React, {FunctionComponent} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {storeState} from "../../redux/reducer/reducer";
import axios from "axios";
import favorites from "../../redux/thunk/favorites";


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

const FavoriteButton: FunctionComponent<Props> = ({cardId, buttonPlace}) => {
  let buttonHTML: buttonHTML = {
    classActive: `place-card__bookmark-button place-card__bookmark-button--active button`,
    classNoActive: `place-card__bookmark-button button`,
    size: {
      height: 19,
      width: 18
    },
    classIcon: "place-card__bookmark-icon"
  }
  switch (buttonPlace) {
    // case `card`:default
    //   break;
    case `property`:
      buttonHTML = {
        classActive: `property__bookmark-button--active property__bookmark-button button`,
        classNoActive: `property__bookmark-button button`,
        size: {
          height: 30,
          width: 31
        },
        classIcon: `property__bookmark-icon`,
      }
      break;
  }
  const dispatch = useDispatch()
  const {isFavorite, stateIndex} = useSelector((state: storeState) => {
    const stateIndex = state.hotels.findIndex((obj) => +obj.id === +cardId)
    return {
      stateIndex,
      isFavorite: state.hotels[stateIndex].is_favorite
    }
  })
  const buttonClick = () => {
    axios.post(`${process.env.SERVER_URL}/favorite/${cardId}/${+!isFavorite}`, {}, {
      withCredentials: true,
      timeout: 5000
    })
      .catch(() => ({data: false}))
      .then(({data}) => {
        if (data) {
          dispatch(favorites())
          dispatch({
            type: 'UPDATE_IS_FAVORITE', payload: {
              isFavorite: !isFavorite,
              id: stateIndex
            }
          })
        }
      })
  }
  return (<button
    className={
      isFavorite
        ? buttonHTML.classActive
        : buttonHTML.classNoActive
    }
    type="button"
    onClick={buttonClick}
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
