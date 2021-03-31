import {API} from "../../utils/axios";
import {ThunkAction} from 'redux-thunk'
import hotel from '../../types/hotel'
import {StoreType} from '../reducer/reducer'
import {favoriteAction, favoriteActionTypes} from "../reducer/types/favorite";
import {hotelsAction, hotelsActionTypes} from "../reducer/types/hotels";
import ErrorMessage from '../../utils/error-message'

export const thunkFavorites = (): ThunkAction<void, StoreType, unknown, favoriteActionTypes> => async (dispatch) => {
  try {
    const {data: favoritesRes}: { data: Array<hotel> } = await API.get(`/favorite`)
    const arrId = favoritesRes.map((obj) => obj.id)
    dispatch({type: favoriteAction.UPDATE_FAVORITE, payload: arrId})
  } catch (err) {
    await ErrorMessage()
  }
}

export const thunkButtonFavorites = (cardId: number): ThunkAction<void, StoreType, unknown, hotelsActionTypes> => async (dispatch, getState) => {
  try {
    const state = getState()
    const stateIndex = state.hotels.findIndex((obj) => +obj.id === +cardId)
    const isFavorite = state.hotels[stateIndex].is_favorite
    const {status} = await API.post(`/favorite/${cardId}/${+!isFavorite}`, {})
    if(status===200){
      dispatch(thunkFavorites())
      dispatch({
        type: hotelsAction.UP_DATE_IS_FAVORITE, payload: {
          isFavorite: !isFavorite,
          id: stateIndex
        }
      })
    }
  } catch (err) {
    await ErrorMessage()
  }
}

