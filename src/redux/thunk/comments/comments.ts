import {API} from "../../../utils/axios";
import IComment, {IPostComment} from '../../../types/comment'
import {ThunkAction} from 'redux-thunk'
import {StoreType} from "../../reducer/reducer";
import {hotelInfoActionTypes, hotelInfoActionCreators} from "../../reducer/types-action-creators/hotel-info";
import ErrorMessage from '../../../utils/error-message'
import apiUri from '../../../api-uri'


export const thunkGetComments = (id: number): ThunkAction<void, StoreType, unknown, hotelInfoActionTypes> =>
  async (dispatch) => {
    try {
      const {data: comments}: { data: Array<IComment> } = await API.get(apiUri.comments(id))
      dispatch(hotelInfoActionCreators.ADD_COMMENT({id: id, comments}))
    } catch (err) {
      await ErrorMessage()
    }
  }

export default thunkGetComments

export const thunkPostComment = (id: number, postComment: IPostComment): ThunkAction<Promise<boolean>, StoreType, unknown, hotelInfoActionTypes> =>
  async (dispatch) => {
    try {
      const {data: comments}: { data: Array<IComment> } = await API.post(apiUri.comments(id), postComment)
      dispatch(hotelInfoActionCreators.ADD_COMMENT({id: id, comments}))
      return true
    } catch (err) {
      await ErrorMessage(`error post comment`)
      return false
    }
  }
