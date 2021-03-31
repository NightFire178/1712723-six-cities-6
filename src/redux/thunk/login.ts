import {API} from "../../utils/axios";
import {ThunkAction} from "redux-thunk"
import {StoreType} from "../reducer/reducer";
import IUser from '../../types/user'
import {appStateAction, appStateActionTypes} from "../reducer/types/app-state";
import thunkHotelLoad from "./hotels-up-date";
import {favoriteAction, favoriteActionTypes} from "../reducer/types/favorite";
import ErrorMessage from '../../utils/error-message'

export const thunkGetLogin = (): ThunkAction<void, StoreType, unknown, appStateActionTypes> =>
  async (dispatch) => {
    try {
      const {data: user}: { data: IUser } = await API.get(`/login`)
      dispatch({
        type: appStateAction.AUTH_SET, payload: {
          now: true,
          user
        }
      })
    } catch (err) {}
  }


export const thunkPostLogin = (user: { email: string, password: string }): ThunkAction<void, StoreType, undefined, appStateActionTypes> =>
  async (dispatch) => {
    // тут должна быть логика которую не сделать без нормальной серверной авторизации
    try {
      const {data: userRes}: { data: IUser } = await API.post(`/login`, user)
      dispatch({
        type: appStateAction.AUTH_SET,
        payload: {
          now: true,
          user: userRes
        }
      })
      dispatch(thunkHotelLoad())
    } catch (err) {
      await ErrorMessage()
    }
  }

export const thunkLogOut = (): ThunkAction<void, StoreType, undefined, appStateActionTypes|favoriteActionTypes> =>
  async (dispatch) => {
    try {
      const {status}: { status: number } = await API.get(`/logout`)
      if(status===200){
        dispatch({type: appStateAction.LOG_OUT})
        dispatch(thunkHotelLoad())
        dispatch({type:favoriteAction.DEFAULT_FAVORITE})
      }
    } catch (err) {
      await ErrorMessage()
    }
  }

export default thunkPostLogin
