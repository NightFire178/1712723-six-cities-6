import {TFavorite, favoriteAction, favoriteActionTypes} from "./types/favorite";

const initialState: TFavorite = []

function favorite(state = initialState, action: favoriteActionTypes): TFavorite {
  switch (action.type) {
    case favoriteAction.UPDATE_FAVORITE:
      return action.payload;
    case favoriteAction.DEFAULT_FAVORITE:
      return initialState
    default:
      return state;
  }
}

export default favorite
