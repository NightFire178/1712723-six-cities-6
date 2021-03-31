import {appStateAction, appStateActionTypes, IAppState} from "./types/app-state"

const defaultUserData = {
  id: -1,
  name: '',
  is_pro: false,
  avatar_url: '',
  email: ''
}
const initialState: IAppState = {
  cityNow: `Amsterdam`,
  isAuth: {
    now: false,
    user: defaultUserData
  },
  load: false,
  sort: `Popular`,
  error: {
    message: '',
    now: false
  }
}

function appState(state = initialState, action: appStateActionTypes): IAppState {
  switch (action.type) {
    case appStateAction.SET_ERROR:
      state.error = action.payload
      return state
    case appStateAction.SORT_SET:
      state.sort = action.payload
      return state;
    case appStateAction.CITY_SET:
      state.cityNow = action.payload
      return state;
    case appStateAction.AUTH_SET:
      state.isAuth = action.payload
      return state;
    case appStateAction.LOG_OUT:
      state.isAuth = {
        now: false,
        user: defaultUserData
      }
      return state;
    case appStateAction.LOAD:
      state.load = action.payload
      return state
    default:
      return state;
  }
}


export default appState

