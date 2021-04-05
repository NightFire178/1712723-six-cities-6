import {appStateActionEnum, appStateActionTypes, IAppState} from "../types-action-creators/app-state"
import {sortName} from "../../../components/home/hotels/hotels";

export const defaultUserData = {
  id: -1,
  name: '',
  is_pro: false,
  avatar_url: '',
  email: ''
}
export const initialAppState: IAppState = {
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

export function appState(state = initialAppState, action: appStateActionTypes): IAppState {
  switch (action.type) {
    case appStateActionEnum.SORT_SET:
      return {...state, sort: action.payload}
    case appStateActionEnum.CITY_SET:
      return {...state, cityNow: action.payload}
    case appStateActionEnum.AUTH_SET:
      return {...state, isAuth: action.payload}
    case appStateActionEnum.LOG_OUT:
      return {
        ...state, isAuth: {
          now: false,
          user: defaultUserData
        }
      };
    case appStateActionEnum.LOAD:
      return {...state, load:action.payload}
    default:
      return state;
  }
}


export default appState

