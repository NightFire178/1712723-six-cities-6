import {TFavorite} from "../reducer/types/favorite";
import useTypedSelector from "../../hooks/use-selector-type";
import Hotel from "../../types/hotel";
import hotel from "../../types/hotel";
import cityes from "../../data/cityes";

type THotelsFavorite = {
  favoriteHotels:Array<Hotel>,
  nameCity:Array<string>
}

interface IFavorite {
  favorite():TFavorite,
  hotelsFavorite():THotelsFavorite|undefined
}

const favoriteSelection:IFavorite ={
  favorite(): TFavorite {
    return useTypedSelector(({favorite})=>favorite)
  },
  hotelsFavorite(): THotelsFavorite|undefined {
    return useTypedSelector(({hotels, favorite})=>{
      const citySelector: Array<string> = [];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore 
      // TODO me
      const hotelsSelector: Array<hotel>|undefined = favorite.map((id) => (hotels.find((obj) => +obj.id === id)))
      if (hotelsSelector && hotelsSelector.length>=0) {
        cityes.forEach(value => {
          if (hotelsSelector.findIndex(obj => obj.city.name === value) >= 0) {
            citySelector.push(value)
          }
        })
        return { favoriteHotels: hotelsSelector, nameCity: citySelector}
      } else {
        return undefined
      }
    })
  }
}

export default favoriteSelection
