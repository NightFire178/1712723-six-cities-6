import axios from 'axios'
import comment from '../../template/comment'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import {storeState} from "../reducer/reducer";
import userTS from "../../template/user";


const comments = (id: number): ThunkAction<void, any, unknown, Action<string>> => (dispatch, getState) => {
  axios(`${process.env.SERVER_URL}/comments/${id}`, {
    withCredentials: true,
    timeout: 5000
  }).catch(()=>  {
    return {data: false}
  })
    .then(({ data }: { data: Array<comment>|boolean }) => {
      dispatch({type:`ADD_COMMENT`, payload:{id:id, comments:data}})
    })
}

export default comments


export const postComment = (id:number, data:any): ThunkAction<void, storeState, unknown, Action<string>> =>// TODO data
  (dispatch) => {
    axios.post(`${process.env.SERVER_URL}/comments/${id}`, data, {
      withCredentials: true,
      timeout: 5000
    }).catch(()=> {
      return {data: false}
    })
      .then(({data}: { data: userTS|boolean }) => {
        dispatch({type:`ADD_COMMENT`, payload:{id:id, comments:data}})
    })
  }
