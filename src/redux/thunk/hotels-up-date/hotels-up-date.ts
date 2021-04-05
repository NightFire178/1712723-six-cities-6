import {API} from "../../../utils/axios";
import hotels from '../../../types/hotel'
import { ThunkAction } from "redux-thunk"
import { StoreType} from "../../reducer/reducer";
import {appStateActionTypes, appStateActionCreators} from "../../reducer/types-action-creators/app-state";
import {hotelsActionCreators, hotelsActionTypes} from "../../reducer/types-action-creators/hotels";
import ErrorMessage from '../../../utils/error-message'
import apiUri from '../../../api-uri'

export const thunkHotelLoad = (): ThunkAction<void, StoreType, unknown, appStateActionTypes | hotelsActionTypes> => async (dispatch) => {
  try {
    const {data:hotels}: { data: Array<hotels> } = await API.get(apiUri.hotels())
      dispatch(hotelsActionCreators.UP_DATE_HOTELS(hotels))
      dispatch(appStateActionCreators.LOAD(true))
  } catch (err){
    await ErrorMessage()
  }
}


export default thunkHotelLoad
