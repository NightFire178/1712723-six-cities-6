import {API} from "../../utils/axios";
import {ThunkAction} from "redux-thunk"
import {StoreType} from "../reducer/reducer";
import IUser from '../../types/user'
import {appStateAction, appStateActionTypes} from "../reducer/types/app-state";

export const thunkGetLogin = (): ThunkAction<void, StoreType, unknown, appStateActionTypes> =>
  (dispatch) => {
    API.get(`/login`).then(({data}: { data:IUser } ) => {
      dispatch({
        type: appStateAction.AUTH_SET,
        payload: {
          now: true,
          user: data
        }
      })
    })
  }


export const thunkPostLogin = (user: { email: string, password: string }): ThunkAction<void, StoreType, undefined, appStateActionTypes> =>
  (dispatch) => {
    API.post(`/login`, user).then(({data}: { data: IUser }) => {
      dispatch({
        type: appStateAction.AUTH_SET,
        payload: {
          now: true,
          user: data
        }
      })
    }).catch((err) => console.log(err.response))// TODO переделать авторизацию
  }

export default thunkPostLogin
