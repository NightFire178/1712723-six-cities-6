import {API} from "../../utils/axios";
import hotels from '../../types/hotel'
import { ThunkAction } from "redux-thunk"
import { StoreType} from "../reducer/reducer";
import {appStateActionTypes, appStateAction} from "../reducer/types/app-state";
import {hotelsAction, hotelsActionTypes} from "../reducer/types/hotels";
import ErrorMessage from '../../utils/error-message'

export const thunkHotelLoad = (): ThunkAction<void, StoreType, unknown, appStateActionTypes | hotelsActionTypes> => async (dispatch) => {
  try {
    const {data:hotels}: { data: Array<hotels> } = await API.get(`/hotels`)
      dispatch({ type: hotelsAction.UP_DATE_HOTELS, payload: hotels })
      dispatch({ type: appStateAction.LOAD, payload: true })
  } catch (err){
    await ErrorMessage()
  }
}


export default thunkHotelLoad
