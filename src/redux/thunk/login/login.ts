import {API} from "../../../utils/axios";
import {ThunkAction} from "redux-thunk"
import {StoreType} from "../../reducer/reducer";
import IUser from '../../../types/user'
import {appStateActionCreators, appStateActionTypes} from "../../reducer/types-action-creators/app-state";
import thunkHotelLoad from "../hotels-up-date/hotels-up-date";
import {favoriteActionCreators, favoriteActionTypes} from "../../reducer/types-action-creators/favorite";
import ErrorMessage from '../../../utils/error-message'
import apiUri from '../../../api-uri'

export const thunkGetLogin = (): ThunkAction<void, StoreType, unknown, appStateActionTypes> =>
  async (dispatch) => {
    try {
      const {data: user}: { data: IUser } = await API.get(apiUri.login())
      dispatch(appStateActionCreators.AUTH_SET({
        now: true,
        user
      }))
    } catch (err) {}
  }


export const thunkPostLogin = (user: { email: string, password: string }): ThunkAction<void, StoreType, undefined, appStateActionTypes> =>
  async (dispatch) => {
    // тут должна быть логика которую не сделать без нормальной серверной авторизации
    try {
      const {data: userRes}: { data: IUser } = await API.post(apiUri.login(), user)
      dispatch(appStateActionCreators.AUTH_SET({
        now: true,
        user: userRes
      }))
      dispatch(thunkHotelLoad())
    } catch (err) {
      await ErrorMessage()
    }
  }

export const thunkLogOut = (): ThunkAction<void, StoreType, undefined, appStateActionTypes|favoriteActionTypes> =>
  async (dispatch) => {
    try {
      const {status}: { status: number } = await API.get(apiUri.logOut())
      if(status===200){
        dispatch(appStateActionCreators.LOG_OUT())
        dispatch(thunkHotelLoad())
        dispatch(favoriteActionCreators.DEFAULT_FAVORITE())
      }
    } catch (err) {
      await ErrorMessage()
    }
  }

export default thunkPostLogin
