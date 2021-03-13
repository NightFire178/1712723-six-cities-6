import axios from '../../utils/axios'
import comment from '../../template/comment'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

export default (id: number): ThunkAction<void, any, unknown, Action<string>> => (dispatch, getState) => {
  axios(`${process.env.SERVER_URL}/comments/${id}`)
    .then(({ data }: { data: Array<comment> }) => {
      dispatch({type:`ADD_COMMENT`, payload:data})
      // TODO test
    })
}
