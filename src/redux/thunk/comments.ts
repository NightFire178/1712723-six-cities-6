import {API} from "../../utils/axios";
import comment from '../../types/comment'
import { ThunkAction } from 'redux-thunk'
import {StoreType} from "../reducer/reducer";
import {hotelInfoActionTypes, hotelInfoAction} from "../reducer/types/hotel-info";


export const thunkGetComments = (id: number): ThunkAction<void, any, unknown, hotelInfoActionTypes> => (dispatch, getState) => {
 API.get(`/comments/${id}`)
    .then(({ data }: { data: Array<comment>}) => {
      dispatch({type:hotelInfoAction.ADD_COMMENT, payload:{id:id, comments:data}})
    })
}

export default thunkGetComments


export const thunkPostComment = (id:number, data:any): ThunkAction<void, StoreType, unknown, hotelInfoActionTypes> =>// TODO data
  (dispatch) => {
    API.post(`/comments/${id}`, data)
      .then(({data:resData}: { data: Array<comment> } ) => {
        dispatch({type:hotelInfoAction.ADD_COMMENT, payload:{id:id, comments:resData}})
    })
  }
