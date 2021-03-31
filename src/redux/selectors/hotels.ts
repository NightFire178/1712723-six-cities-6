import {THotels} from "../reducer/types/hotels";
import useTypedSelector from "../../hooks/use-selector-type";
import Hotel from "../../types/hotel";

interface IHotels {
  hotels(): THotels,

  oneHotel(id: number): Hotel|undefined
}

export default class hotelsSelection implements IHotels {
  hotels(): THotels {
    return useTypedSelector(({hotels}) => hotels)
  }

  oneHotel(id: number): Hotel|undefined {
    return useTypedSelector(({hotels}) => hotels.find((obj) => obj.id === id))
  }
}
