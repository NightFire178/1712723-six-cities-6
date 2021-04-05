import {hotelsActionEnum, hotelsActionTypes, THotels} from "../types-action-creators/hotels";

const initialState: THotels = []

export function hotels(state = initialState, action: hotelsActionTypes): THotels {
  switch (action.type) {
    case hotelsActionEnum.UP_DATE_IS_FAVORITE:
      if(state[action.payload.id]){
        state[action.payload.id].is_favorite = action.payload.isFavorite
      }
      return state
    case hotelsActionEnum.UP_DATE_HOTELS:
      return action.payload;
    case hotelsActionEnum.UP_DATE_ONE_HOTEL:
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
