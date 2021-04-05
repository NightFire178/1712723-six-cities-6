import {TFavorite, favoriteActionEnum, favoriteActionTypes} from "../types-action-creators/favorite";

export const initialStateFavorite: TFavorite = []

export function favorite(state = initialStateFavorite, action: favoriteActionTypes): TFavorite {
  switch (action.type) {
    case favoriteActionEnum.UPDATE_FAVORITE:
      return action.payload;
    case favoriteActionEnum.DEFAULT_FAVORITE:
      return initialStateFavorite
    default:
      return state;
  }
}

export default favorite
