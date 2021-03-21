import userTS from '../../template/user'

interface SystemActionTypes {
  type: string,
  payload: any
}
export  type isAuth = {
  now: boolean,
  user: userTS
}

export type appStateTS = {
  cityNow: string,
  isAuth: isAuth,
  load: boolean,
  sort: string,
  error: {
    message: string,
    now: boolean
  }
}
const defaultUserData = {
  id: -1,
  name: '',
  is_pro: false,
  avatar_url: '',
  email: ''
}
const initialState: appStateTS = {
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

function appState(state = initialState, action: SystemActionTypes): appStateTS {
  switch (action.type) {
    case 'SET_ERROR':
      state.error = action.payload
      return state
    case 'SORT_SET':
      state.sort = action.payload
      return state;
    case 'CITY_SET':
      state.cityNow = action.payload
      return state;
    case 'AUTH_SET':
      state.isAuth = action.payload
      return state;
    case 'LOG_OUT':
      state.isAuth = {
        now: false,
        user: defaultUserData
      }
      return state;
    case 'LOAD':
      state.load = action.payload
      return state
    default:
      return state;
  }
}


export default appState

