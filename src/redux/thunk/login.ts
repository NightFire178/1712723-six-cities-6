import axios from "axios"
import {Action} from "redux"
import {ThunkAction} from "redux-thunk"
import {storeState} from '../reducer/reducer'
import userTS from '../../template/user'


export const getLogin = (): ThunkAction<void, storeState, unknown, Action<string>> =>
  (dispatch) => {
    axios.get(`${process.env.SERVER_URL}/login`, {
      withCredentials: true,
      timeout: 5000
    }).catch(()=>({data: false}))
      .then(({data}: { data: userTS|boolean }) => {
      if(data) {
        dispatch({
          type: 'AUTH_SET',
          payload: {
            now: true,
            user: data
          }
        })
      }
    })
  }


export default (user: { email: string, password: string }): ThunkAction<void, storeState, unknown, Action<string>> =>
  (dispatch) => {
    axios.post(`${process.env.SERVER_URL}/login`, user, {
      withCredentials: true,
      timeout: 5000
    }).then(({data}: { data: userTS }) => {
      dispatch({
        type: 'AUTH_SET',
        payload: {
          now: true,
          user: data
        }
      })
    }).catch((err)=>console.log(err.response))// TODO переделать авторизацию
  }
