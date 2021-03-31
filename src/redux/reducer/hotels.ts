import {hotelsAction, hotelsActionTypes, THotels} from "./types/hotels";

const initialState: THotels = []

function hotels(state = initialState, action: hotelsActionTypes): THotels {
  switch (action.type) {
    case hotelsAction.UP_DATE_IS_FAVORITE:
      state[action.payload.id].is_favorite = action.payload.isFavorite
      return state
    case hotelsAction.UP_DATE_HOTELS:
      return action.payload;
    case hotelsAction.UP_DATE_ONE_HOTEL:
      const tempIndex = state.findIndex(obj => obj.id === action.payload.id)
      if (tempIndex >= 0 && JSON.stringify(state[tempIndex]) !== JSON.stringify(action.payload)) {
        state[tempIndex] = action.payload
      }else if (tempIndex<0){
        return [...state, action.payload]
      }
      return state
    default:
      return state;
  }
}

export default hotels
