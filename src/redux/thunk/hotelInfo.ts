import axios from '../../utils/axios'
import comment from '../../template/comment'
import {Action} from 'redux'
import {ThunkAction} from 'redux-thunk'
import hotel from '../../template/hotel'
import {storeState} from '../reducer/reducer'
import comments from './comments'

export default (id: number, setDataS: any): ThunkAction<void, storeState, unknown, Action<string>> => (dispatch, getState) => {
  const state = getState()
  if (state.hotelInfo.findIndex(obj => obj.id === id) < 0) {
    let comment: Array<comment>, nearby: Array<number>;
    const h = axios(`${process.env.SERVER_URL}/hotels/${id}`)
      .catch(() => {
        setDataS(true)
        return {data: false}
      })
      .then(({data}) => {
        if (data) {
          const idStateHotel = state.hotels.findIndex(obj => +obj.id === +data.id)
          if (state.appState.load) {
            if (idStateHotel >= 0 && JSON.stringify(data) !== JSON.stringify(state.hotels[idStateHotel])) {
              state.hotels[idStateHotel] = data
              dispatch({type: 'UPDATE_HOTEL', payload: state.hotels})
            } else if(idStateHotel < 0){
              state.hotels.push(data)
              dispatch({type: 'UPDATE_HOTEL', payload: state.hotels})
            }
          }
        }
      })
    const c = axios(`${process.env.SERVER_URL}/comments/${id}`)
      .catch(() => {
        return {data: false}
      })
      .then(({data}: { data: Array<comment> }) => {
        if (data)
          comment = data;
      })
    const n = axios(`${process.env.SERVER_URL}/hotels/${id}/nearby`)
      .catch(() => {
        return {data: false}
      })
      .then(({data}: { data: Array<hotel> }) => {
        if (data)
          nearby = [data[0].id, data[1].id, data[2].id]
      })
    Promise.all([h, c, n])
      .then(() => {
        dispatch({
          type: `SET_HOTEL_INFO`, payload: {
            id,
            nearbyID: nearby,
            comment
          }
        })
      })
  } else {
    dispatch(comments(id))
  }
}
