import { combineReducers } from 'redux';
import hotels from "./hotels"
import appState from "./appState"
import hotelInfo from "./hotelInfo"

const reducer = combineReducers({hotels, appState, hotelInfo})

export type storeState = ReturnType<typeof reducer>
export default reducer