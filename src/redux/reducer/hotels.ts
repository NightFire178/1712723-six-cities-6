import Hotel from "../../template/hotel"

interface SystemActionTypes {
  type: string,
  payload: any
}

export type hotelsTS = Array<Hotel>

const initialState: hotelsTS = []

function hotels(state = initialState, action: SystemActionTypes): hotelsTS {
  switch (action.type) {
    case 'UPDATE_IS_FAVORITE':
      state[action.payload.id].is_favorite= action.payload.isFavorite
      return state
    case 'UPDATE_HOTEL':
      state = action.payload
      return state;
    default:
      return state;
  }
}

export default hotels
