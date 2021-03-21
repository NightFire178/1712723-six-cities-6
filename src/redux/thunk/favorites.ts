import axios from '../../utils/axios'
import {Action} from 'redux'
import {ThunkAction} from 'redux-thunk'
import hotel from '../../template/hotel'
import {storeState} from '../reducer/reducer'

export default (): ThunkAction<void, storeState, unknown, Action<string>> => (dispatch) => {
  axios(`${process.env.SERVER_URL}/favorite`)
    .catch(() => ({data: false})
    )
    .then(({data}: { data: Array<hotel> | boolean }) => {
      if (data) {
        // @ts-ignore
        const arrId = data.map((obj: hotel) => obj.id)
        dispatch({type: 'UPDATE_FAVORITE', payload: arrId})
      }
    })
}
