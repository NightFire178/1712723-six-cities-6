import {TFavorite, favoriteAction, favoriteActionTypes} from "./types/favorite";

const initialState: TFavorite = []

function favorite(state = initialState, action: favoriteActionTypes): TFavorite {
  switch (action.type) {
    case favoriteAction.UPDATE_FAVORITE:
      state = action.payload
      return state;
    default:
      return state;
  }
}

export default favorite
