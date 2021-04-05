import Hotel from "../../../types/hotel";

export type THotels = Array<Hotel>

export const hotelsActionCreators = {
  UP_DATE_IS_FAVORITE: (payload: { isFavorite: boolean, id: number }):IUpDateIsFavorite=>({type:hotelsActionEnum.UP_DATE_IS_FAVORITE, payload}),
  UP_DATE_HOTELS: (payload:Array<Hotel>):IUpDateHotel=>({type:hotelsActionEnum.UP_DATE_HOTELS, payload}),
  UP_DATE_ONE_HOTEL: (payload:Hotel):IUpDateOneHotel=>({type:hotelsActionEnum.UP_DATE_ONE_HOTEL, payload})
}

export enum hotelsActionEnum {
  UP_DATE_IS_FAVORITE = 'UP_DATE_IS_FAVORITE',
  UP_DATE_HOTELS = 'UP_DATE_HOTELS',
  UP_DATE_ONE_HOTEL = 'UP_DATE_HOTEL'
}

interface IUpDateIsFavorite {
  type: hotelsActionEnum.UP_DATE_IS_FAVORITE,
  payload: {
    isFavorite: boolean,
    id: number
  }
}

interface IUpDateHotel {
  type: hotelsActionEnum.UP_DATE_HOTELS,
  payload: Array<Hotel>
}

interface IUpDateOneHotel {
  type: hotelsActionEnum.UP_DATE_ONE_HOTEL,
  payload: Hotel
}

export type hotelsActionTypes =
  IUpDateIsFavorite |
  IUpDateHotel |
  IUpDateOneHotel
