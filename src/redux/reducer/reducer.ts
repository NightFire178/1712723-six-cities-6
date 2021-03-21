import { combineReducers } from 'redux';
import hotels, {hotelsTS} from "./hotels"
import appState, {appStateTS} from "./appStateTS"
import hotelInfo, {hotelInfoTS} from "./hotelInfo"
import favorite, {favoriteTS} from "./favorite";

// FIXME устрой строгую типизацию  для начало подставь storeState в reducer, и веселись дорогой
const reducer = combineReducers({hotels, appState, hotelInfo, favorite})

export interface storeState {
  hotels:hotelsTS,
  appState: appStateTS,
  hotelInfo: hotelInfoTS,
  favorite: favoriteTS
}
export default reducer
