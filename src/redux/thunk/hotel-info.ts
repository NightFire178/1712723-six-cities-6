import comment from '../../types/comment'
import {ThunkAction} from 'redux-thunk'
import hotel from '../../types/hotel'
import {StoreType} from '../reducer/reducer'
import thunkGetComments from './comments'
import {API} from "../../utils/axios";
import {hotelInfoAction, hotelInfoActionTypes} from "../reducer/types/hotel-info";
import {hotelsAction, hotelsActionTypes} from "../reducer/types/hotels";

export const thunkHotelInfo = (id: number): ThunkAction<Promise<boolean>, StoreType, unknown, hotelsActionTypes | hotelInfoActionTypes> => async (dispatch, getState) => {
  const state = getState()
  let rtn = false;
  if (state.hotelInfo.findIndex(obj => obj.id === id) < 0) {
    let comment: Array<comment> = [], nearby: Array<number> = [];
    let h, c, n;
    try {
      h = API.get(`/hotels/${id}`)
        .then(({data}: { data: hotel }) => {
          if (state.appState.load) {
            dispatch({type: hotelsAction.UP_DATE_ONE_HOTEL, payload: data})
          }
        })
      c = API.get(`/comments/${id}`)
        .then(({data}: { data: Array<comment> }) => {
          if (data)
            comment = data;
        })

      n = API.get(`/hotels/${id}/nearby`)
        .then(({data}: { data: Array<hotel> }) => {
          if (data)
            nearby = [data[0].id, data[1].id, data[2].id]
        })
      await Promise.all([h, c, n])
      dispatch({
        type: hotelInfoAction.SET_HOTEL_INFO, payload: {
          id,
          nearbyID: nearby,
          comment
        }
      })
    } catch {
      console.log("catch")
      rtn = true
    }

  } else {
    dispatch(thunkGetComments(id))
  }
  return rtn
}

export default thunkHotelInfo
