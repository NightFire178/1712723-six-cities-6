import comments from "../../../types/comment";

export interface IInfoState {
  id: number,
  nearbyID: Array<number>,
  comment: Array<comments>
}

export type THotelInfo = Array<IInfoState>

export enum hotelInfoAction {
  SET_HOTEL_INFO = 'SET_HOTEL_INFO',
  ADD_COMMENT = 'ADD_COMMENT'
}

interface ISetHotelInfo {
  type: hotelInfoAction.SET_HOTEL_INFO,
  payload: IInfoState
}

interface IAddComment {
  type: hotelInfoAction.ADD_COMMENT,
  payload: { id: number, comments: Array<comments> }
}

export type hotelInfoActionTypes = ISetHotelInfo | IAddComment
