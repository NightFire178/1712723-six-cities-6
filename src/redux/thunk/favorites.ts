import {API} from "../../utils/axios";
import {ThunkAction} from 'redux-thunk'
import hotel from '../../types/hotel'
import {StoreType} from '../reducer/reducer'
import {favoriteAction, favoriteActionTypes} from "../reducer/types/favorite";

export const thunkFavorites = (): ThunkAction<void, StoreType, unknown, favoriteActionTypes> => (dispatch) => {
  API.get(`/favorite`)
    .then(({data}: { data: Array<hotel> }) => {
      if (data) {
        const arrId = data.map((obj: hotel) => obj.id)
        dispatch({type: favoriteAction.UPDATE_FAVORITE, payload: arrId})
      }
    })
}

export default thunkFavorites
