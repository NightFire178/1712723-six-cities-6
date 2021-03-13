interface SystemActionTypes {
  type: string,
  payload: any
}

export type appState = {
  cityNow: string,
  isAuth: boolean,
  load: boolean
}

const initialState: appState = {
  cityNow: `Amsterdam`,
  isAuth: false,
  load: false
}

function appState(state = initialState, action: SystemActionTypes): appState {
  switch (action.type) {
    case 'CITY_SET':
      state.cityNow = action.payload
      return state;
    case 'IS_AUTH_SET':
      state.isAuth = action.payload
      return state;
    case 'LOAD':
      state.load = action.payload
      return state
    default:
      return state;
  }
}


export default appState

