import axios from '../../utils/axios'
import comment from '../../template/comment'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import hotels from '../../template/hotel'
import { storeState} from '../reducer/reducer'
import comments from './comments'

export default (id: number): ThunkAction<void, storeState, unknown, Action<string>> => (dispatch, getState) => {
  if (getState().hotelInfo.findIndex(obj => obj.id === id) < 0) {
    let comment:Array<comment>, nearby:Array<number>;
    const c = axios(`${process.env.SERVER_URL}/comments/${id}`)
      .then(({ data }: { data: Array<comment> }) => {
        comment = data;
      })
    const n = axios(`${process.env.SERVER_URL}/hotels/${id}/nearby`)
      .then(({ data }: { data: Array<hotels> }) => {
        nearby = [data[0].id, data[1].id, data[2].id]
      })
    Promise.all([c, n])
      .then(() => {
        dispatch({
          type: `SET_HOTEL_INFO`, payload: {
            id,
            nearbyID: nearby,
            comment
          }
        })
        console.log({
          id,
          nearbyID: nearby,
          comment
        })
      })
  } else {
    dispatch(comments(id))
  }
}
