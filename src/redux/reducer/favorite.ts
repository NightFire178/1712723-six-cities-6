interface SystemActionTypes {
  type: string,
  payload: Array<number>
}

export type favoriteTS = Array<number>

const initialState: favoriteTS = []

function favorite(state = initialState, action: SystemActionTypes): favoriteTS {
  switch (action.type) {
    case 'UPDATE_FAVORITE':
      state = action.payload
      return state;
    default:
      return state;
  }
}

export default favorite
