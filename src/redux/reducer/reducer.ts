import { combineReducers } from 'redux';
import hotels from "./hotels/hotels"
import appState from "./app-state/app-state"
import hotelInfo from "./hotel-info/hotel-info"
import favorite from "./favorite/favorite";

const reducer = combineReducers({hotels, appState, hotelInfo, favorite})


export type StoreType = ReturnType<typeof reducer>
export default reducer
