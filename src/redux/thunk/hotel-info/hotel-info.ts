import comment from '../../../types/comment'
import {ThunkAction} from 'redux-thunk'
import hotel from '../../../types/hotel'
import {StoreType} from '../../reducer/reducer'
import thunkGetComments from '../comments/comments'
import {API} from "../../../utils/axios";
import {hotelInfoActionCreators, hotelInfoActionTypes} from "../../reducer/types-action-creators/hotel-info";
import {hotelsActionCreators, hotelsActionTypes} from "../../reducer/types-action-creators/hotels";
import ErrorMessage from '../../../utils/error-message'
import apiUri from '../../../api-uri'

export const thunkHotelInfo = (id: number): ThunkAction<Promise<number>, StoreType, unknown, hotelsActionTypes | hotelInfoActionTypes> => async (dispatch, getState) => {
  const state = getState()
  if (state.hotelInfo.findIndex(obj => obj.id === id) < 0) {
    const {data:hotel, status}:{ data: hotel|undefined, status:number } = await API.get(apiUri.hotelsId(id))
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
      if(status===200&&hotel){
        const [{data: comment}, {data: nearby}]:
          [{ data: Array<comment> }, { data: Array<hotel> }] =
          await Promise.all([
            API.get(apiUri.comments(id)),
            API.get(apiUri.hotelsIdNearby(id))
          ])
        const nearbyID = [nearby[0].id, nearby[1].id, nearby[2].id]
        dispatch(hotelsActionCreators.UP_DATE_ONE_HOTEL(hotel))
        dispatch(hotelInfoActionCreators.SET_HOTEL_INFO({
          id,
          nearbyID,
          comment,
        }))
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
