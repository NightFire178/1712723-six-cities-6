import {API} from "../../utils/axios";
import hotels from '../../types/hotel'
import { ThunkAction } from "redux-thunk"
import { StoreType} from "../reducer/reducer";
import {appStateActionTypes, appStateAction} from "../reducer/types/app-state";
import {hotelsAction, hotelsActionTypes} from "../reducer/types/hotels";

export const thunkHotelLoad = (): ThunkAction<void, StoreType, unknown, appStateActionTypes | hotelsActionTypes> => (dispatch, getState) => {
  API.get(`/hotels`)
    .then(({ data }: { data: Array<hotels> }) => {
      if (JSON.stringify(getState().hotels) !== JSON.stringify(data)) {
        dispatch({ type: hotelsAction.UP_DATE_HOTELS, payload: data })
        dispatch({ type: appStateAction.LOAD, payload: true })
      }
    })
}


export default thunkHotelLoad
