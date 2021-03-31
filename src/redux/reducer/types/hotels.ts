import Hotel from "../../../types/hotel";

export type THotels = Array<Hotel>

export enum hotelsAction {
  UP_DATE_IS_FAVORITE = 'UP_DATE_IS_FAVORITE',
  UP_DATE_HOTELS = 'UP_DATE_HOTELS',
  UP_DATE_ONE_HOTEL = 'UP_DATE_HOTEL'
}

interface IUpDateIsFavorite {
  type: hotelsAction.UP_DATE_IS_FAVORITE,
  payload: {
    isFavorite: boolean,
    id: number
  }
}

interface IUpDateHotel{
  type: hotelsAction.UP_DATE_HOTELS,
  payload: Array<Hotel>
}

interface IUpDateOneHotel{
  type: hotelsAction.UP_DATE_ONE_HOTEL,
  payload:Hotel
}

export type hotelsActionTypes =
  IUpDateIsFavorite |
  IUpDateHotel |
  IUpDateOneHotel
