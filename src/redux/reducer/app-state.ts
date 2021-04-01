import {appStateAction, appStateActionTypes, IAppState} from "./types/app-state"
import {sortName} from "../../components/home/hotels";

const defaultUserData = {
  id: -1,
  name: '',
  is_pro: false,
  avatar_url: '',
  email: ''
}
const initialState: IAppState = {
  cityNow: `Paris`,
  isAuth: {
    now: false,
    user: defaultUserData
  },
  load: false,
  sort: sortName.popular,
  error: {
    message: '',
    now: false
  }
}

function appState(state = initialState, action: appStateActionTypes): IAppState {
  switch (action.type) {
    case appStateAction.SET_ERROR:
      return {...state, error: action.payload}
    case appStateAction.SORT_SET:
      return {...state, sort: action.payload}
    case appStateAction.CITY_SET:
      return {...state, cityNow: action.payload}
    case appStateAction.AUTH_SET:
      return {...state, isAuth: action.payload}
    case appStateAction.LOG_OUT:
      return {
        ...state, isAuth: {
          now: false,
          user: defaultUserData
        }
      };
    case appStateAction.LOAD:
      return {...state, load:action.payload}
    default:
      return state;
  }
}


export default appState

