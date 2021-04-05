import comments from "../../../types/comment";

export interface IInfoState {
  id: number,
  nearbyID: Array<number>,
  comment: Array<comments>
}

export type THotelInfo = Array<IInfoState>

export const hotelInfoActionCreators = {
  SET_HOTEL_INFO : (payload:IInfoState):ISetHotelInfo=>({type:hotelInfoActionEnum.SET_HOTEL_INFO, payload}),
  ADD_COMMENT : (payload: { id: number, comments: Array<comments> }):IAddComment=>({type:hotelInfoActionEnum.ADD_COMMENT, payload})
}

export enum hotelInfoActionEnum {
  SET_HOTEL_INFO = 'SET_HOTEL_INFO',
  ADD_COMMENT = 'ADD_COMMENT'
}

interface ISetHotelInfo {
  type: hotelInfoActionEnum.SET_HOTEL_INFO,
  payload: IInfoState
}

interface IAddComment {
  type: hotelInfoActionEnum.ADD_COMMENT,
  payload: { id: number, comments: Array<comments> }
}

export type hotelInfoActionTypes = ISetHotelInfo | IAddComment
