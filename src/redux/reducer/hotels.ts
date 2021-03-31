import {hotelsAction, hotelsActionTypes, THotels} from "./types/hotels";

const initialState: THotels = []

function hotels(state = initialState, action: hotelsActionTypes): THotels {
  switch (action.type) {
    case hotelsAction.UP_DATE_IS_FAVORITE:
      state[action.payload.id].is_favorite = action.payload.isFavorite
      return state
    case hotelsAction.UP_DATE_HOTELS:
      state = action.payload
      return state;
    case hotelsAction.UP_DATE_ONE_HOTEL:
      let temp = state.findIndex(obj => obj.id === action.payload.id)
      if (temp >= 0 && JSON.stringify(state[temp]) !== JSON.stringify(action.payload)) {
        state[temp] = action.payload
      }else if (temp<0){
        return [...state, action.payload]
      }
      return state
    default:
      return state;
  }
}

export default hotels
