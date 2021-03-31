import comment from '../../types/comment'
import {ThunkAction} from 'redux-thunk'
import hotel from '../../types/hotel'
import {StoreType} from '../reducer/reducer'
import thunkGetComments from './comments'
import {API} from "../../utils/axios";
import {hotelInfoAction, hotelInfoActionTypes} from "../reducer/types/hotel-info";
import {hotelsAction, hotelsActionTypes} from "../reducer/types/hotels";
import ErrorMessage from '../../utils/error-message'

export const thunkHotelInfo = (id: number): ThunkAction<Promise<number>, StoreType, unknown, hotelsActionTypes | hotelInfoActionTypes> => async (dispatch, getState) => {
  const state = getState()
  if (state.hotelInfo.findIndex(obj => obj.id === id) < 0) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // TODO me
    const {data:hotel, status}:{ data: hotel, status:number } = await API.get(`/hotels/${id}`)
        .catch((err)=>{
          if(err.response){
            return {
              data:undefined,
              status: 204
            }
          } else {
            ErrorMessage()
            return {
              data:undefined,
              status: 404
            }
          }
        })
    try {
      if(status===200){
        const [{data: comment}, {data: nearby}]:
          [{ data: Array<comment> }, { data: Array<hotel> }] =
          await Promise.all([
            API.get(`/comments/${id}`),
            API.get(`/hotels/${id}/nearby`)
          ])
        const nearbyID = [nearby[0].id, nearby[1].id, nearby[2].id]
        dispatch({type: hotelsAction.UP_DATE_ONE_HOTEL, payload: hotel})
        dispatch({
          type: hotelInfoAction.SET_HOTEL_INFO,
          payload: {
            id,
            nearbyID,
            comment,
          },
        })
      } else if(status===204) {
        return status
      } else if(status===404){
        return status
      }
    } catch (e){
      await  ErrorMessage()
      return 404
    }
  } else {
    dispatch(thunkGetComments(id))
  }
  return 200
}

export default thunkHotelInfo
