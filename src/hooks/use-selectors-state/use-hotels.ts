import {THotels} from "../../redux/reducer/types-action-creators/hotels";
import useTypedSelector from "../use-selector-type";
import Hotel from "../../types/hotel";

type IHotels = {
  hotels(): THotels,
  hotelFavorites(id:number):boolean|undefined
  oneHotel(id: number): Hotel|undefined
}

const useHotelsSelection : IHotels = {
  hotels(): THotels {
    return useTypedSelector(({hotels}) => hotels)
  },
  oneHotel(id: number): Hotel|undefined {
    return useTypedSelector(({hotels}) => hotels.find((obj) => obj.id === id))
  },
  hotelFavorites(id: number): boolean|undefined {
    return useTypedSelector(({hotels}) => hotels.find((obj) => obj.id === id)?.is_favorite)
  }
}

export default useHotelsSelection
