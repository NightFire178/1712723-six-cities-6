import {TFavorite} from "../../redux/reducer/types-action-creators/favorite";
import useTypedSelector from "../use-selector-type";
import Hotel from "../../types/hotel";
import hotel from "../../types/hotel";
import Cityes from "../../data/cityes";
import {createSelector} from 'reselect'

type THotelsFavorite = {
  favoriteHotels: Array<Hotel>,
  nameCity: Array<string>
}

interface IFavorite {
  favorite(): TFavorite,

  hotelsFavorite(): THotelsFavorite | undefined
}

const useFavoriteSelection: IFavorite = {
  favorite(): TFavorite {
    return useTypedSelector(({favorite}) => favorite)
  },

  hotelsFavorite(): THotelsFavorite | undefined {
    return useTypedSelector(createSelector([state => state.hotels, state => state.favorite],
      (hotels, favorite) => {
        const citySelector: Array<string> = [];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const hotelsSelector: Array<hotel> | undefined = favorite.map((id) => (hotels.find((obj) => +obj.id === id)))
        if (hotelsSelector && hotelsSelector.length >= 0) {
          Cityes.forEach(value => {
            if (hotelsSelector.findIndex(obj => obj.city.name === value) >= 0) {
              citySelector.push(value)
            }
          })
          return {favoriteHotels: hotelsSelector, nameCity: citySelector}
        } else {
          return undefined
        }
      }))
  }
}

export default useFavoriteSelection
