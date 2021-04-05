import {API} from "../../../utils/axios";
import {ThunkAction} from 'redux-thunk'
import hotel from '../../../types/hotel'
import {StoreType} from '../../reducer/reducer'
import {favoriteActionCreators, favoriteActionTypes} from "../../reducer/types-action-creators/favorite";
import {hotelsActionCreators, hotelsActionTypes} from "../../reducer/types-action-creators/hotels";
import ErrorMessage from '../../../utils/error-message'
import apiUri from '../../../api-uri'

export const thunkFavorites = (): ThunkAction<void, StoreType, unknown, favoriteActionTypes> => async (dispatch) => {
  try {
    const {data: favoritesRes}: { data: Array<hotel> } = await API.get(apiUri.favorite())
    const arrId = favoritesRes.map((obj) => obj.id)
    dispatch(favoriteActionCreators.UPDATE_FAVORITE(arrId))
  } catch (err) {
    await ErrorMessage()
  }
}

export const thunkButtonFavorites = (cardId: number): ThunkAction<void, StoreType, unknown, hotelsActionTypes> => async (dispatch, getState) => {
  try {
    const state = getState()
    const stateIndex = state.hotels.findIndex((obj) => +obj.id === +cardId)
    const isFavorite = state.hotels[stateIndex].is_favorite
    const {status} = await API.post(apiUri.favoriteIdStatus(cardId, !isFavorite), {})
    if(status===200){
      dispatch(thunkFavorites())
      dispatch(hotelsActionCreators.UP_DATE_IS_FAVORITE({
        isFavorite: !isFavorite,
        id: stateIndex
      }))
    }
  } catch (err) {
    await ErrorMessage()
  }
}

