import {API} from "../../utils/axios";
import IComment, {IPostComment} from '../../types/comment'
import {ThunkAction} from 'redux-thunk'
import {StoreType} from "../reducer/reducer";
import {hotelInfoActionTypes, hotelInfoAction} from "../reducer/types/hotel-info";
import ErrorMessage from '../../utils/error-message'


export const thunkGetComments = (id: number): ThunkAction<void, any, unknown, hotelInfoActionTypes> =>
  async (dispatch) => {
    try {
      const {data: comments}: { data: Array<IComment> } = await API.get(`/comments/${id}`)
      dispatch({type: hotelInfoAction.ADD_COMMENT, payload: {id: id, comments}})
    } catch (err) {
      await ErrorMessage()
    }
  }

export default thunkGetComments

export const thunkPostComment = (id: number, postComment: IPostComment): ThunkAction<Promise<boolean>, StoreType, unknown, hotelInfoActionTypes> =>
  async (dispatch) => {
    try{
      const {data: comments}: { data: Array<IComment> } = await API.post(`/comments/${id}`, postComment)
      dispatch({type: hotelInfoAction.ADD_COMMENT, payload: {id: id, comments}})
      return true
    } catch (err){
      await ErrorMessage(`error post comment`)
      return false
    }
  }
